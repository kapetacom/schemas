import {Entity, EntityType} from "./types";
import {EntityDTO, EntityEnum, EntityProperties} from "./helpers";

export interface TypeLike {
    type?: string;
    ref?: string;
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
    return isStringableType(name) || "void" === name;
}


export function isStringableType(type:TypeOrString|undefined) {
    if (!type) {
        return false;
    }
    const typeText = typeof type === 'string' ? type : typeName(type);
    return ['string', 'number', 'float', 'integer', 'decimal', 'double'].indexOf(typeText.toLowerCase()) > -1;
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

        if (typeof value === 'object' || Array.isArray(value)) {
            if (hasEntityReference(value, entityName)) {
                return true;
            }
        }
    }

    return false;
}