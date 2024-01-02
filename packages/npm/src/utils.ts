/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {Entity, EntityProperty, EntityType} from "./types";
import {EntityDTO, EntityEnum, EntityProperties} from "./helpers";
import * as _ from "lodash";
import schemaMap from "../schemas";

export interface TypeLike {
    type?: string;
    ref?: string;
}

export function getSchema(type:'concept'|'types'|'abstracts', name:string) {
    return schemaMap[type + '/' + name + '.json'];
}

export type TypeOrString = TypeLike|string;

export function isDTO(entity:Entity): entity is EntityDTO {
    //Defaults to DTO
    return !entity.type || entity.type === EntityType.Dto;
}

export function isEnum(entity:Entity): entity is EntityEnum {
    return entity.type === EntityType.Enum;
}

export function toEnum(entity:Entity):EntityEnum {
    if (!isEnum(entity)) {
        throw new Error('Entity was not enum');
    }
    return entity;
}

export function toDTO(entity:Entity):EntityDTO {
    if (!isDTO(entity)) {
        throw new Error('Entity was not DTO');
    }
    return entity;
}

export function isValidType(type?:TypeLike):boolean {
    if (!type) {
        //OK => void
        return true;
    }

    return (typeof type.type === 'string' ||
            typeof type.ref === 'string');
}

export function toStringName(type?:TypeLike):string {
    if (!type) {
        return 'void';
    }

    if (typeof type.type !== 'string' && type.ref) {
        return type.ref;
    }
    if (typeof type.type !== 'string') {
        throw new Error(`Invalid type: ${JSON.stringify(type)}`);
    }

    return type.type;
}

export function isList(type?:TypeLike) {
    return toStringName(type).endsWith('[]')
}

/**
 * Reformats value to a valid entity name
 * @param ep
 */
export function typeName(ep?:TypeLike) {
    let type = toStringName(ep)

    if (type.endsWith('[]')) {
        //Handle lists
        return type.substring(0, type.length - 2);
    }

    return type;
}

export function typeValue(type?:TypeLike) {
    if (!type) {
        return 'void';
    }

    if (type.type) {
        return type.type;
    }

    return 'ref:' + type.ref;
}

export function isBuiltInType(type?:TypeLike) {
    if (!type) {
        return true;
    }

    const name = typeName(type)
    if (['byte','void','date','any'].includes(name.toLowerCase())) {
        return true;
    }
    return isStringableType(name);
}

export function parseGeneric(type?:TypeLike) {
    if (!type) {
        return null;
    }

    const name = typeName(type)
    if (!name.includes('<') || !name.endsWith('>')) {
        return null;
    }

    const [genericName, argRaw] = name.split('<');
    const args = argRaw.substring(0, argRaw.length - 1);
    const genericArguments = args.split(',').map(a => a.trim());

    return {
        name: genericName,
        arguments: genericArguments
    };
}

export function isBuiltInGeneric(type?:TypeLike) {
    if (!type) {
        return false;
    }

    const generic = parseGeneric(type)

    return Boolean(generic && ['map', 'set'].includes(generic.name.toLowerCase()));
}


export function isStringableType(type:TypeOrString|undefined) {
    if (!type) {
        return false;
    }
    const typeText = typeof type === 'string' ? type : typeName(type);
    return [
        'string',
        'number',
        'boolean',
        'float',
        'integer',
        'decimal',
        'double',
        'long',
        'short',
        'bigint',
        'char'
    ].includes(typeText.toLowerCase());
}

export function getCompatibilityIssuesForTypes(a: TypeLike|undefined, b: TypeLike|undefined, aEntities:Entity[], bEntities:Entity[]):string[] {
    if (!a && !b) {
        return [];
    }

    if (!a) {
        a = {type: 'void'};
        if(b && b.type === 'void') {
            return [];
        }
    }

    if (!b) {
        b = {type: 'void'};
        if(a && a.type === 'void') {
            return [];
        }
    }

    if (isList(a) !== isList(b)) {
        return [`Types are not both lists`];
    }

    const aTypeName = typeName(a);
    const bTypeName = typeName(b);

    if (aTypeName === 'any' || bTypeName === 'any') {
        return [];
    }

    if (isBuiltInType(a) !== isBuiltInType(b)) {
        return [`Types are not compatible`];
    }

    if (aTypeName === 'boolean' && bTypeName !== 'boolean' ||
        bTypeName === 'boolean' && aTypeName !== 'boolean') {
        return [`Types are not compatible`];
    }

    if (isStringableType(aTypeName) &&
        isStringableType(bTypeName)) {
        return [];
    }

    if (isBuiltInType(a)) {
        if (aTypeName === bTypeName) {
            return [];
        }
        return [`Types are not compatible`];
    }

    if (isBuiltInGeneric(a) !== isBuiltInGeneric(b)) {
        return [`Types are not compatible`];
    }

    if (isBuiltInGeneric(a)) {
        const aGeneric = parseGeneric(a);
        const bGeneric = parseGeneric(b);
        if (!aGeneric || !bGeneric) {
            return [`Types are not compatible`];
        }
        if (aGeneric.name !== bGeneric.name) {
            return [`Types are not compatible`];
        }
        if (aGeneric.arguments.length !== bGeneric.arguments.length) {
            return [`Types are not compatible`];
        }
        for(let i = 0; i < aGeneric.arguments.length; i++) {
            const aArg = aGeneric.arguments[i];
            const bArg = bGeneric.arguments[i];
            const issues = getCompatibilityIssuesForTypes({type: aArg}, {type: bArg}, aEntities, bEntities);
            if (issues.length > 0) {
                return issues;
            }
        }
        return [];
    }

    let aEntity:Entity|undefined = aEntities.find(e => e.name === aTypeName);
    let bEntity:Entity|undefined = bEntities.find(e => e.name === bTypeName);

    if (!aEntity && !bEntity) {
        return [`${aTypeName} was not defined`];
    }

    if (!aEntity) {
        return [`${aTypeName} was not defined`];
    }

    if (!bEntity) {
        return [`${bTypeName} was not defined`];
    }

    return getSchemaEntityCompatibilityIssues(aEntity, bEntity, aEntities, bEntities);
}

export function isCompatibleTypes(a: TypeLike|undefined, b: TypeLike|undefined, aEntities:Entity[], bEntities:Entity[]) {
    return getCompatibilityIssuesForTypes(a,b,aEntities, bEntities).length === 0;
}

export function getSchemaEntityCompatibilityIssues(a:Entity, b:Entity, aEntities:Entity[], bEntities:Entity[]):string[] {
    if (isDTO(a) !== isDTO(b)) {
        return [`Enum and DTO are not compatible`];
    }

    if (isDTO(a) && isDTO(b)) {
        return getSchemaPropertiesCompatibilityIssues(a.properties, b.properties, aEntities, bEntities);
    }

    if (isEnum(a) && isEnum(b)) {
        return getSchemaEnumValuesCompatibilityIssues(a.values, b.values)
    }

    return [
        `Unknown entity types provided`
    ];
}

export function isSchemaEntityCompatible(a:Entity, b:Entity, aEntities:Entity[], bEntities:Entity[]) {
    return getSchemaEntityCompatibilityIssues(a,b,aEntities, bEntities).length === 0;
}

export function getSchemaEnumValuesCompatibilityIssues(a:string[], b:string[]):string[] {
    if (a.length != b.length) {
        return ['Mismatch in number of enum values'];
    }

    for(let i = 0; i < a.length; i++) {
        if (!b.some(bVal => bVal === a[i])) {
            return [`Missing enum value: ${a[i]}`];
        }
    }

    for(let i = 0; i < b.length; i++) {
        if (!a.some(aVal => aVal === b[i])) {
            return [`Missing enum value: ${b[i]}`];
        }
    }

    return [];
}

export function isSchemaEnumValuesCompatible(a:string[], b:string[]) {
    return getSchemaEnumValuesCompatibilityIssues(a,b).length === 0;
}

export function getSchemaPropertiesCompatibilityIssues(a:EntityProperties, b:EntityProperties, aEntities:Entity[], bEntities:Entity[]):string[] {
    const aProperties = Object.values(a);
    const bProperties = Object.values(b);

    if (aProperties.length !== bProperties.length) {
        return [
            `Property counts did not match`
        ];
    }

    const aEntries = Object.entries(a);
    for(let i = 0; i < aEntries.length; i++) {
        const [id, aProperty] = aEntries[i];

        const bProperty = b[id];
        if (!bProperty) {
            return [`Property not found: ${id}`];
        }

        const issues = getCompatibilityIssuesForTypes(aProperty, bProperty, aEntities, bEntities)

        if (issues.length > 0) {
            return issues.map(error => `${error} for property: ${id}`);
        }
    }

    return [];
}

export function isSchemaPropertiesCompatible(a:EntityProperties, b:EntityProperties, aEntities:Entity[], bEntities:Entity[]) {
    return getSchemaPropertiesCompatibilityIssues(a, b, aEntities, bEntities).length === 0;
}

export function hasEntityReference(object:any, entityName:string) {
    if (!object) {
        return false;
    }

    if (typeof object !== 'object' && !Array.isArray(object)) {
        return false;
    }

    const values = Array.isArray(object) ? object : Object.values(object);

    for(let i = 0 ; i < values.length; i++) {
        const value = values[i];
        if (value && value.ref === entityName) {
            return true;
        }

        if (value.ref) {
            const generic = parseGeneric(value);
            if (generic) {
                if (!isBuiltInGeneric(value) && generic.name === entityName) {
                    return true;
                }
                if (generic.arguments.some(a => a === entityName)) {
                    return true;
                }
            }
        }

        if (typeof value === 'object' || Array.isArray(value)) {
            if (hasEntityReference(value, entityName)) {
                return true;
            }
        }
    }

    return false;
}

export function isNumber(type: string) {
    return ['integer', 'number', 'double', 'float', 'bigint'].includes(type)
}

export function toRefValue(ref:string, value:string) {
    let out = value;
    if (out.startsWith(ref + '.')) {
        out = out.substring(ref.length + 1);
    }
    return out;
}

export function createDefaultValue(entity:Entity) {
    const out = {};
    if (!entity.properties) {
        return out;
    }
    Object.entries(entity.properties).forEach(([fieldId, field]: [string, EntityProperty]) => {
        const fullId = `${entity.name}.${fieldId}`;
        if (field.defaultValue !== undefined) {
            _.set(out, fullId, toDefaultValue(field));
        }
    })
    return out;
}

export function toDefaultValue(field: EntityProperty) {
    if (!field.defaultValue) {
        return undefined;
    }

    if (field.type === 'boolean') {
        return field.defaultValue === 'true';
    }

    if (field.type && isNumber(field.type)) {
        return parseFloat(field.defaultValue);
    }

    if (field.ref) {
        return toRefValue(field.ref, field.defaultValue);
    }

    if (field.defaultValue.startsWith('"') &&
        field.defaultValue.endsWith('"')) {
        return field.defaultValue.substring(1, field.defaultValue.length - 1);
    }

    if (field.defaultValue.startsWith("'") &&
        field.defaultValue.endsWith("'")) {
        return field.defaultValue.substring(1, field.defaultValue.length - 1);
    }

    return field.defaultValue;
}