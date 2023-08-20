package model

type BlockDefinition struct {
	Kind     string              `json:"kind" yaml:"kind"`
	Metadata Metadata            `json:"metadata" yaml:"metadata"`
	Spec     BlockDefinitionSpec `json:"spec" yaml:"spec"`
}

type Metadata struct {
	Description *string `json:"description,omitempty" yaml:"description,omitempty"`
	Name        string  `json:"name" yaml:"name"`
	Title       *string `json:"title,omitempty" yaml:"title,omitempty"`
	Visibility  *string `json:"visibility,omitempty" yaml:"visibility,omitempty"`
}

type BlockDefinitionSpec struct {
	Configuration *EntityList             `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Consumers     []ConsumerElement       `json:"consumers,omitempty" yaml:"consumers,omitempty"`
	Entities      *EntityList             `json:"entities,omitempty" yaml:"entities,omitempty"`
	Icon          *IconValue              `json:"icon,omitempty" yaml:"icon,omitempty"`
	Providers     []ConsumerElement       `json:"providers,omitempty" yaml:"providers,omitempty"`
	Target        LanguageTargetReference `json:"target" yaml:"target"`
}

type EntityList struct {
	Source *SourceCode `json:"source,omitempty" yaml:"source,omitempty"`
	Types  []Entity    `json:"types,omitempty" yaml:"types,omitempty"`
}

type SourceCode struct {
	Type  string `json:"type" yaml:"type"`
	Value string `json:"value" yaml:"value"`
}

type Entity struct {
	Description *string                   `json:"description,omitempty" yaml:"description,omitempty"`
	Name        string                    `json:"name" yaml:"name"`
	Properties  map[string]EntityProperty `json:"properties,omitempty" yaml:"properties,omitempty"`
	Type        EntityType                `json:"type" yaml:"type"`
	Values      []string                  `json:"values,omitempty" yaml:"values,omitempty"`
}

type EntityProperty struct {
	DefaultValue *string `json:"defaultValue,omitempty" yaml:"defaultValue,omitempty"`
	Description  *string `json:"description,omitempty" yaml:"description,omitempty"`
	Format       *string `json:"format,omitempty" yaml:"format,omitempty"`
	Ref          *string `json:"ref,omitempty" yaml:"ref,omitempty"`
	Required     *bool   `json:"required,omitempty" yaml:"required,omitempty"`
	Secret       *bool   `json:"secret,omitempty" yaml:"secret,omitempty"`
	Type         *string `json:"type,omitempty" yaml:"type,omitempty"`
}

type ConsumerElement struct {
	Kind     string                 `json:"kind" yaml:"kind"`
	Metadata ResourceMetadata       `json:"metadata" yaml:"metadata"`
	Spec     map[string]interface{} `json:"spec" yaml:"spec"`
}

type ResourceMetadata struct {
	Name string `json:"name" yaml:"name"`
}

type IconValue struct {
	Type  IconType `json:"type" yaml:"type"`
	Value string   `json:"value" yaml:"value"`
}

type LanguageTargetReference struct {
	Kind    string                 `json:"kind" yaml:"kind"`
	Options map[string]interface{} `json:"options,omitempty" yaml:"options,omitempty"`
}

type Concept struct {
	Kind     ConceptKind `json:"kind" yaml:"kind"`
	Metadata Metadata    `json:"metadata" yaml:"metadata"`
	Spec     ConceptSpec `json:"spec" yaml:"spec"`
}

type ConceptSpec struct {
	Dependencies []Dependency           `json:"dependencies,omitempty" yaml:"dependencies,omitempty"`
	Schema       map[string]interface{} `json:"schema" yaml:"schema"`
}

type Dependency struct {
	Path *string `json:"path,omitempty" yaml:"path,omitempty"`
	Type *string `json:"type,omitempty" yaml:"type,omitempty"`
}

type Kind struct {
	Kind     string                 `json:"kind" yaml:"kind"`
	Metadata Metadata               `json:"metadata" yaml:"metadata"`
	Spec     map[string]interface{} `json:"spec,omitempty" yaml:"spec,omitempty"`
}

type BlockTypeGroup struct {
	Kind     BlockTypeGroupKind `json:"kind" yaml:"kind"`
	Metadata Metadata           `json:"metadata" yaml:"metadata"`
	Spec     BlockTypeGroupSpec `json:"spec" yaml:"spec"`
}

type BlockTypeGroupSpec struct {
	Blocks        []BlockInstance `json:"blocks" yaml:"blocks"`
	Configuration *EntityList     `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Connections   []Connection    `json:"connections" yaml:"connections"`
}

type BlockInstance struct {
	Block      AssetReference `json:"block" yaml:"block"`
	Dimensions Dimensions     `json:"dimensions" yaml:"dimensions"`
	Id         string         `json:"id" yaml:"id"`
	Name       string         `json:"name" yaml:"name"`
}

type AssetReference struct {
	Ref string `json:"ref" yaml:"ref"`
}

type Dimensions struct {
	Height float64 `json:"height" yaml:"height"`
	Left   float64 `json:"left" yaml:"left"`
	Top    float64 `json:"top" yaml:"top"`
	Width  float64 `json:"width" yaml:"width"`
}

type Connection struct {
	Consumer Endpoint               `json:"consumer" yaml:"consumer"`
	Mapping  map[string]interface{} `json:"mapping,omitempty" yaml:"mapping,omitempty"`
	Port     *Port                  `json:"port,omitempty" yaml:"port,omitempty"`
	Provider Endpoint               `json:"provider" yaml:"provider"`
}

type Endpoint struct {
	BlockId      string `json:"blockId" yaml:"blockId"`
	ResourceName string `json:"resourceName" yaml:"resourceName"`
}

type Port struct {
	Type string `json:"type" yaml:"type"`
}

type BlockTypeOperator struct {
	Kind     BlockTypeOperatorKind `json:"kind" yaml:"kind"`
	Metadata Metadata              `json:"metadata" yaml:"metadata"`
	Spec     BlockTypeOperatorSpec `json:"spec" yaml:"spec"`
}

type BlockTypeOperatorSpec struct {
	Dependencies []Dependency           `json:"dependencies,omitempty" yaml:"dependencies,omitempty"`
	Icon         *IconValue             `json:"icon,omitempty" yaml:"icon,omitempty"`
	Local        LocalInstance          `json:"local" yaml:"local"`
	Schema       map[string]interface{} `json:"schema" yaml:"schema"`
	Versioning   []Versioning           `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type LocalInstance struct {
	Credentials *LocalInstanceCredentials    `json:"credentials,omitempty" yaml:"credentials,omitempty"`
	Env         map[string]string            `json:"env,omitempty" yaml:"env,omitempty"`
	Health      *LocalInstanceHealth         `json:"health,omitempty" yaml:"health,omitempty"`
	Image       string                       `json:"image" yaml:"image"`
	Mounts      map[string]string            `json:"mounts,omitempty" yaml:"mounts,omitempty"`
	Ports       map[string]LocalInstancePort `json:"ports" yaml:"ports"`
}

type LocalInstanceCredentials struct {
	Password string `json:"password" yaml:"password"`
	Username string `json:"username" yaml:"username"`
}

type LocalInstanceHealth struct {
	Cmd      string   `json:"cmd" yaml:"cmd"`
	Interval *float64 `json:"interval,omitempty" yaml:"interval,omitempty"`
}

type LocalInstancePort struct {
	Port *float64               `json:"port,omitempty" yaml:"port,omitempty"`
	Type *LocalInstancePortType `json:"type,omitempty" yaml:"type,omitempty"`
}

type Versioning struct {
	Increment VersioningIncrementType `json:"increment" yaml:"increment"`
	On        []VersioningChangeType  `json:"on" yaml:"on"`
	Paths     []string                `json:"paths" yaml:"paths"`
}

type BlockType struct {
	Kind     BlockTypeKind `json:"kind" yaml:"kind"`
	Metadata Metadata      `json:"metadata" yaml:"metadata"`
	Spec     BlockTypeSpec `json:"spec" yaml:"spec"`
}

type BlockTypeSpec struct {
	Dependencies []Dependency           `json:"dependencies,omitempty" yaml:"dependencies,omitempty"`
	Icon         *IconValue             `json:"icon,omitempty" yaml:"icon,omitempty"`
	Schema       map[string]interface{} `json:"schema" yaml:"schema"`
	Versioning   []Versioning           `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type DeploymentTarget struct {
	Kind     DeploymentTargetKind `json:"kind" yaml:"kind"`
	Metadata Metadata             `json:"metadata" yaml:"metadata"`
	Spec     DeploymentTargetSpec `json:"spec" yaml:"spec"`
}

type DeploymentTargetSpec struct {
	Configuration *ConfigurationSchema                `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Icon          *IconValue                          `json:"icon,omitempty" yaml:"icon,omitempty"`
	Operators     map[string]DeploymentTargetOperator `json:"operators,omitempty" yaml:"operators,omitempty"`
	Service       RemoteService                       `json:"service" yaml:"service"`
	Versioning    []Versioning                        `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type ConfigurationSchema struct {
	Schema   map[string]interface{}            `json:"schema" yaml:"schema"`
	UISchema map[string]map[string]interface{} `json:"uiSchema,omitempty" yaml:"uiSchema,omitempty"`
}

type DeploymentTargetOperator struct {
	Color         *ColorValue          `json:"color,omitempty" yaml:"color,omitempty"`
	Configuration *ConfigurationSchema `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Description   *string              `json:"description,omitempty" yaml:"description,omitempty"`
	Icon          *IconValue           `json:"icon,omitempty" yaml:"icon,omitempty"`
	Link          *URLValue            `json:"link,omitempty" yaml:"link,omitempty"`
	Title         string               `json:"title" yaml:"title"`
}

type ColorValue struct {
	Type  ColorType `json:"type" yaml:"type"`
	Value string    `json:"value" yaml:"value"`
}

type URLValue struct {
	Type  LinkType `json:"type" yaml:"type"`
	Value string   `json:"value" yaml:"value"`
}

type RemoteService struct {
	APIVersion *string `json:"apiVersion,omitempty" yaml:"apiVersion,omitempty"`
	URL        *string `json:"url,omitempty" yaml:"url,omitempty"`
}

type Deployment struct {
	Kind     DeploymentKind     `json:"kind" yaml:"kind"`
	Metadata DeploymentMetadata `json:"metadata" yaml:"metadata"`
	Spec     DeploymentSpec     `json:"spec" yaml:"spec"`
}

type DeploymentMetadata struct {
	AssetId     *string `json:"assetId,omitempty" yaml:"assetId,omitempty"`
	Description *string `json:"description,omitempty" yaml:"description,omitempty"`
	Name        string  `json:"name" yaml:"name"`
	Title       *string `json:"title,omitempty" yaml:"title,omitempty"`
	Visibility  *string `json:"visibility,omitempty" yaml:"visibility,omitempty"`
}

type DeploymentSpec struct {
	Configuration map[string]interface{}        `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Environment   AssetReference                `json:"environment" yaml:"environment"`
	Insights      InsightsSettings              `json:"insights" yaml:"insights"`
	Network       []DeploymentNetworkConnection `json:"network" yaml:"network"`
	Plan          AssetReference                `json:"plan" yaml:"plan"`
	Services      []DeploymentServiceInstance   `json:"services" yaml:"services"`
	Target        DeploymentTargetReference     `json:"target" yaml:"target"`
}

type InsightsSettings struct {
	Domain string `json:"domain" yaml:"domain"`
}

type DeploymentNetworkConnection struct {
	Consumer DeploymentNetworkEndpoint       `json:"consumer" yaml:"consumer"`
	Port     Port                            `json:"port" yaml:"port"`
	Provider DeploymentNetworkEndpoint       `json:"provider" yaml:"provider"`
	Type     DeploymentNetworkConnectionType `json:"type" yaml:"type"`
}

type DeploymentNetworkEndpoint struct {
	Id       string  `json:"id" yaml:"id"`
	Resource *string `json:"resource,omitempty" yaml:"resource,omitempty"`
}

type DeploymentServiceInstance struct {
	Configuration map[string]interface{} `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	FallbackDNS   string                 `json:"fallbackDNS" yaml:"fallbackDNS"`
	Id            string                 `json:"id" yaml:"id"`
	Image         *string                `json:"image,omitempty" yaml:"image,omitempty"`
	Kind          string                 `json:"kind" yaml:"kind"`
	Ref           string                 `json:"ref" yaml:"ref"`
	Title         *string                `json:"title,omitempty" yaml:"title,omitempty"`
}

type DeploymentTargetReference struct {
	Image string `json:"image" yaml:"image"`
	Ref   string `json:"ref" yaml:"ref"`
}

type Environment struct {
	Kind     EnvironmentKind `json:"kind" yaml:"kind"`
	Metadata Metadata        `json:"metadata" yaml:"metadata"`
	Spec     EnvironmentSpec `json:"spec" yaml:"spec"`
}

type EnvironmentSpec struct {
	DeploymentTarget DeploymentTargetConfiguration `json:"deploymentTarget" yaml:"deploymentTarget"`
	Plan             PlanConfiguration             `json:"plan" yaml:"plan"`
	Services         []EnvironmentService          `json:"services,omitempty" yaml:"services,omitempty"`
}

type DeploymentTargetConfiguration struct {
	Configuration map[string]interface{} `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Ref           string                 `json:"ref" yaml:"ref"`
}

type PlanConfiguration struct {
	Blocks        []BlockInstanceConfiguration `json:"blocks" yaml:"blocks"`
	Configuration map[string]interface{}       `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Ref           string                       `json:"ref" yaml:"ref"`
}

type BlockInstanceConfiguration struct {
	Configuration map[string]interface{}      `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Id            string                      `json:"id" yaml:"id"`
	Services      []BlockServiceConfiguration `json:"services,omitempty" yaml:"services,omitempty"`
}

type BlockServiceConfiguration struct {
	ConsumerId string `json:"consumerId" yaml:"consumerId"`
	Port       Port   `json:"port" yaml:"port"`
	ServiceId  string `json:"serviceId" yaml:"serviceId"`
}

type EnvironmentService struct {
	Configuration map[string]interface{} `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Id            string                 `json:"id" yaml:"id"`
	Kind          string                 `json:"kind" yaml:"kind"`
	Ref           string                 `json:"ref" yaml:"ref"`
	Title         *string                `json:"title,omitempty" yaml:"title,omitempty"`
}

type LanguageTarget struct {
	Kind     LanguageTargetKind  `json:"kind" yaml:"kind"`
	Metadata Metadata            `json:"metadata" yaml:"metadata"`
	Spec     *LanguageTargetSpec `json:"spec,omitempty" yaml:"spec,omitempty"`
}

type LanguageTargetSpec struct {
	Icon       *IconValue             `json:"icon,omitempty" yaml:"icon,omitempty"`
	Local      LocalDevContainer      `json:"local" yaml:"local"`
	Schema     map[string]interface{} `json:"schema,omitempty" yaml:"schema,omitempty"`
	Versioning []Versioning           `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type LocalDevContainer struct {
	Handlers    *LocalDevContainerHandlers `json:"handlers,omitempty" yaml:"handlers,omitempty"`
	Healthcheck *string                    `json:"healthcheck,omitempty" yaml:"healthcheck,omitempty"`
	Image       string                     `json:"image" yaml:"image"`
	Options     map[string]interface{}     `json:"options,omitempty" yaml:"options,omitempty"`
	UserHome    *string                    `json:"userHome,omitempty" yaml:"userHome,omitempty"`
	WorkingDir  *string                    `json:"workingDir,omitempty" yaml:"workingDir,omitempty"`
}

type LocalDevContainerHandlers struct {
	OnCreate *string `json:"onCreate,omitempty" yaml:"onCreate,omitempty"`
}

type Plan struct {
	Kind     PlanKind `json:"kind" yaml:"kind"`
	Metadata Metadata `json:"metadata" yaml:"metadata"`
	Spec     PlanSpec `json:"spec" yaml:"spec"`
}

type PlanSpec struct {
	Blocks        []BlockInstance `json:"blocks" yaml:"blocks"`
	Configuration *EntityList     `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Connections   []Connection    `json:"connections" yaml:"connections"`
}

type ResourceTypeExtension struct {
	Kind     ResourceTypeExtensionKind `json:"kind" yaml:"kind"`
	Metadata Metadata                  `json:"metadata" yaml:"metadata"`
	Spec     ResourceTypeExtensionSpec `json:"spec" yaml:"spec"`
}

type ResourceTypeExtensionSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Icon          *IconValue             `json:"icon,omitempty" yaml:"icon,omitempty"`
	Ports         []Port                 `json:"ports" yaml:"ports"`
	Schema        map[string]interface{} `json:"schema" yaml:"schema"`
	Versioning    []Versioning           `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type ResourceTypeInternal struct {
	Kind     ResourceTypeInternalKind `json:"kind" yaml:"kind"`
	Metadata Metadata                 `json:"metadata" yaml:"metadata"`
	Spec     ResourceTypeInternalSpec `json:"spec" yaml:"spec"`
}

type ResourceTypeInternalSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Icon          *IconValue             `json:"icon,omitempty" yaml:"icon,omitempty"`
	Ports         []Port                 `json:"ports" yaml:"ports"`
	Schema        map[string]interface{} `json:"schema,omitempty" yaml:"schema,omitempty"`
	Versioning    []Versioning           `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type ResourceTypeOperator struct {
	Kind     ResourceTypeOperatorKind `json:"kind" yaml:"kind"`
	Metadata Metadata                 `json:"metadata" yaml:"metadata"`
	Spec     ResourceTypeOperatorSpec `json:"spec" yaml:"spec"`
}

type ResourceTypeOperatorSpec struct {
	Color         *ColorValue            `json:"color,omitempty" yaml:"color,omitempty"`
	Configuration *ConfigurationSchema   `json:"configuration,omitempty" yaml:"configuration,omitempty"`
	Icon          *IconValue             `json:"icon,omitempty" yaml:"icon,omitempty"`
	Local         LocalInstance          `json:"local" yaml:"local"`
	Ports         []Port                 `json:"ports" yaml:"ports"`
	Schema        map[string]interface{} `json:"schema,omitempty" yaml:"schema,omitempty"`
	Versioning    []Versioning           `json:"versioning,omitempty" yaml:"versioning,omitempty"`
}

type EntityType string

const (
	Dto    EntityType = "dto"
	Enum   EntityType = "enum"
	Native EntityType = "native"
)

type IconType string

const (
	Fontawesome5 IconType = "fontawesome5"
	PurpleURL    IconType = "url"
)

type ConceptKind string

const (
	CoreConcept ConceptKind = "core/concept"
)

type BlockTypeGroupKind string

const (
	CoreBlockTypeGroup BlockTypeGroupKind = "core/block-type-group"
)

type BlockTypeOperatorKind string

const (
	CoreBlockTypeOperator BlockTypeOperatorKind = "core/block-type-operator"
)

type LocalInstancePortType string

const (
	TCP LocalInstancePortType = "tcp"
	UDP LocalInstancePortType = "udp"
)

type VersioningIncrementType string

const (
	Major VersioningIncrementType = "major"
	Minor VersioningIncrementType = "minor"
	Patch VersioningIncrementType = "patch"
)

type VersioningChangeType string

const (
	Create VersioningChangeType = "create"
	Delete VersioningChangeType = "delete"
	Update VersioningChangeType = "update"
)

type BlockTypeKind string

const (
	CoreBlockType BlockTypeKind = "core/block-type"
)

type DeploymentTargetKind string

const (
	CoreDeploymentTarget DeploymentTargetKind = "core/deployment-target"
)

type ColorType string

const (
	Hex ColorType = "hex"
)

type LinkType string

const (
	FluffyURL LinkType = "url"
)

type DeploymentKind string

const (
	CoreDeployment DeploymentKind = "core/deployment"
)

type DeploymentNetworkConnectionType string

const (
	Resource DeploymentNetworkConnectionType = "resource"
	Service  DeploymentNetworkConnectionType = "service"
)

type EnvironmentKind string

const (
	CoreEnvironment EnvironmentKind = "core/environment"
)

type LanguageTargetKind string

const (
	CoreLanguageTarget LanguageTargetKind = "core/language-target"
)

type PlanKind string

const (
	CorePlan PlanKind = "core/plan"
)

type ResourceTypeExtensionKind string

const (
	CoreResourceTypeExtension ResourceTypeExtensionKind = "core/resource-type-extension"
)

type ResourceTypeInternalKind string

const (
	CoreResourceTypeInternal ResourceTypeInternalKind = "core/resource-type-internal"
)

type ResourceTypeOperatorKind string

const (
	CoreResourceTypeOperator ResourceTypeOperatorKind = "core/resource-type-operator"
)
