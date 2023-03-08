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
    kind:      string;
    metadata?: ResourceMetadata;
    spec?:     { [key: string]: any };
}

export interface ResourceMetadata {
    name?: string;
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
    to:       Endpoint;
}

export interface Endpoint {
    blockId:      string;
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
    configuration: { [key: string]: any };
    image:         string;
}

export interface Deployment {
    kind:     string;
    metadata: Metadata;
    spec:     DeploymentSpec;
}

export interface DeploymentSpec {
    configuration?: { [key: string]: any };
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
    portType:  string;
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
    configuration: { [key: string]: any };
    id:            string;
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
    configuration?: { [key: string]: any };
}
