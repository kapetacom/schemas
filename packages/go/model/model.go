package model

type BlockDefinition struct {
	Kind     string              `json:"kind"`    
	Metadata Metadata            `json:"metadata"`
	Spec     BlockDefinitionSpec `json:"spec"`    
}

type Metadata struct {
	Description *string `json:"description,omitempty"`
	Name        string  `json:"name"`                 
	Title       *string `json:"title,omitempty"`      
	Visibility  *string `json:"visibility,omitempty"` 
}

type BlockDefinitionSpec struct {
	Configuration *EntityList              `json:"configuration,omitempty"`
	Consumers     []ConsumerElement        `json:"consumers,omitempty"`    
	Entities      *EntityList              `json:"entities,omitempty"`     
	Icon          *IconValue               `json:"icon,omitempty"`         
	Providers     []ConsumerElement        `json:"providers,omitempty"`    
	Target        *LanguageTargetReference `json:"target,omitempty"`       
}

type EntityList struct {
	Source *SourceCode `json:"source,omitempty"`
	Types  []Entity    `json:"types,omitempty"` 
}

type SourceCode struct {
	Type    string  `json:"type"`             
	Value   string  `json:"value"`            
	Version *string `json:"version,omitempty"`
}

type Entity struct {
	Description *string                   `json:"description,omitempty"`
	Name        string                    `json:"name"`                 
	Properties  map[string]EntityProperty `json:"properties,omitempty"` 
	Type        EntityType                `json:"type"`                 
	Values      []string                  `json:"values,omitempty"`     
}

type EntityProperty struct {
	DefaultValue *string `json:"defaultValue,omitempty"`
	Description  *string `json:"description,omitempty"` 
	Format       *string `json:"format,omitempty"`      
	Global       *bool   `json:"global,omitempty"`      
	Ref          *string `json:"ref,omitempty"`         
	Required     *bool   `json:"required,omitempty"`    
	Secret       *bool   `json:"secret,omitempty"`      
	Type         *string `json:"type,omitempty"`        
}

type ConsumerElement struct {
	Kind     string                 `json:"kind"`    
	Metadata ResourceMetadata       `json:"metadata"`
	Spec     map[string]interface{} `json:"spec"`    
}

type ResourceMetadata struct {
	Name string `json:"name"`
}

type IconValue struct {
	Type  IconType `json:"type"` 
	Value string   `json:"value"`
}

type LanguageTargetReference struct {
	Kind    string                 `json:"kind"`             
	Options map[string]interface{} `json:"options,omitempty"`
}

type Concept struct {
	Kind     string      `json:"kind"`    
	Metadata Metadata    `json:"metadata"`
	Spec     ConceptSpec `json:"spec"`    
}

type ConceptSpec struct {
	Dependencies []Dependency           `json:"dependencies,omitempty"`
	Schema       map[string]interface{} `json:"schema"`                
}

type Dependency struct {
	Path *string `json:"path,omitempty"`
	Type *string `json:"type,omitempty"`
}

// An executable block provides a type of block that does not get deployed as a service.
// This is typically a command line tool, a desktop block or a mobile app.
// What's also common for executable blocks is that they do not have direct access to other
// service blocks, and can't rely on other services or software being available at runtime.
// They are also typically distributed as a downloadable artifact - like a setup file or a
// package.
type BlockTypeExecutable struct {
	Kind     string                  `json:"kind"`    
	Metadata Metadata                `json:"metadata"`
	Spec     BlockTypeExecutableSpec `json:"spec"`    
}

type BlockTypeExecutableSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty"`
	Dependencies  []Dependency           `json:"dependencies,omitempty"` 
	Icon          *IconValue             `json:"icon,omitempty"`         
	Schema        map[string]interface{} `json:"schema"`                 
	Versioning    []Versioning           `json:"versioning,omitempty"`   
}

type ConfigurationSchema struct {
	DefaultValue map[string]interface{}            `json:"defaultValue,omitempty"`
	Schema       map[string]interface{}            `json:"schema"`                
	UISchema     map[string]map[string]interface{} `json:"uiSchema,omitempty"`    
}

type Versioning struct {
	Increment VersioningIncrementType `json:"increment"`
	On        []VersioningChangeType  `json:"on"`       
	Paths     []string                `json:"paths"`    
}

type BlockTypeGroup struct {
	Kind     string             `json:"kind"`    
	Metadata Metadata           `json:"metadata"`
	Spec     BlockTypeGroupSpec `json:"spec"`    
}

type BlockTypeGroupSpec struct {
	Blocks        []BlockInstance `json:"blocks"`                 
	Configuration *EntityList     `json:"configuration,omitempty"`
	Connections   []Connection    `json:"connections"`            
}

type BlockInstance struct {
	Block                AssetReference         `json:"block"`                         
	DefaultConfiguration map[string]interface{} `json:"defaultConfiguration,omitempty"`
	Dimensions           Dimensions             `json:"dimensions"`                    
	Id                   string                 `json:"id"`                            
	Name                 string                 `json:"name"`                          
}

type AssetReference struct {
	Ref string `json:"ref"`
}

type Dimensions struct {
	Height float64 `json:"height"`
	Left   float64 `json:"left"`  
	Top    float64 `json:"top"`   
	Width  float64 `json:"width"` 
}

type Connection struct {
	Consumer Endpoint               `json:"consumer"`         
	Mapping  map[string]interface{} `json:"mapping,omitempty"`
	Port     *Port                  `json:"port,omitempty"`   
	Provider Endpoint               `json:"provider"`         
}

type Endpoint struct {
	BlockId      string `json:"blockId"`     
	ResourceName string `json:"resourceName"`
}

type Port struct {
	Type string `json:"type"`
}

// A block type operator provides a type of block that does not require code to be written.
// This can be anywhere from a HTTP gateway to a database block.
// Note that most databases can more easily be implemented as a resource operator.
// Blocks are good for representing more complex scenarios where there are connections
// between this and other services.
// Message queues, for example, are a good example of something that could be an operator
// block.
type BlockTypeOperator struct {
	Kind     string                `json:"kind"`    
	Metadata Metadata              `json:"metadata"`
	Spec     BlockTypeOperatorSpec `json:"spec"`    
}

type BlockTypeOperatorSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty"`
	Dependencies  []Dependency           `json:"dependencies,omitempty"` 
	Icon          *IconValue             `json:"icon,omitempty"`         
	Local         LocalInstance          `json:"local"`                  
	Ports         OperatorPorts          `json:"ports"`                  // Ports that the operator will expose.; The primary port is the one that will be used to access the operator.
	Schema        map[string]interface{} `json:"schema"`                 
	Type          BlockOperatorType      `json:"type"`                   // Determines the type of operator.; "logical" means the operator is a logical component and won't necessarily actually create; a service.; "instance" means the operator is an instance and will create a service and be connectable; to one or more operators.
	Versioning    []Versioning           `json:"versioning,omitempty"`   
}

type LocalInstance struct {
	Credentials map[string]interface{}       `json:"credentials,omitempty"`
	Env         map[string]string            `json:"env,omitempty"`        
	Health      *LocalInstanceHealth         `json:"health,omitempty"`     
	Image       string                       `json:"image"`                
	Mounts      map[string]string            `json:"mounts,omitempty"`     
	Ports       map[string]LocalInstancePort `json:"ports"`                
	Singleton   *bool                        `json:"singleton,omitempty"`  
}

type LocalInstanceHealth struct {
	Cmd      string   `json:"cmd"`               
	Interval *float64 `json:"interval,omitempty"`
}

type LocalInstancePort struct {
	Port *float64               `json:"port,omitempty"`
	Type *LocalInstancePortType `json:"type,omitempty"`
}

// Ports that the operator will expose.
// The primary port is the one that will be used to access the operator.
type OperatorPorts struct {
	Primary Port `json:"primary"`
}

// The standard block type which is used to define a block that can be deployed as a
// service.
// The expected output of any such block is a docker image that can be deployed to a
// kubernetes cluster.
type BlockType struct {
	Kind     string        `json:"kind"`    
	Metadata Metadata      `json:"metadata"`
	Spec     BlockTypeSpec `json:"spec"`    
}

type BlockTypeSpec struct {
	DefaultPort  *Port                  `json:"defaultPort,omitempty"` 
	Dependencies []Dependency           `json:"dependencies,omitempty"`
	Icon         *IconValue             `json:"icon,omitempty"`        
	Schema       map[string]interface{} `json:"schema"`                
	Versioning   []Versioning           `json:"versioning,omitempty"`  
}

type DeploymentTarget struct {
	Kind     string               `json:"kind"`    
	Metadata Metadata             `json:"metadata"`
	Spec     DeploymentTargetSpec `json:"spec"`    
}

type DeploymentTargetSpec struct {
	Configuration *ConfigurationSchema                `json:"configuration,omitempty"`
	Icon          *IconValue                          `json:"icon,omitempty"`         
	Operators     map[string]DeploymentTargetOperator `json:"operators,omitempty"`    
	Service       RemoteService                       `json:"service"`                
	Versioning    []Versioning                        `json:"versioning,omitempty"`   
}

type DeploymentTargetOperator struct {
	Color         *ColorValue          `json:"color,omitempty"`        
	Configuration *ConfigurationSchema `json:"configuration,omitempty"`
	Description   *string              `json:"description,omitempty"`  
	Icon          *IconValue           `json:"icon,omitempty"`         
	Link          *URLValue            `json:"link,omitempty"`         
	Title         string               `json:"title"`                  
}

type ColorValue struct {
	Type  ColorType `json:"type"` 
	Value string    `json:"value"`
}

type URLValue struct {
	Type  LinkType `json:"type"` 
	Value string   `json:"value"`
}

type RemoteService struct {
	APIVersion *string `json:"apiVersion,omitempty"`
	URL        *string `json:"url,omitempty"`       
}

type Deployment struct {
	Kind     string             `json:"kind"`    
	Metadata DeploymentMetadata `json:"metadata"`
	Spec     DeploymentSpec     `json:"spec"`    
}

type DeploymentMetadata struct {
	AssetId     *string `json:"assetId,omitempty"`    
	Description *string `json:"description,omitempty"`
	Name        string  `json:"name"`                 
	Title       *string `json:"title,omitempty"`      
	Visibility  *string `json:"visibility,omitempty"` 
}

type DeploymentSpec struct {
	Configuration map[string]interface{}        `json:"configuration,omitempty"`
	Environment   AssetReference                `json:"environment"`            
	Insights      InsightsSettings              `json:"insights"`               
	Network       []DeploymentNetworkConnection `json:"network"`                
	Plan          AssetReference                `json:"plan"`                   
	Services      []DeploymentServiceInstance   `json:"services"`               
	Target        DeploymentTargetReference     `json:"target"`                 
}

type InsightsSettings struct {
	Domain string `json:"domain"`
}

type DeploymentNetworkConnection struct {
	Consumer DeploymentNetworkEndpoint       `json:"consumer"`
	Port     Port                            `json:"port"`    
	Provider DeploymentNetworkEndpoint       `json:"provider"`
	Type     DeploymentNetworkConnectionType `json:"type"`    
}

type DeploymentNetworkEndpoint struct {
	Id       string  `json:"id"`                
	Resource *string `json:"resource,omitempty"`
}

type DeploymentServiceInstance struct {
	BlockDefinition *Kind                         `json:"blockDefinition,omitempty"`
	Configuration   map[string]interface{}        `json:"configuration,omitempty"`  
	FallbackDNS     string                        `json:"fallbackDNS"`              
	Id              string                        `json:"id"`                       
	Image           *string                       `json:"image,omitempty"`          
	Kind            string                        `json:"kind"`                     
	Ref             string                        `json:"ref"`                      
	Title           *string                       `json:"title,omitempty"`          
	Type            DeploymentServiceInstanceType `json:"type"`                     
}

type Kind struct {
	Kind     string                 `json:"kind"`          
	Metadata Metadata               `json:"metadata"`      
	Spec     map[string]interface{} `json:"spec,omitempty"`
}

type DeploymentTargetReference struct {
	Image string `json:"image"`
	Ref   string `json:"ref"`  
}

type Environment struct {
	Kind     string          `json:"kind"`    
	Metadata Metadata        `json:"metadata"`
	Spec     EnvironmentSpec `json:"spec"`    
}

type EnvironmentSpec struct {
	DeploymentTarget DeploymentTargetConfiguration `json:"deploymentTarget"`  
	Plan             PlanConfiguration             `json:"plan"`              
	Services         []EnvironmentService          `json:"services,omitempty"`
}

type DeploymentTargetConfiguration struct {
	Configuration map[string]interface{} `json:"configuration,omitempty"`
	Ref           string                 `json:"ref"`                    
}

type PlanConfiguration struct {
	Blocks        []BlockInstanceConfiguration `json:"blocks"`                 
	Configuration map[string]interface{}       `json:"configuration,omitempty"`
	Ref           string                       `json:"ref"`                    
}

type BlockInstanceConfiguration struct {
	Configuration map[string]interface{}      `json:"configuration,omitempty"`
	Id            string                      `json:"id"`                     
	Services      []BlockServiceConfiguration `json:"services,omitempty"`     
}

type BlockServiceConfiguration struct {
	ConsumerId string `json:"consumerId"`
	Port       Port   `json:"port"`      
	ServiceId  string `json:"serviceId"` 
}

type EnvironmentService struct {
	Configuration map[string]interface{} `json:"configuration,omitempty"`
	Id            string                 `json:"id"`                     
	Kind          string                 `json:"kind"`                   
	Ref           string                 `json:"ref"`                    
	Title         *string                `json:"title,omitempty"`        
}

type LanguageTarget struct {
	Kind     string              `json:"kind"`          
	Metadata Metadata            `json:"metadata"`      
	Spec     *LanguageTargetSpec `json:"spec,omitempty"`
}

type LanguageTargetSpec struct {
	Icon       *IconValue             `json:"icon,omitempty"`      
	Local      LocalDevContainer      `json:"local"`               
	Schema     map[string]interface{} `json:"schema,omitempty"`    
	Versioning []Versioning           `json:"versioning,omitempty"`
}

type LocalDevContainer struct {
	Env         []string                   `json:"Env,omitempty"`        
	Handlers    *LocalDevContainerHandlers `json:"handlers,omitempty"`   
	Healthcheck *string                    `json:"healthcheck,omitempty"`
	HostConfig  map[string]interface{}     `json:"HostConfig,omitempty"` 
	Image       string                     `json:"image"`                
	Labels      map[string]interface{}     `json:"Labels,omitempty"`     
	Options     map[string]interface{}     `json:"options,omitempty"`    
	UserHome    *string                    `json:"userHome,omitempty"`   
	WorkingDir  *string                    `json:"workingDir,omitempty"` 
}

type LocalDevContainerHandlers struct {
	OnCreate *string `json:"onCreate,omitempty"`
}

type Plan struct {
	Kind     string   `json:"kind"`    
	Metadata Metadata `json:"metadata"`
	Spec     PlanSpec `json:"spec"`    
}

type PlanSpec struct {
	Blocks               []BlockInstance        `json:"blocks"`                        
	Configuration        *EntityList            `json:"configuration,omitempty"`       
	Connections          []Connection           `json:"connections"`                   
	DefaultConfiguration map[string]interface{} `json:"defaultConfiguration,omitempty"`
}

type ResourceTypeExtension struct {
	Kind     string                    `json:"kind"`    
	Metadata Metadata                  `json:"metadata"`
	Spec     ResourceTypeExtensionSpec `json:"spec"`    
}

type ResourceTypeExtensionSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty"`
	Icon          *IconValue             `json:"icon,omitempty"`         
	Ports         []Port                 `json:"ports"`                  
	Schema        map[string]interface{} `json:"schema"`                 
	Versioning    []Versioning           `json:"versioning,omitempty"`   
}

type ResourceTypeInternal struct {
	Kind     string                   `json:"kind"`    
	Metadata Metadata                 `json:"metadata"`
	Spec     ResourceTypeInternalSpec `json:"spec"`    
}

type ResourceTypeInternalSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty"`
	Icon          *IconValue             `json:"icon,omitempty"`         
	Ports         []Port                 `json:"ports"`                  
	Schema        map[string]interface{} `json:"schema,omitempty"`       
	Versioning    []Versioning           `json:"versioning,omitempty"`   
}

type ResourceTypeOperator struct {
	Kind     string                   `json:"kind"`    
	Metadata Metadata                 `json:"metadata"`
	Spec     ResourceTypeOperatorSpec `json:"spec"`    
}

type ResourceTypeOperatorSpec struct {
	Color         *ColorValue            `json:"color,omitempty"`        
	Configuration *ConfigurationSchema   `json:"configuration,omitempty"`
	Icon          *IconValue             `json:"icon,omitempty"`         
	Local         *LocalInstance         `json:"local,omitempty"`        
	Ports         []Port                 `json:"ports"`                  
	Schema        map[string]interface{} `json:"schema,omitempty"`       
	Versioning    []Versioning           `json:"versioning,omitempty"`   
}

type EntityType string
const (
	Dto EntityType = "dto"
	Enum EntityType = "enum"
	Native EntityType = "native"
)

type IconType string
const (
	Fontawesome5 IconType = "fontawesome5"
	PurpleURL IconType = "url"
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

type LocalInstancePortType string
const (
	TCP LocalInstancePortType = "tcp"
	UDP LocalInstancePortType = "udp"
)

// Determines the type of operator.
// "logical" means the operator is a logical component and won't necessarily actually create
// a service.
// "instance" means the operator is an instance and will create a service and be connectable
// to one or more operators.
type BlockOperatorType string
const (
	Instance BlockOperatorType = "instance"
	Logical BlockOperatorType = "logical"
)

type ColorType string
const (
	Hex ColorType = "hex"
)

type LinkType string
const (
	FluffyURL LinkType = "url"
)

type DeploymentNetworkConnectionType string
const (
	DeploymentNetworkConnectionTypeService DeploymentNetworkConnectionType = "service"
	Resource DeploymentNetworkConnectionType = "resource"
)

type DeploymentServiceInstanceType string
const (
	DeploymentServiceInstanceTypeService DeploymentServiceInstanceType = "service"
	Operator DeploymentServiceInstanceType = "operator"
)
