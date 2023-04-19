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
	Consumers []ConsumerElement       `json:"consumers,omitempty"`
	Entities  *EntityList             `json:"entities,omitempty"` 
	Providers []ConsumerElement       `json:"providers,omitempty"`
	Target    LanguageTargetReference `json:"target"`             
}

type ConsumerElement struct {
	Kind     string           `json:"kind"`    
	Metadata ResourceMetadata `json:"metadata"`
	Spec     ResourceSpec     `json:"spec"`    
}

type ResourceMetadata struct {
	Name string `json:"name"`
}

type ResourceSpec struct {
	Port Port `json:"port"`
}

type Port struct {
	Type string `json:"type"`
}

type EntityList struct {
	Source *SourceCode `json:"source,omitempty"`
	Types  []Entity    `json:"types,omitempty"` 
}

type SourceCode struct {
	Type  *string `json:"type,omitempty"` 
	Value *string `json:"value,omitempty"`
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
	Ref          *string `json:"ref,omitempty"`         
	Required     *bool   `json:"required,omitempty"`    
	Secret       *bool   `json:"secret,omitempty"`      
	Type         *string `json:"type,omitempty"`        
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

type Kind struct {
	Kind     string                 `json:"kind"`          
	Metadata Metadata               `json:"metadata"`      
	Spec     map[string]interface{} `json:"spec,omitempty"`
}

type BlockTypeGroup struct {
	Kind     string             `json:"kind"`    
	Metadata Metadata           `json:"metadata"`
	Spec     BlockTypeGroupSpec `json:"spec"`    
}

type BlockTypeGroupSpec struct {
	Blocks      []BlockInstance `json:"blocks"`     
	Connections []Connection    `json:"connections"`
}

type BlockInstance struct {
	Block      AssetReference `json:"block"`     
	Dimensions Dimensions     `json:"dimensions"`
	Id         string         `json:"id"`        
	Name       string         `json:"name"`      
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

type BlockType struct {
	Kind     string        `json:"kind"`    
	Metadata Metadata      `json:"metadata"`
	Spec     BlockTypeSpec `json:"spec"`    
}

type BlockTypeSpec struct {
	Dependencies []Dependency           `json:"dependencies,omitempty"`
	Schema       map[string]interface{} `json:"schema"`                
}

type DeploymentTarget struct {
	Kind     string               `json:"kind"`    
	Metadata Metadata             `json:"metadata"`
	Spec     DeploymentTargetSpec `json:"spec"`    
}

type DeploymentTargetSpec struct {
	Configuration *ConfigurationSchema                `json:"configuration,omitempty"`
	Icon          IconValue                           `json:"icon"`                   
	Operators     map[string]DeploymentTargetOperator `json:"operators,omitempty"`    
	Service       RemoteService                       `json:"service"`                
}

type ConfigurationSchema struct {
	Schema   map[string]interface{}            `json:"schema"`            
	UISchema map[string]map[string]interface{} `json:"uiSchema,omitempty"`
}

type IconValue struct {
	Type  IconType `json:"type"` 
	Value string   `json:"value"`
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
	Type  IconType `json:"type"` 
	Value string   `json:"value"`
}

type RemoteService struct {
	APIVersion *string `json:"apiVersion,omitempty"`
	URL        *string `json:"url,omitempty"`       
}

type Deployment struct {
	Kind     string         `json:"kind"`    
	Metadata Metadata       `json:"metadata"`
	Spec     DeploymentSpec `json:"spec"`    
}

type DeploymentSpec struct {
	Configuration map[string]interface{}        `json:"configuration,omitempty"`
	Environment   AssetReference                `json:"environment"`            
	Network       []DeploymentNetworkConnection `json:"network"`                
	Plan          AssetReference                `json:"plan"`                   
	Services      []DeploymentServiceInstance   `json:"services"`               
	Target        DeploymentTargetReference     `json:"target"`                 
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
	Configuration map[string]interface{} `json:"configuration,omitempty"`
	Id            string                 `json:"id"`                     
	Image         *string                `json:"image,omitempty"`        
	Kind          string                 `json:"kind"`                   
	Ref           string                 `json:"ref"`                    
	Title         *string                `json:"title,omitempty"`        
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
	Configuration map[string]interface{} `json:"configuration,omitempty"`
}

type Plan struct {
	Kind     string   `json:"kind"`    
	Metadata Metadata `json:"metadata"`
	Spec     PlanSpec `json:"spec"`    
}

type PlanSpec struct {
	Blocks      []BlockInstance `json:"blocks"`     
	Connections []Connection    `json:"connections"`
}

type ResourceTypeExtension struct {
	Kind     string                    `json:"kind"`    
	Metadata Metadata                  `json:"metadata"`
	Spec     ResourceTypeExtensionSpec `json:"spec"`    
}

type ResourceTypeExtensionSpec struct {
	Configuration *ConfigurationSchema   `json:"configuration,omitempty"`
	Ports         []Port                 `json:"ports"`                  
	Schema        map[string]interface{} `json:"schema"`                 
}

type ResourceTypeInternal struct {
	Kind     string                   `json:"kind"`    
	Metadata Metadata                 `json:"metadata"`
	Spec     ResourceTypeInternalSpec `json:"spec"`    
}

type ResourceTypeInternalSpec struct {
	Configuration *ConfigurationSchema `json:"configuration,omitempty"`
	Ports         []Port               `json:"ports"`                  
}

type ResourceTypeOperator struct {
	Kind     string                   `json:"kind"`    
	Metadata Metadata                 `json:"metadata"`
	Spec     ResourceTypeOperatorSpec `json:"spec"`    
}

type ResourceTypeOperatorSpec struct {
	Color         *ColorValue          `json:"color,omitempty"`        
	Configuration *ConfigurationSchema `json:"configuration,omitempty"`
	Icon          *IconValue           `json:"icon,omitempty"`         
	Local         LocalInstance        `json:"local"`                  
	Ports         []Port               `json:"ports"`                  
}

type LocalInstance struct {
	Credentials LocalInstanceCredentials     `json:"credentials"`     
	Env         map[string]string            `json:"env,omitempty"`   
	Health      *LocalInstanceHealth         `json:"health,omitempty"`
	Image       string                       `json:"image"`           
	Mounts      map[string]string            `json:"mounts,omitempty"`
	Ports       map[string]LocalInstancePort `json:"ports"`           
}

type LocalInstanceCredentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

type LocalInstanceHealth struct {
	Cmd      string   `json:"cmd"`               
	Interval *float64 `json:"interval,omitempty"`
}

type LocalInstancePort struct {
	Port *float64               `json:"port,omitempty"`
	Type *LocalInstancePortType `json:"type,omitempty"`
}

type EntityType string
const (
	Dto EntityType = "dto"
	Enum EntityType = "enum"
)

type IconType string
const (
	URL IconType = "url"
)

type ColorType string
const (
	Hex ColorType = "hex"
)

type DeploymentNetworkConnectionType string
const (
	Resource DeploymentNetworkConnectionType = "resource"
	Service DeploymentNetworkConnectionType = "service"
)

type LocalInstancePortType string
const (
	TCP LocalInstancePortType = "tcp"
	UDP LocalInstancePortType = "udp"
)
