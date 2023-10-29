// Copyright 2023 Kapeta Inc.
// SPDX-License-Identifier: MIT

package validate

type SchemaFile string

const ABSTRACTS_CORE_BLOCK_DEFINITION SchemaFile = "abstracts/core/block-definition.json"
const ABSTRACTS_CORE_CONCEPT SchemaFile = "abstracts/core/concept.json"
const ABSTRACTS_CORE_KIND SchemaFile = "abstracts/core/kind.json"
const TYPES_CORE_ASSET_REFERENCE SchemaFile = "types/core/asset-reference.json"
const TYPES_CORE_BLOCK_INSTANCES SchemaFile = "types/core/block-instances.json"
const TYPES_CORE_BLOCK_RESOURCE_LIST SchemaFile = "types/core/block-resource-list.json"
const TYPES_CORE_BLOCK_RESOURCE SchemaFile = "types/core/block-resource.json"
const TYPES_CORE_COLOR_VALUE SchemaFile = "types/core/color-value.json"
const TYPES_CORE_CONFIGURATION_SCHEMA SchemaFile = "types/core/configuration-schema.json"
const TYPES_CORE_CONNECTIONS SchemaFile = "types/core/connections.json"
const TYPES_CORE_DEPENDENCIES SchemaFile = "types/core/dependencies.json"
const TYPES_CORE_ENTITY_LIST SchemaFile = "types/core/entity-list.json"
const TYPES_CORE_ENTITY SchemaFile = "types/core/entity.json"
const TYPES_CORE_ICON_VALUE SchemaFile = "types/core/icon-value.json"
const TYPES_CORE_LANGUAGE_TARGET_REFERENCE SchemaFile = "types/core/language-target-reference.json"
const TYPES_CORE_LOCAL_INSTANCE SchemaFile = "types/core/local-instance.json"
const TYPES_CORE_METADATA SchemaFile = "types/core/metadata.json"
const TYPES_CORE_PORT SchemaFile = "types/core/port.json"
const TYPES_CORE_REMOTE_SERVICE SchemaFile = "types/core/remote-service.json"
const TYPES_CORE_REST_METHOD SchemaFile = "types/core/rest-method.json"
const TYPES_CORE_SCHEMA SchemaFile = "types/core/schema.json"
const TYPES_CORE_SOURCE_CODE SchemaFile = "types/core/source-code.json"
const TYPES_CORE_TYPED_VALUE SchemaFile = "types/core/typed-value.json"
const TYPES_CORE_UI_SCHEMA SchemaFile = "types/core/ui-schema.json"
const TYPES_CORE_URL_VALUE SchemaFile = "types/core/url-value.json"
const TYPES_CORE_VERSIONING SchemaFile = "types/core/versioning.json"
const CONCEPTS_CORE_BLOCK_TYPE_GROUP SchemaFile = "concepts/core/block-type-group.json"
const CONCEPTS_CORE_BLOCK_TYPE_OPERATOR SchemaFile = "concepts/core/block-type-operator.json"
const CONCEPTS_CORE_BLOCK_TYPE SchemaFile = "concepts/core/block-type.json"
const CONCEPTS_CORE_DEPLOYMENT_TARGET SchemaFile = "concepts/core/deployment-target.json"
const CONCEPTS_CORE_DEPLOYMENT SchemaFile = "concepts/core/deployment.json"
const CONCEPTS_CORE_ENVIRONMENT SchemaFile = "concepts/core/environment.json"
const CONCEPTS_CORE_LANGUAGE_TARGET SchemaFile = "concepts/core/language-target.json"
const CONCEPTS_CORE_PLAN SchemaFile = "concepts/core/plan.json"
const CONCEPTS_CORE_RESOURCE_TYPE_EXTENSION SchemaFile = "concepts/core/resource-type-extension.json"
const CONCEPTS_CORE_RESOURCE_TYPE_INTERNAL SchemaFile = "concepts/core/resource-type-internal.json"
const CONCEPTS_CORE_RESOURCE_TYPE_OPERATOR SchemaFile = "concepts/core/resource-type-operator.json"

var allFiles = []string{"abstracts/core/block-definition.json",
"abstracts/core/concept.json",
"abstracts/core/kind.json",
"types/core/asset-reference.json",
"types/core/block-instances.json",
"types/core/block-resource-list.json",
"types/core/block-resource.json",
"types/core/color-value.json",
"types/core/configuration-schema.json",
"types/core/connections.json",
"types/core/dependencies.json",
"types/core/entity-list.json",
"types/core/entity.json",
"types/core/icon-value.json",
"types/core/language-target-reference.json",
"types/core/local-instance.json",
"types/core/metadata.json",
"types/core/port.json",
"types/core/remote-service.json",
"types/core/rest-method.json",
"types/core/schema.json",
"types/core/source-code.json",
"types/core/typed-value.json",
"types/core/ui-schema.json",
"types/core/url-value.json",
"types/core/versioning.json",
"concepts/core/block-type-group.json",
"concepts/core/block-type-operator.json",
"concepts/core/block-type.json",
"concepts/core/deployment-target.json",
"concepts/core/deployment.json",
"concepts/core/environment.json",
"concepts/core/language-target.json",
"concepts/core/plan.json",
"concepts/core/resource-type-extension.json",
"concepts/core/resource-type-internal.json",
"concepts/core/resource-type-operator.json"}
