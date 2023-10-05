export interface BlockDefinition {
    kind:     string;
    metadata: Metadata;
    spec:     BlockDefinitionSpec;
}

export interface Metadata {
    description?: string;
    name:         string;
    title?:       string;
    visibility?:  string;
    [property: string]: any;
}

export interface BlockDefinitionSpec {
    configuration?: EntityList;
    consumers?:     Resource[];
    entities?:      EntityList;
    icon?:          IconValue;
    providers?:     Resource[];
    target?:        LanguageTargetReference;
}

export interface EntityList {
    source?: SourceCode;
    types?:  Entity[];
    [property: string]: any;
}

export interface SourceCode {
    type:  string;
    value: string;
    [property: string]: any;
}

export interface Entity {
    description?: string;
    name:         string;
    properties?:  { [key: string]: EntityProperty };
    type:         EntityType;
    values?:      string[];
    [property: string]: any;
}

export interface EntityProperty {
    defaultValue?: string;
    description?:  string;
    format?:       string;
    global?:       boolean;
    ref?:          string;
    required?:     boolean;
    secret?:       boolean;
    type?:         string;
    [property: string]: any;
}

export enum EntityType {
    Dto = "dto",
    Enum = "enum",
    Native = "native",
}

export interface Resource {
    kind:     string;
    metadata: ResourceMetadata;
    spec:     { [key: string]: any };
    [property: string]: any;
}

export interface ResourceMetadata {
    name: string;
    [property: string]: any;
}

export interface IconValue {
    type:  IconType;
    value: string;
}

export enum IconType {
    Fontawesome5 = "fontawesome5",
    URL = "url",
}

export interface LanguageTargetReference {
    kind:     string;
    options?: { [key: string]: any };
    [property: string]: any;
}

export interface Concept {
    kind:     string;
    metadata: Metadata;
    spec:     ConceptSpec;
}

export interface ConceptSpec {
    dependencies?: Dependency[];
    schema:        { [key: string]: any };
    [property: string]: any;
}

export interface Dependency {
    path?: string;
    type?: string;
    [property: string]: any;
}

export interface Kind {
    kind:     string;
    metadata: Metadata;
    spec?:    { [key: string]: any };
    [property: string]: any;
}

export interface BlockTypeGroup {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeGroupSpec;
    [property: string]: any;
}

export interface BlockTypeGroupSpec {
    blocks:         BlockInstance[];
    configuration?: EntityList;
    connections:    Connection[];
    [property: string]: any;
}

export interface BlockInstance {
    block:                 AssetReference;
    defaultConfiguration?: { [key: string]: any };
    dimensions:            Dimensions;
    id:                    string;
    name:                  string;
    [property: string]: any;
}

export interface AssetReference {
    ref: string;
    [property: string]: any;
}

export interface Dimensions {
    height: number;
    left:   number;
    top:    number;
    width:  number;
    [property: string]: any;
}

export interface Connection {
    consumer: Endpoint;
    mapping?: { [key: string]: any };
    port?:    Port;
    provider: Endpoint;
    [property: string]: any;
}

export interface Endpoint {
    blockId:      string;
    resourceName: string;
    [property: string]: any;
}

export interface Port {
    type: string;
    [property: string]: any;
}

export interface BlockTypeOperator {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeOperatorSpec;
    [property: string]: any;
}

export interface BlockTypeOperatorSpec {
    dependencies?: Dependency[];
    icon?:         IconValue;
    local:         LocalInstance;
    schema:        { [key: string]: any };
    versioning?:   Versioning[];
    [property: string]: any;
}

export interface LocalInstance {
    credentials?: LocalInstanceCredentials;
    env?:         { [key: string]: string };
    health?:      LocalInstanceHealth;
    image:        string;
    mounts?:      { [key: string]: string };
    ports:        { [key: string]: LocalInstancePort };
    [property: string]: any;
}

export interface LocalInstanceCredentials {
    password: string;
    username: string;
    [property: string]: any;
}

export interface LocalInstanceHealth {
    cmd:       string;
    interval?: number;
    [property: string]: any;
}

export interface LocalInstancePort {
    port?: number;
    type?: LocalInstancePortType;
    [property: string]: any;
}

export enum LocalInstancePortType {
    TCP = "tcp",
    UDP = "udp",
}

export interface Versioning {
    increment: VersioningIncrementType;
    on:        VersioningChangeType[];
    paths:     string[];
    [property: string]: any;
}

export enum VersioningIncrementType {
    Major = "major",
    Minor = "minor",
    Patch = "patch",
}

export enum VersioningChangeType {
    Create = "create",
    Delete = "delete",
    Update = "update",
}

export interface BlockType {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeSpec;
    [property: string]: any;
}

export interface BlockTypeSpec {
    defaultPort?:  Port;
    dependencies?: Dependency[];
    icon?:         IconValue;
    schema:        { [key: string]: any };
    versioning?:   Versioning[];
    [property: string]: any;
}

export interface DeploymentTarget {
    kind:     string;
    metadata: Metadata;
    spec:     DeploymentTargetSpec;
    [property: string]: any;
}

export interface DeploymentTargetSpec {
    configuration?: ConfigurationSchema;
    icon?:          IconValue;
    operators?:     { [key: string]: DeploymentTargetOperator };
    service:        RemoteService;
    versioning?:    Versioning[];
    [property: string]: any;
}

export interface ConfigurationSchema {
    defaultValue?: { [key: string]: any };
    schema:        { [key: string]: any };
    uiSchema?:     { [key: string]: { [key: string]: any } };
    [property: string]: any;
}

export interface DeploymentTargetOperator {
    color?:         ColorValue;
    configuration?: ConfigurationSchema;
    description?:   string;
    icon?:          IconValue;
    link?:          URLValue;
    title:          string;
    [property: string]: any;
}

export interface ColorValue {
    type:  ColorType;
    value: string;
    [property: string]: any;
}

export enum ColorType {
    Hex = "hex",
}

export interface URLValue {
    type:  LinkType;
    value: string;
    [property: string]: any;
}

export enum LinkType {
    URL = "url",
}

export interface RemoteService {
    apiVersion?: string;
    url?:        string;
    [property: string]: any;
}

export interface Deployment {
    kind:     string;
    metadata: DeploymentMetadata;
    spec:     DeploymentSpec;
    [property: string]: any;
}

export interface DeploymentMetadata {
    assetId?:     string;
    description?: string;
    name:         string;
    title?:       string;
    visibility?:  string;
    [property: string]: any;
}

export interface DeploymentSpec {
    configuration?: { [key: string]: any };
    environment:    AssetReference;
    insights:       InsightsSettings;
    network:        DeploymentNetworkConnection[];
    plan:           AssetReference;
    services:       DeploymentServiceInstance[];
    target:         DeploymentTargetReference;
    [property: string]: any;
}

export interface InsightsSettings {
    domain: string;
    [property: string]: any;
}

export interface DeploymentNetworkConnection {
    consumer: DeploymentNetworkEndpoint;
    port:     Port;
    provider: DeploymentNetworkEndpoint;
    type:     DeploymentNetworkConnectionType;
    [property: string]: any;
}

export interface DeploymentNetworkEndpoint {
    id:        string;
    resource?: string;
    [property: string]: any;
}

export enum DeploymentNetworkConnectionType {
    Resource = "resource",
    Service = "service",
}

export interface DeploymentServiceInstance {
    configuration?: { [key: string]: any };
    fallbackDNS:    string;
    id:             string;
    image?:         string;
    kind:           string;
    ref:            string;
    title?:         string;
    [property: string]: any;
}

export interface DeploymentTargetReference {
    image: string;
    ref:   string;
    [property: string]: any;
}

export interface Environment {
    kind:     string;
    metadata: Metadata;
    spec:     EnvironmentSpec;
    [property: string]: any;
}

export interface EnvironmentSpec {
    deploymentTarget: DeploymentTargetConfiguration;
    plan:             PlanConfiguration;
    services?:        EnvironmentService[];
    [property: string]: any;
}

export interface DeploymentTargetConfiguration {
    configuration?: { [key: string]: any };
    ref:            string;
    [property: string]: any;
}

export interface PlanConfiguration {
    blocks:         BlockInstanceConfiguration[];
    configuration?: { [key: string]: any };
    ref:            string;
    [property: string]: any;
}

export interface BlockInstanceConfiguration {
    configuration?: { [key: string]: any };
    id:             string;
    services?:      BlockServiceConfiguration[];
    [property: string]: any;
}

export interface BlockServiceConfiguration {
    consumerId: string;
    port:       Port;
    serviceId:  string;
    [property: string]: any;
}

export interface EnvironmentService {
    configuration?: { [key: string]: any };
    id:             string;
    kind:           string;
    ref:            string;
    title?:         string;
    [property: string]: any;
}

export interface LanguageTarget {
    kind:     string;
    metadata: Metadata;
    spec?:    LanguageTargetSpec;
}

export interface LanguageTargetSpec {
    icon?:       IconValue;
    local:       LocalDevContainer;
    schema?:     { [key: string]: any };
    versioning?: Versioning[];
}

export interface LocalDevContainer {
    handlers?:    LocalDevContainerHandlers;
    healthcheck?: string;
    image:        string;
    options?:     { [key: string]: any };
    userHome?:    string;
    workingDir?:  string;
}

export interface LocalDevContainerHandlers {
    onCreate?: string;
}

export interface Plan {
    kind:     string;
    metadata: Metadata;
    spec:     PlanSpec;
    [property: string]: any;
}

export interface PlanSpec {
    blocks:                BlockInstance[];
    configuration?:        EntityList;
    connections:           Connection[];
    defaultConfiguration?: { [key: string]: any };
    [property: string]: any;
}

export interface ResourceTypeExtension {
    kind:     string;
    metadata: Metadata;
    spec:     ResourceTypeExtensionSpec;
    [property: string]: any;
}

export interface ResourceTypeExtensionSpec {
    configuration?: ConfigurationSchema;
    icon?:          IconValue;
    ports:          Port[];
    schema:         { [key: string]: any };
    versioning?:    Versioning[];
    [property: string]: any;
}

export interface ResourceTypeInternal {
    kind:     string;
    metadata: Metadata;
    spec:     ResourceTypeInternalSpec;
    [property: string]: any;
}

export interface ResourceTypeInternalSpec {
    configuration?: ConfigurationSchema;
    icon?:          IconValue;
    ports:          Port[];
    schema?:        { [key: string]: any };
    versioning?:    Versioning[];
    [property: string]: any;
}

export interface ResourceTypeOperator {
    kind:     string;
    metadata: Metadata;
    spec:     ResourceTypeOperatorSpec;
    [property: string]: any;
}

export interface ResourceTypeOperatorSpec {
    color?:         ColorValue;
    configuration?: ConfigurationSchema;
    icon?:          IconValue;
    local:          LocalInstance;
    ports:          Port[];
    schema?:        { [key: string]: any };
    versioning?:    Versioning[];
    [property: string]: any;
}
