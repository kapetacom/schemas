import Ajv from "ajv";
import fs from "fs-extra";
import path from "node:path";
import schemaMap from "../schemas";

const schemaDir = path.resolve(__dirname, "../schemas");

/**
 * Generate a map of available schema kinds, w/ lazy loading definitions
 */
async function initializeAjv() {
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

let instance: Ajv;
export async function validateSchema(kind: string | object, data: any) {
  instance = instance || (await initializeAjv());

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
