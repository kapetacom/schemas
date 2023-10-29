// Copyright 2023 Kapeta Inc.
// SPDX-License-Identifier: MIT

package validate

import (
	"embed"
	_ "embed"
)

//go:embed schemas/*
var embeddedJSONFiles embed.FS
