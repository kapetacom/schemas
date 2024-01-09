// Copyright 2023 Kapeta Inc.
// SPDX-License-Identifier: MIT

package validate

import (
	_ "embed"
	"testing"

	"github.com/stretchr/testify/assert"
)

//go:embed test-data/block.json
var block string

func TestValidateJSON(t *testing.T) {
	err := ValidateJSON(`{"type": "hex", "value": "deadbeef" }`, TYPES_CORE_COLOR_VALUE)
	assert.NoError(t, err)
}

func TestValidate_Block(t *testing.T) {
	err := ValidateJSON(block, TYPES_CORE_BLOCK_DEFINITION)
	assert.NoError(t, err)
}
