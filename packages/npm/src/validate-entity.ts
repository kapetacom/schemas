import {Entity, EntityType} from "./types";
import {isList, isNumber, toDefaultValue, typeName} from "./utils";

export function validateEntities(typeList: Entity[], config: any) {
    const copy = stripUndefinedProps(config);
    const errors: string[] = [];
    const typeMap = {};
    typeList?.forEach((type) => {
        typeMap[type.name] = type;
    });

    typeList?.forEach((type) => {
        if (type.type === EntityType.Enum) {
            return;
        }

        if (!copy[type.name]) {
            errors.push(`${type.name} is missing`);
            return;
        }
        const configObject = copy[type.name];
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