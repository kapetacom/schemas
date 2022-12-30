import {describe, test, expect} from "@jest/globals";
import {resolve} from 'path';
import Ajv from "ajv"
import {ValidateFunction} from "ajv/lib/types";
import {readDirectory} from "../../src/utils";

const typesPath = resolve(__dirname, '../../types');
const basePath = resolve(__dirname, '../../concepts');

const ajv = new Ajv();

describe('schemas.concepts', () => {
    //Add all types - since they're used in the concepts
    readDirectory(typesPath).forEach(entry => {
        try {
            ajv.addSchema(entry.content);
        } catch (e) {
            console.error('Failed to add schema: ' + entry.filename, e);
            throw e;
        }
    });

    const conceptSchemaValidator = ajv.getSchema('/core/concept');

    if (!conceptSchemaValidator) {
        throw new Error('Did not find core concept schema');
    }

    readDirectory(basePath).forEach(entry => {

        try {
            ajv.addSchema(entry.content.spec.schema);
        } catch (e) {
            console.error('Failed to add schema: ' + entry.filename);
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

        test(entry.content.metadata.name, async () => {

            doValidation(conceptSchemaValidator, entry.content);

            const validator = ajv.compile(entry.content.spec.schema)
            entry.examples.forEach(example => {
                doValidation(validator, example.toJS());
            });
        });
    });


})