export interface Concept {
    kind:     string;
    metadata: Metadata;
    spec:     ConceptSpec;
}

export interface Metadata {
    description?: string;
    name:         string;
    title?:       string;
}

export interface ConceptSpec {
    dependencies?: string[];
    schema:        { [key: string]: any };
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
    dependencies?: string[];
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
    environment: AssetReference;
    services:    DeploymentService[];
    target:      DeploymentTargetReference;
}

export interface DeploymentService {
    artifact:       DeploymentArtifact;
    configuration?: { [key: string]: any };
    dependencies?:  string[];
    name:           string;
}

export interface DeploymentArtifact {
    name:    string;
    type:    DeploymentArtifactType;
    version: string;
}

export enum DeploymentArtifactType {
    Docker = "docker",
    Managed = "managed",
}

export interface DeploymentTargetReference {
    kind: string;
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
