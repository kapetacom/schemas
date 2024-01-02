/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {Entity, EntityType} from "./types";
import {isBuiltInGeneric, isBuiltInType, isList, isNumber, parseGeneric, toDefaultValue, typeName} from "./utils";
import _ from "lodash";

export function validateEntities(typeList: Entity[], config: any, supportingTypes?: Entity[]) {
    const copy = stripUndefinedProps(config);
    const errors: string[] = [];
    const typeMap = {};
    const allTypes = [...(typeList ?? []), ...(supportingTypes ?? [])];
    allTypes.forEach((type) => {
        typeMap[type.name] = type;
    });

    typeList?.forEach((type) => {
        if (type.type === EntityType.Enum ||
            type.type === EntityType.Native) {
            // We don't expect / want these to be available in the config
            return;
        }

        const configObject = copy[type.name] ?? {};
        errors.push(
            ...validateEntityType(typeMap, type, configObject)
        )
    });

    return errors;
}

function validateBasicType(type: string, value:any) {

    if (isList({type})) {
        type = typeName({type});
        if (!Array.isArray(value)) {
            throw new Error('Value is not array');
        }

        value.forEach((item) => {
            validateBasicType(type, item);
        });
        return;
    }


    if (type === 'string') {
        if (typeof value !== 'string') {
            throw new Error(`Value is not a string`);
        }
    }

    if (isNumber(type)) {
        if (typeof value !== 'number' &&
            !/^[0-9]+(\.[0-9]+)?$/.test(value)) {
            throw new Error(`Value is not a ${type}`);
        }
    }

    if (type === 'boolean') {
        if (typeof value !== 'boolean' && !['true', 'false'].includes(value)) {
            throw new Error(`Value is not a boolean`);
        }
    }
}

function validateEntityType(typeMap: { [key: string]: Entity }, type: Entity, configObject: any) {
    const errors: string[] = [];
    if (!type.properties) {
        return errors;
    }
    Object.entries(type.properties).forEach(([key, property]) => {
        let value = configObject[key];
        const noValue = (value === undefined || value === null);
        if (noValue && 'defaultValue' in property) {
            value = toDefaultValue(property);
        }
        if (property.required && (value === undefined || value === null)) {
            errors.push(`${type.name}.${key} is missing and required`);
            return;
        }

        if (property.type) {
            try {
                validateBasicType(property.type, value);
            } catch (e:any) {
                errors.push(`${type.name}.${key} is invalid: ${e.message}`);
            }
        }

        if (property.ref) {
            if (isBuiltInGeneric(property)) {
                const genericType = parseGeneric(property);
                if (!genericType) {
                    errors.push(`${type.name}.${key} is invalid: ${property.type} is not a valid generic type`);
                    return;
                }
                const entityTypes = genericType.arguments.filter((arg) => !isBuiltInType({type:arg}))
                entityTypes.forEach((entityType) => {
                    const refType = typeMap[entityType];
                    if (!refType) {
                        errors.push(`${type.name}.${key} is invalid: ${property.ref} is not a valid type`);
                        return;
                    }
                });

                if (genericType.name === 'Map') {
                    if (property.required && _.isEmpty(value)) {
                        errors.push(`${type.name}.${key} is empty and required`);
                        return;
                    }
                    const keyType = genericType.arguments[0];
                    const valueType = genericType.arguments[1];
                    if (keyType !== 'string' || !isBuiltInType({type:keyType})) {
                        errors.push(`${type.name}.${key} is invalid: ${keyType} is not a valid key type`);
                        return;
                    }
                    if (!valueType) {
                        errors.push(`${type.name}.${key} is invalid: ${valueType} is missing a value type`);
                        return;
                    }
                    const keyIsBuiltIn = isBuiltInType({type:keyType});
                    const valueIsBuiltIn = isBuiltInType({type:valueType});

                    if (!valueIsBuiltIn && !typeMap[valueType]) {
                        errors.push(`${type.name}.${key} is invalid: ${valueType} is not a valid value type`);
                        return;
                    }

                    if (value) {
                        Object.entries(value).some(([mapKey, value]) => {
                            if (keyIsBuiltIn) {
                                try {
                                    validateBasicType(keyType, mapKey);
                                } catch (e:any) {
                                    errors.push(`${type.name}.${key}.${mapKey} key is invalid: ${e.message}`);
                                    return true;
                                }
                            }

                            if (valueIsBuiltIn) {
                                try {
                                    validateBasicType(valueType, value);
                                } catch (e:any) {
                                    errors.push(`${type.name}.${key}.${mapKey} value is invalid: ${e.message}`);
                                    return true;
                                }
                            } else {
                                errors.push(
                                    ...validateEntityType(typeMap, typeMap[valueType], value)
                                        .map((e) => `${type.name}.${key}.${mapKey} value is invalid: ${e}`)
                                );
                                return true;
                            }
                            return false;
                        });
                    }
                }

                if (genericType.name === 'Set') {
                    if (property.required && _.isEmpty(value)) {
                        errors.push(`${type.name}.${key} is empty and required`);
                        return;
                    }
                    const valueType = genericType.arguments[0];
                    if (!valueType) {
                        errors.push(`${type.name}.${key} is invalid: Value type is missing`);
                        return;
                    }

                    const valueIsBuiltIn = isBuiltInType({type:valueType});

                    Object.values(value).some((value, index) => {
                        if (valueIsBuiltIn) {
                            try {
                                validateBasicType(valueType, value);
                            } catch (e:any) {
                                errors.push(`${type.name}.${key} map value is invalid: ${e.message}`);
                                return true;
                            }
                        } else {
                            errors.push(
                                ...validateEntityType(typeMap, typeMap[valueType], value)
                                    .map((e) => `${type.name}.${key}[${index}] set value is invalid: ${e}`)
                            );
                            return true;
                        }
                        return false;
                    });
                }
                return;
            }
            const refType = typeMap[property.ref];
            if (!refType) {
                errors.push(`${type.name}.${key} is invalid: ${property.ref} is not a valid type`);
                return;
            }

            if (refType.type === EntityType.Enum) {
                if (refType.values &&
                    !refType.values.includes(value)) {
                    errors.push(`${type.name}.${key} is invalid: ${value} is not a valid enum value`);
                }
            } else {
                errors.push(
                    ...validateEntityType(typeMap, typeMap[property.ref], value)
                );
            }
        }

    })

    return errors;
}

export function stripUndefinedProps(object: any):any {
    if (typeof object !== 'object') {
        return object;
    }

    if (Array.isArray(object)) {
        return object.map(stripUndefinedProps);
    }

    const copy = {...object};

    Object.keys(copy).forEach((key) => {
        if (copy[key] === undefined || copy[key] === null) {
            delete copy[key];
        }

        copy[key] = stripUndefinedProps(copy[key]);
    });

    return copy;
}