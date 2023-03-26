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
}

export interface BlockDefinitionSpec {
    consumers?: Resource[];
    entities?:  EntityList;
    providers?: Resource[];
    target:     LanguageTargetReference;
}

export interface Resource {
    kind:     string;
    metadata: ResourceMetadata;
    spec:     ResourceSpec;
}

export interface ResourceMetadata {
    name: string;
}

export interface ResourceSpec {
    port: Port;
}

export interface Port {
    type: string;
}

export interface EntityList {
    source?: SourceCode;
    types?:  Entity[];
}

export interface SourceCode {
    type?:  string;
    value?: string;
}

export interface Entity {
    description?: string;
    name:         string;
    properties?:  { [key: string]: EntityProperty };
    type:         string;
    values?:      string[];
}

export interface EntityProperty {
    description?: string;
    type:         string;
}

export interface LanguageTargetReference {
    kind:     string;
    options?: { [key: string]: any };
}

export interface Concept {
    kind:     string;
    metadata: Metadata;
    spec:     ConceptSpec;
}

export interface ConceptSpec {
    dependencies?: Dependency[];
    schema:        { [key: string]: any };
}

export interface Dependency {
    path?: string;
    type?: string;
}

export interface Kind {
    kind:     string;
    metadata: Metadata;
    spec?:    { [key: string]: any };
}

export interface BlockTypeGroup {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeGroupSpec;
}

export interface BlockTypeGroupSpec {
    blocks:      BlockInstance[];
    connections: Connection[];
}

export interface BlockInstance {
    block:      AssetReference;
    dimensions: Dimensions;
    id:         string;
    name:       string;
}

export interface AssetReference {
    ref: string;
}

export interface Dimensions {
    height: number;
    left:   number;
    top:    number;
    width:  number;
}

export interface Connection {
    from:     Endpoint;
    mapping?: { [key: string]: any };
    to:       ToEndpoint;
}

export interface Endpoint {
    blockId:      string;
    resourceName: string;
}

export interface ToEndpoint {
    blockId:      string;
    port:         Port;
    resourceName: string;
}

export interface BlockType {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeSpec;
}

export interface BlockTypeSpec {
    dependencies?: Dependency[];
    schema:        { [key: string]: any };
}

export interface DeploymentTarget {
    kind:     string;
    metadata: Metadata;
    spec:     DeploymentTargetSpec;
}

export interface DeploymentTargetSpec {
    configuration?: { [key: string]: any };
    logo:           string;
    service:        RemoteService;
}

export interface RemoteService {
    apiVersion?: string;
    url?:        string;
}

export interface Deployment {
    kind:     string;
    metadata: Metadata;
    spec:     DeploymentSpec;
}

export interface DeploymentSpec {
    configuration?: { [key: string]: any };
    environment:    AssetReference;
    network:        DeploymentNetworkConnection[];
    plan:           AssetReference;
    services:       DeploymentServiceInstance[];
    target:         DeploymentTargetReference;
}

export interface DeploymentNetworkConnection {
    from?: DeploymentNetworkSource;
    to?:   DeploymentNetworkTarget;
    type?: DeploymentNetworkConnectionType;
}

export interface DeploymentNetworkSource {
    id:        string;
    resource?: string;
}

export interface DeploymentNetworkTarget {
    id:        string;
    port:      Port;
    resource?: string;
}

export enum DeploymentNetworkConnectionType {
    Resource = "resource",
    Service = "service",
}

export interface DeploymentServiceInstance {
    configuration?: { [key: string]: any };
    id:             string;
    image?:         string;
    kind:           string;
    ref:            string;
    title?:         string;
}

export interface DeploymentTargetReference {
    image: string;
    ref:   string;
}

export interface Environment {
    kind:     string;
    metadata: Metadata;
    spec:     EnvironmentSpec;
}

export interface EnvironmentSpec {
    deploymentTarget: DeploymentTargetConfiguration;
    plan:             PlanConfiguration;
    services?:        EnvironmentService[];
}

export interface DeploymentTargetConfiguration {
    configuration?: { [key: string]: any };
    ref:            string;
}

export interface PlanConfiguration {
    blocks:         BlockInstanceConfiguration[];
    configuration?: { [key: string]: any };
    ref:            string;
}

export interface BlockInstanceConfiguration {
    configuration?: { [key: string]: any };
    id:             string;
    services?:      BlockServiceConfiguration[];
}

export interface BlockServiceConfiguration {
    consumerId: string;
    port:       Port;
    serviceId:  string;
}

export interface EnvironmentService {
    configuration?: { [key: string]: any };
    id:             string;
    kind:           string;
    ref:            string;
    title?:         string;
}

export interface LanguageTarget {
    kind:     string;
    metadata: Metadata;
    spec?:    LanguageTargetSpec;
}

export interface LanguageTargetSpec {
    configuration?: { [key: string]: any };
}

export interface Plan {
    kind:     string;
    metadata: Metadata;
    spec:     PlanSpec;
}

export interface PlanSpec {
    blocks:      BlockInstance[];
    connections: Connection[];
}

export interface ResourceTypeExtension {
    kind?:     string;
    metadata?: Metadata;
    spec?:     ResourceTypeExtensionSpec;
}

export interface ResourceTypeExtensionSpec {
    configuration?: { [key: string]: any };
    schema?:        { [key: string]: any };
}

export interface ResourceTypeInternal {
    kind?:     string;
    metadata?: Metadata;
    spec?:     ResourceTypeInternalSpec;
}

export interface ResourceTypeInternalSpec {
    configuration?: { [key: string]: any };
}

export interface ResourceTypeOperator {
    kind?:     string;
    metadata?: Metadata;
    spec?:     ResourceTypeOperatorSpec;
}

export interface ResourceTypeOperatorSpec {
    color?:         ColorValue;
    configuration?: { [key: string]: any };
    icon?:          IconValue;
    local:          LocalInstance;
    ports:          Port[];
}

export interface ColorValue {
    type:  ColorType;
    value: string;
}

export enum ColorType {
    Hex = "hex",
}

export interface IconValue {
    type:  IconType;
    value: string;
}

export enum IconType {
    URL = "url",
}

export interface LocalInstance {
    credentials: LocalInstanceCredentials;
    env?:        { [key: string]: string };
    health?:     LocalInstanceHealth;
    image:       string;
    mounts?:     { [key: string]: string };
    ports:       { [key: string]: LocalInstancePort };
}

export interface LocalInstanceCredentials {
    password: string;
    username: string;
}

export interface LocalInstanceHealth {
    cmd:       string;
    interval?: number;
}

export interface LocalInstancePort {
    port?: number;
    type?: LocalInstancePortType;
}

export enum LocalInstancePortType {
    TCP = "tcp",
    UDP = "udp",
}
