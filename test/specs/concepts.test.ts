import {describe, test, expect} from "@jest/globals";
import {parse, parseAllDocuments} from 'yaml';
import {resolve,join} from 'path';
import {readdirSync, readFileSync} from 'fs';
import Ajv from "ajv"
import {ValidateFunction} from "ajv/lib/types";

const typesPath = resolve(__dirname, '../../types');
const basePath = resolve(__dirname, '../../concepts');
const EXAMPLE_POSTFIX = '.example.yml';
const ajv = new Ajv();

describe('schemas.concepts', () => {
    const typeFiles = readdirSync(typesPath);

    //Add all types - since they're used in the concepts
    typeFiles.forEach(filename => {

        if (filename.endsWith(EXAMPLE_POSTFIX)) {
            return;
        }

        const schemaFile = join(typesPath, filename);
        const schemaContent = readFileSync(schemaFile).toString();
        const schema = parse(schemaContent);
        try {
            ajv.addSchema(schema);
        } catch (e) {
            console.error('Failed to add schema: ' + filename, e);
            throw e;
        }
    });

    const conceptSchemaValidator = ajv.getSchema('/core/concept');

    if (!conceptSchemaValidator) {
        throw new Error('Did not find core concept schema');
    }

    const conceptFiles = readdirSync(basePath);

    conceptFiles.forEach(filename => {

        if (filename.endsWith(EXAMPLE_POSTFIX)) {
            return;
        }

        const conceptName = filename.substring(0, filename.length - 4);
        const schemaFile = join(basePath, filename);
        const schemaExampleFile = join(basePath, conceptName + EXAMPLE_POSTFIX);
        const conceptContent = readFileSync(schemaFile).toString();
        const exampleContent = readFileSync(schemaExampleFile).toString();
        const conceptKind = parse(conceptContent);
        const examples = parseAllDocuments(exampleContent);
        try {
            ajv.addSchema(conceptKind.spec.schema);
        } catch (e) {
            console.error('Failed to add schema: ' + filename);
            throw e;
        }

        function doValidation(validator:ValidateFunction<any>, data:object) {
            const result = validator(data);
            if (validator.errors) {
                console.error(validator.errors);
                console.log(data);
            }
            expect(validator.errors).toBeNull();
            expect(result).toBe(true);
        }

        test(conceptKind.metadata.name, async () => {

            doValidation(conceptSchemaValidator, conceptKind);

            const validator = ajv.compile(conceptKind.spec.schema)
            examples.forEach(example => {
                doValidation(validator, example.toJS());
            });
        });
    });


})