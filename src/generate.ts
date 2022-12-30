import type {RendererOptions} from 'quicktype-core';
import type {TargetLanguage} from "quicktype-core/dist/TargetLanguage";
import type {JSONSchemaSourceData} from "quicktype-core/dist/input/JSONSchemaInput";
import type {Entry} from "./utils";
import {JavaScriptTargetLanguage, quicktypeMultiFile} from "quicktype-core";
const {
    JavaTargetLanguage,
    TypeScriptTargetLanguage,
    InputData,
    JSONSchemaInput
} = require('quicktype-core');
const FS = require('fs');
const FSExtra = require('fs-extra');
const {resolve} = require("path");
const {InMemorySchemaStore, readDirectory} = require("./utils");

const typesPath = resolve(__dirname, '../types');
const conceptsPath = resolve(__dirname, '../concepts');
const packageBase = resolve(__dirname, '../packages');

interface Language {
    options: {
        lang: TargetLanguage,
        rendererOptions: RendererOptions,
        outputFilename?: string
    },
    baseDir: string
}

const languages:Language[] = [
    {
        options: {
            lang: new JavaTargetLanguage(),
            rendererOptions: {
                'lombok': 'true',
                'array-type': 'list',
                'just-types': 'true',
                'package': 'com.blockware.schemas'
            }
        },
        baseDir: resolve(packageBase, 'maven/src/main/java/com/blockware/schemas')
    },
    {
        options: {
            lang: new TypeScriptTargetLanguage(),
            rendererOptions: {
                'runtime-typecheck': 'true',
                'just-types': 'true'
            },
            outputFilename:'index.ts'
        },
        baseDir: resolve(packageBase, 'npm/src')
    }
];


(async () => {
    const schemaStore = new InMemorySchemaStore();
    const types:Entry[] = readDirectory(typesPath);
    let coreConcept:any;
    types.forEach(entry => {
        schemaStore.set(entry.content.$id, entry.content);
        if (entry.content.$id === '/core/concept') {
            coreConcept = entry;
        }
    });

    if (!coreConcept) {
        throw new Error('Failed to find core/concept type');
    }

    const concepts = readDirectory(conceptsPath);
    const inputData = new InputData();

    inputData.addSourceSync(
        'schema',
        {
            schema: JSON.stringify(coreConcept.content),
            name: 'Concept'
        },
        () => new JSONSchemaInput(schemaStore)
    )

    for(let i = 0; i < concepts.length; i++) {
        const concept = concepts[i];
        const typeName = concept.content.metadata.name.split(/\//)[1];
        const schema:JSONSchemaSourceData = {
            schema: JSON.stringify(concept.content.spec.schema),
            name: typeName
        };

        inputData.addSourceSync(
            'schema',
            schema,
            () => new JSONSchemaInput(schemaStore)
        )
    }

    for(let i = 0; i < languages.length; i++) {
        const language = languages[i];
        console.log('Generating types in language: %s', language.options.lang.name);
        const result = await quicktypeMultiFile({
            inputData,
            ...language.options
        });

        FSExtra.rmSync(language.baseDir, {recursive:true});
        FSExtra.mkdirpSync(language.baseDir);

        result.forEach((value, key) => {
            const filename = resolve(language.baseDir, key);
            FS.writeFileSync(filename, value.lines.join('\n'));
            console.log('Wrote type to %s',filename);
        });
    }
})()
