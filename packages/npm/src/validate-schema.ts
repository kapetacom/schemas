/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import Ajv from "ajv";
import path from "path";
import schemaMap from "../schemas";

/**
 * Generate a map of available schema kinds, w/ lazy loading definitions
 */
function initializeAjv() {
  const ajv = new Ajv();

  for (const [id, content] of Object.entries(schemaMap)) {
    const category = id.split("/").slice(1, -1).join("/");
    const kindId = `${category}/${path.basename(id, ".json")}`;

    if ("kind" in content) {
      // concepts have a different wrapper
      ajv.addSchema(content.spec.schema, kindId);
    } else {
      ajv.addSchema(content, kindId);
    }
  }

  return ajv;
}

const instance: Ajv = initializeAjv();

export function validateSchema(kind: string | object, data: any) {

  const schema =
    typeof kind === "string"
      ? instance.getSchema(kind)
      : instance.compile(kind);
  if (!schema) {
    throw new Error(`Unknown schema: ${kind}`);
  }

  schema(data);

  return schema.errors || [];
}
