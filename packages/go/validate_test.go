package validate

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestValidateJSON(t *testing.T) {
	err := ValidateJSON(`{"type": "hex", "value": "deadbeef" }`, TYPES_CORE_COLOR_VALUE)
	assert.NoError(t, err)
}
