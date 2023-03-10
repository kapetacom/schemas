import type {RendererOptions} from 'quicktype-core';
import type {TargetLanguage} from "quicktype-core/dist/TargetLanguage";
import type {JSONSchemaSourceData} from "quicktype-core/dist/input/JSONSchemaInput";
import type {Entry} from "./utils";
import {JavaScriptTargetLanguage, GoTargetLanguage, quicktypeMultiFile} from "quicktype-core";
import {join} from "path";
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

const typesPath = resolve(__dirname, '../schemas/types');
const conceptsPath = resolve(__dirname, '../schemas/concepts');
const abstractsPath = resolve(__dirname, '../schemas/abstracts');
const packageBase = resolve(__dirname, '../packages');
const configBase = resolve(__dirname, '../config');

interface Language {
    options: {
        lang: TargetLanguage,
        rendererOptions: RendererOptions,
        outputFilename?: string
    },
    baseDir: string
    ymlBaseDir: string
    configBaseDir: string
}

const languages:Language[] = [
    {
        options: {
            lang: new JavaTargetLanguage(),
            rendererOptions: {
                'lombok': 'true',
                'array-type': 'list',
                'just-types': 'true',
                'package': 'com.blockware.schemas.entity'
            }
        },
        baseDir: resolve(packageBase, 'maven/src/main/java/com/blockware/schemas/entity'),
        ymlBaseDir: resolve(packageBase, 'maven/src/main/resources/schemas'),
        configBaseDir: resolve(packageBase, 'maven/src/main/resources/config')
    },
    {
        options: {
            lang: new TypeScriptTargetLanguage(),
            rendererOptions: {
                'runtime-typecheck': 'true',
                'just-types': 'true'
            },
            outputFilename:'index.d.ts'
        },
        baseDir: resolve(packageBase, 'npm/src'),
        ymlBaseDir: resolve(packageBase, 'npm/schemas'),
        configBaseDir: resolve(packageBase, 'npm/config')
    },
    {
        options: {
            lang: new GoTargetLanguage(),
            rendererOptions: {
                'runtime-typecheck': 'true',
                'just-types-and-package': 'true',
                'package': 'model'

            },
            outputFilename:'model.go'
        },
        baseDir: resolve(packageBase, 'go/model'),
        ymlBaseDir: resolve(packageBase, 'go/schemas'),
        configBaseDir: resolve(packageBase, 'go/config')
    }
];


(async () => {
    const schemaStore = new InMemorySchemaStore();
    const types:Entry[] = readDirectory(typesPath);
    const abstracts:Entry[] = readDirectory(abstractsPath);
    types.forEach(entry => {
        console.log('Type', entry.content.$id);
        schemaStore.set(entry.content.$id, entry.content);
    });

    const concepts:Entry[] = readDirectory(conceptsPath);
    const inputData = new InputData();

    for(let i = 0; i < abstracts.length; i++) {
        const abstract = abstracts[i];

        const typeName = abstract.content.$id.substring(1).split(/\//)[1];
        const schema:JSONSchemaSourceData = {
            schema: JSON.stringify(abstract.content),
            name: typeName
        };

        inputData.addSourceSync(
            'schema',
            schema,
            () => new JSONSchemaInput(schemaStore)
        )
    }

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

        if (FS.existsSync(language.baseDir)) {
            FSExtra.rmSync(language.baseDir, {recursive:true});
        }

        FSExtra.mkdirpSync(language.baseDir);

        result.forEach((value, key) => {
            const filename = resolve(language.baseDir, key);
            FS.writeFileSync(filename, value.lines.join('\n')
                .replace(/ID/g,'Id') //We fix Id naming here
            );
            console.log('Wrote type to %s',filename);
        });

        if (FS.existsSync(language.ymlBaseDir)) {
            FSExtra.rmSync(language.ymlBaseDir, {recursive:true});
        }

        FSExtra.mkdirpSync(join(language.ymlBaseDir, 'types/core'));
        FSExtra.mkdirpSync(join(language.ymlBaseDir, 'concepts/core'));
        FSExtra.mkdirpSync(join(language.ymlBaseDir, 'abstracts/core'));

        abstracts.forEach(abstract => {
            FS.writeFileSync(join(language.ymlBaseDir, 'abstracts/core', abstract.filename.substring(0, abstract.filename.length - 4) + '.json'), JSON.stringify(abstract.content, null, 2));
        });

        types.forEach(type => {
            FS.writeFileSync(join(language.ymlBaseDir, 'types/core', type.filename.substring(0, type.filename.length - 4) + '.json'), JSON.stringify(type.content, null, 2));
        });

        concepts.forEach(concept => {
            FS.writeFileSync(join(language.ymlBaseDir, 'concepts/core', concept.filename.substring(0, concept.filename.length - 4) + '.json'), JSON.stringify(concept.content, null, 2));
        });

        FSExtra.copySync(configBase, language.configBaseDir, {recursive: true, overwrite: true});

    }
})()
