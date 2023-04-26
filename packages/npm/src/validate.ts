import Ajv from "ajv";
import fs from "fs-extra";
import path from "node:path";

const schemaDir = path.resolve(__dirname, "../schemas");

/**
 * Generate a map of available schema kinds, w/ lazy loading definitions
 */
async function initializeAjv() {
  const ajv = new Ajv();

  const abstractCore = path.resolve(schemaDir, "abstracts", "core");
  for (const kind of await fs.readdir(abstractCore)) {
    const schemaPath = path.resolve(abstractCore, kind);
    const kindId = `core/${path.basename(kind, ".json")}`;
    ajv.addSchema(require(schemaPath), kindId);
  }
  // core concepts have a wrapper that we need to unpack
  const conceptCore = path.resolve(schemaDir, "concepts", "core");
  for (const kind of await fs.readdir(conceptCore)) {
    const schemaPath = path.resolve(conceptCore, kind);
    const kindId = `core/${path.basename(kind, ".json")}`;
    ajv.addSchema(require(schemaPath).spec.schema, kindId);
  }

  const typesCore = path.resolve(schemaDir, "types", "core");
  for (const kind of await fs.readdir(typesCore)) {
    const schemaPath = path.resolve(typesCore, kind);
    const kindId = `core/${path.basename(kind, ".json")}`;
    ajv.addSchema(require(schemaPath), kindId);
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
