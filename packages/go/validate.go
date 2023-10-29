// Copyright 2023 Kapeta Inc.
// SPDX-License-Identifier: MIT

package validate

import (
	"fmt"
	"log"
	"strings"

	"github.com/xeipuuv/gojsonschema"
)

func schemaTypeFromFile(f string) string {
	x := strings.Split(f, "/")
	rawType := x[len(x)-2:]
	schemaType := "/" + strings.Replace(strings.Join(rawType, "/"), ".json", "", -1)

	return schemaType
}

// ValidateJSON validates JSON data against a JSON schema taken from the embedded files in form
// of a SchemaFile.
func ValidateJSON(jsonData string, schemaRoot SchemaFile) error {

	rootSchema := schemaTypeFromFile(string(schemaRoot))
	loader := gojsonschema.NewSchemaLoader()
	for _, f := range allFiles { // Add all static files to loader
		data, err := embeddedJSONFiles.ReadFile(fmt.Sprintf("schemas/%v", f))
		if err != nil {
			return fmt.Errorf("failed to read embedded file: %s", err)
		}
		fileLoader := gojsonschema.NewBytesLoader(data)
		schemaType := schemaTypeFromFile(f)
		if schemaType != rootSchema {
			loader.AddSchema(schemaType, fileLoader)
		}
	}

	rootData, err := embeddedJSONFiles.ReadFile(fmt.Sprintf("schemas/%v", schemaRoot))
	if err != nil {
		log.Fatalf("Failed to read embedded file: %s", err)
	}
	schema, err := loader.Compile(gojsonschema.NewStringLoader(string(rootData)))
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
		return nil
	}
	var errString string
	for _, desc := range result.Errors() {
		fmt.Printf("- %s\n", desc)
		errString += fmt.Sprintf("- %s\n", desc)
	}
	return fmt.Errorf(errString)
}
