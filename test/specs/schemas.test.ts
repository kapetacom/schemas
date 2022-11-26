import {describe, test, expect} from "@jest/globals";
import {parse, parseAllDocuments} from 'yaml';
import {resolve,join} from 'path';
import {readdirSync, readFileSync} from 'fs';
import Ajv from "ajv"

const basePath = resolve(__dirname, '../../schemas/core');
const EXAMPLE_POSTFIX = '.example.yml';
const ajv = new Ajv();

describe('schemas.core', () => {
    const filenames = readdirSync(basePath);

    filenames.forEach(filename => {

        if (filename.endsWith(EXAMPLE_POSTFIX)) {
            return;
        }

        const schemaName = filename.substring(0, filename.length - 4);
        const schemaFile = join(basePath, filename);
        const schemaExampleFile = join(basePath, schemaName + EXAMPLE_POSTFIX);
        const schemaContent = readFileSync(schemaFile).toString();
        const exampleContent = readFileSync(schemaExampleFile).toString();
        const schema = parse(schemaContent);
        const examples = parseAllDocuments(exampleContent);
        try {
            ajv.addSchema(schema);
        } catch (e) {
            console.error('Failed to add schema: ' + filename);
            throw e;
        }

        test(schema.$id, async () => {
            const validator = ajv.compile(schema)
            examples.forEach(example => {
                const result = validator(example.toJS());
                if (validator.errors) {
                    console.log(example.toJS());
                }
                expect(validator.errors).toBeNull();
                expect(result).toBe(true);
            });
        });
    });


})