import {Entity, EntityType} from "./types";
import {EntityDTO, EntityEnum, EntityProperties, EntityPropertyType} from "./helpers";


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

export function toStringName(type?:EntityPropertyType):string {
    if (!type) {
        return 'void';
    }

    if (typeof type !== 'string' && type.$ref) {
        type = type.$ref;
    }
    if (typeof type !== 'string') {
        throw new Error('Invalid type:' + type);
    }

    return type;
}

export function isList(type?:EntityPropertyType) {
    return toStringName(type).endsWith('[]')
}

/**
 * Reformats value to a valid entity name
 * @param type
 */
export function typeName(type?:EntityPropertyType) {
    type = toStringName(type)

    if (type.endsWith('[]')) {
        //Handle lists
        return type.substring(0, type.length - 2);
    }

    return type;
}

export function typeValue(type?:EntityPropertyType) {
    if (!type) {
        return 'void';
    }

    if (typeof type === 'string') {
        return type;
    }

    return '$ref:' + type.$ref;
}

export function isBuiltInType(type?:EntityPropertyType) {
    if (!type) {
        return true;
    }

    return typeof type === 'string';
}


export function isStringableType(type:EntityPropertyType) {
    if (typeof type !== 'string') {
        return false;
    }

    return ['string','number','float','integer','decimal','double'].indexOf(type) > -1;
}
export function getCompatibilityIssuesForTypes(a: EntityPropertyType|undefined, b: EntityPropertyType|undefined, aEntities:Entity[], bEntities:Entity[]):string[] {
    if (!a && !b) {
        return [];
    }

    if (!a) {
        a = 'void';
    }

    if (!b) {
        b = 'void';
    }

    if (isList(a) !== isList(b)) {
        return [`Types are not both lists`];
    }

    const aTypeName = typeName(a);
    const bTypeName = typeName(b);

    if (isBuiltInType(a) !== isBuiltInType(b)) {
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

export function isCompatibleTypes(a: EntityPropertyType|undefined, b: EntityPropertyType|undefined, aEntities:Entity[], bEntities:Entity[]) {
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

        const issues = getCompatibilityIssuesForTypes(aProperty.type, bProperty.type, aEntities, bEntities)

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
        if (value && value.$ref === entityName) {
            return true;
        }

        if (typeof value === 'object' || Array.isArray(value)) {
            if (hasEntityReference(value, entityName)) {
                return true;
            }
        }
    }

    return false;
}