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
    type:     string;
    value:    string;
    version?: string;
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

/**
 * An executable block provides a type of block that does not get deployed as a service.
 * This is typically a command line tool, a desktop block or a mobile app.
 * What's also common for executable blocks is that they do not have direct access to other
 * service blocks, and can't rely on other services or software being available at runtime.
 * They are also typically distributed as a downloadable artifact - like a setup file or a
 * package.
 */
export interface BlockTypeExecutable {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeExecutableSpec;
    [property: string]: any;
}

export interface BlockTypeExecutableSpec {
    configuration?: ConfigurationSchema;
    dependencies?:  Dependency[];
    icon?:          IconValue;
    schema:         { [key: string]: any };
    versioning?:    Versioning[];
}

export interface ConfigurationSchema {
    defaultValue?: { [key: string]: any };
    schema:        { [key: string]: any };
    uiSchema?:     { [key: string]: { [key: string]: any } };
    [property: string]: any;
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

/**
 * A block type operator provides a type of block that does not require code to be written.
 * This can be anywhere from a HTTP gateway to a database block.
 * Note that most databases can more easily be implemented as a resource operator.
 * Blocks are good for representing more complex scenarios where there are connections
 * between this and other services.
 * Message queues, for example, are a good example of something that could be an operator
 * block.
 */
export interface BlockTypeOperator {
    kind:     string;
    metadata: Metadata;
    spec:     BlockTypeOperatorSpec;
    [property: string]: any;
}

export interface BlockTypeOperatorSpec {
    configuration?: ConfigurationSchema;
    dependencies?:  Dependency[];
    icon?:          IconValue;
    local:          LocalInstance;
    /**
     * Ports that the operator will expose.
     * The primary port is the one that will be used to access the operator.
     */
    ports:  OperatorPorts;
    schema: { [key: string]: any };
    /**
     * Determines the type of operator.
     * "logical" means the operator is a logical component and won't necessarily actually create
     * a service.
     * "instance" means the operator is an instance and will create a service and be connectable
     * to one or more operators.
     */
    type:        BlockOperatorType;
    versioning?: Versioning[];
}

export interface LocalInstance {
    credentials?: { [key: string]: any };
    env?:         { [key: string]: string };
    health?:      LocalInstanceHealth;
    image:        string;
    mounts?:      { [key: string]: string };
    ports:        { [key: string]: LocalInstancePort };
    singleton?:   boolean;
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

/**
 * Ports that the operator will expose.
 * The primary port is the one that will be used to access the operator.
 */
export interface OperatorPorts {
    primary: Port;
}

/**
 * Determines the type of operator.
 * "logical" means the operator is a logical component and won't necessarily actually create
 * a service.
 * "instance" means the operator is an instance and will create a service and be connectable
 * to one or more operators.
 */
export enum BlockOperatorType {
    Instance = "instance",
    Logical = "logical",
}

/**
 * The standard block type which is used to define a block that can be deployed as a
 * service.
 * The expected output of any such block is a docker image that can be deployed to a
 * kubernetes cluster.
 */
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
    blockDefinition?: Kind;
    configuration?:   { [key: string]: any };
    fallbackDNS:      string;
    id:               string;
    image?:           string;
    kind:             string;
    ref:              string;
    title?:           string;
    type:             DeploymentServiceInstanceType;
    [property: string]: any;
}

export interface Kind {
    kind:     string;
    metadata: Metadata;
    spec?:    { [key: string]: any };
    [property: string]: any;
}

export enum DeploymentServiceInstanceType {
    Operator = "operator",
    Service = "service",
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
    icon?: IconValue;
    /**
     * if type is "docker" or empty - Local development container using a fixed docker image.
     * User code will be mounted into the container.
     * if type is "dockerfile" - Local development container using a Dockerfile. User code will
     * be built into the container.
     */
    local:       LocalDevContainer;
    schema?:     { [key: string]: any };
    versioning?: Versioning[];
}

/**
 * if type is "docker" or empty - Local development container using a fixed docker image.
 * User code will be mounted into the container.
 * if type is "dockerfile" - Local development container using a Dockerfile. User code will
 * be built into the container.
 */
export interface LocalDevContainer {
    Env?:         string[];
    handlers?:    LocalDevContainerHandlers;
    healthcheck?: string;
    HostConfig?:  { [key: string]: any };
    image?:       string;
    Labels?:      { [key: string]: any };
    options?:     { [key: string]: any };
    type?:        string;
    userHome?:    string;
    workingDir?:  string;
    file?:        string;
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
    local?:         LocalInstance;
    ports:          Port[];
    schema?:        { [key: string]: any };
    versioning?:    Versioning[];
    [property: string]: any;
}
