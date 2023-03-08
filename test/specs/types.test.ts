import {describe, test, expect} from "@jest/globals";
import {resolve} from 'path';
import Ajv from "ajv"
import {readDirectory} from "../../src/utils";

const basePath = resolve(__dirname, '../../schemas/types');
const ajv = new Ajv();

describe('schemas.types', () => {

    readDirectory(basePath).forEach(entry => {

        try {
            ajv.addSchema(entry.content);
        } catch (e) {
            console.error('Failed to add schema: ' + entry.filename);
            throw e;
        }

        test(entry.content.$id, async () => {
            const validator = ajv.compile(entry.content)
            entry.examples.forEach(example => {
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