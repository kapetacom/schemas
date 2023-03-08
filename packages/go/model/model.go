package model

type Concept struct {
	Kind     string      `json:"kind"`    
	Metadata Metadata    `json:"metadata"`
	Spec     ConceptSpec `json:"spec"`    
}

type Metadata struct {
	Description *string `json:"description,omitempty"`
	Name        string  `json:"name"`                 
	Title       *string `json:"title,omitempty"`      
	Visibility  *string `json:"visibility,omitempty"` 
}

type ConceptSpec struct {
	Dependencies []Dependency           `json:"dependencies,omitempty"`
	Schema       map[string]interface{} `json:"schema"`                
}

type Dependency struct {
	Path *string `json:"path,omitempty"`
	Type *string `json:"type,omitempty"`
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
	ID         string         `json:"id"`        
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
	From    Endpoint               `json:"from"`             
	Mapping map[string]interface{} `json:"mapping,omitempty"`
	To      Endpoint               `json:"to"`               
}

type Endpoint struct {
	BlockID      string `json:"blockId"`     
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
	Configuration map[string]interface{} `json:"configuration"`
	Image         string                 `json:"image"`        
}

type Deployment struct {
	Kind     string         `json:"kind"`    
	Metadata Metadata       `json:"metadata"`
	Spec     DeploymentSpec `json:"spec"`    
}

type DeploymentSpec struct {
	Configuration map[string]interface{}        `json:"configuration,omitempty"`
	Network       []DeploymentNetworkConnection `json:"network"`                
	Plan          AssetReference                `json:"plan"`                   
	Services      []DeploymentServiceInstance   `json:"services"`               
	Target        DeploymentTargetReference     `json:"target"`                 
}

type DeploymentNetworkConnection struct {
	From *DeploymentNetworkSource         `json:"from,omitempty"`
	To   *DeploymentNetworkTarget         `json:"to,omitempty"`  
	Type *DeploymentNetworkConnectionType `json:"type,omitempty"`
}

type DeploymentNetworkSource struct {
	ID       string  `json:"id"`                
	Resource *string `json:"resource,omitempty"`
}

type DeploymentNetworkTarget struct {
	ID       string  `json:"id"`                
	PortType string  `json:"portType"`          
	Resource *string `json:"resource,omitempty"`
}

type DeploymentServiceInstance struct {
	Configuration map[string]interface{} `json:"configuration,omitempty"`
	ID            string                 `json:"id"`                     
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
	Configuration map[string]interface{} `json:"configuration"`
	ID            string                 `json:"id"`           
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
	Kind     *string                    `json:"kind,omitempty"`    
	Metadata *Metadata                  `json:"metadata,omitempty"`
	Spec     *ResourceTypeExtensionSpec `json:"spec,omitempty"`    
}

type ResourceTypeExtensionSpec struct {
	Configuration map[string]interface{} `json:"configuration,omitempty"`
	Schema        map[string]interface{} `json:"schema,omitempty"`       
}

type ResourceTypeInternal struct {
	Kind     *string                   `json:"kind,omitempty"`    
	Metadata *Metadata                 `json:"metadata,omitempty"`
	Spec     *ResourceTypeInternalSpec `json:"spec,omitempty"`    
}

type ResourceTypeInternalSpec struct {
	Configuration map[string]interface{} `json:"configuration,omitempty"`
}

type ResourceTypeOperator struct {
	Kind     *string                   `json:"kind,omitempty"`    
	Metadata *Metadata                 `json:"metadata,omitempty"`
	Spec     *ResourceTypeOperatorSpec `json:"spec,omitempty"`    
}

type ResourceTypeOperatorSpec struct {
	Configuration map[string]interface{} `json:"configuration,omitempty"`
}

type DeploymentNetworkConnectionType string
const (
	Resource DeploymentNetworkConnectionType = "resource"
	Service DeploymentNetworkConnectionType = "service"
)
