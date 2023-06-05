package validate

import (
	"fmt"
	"log"

	"github.com/xeipuuv/gojsonschema"
)

// ValidateJSON validates JSON data against a JSON schema taken from the embedded files in form
// of a SchemaFile.
func ValidateJSON(jsonData string, filePath SchemaFile) error {
	data, err := embeddedJSONFiles.ReadFile(fmt.Sprintf("schemas/%v", filePath))
	if err != nil {
		log.Fatalf("Failed to read embedded file: %s", err)
	}
	schemaLoader := gojsonschema.NewBytesLoader(data)

	schema, err := gojsonschema.NewSchema(schemaLoader)
	if err != nil {
		return err
	}

	// Load the JSON document to be validated
	documentLoader := gojsonschema.NewStringLoader(jsonData)

	// Perform the validation
	result, err := schema.Validate(documentLoader)
	if err != nil {
		return err
	}

	if result.Valid() {
		fmt.Println("JSON document is valid")
	} else {
		fmt.Println("JSON document is not valid")
		for _, desc := range result.Errors() {
			fmt.Printf("- %s\n", desc)
		}
	}

	return nil
}
