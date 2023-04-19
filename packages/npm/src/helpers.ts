import {
    BlockDefinition, BlockInstance,
    ConfigurationSchema,
    EntityProperty,
    EntityType,
    Kind,
    Port,
    Resource
} from "./types";

export type EntityProperties = { [key: string]: EntityProperty };

export interface EntityDTO {
    type: EntityType.Dto;
    name: string;
    properties: EntityProperties;
    description?: string;
}

export interface EntityEnum {
    type: EntityType.Enum;
    name: string;
    values: string[];
    description?: string;
}

export interface BlockResource {
    block: BlockDefinition;
    resource: Resource;
}

export interface BlockInstanceResource extends BlockResource{
    instance: BlockInstance;
}

export interface ResourceType extends Kind {
    spec: ResourceTypeSpec;
}

export interface ResourceTypeSpec {
    configuration?: ConfigurationSchema;
    ports: Port[];
}