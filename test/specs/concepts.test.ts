import {describe, test, expect} from "@jest/globals";
import {resolve} from 'path';
import Ajv from "ajv"
import {ValidateFunction} from "ajv/lib/types";
import {readDirectory} from "../../src/utils";

const typesPath = resolve(__dirname, '../../schemas/types');
const conceptBasePath = resolve(__dirname, '../../schemas/concepts');
const abstractBasePath = resolve(__dirname, '../../schemas/abstracts');

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

    readDirectory(abstractBasePath).forEach(entry => {
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

    describe('abstracts', () => {
        readDirectory(abstractBasePath).forEach(abstract => {

            test(abstract.content.$id, async () => {
                const validator = ajv.getSchema(abstract.content.$id);
                if (!validator) {
                    throw new Error(`Schema not found: ${abstract.content.$id}`);
                }
                abstract.examples.forEach(example => {
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

    describe('concepts', () => {
        readDirectory(conceptBasePath).forEach(entry => {

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
    });



})