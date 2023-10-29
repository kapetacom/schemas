/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {join} from "path";
import {readdirSync, readFileSync} from "fs";
import {parse, parseAllDocuments} from "yaml";
import {JSONSchema, JSONSchemaStore} from "quicktype-core";

const EXAMPLE_POSTFIX = '.example.yml';

export interface Entry {
    filename:string,
    raw: string,
    rawExample: string,
    content: any,
    examples: any[]
}

export function readDirectory(basePath:string):Entry[] {
    const filenames = readdirSync(basePath);

    const out:Entry[] = [];

    filenames.forEach(filename => {

        if (filename.endsWith(EXAMPLE_POSTFIX)) {
            return;
        }

        const schemaName = filename.substring(0, filename.length - 4);
        const schemaFile = join(basePath, filename);
        const exampleFile = join(basePath, schemaName + EXAMPLE_POSTFIX);
        const content = readFileSync(schemaFile).toString();
        const exampleContent = readFileSync(exampleFile).toString();
        const parsedContent = parse(content);
        const examples = parseAllDocuments(exampleContent);

        out.push({
            filename,
            raw: content,
            rawExample: exampleContent,
            content: parsedContent,
            examples: examples
        });
    });

    return out;
}

export class InMemorySchemaStore extends JSONSchemaStore {
    private readonly provided:{[key:string]:JSONSchema} = {};

    set(_address:string, schema:JSONSchema) {
        this.provided[_address] = schema;
    }

    fetch(_address: string): Promise<JSONSchema | undefined> {
        return Promise.resolve(this.provided[_address]);
    }

}