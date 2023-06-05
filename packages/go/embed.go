package validate

import (
	"embed"
	_ "embed"
)

//go:embed schemas/*
var embeddedJSONFiles embed.FS
