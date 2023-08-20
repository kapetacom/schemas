import type {RendererOptions} from 'quicktype-core';
import type {TargetLanguage} from "quicktype-core/dist/TargetLanguage";
import type {JSONSchemaSourceData} from "quicktype-core/dist/input/JSONSchemaInput";
import type {Entry} from "./utils";
import {GoTargetLanguage, quicktypeMultiFile} from "quicktype-core";
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
                'package': 'com.kapeta.schemas.entity'
            }
        },
        baseDir: resolve(packageBase, 'maven/src/main/java/com/kapeta/schemas/entity'),
        ymlBaseDir: resolve(packageBase, 'maven/src/main/resources/schemas'),
        configBaseDir: resolve(packageBase, 'maven/src/main/resources/config')
    },
    {
        options: {
            lang: new TypeScriptTargetLanguage(),
            rendererOptions: {
                'runtime-typecheck': 'true',
                'just-types': 'true',
            },
            outputFilename:'index.ts'
        },
        baseDir: resolve(packageBase, 'npm/src/types'),
        ymlBaseDir: resolve(packageBase, 'npm/schemas'),
        configBaseDir: resolve(packageBase, 'npm/config')
    },
    {
        options: {
            lang: new GoTargetLanguage(),
            rendererOptions: {
                'runtime-typecheck': 'true',
                'just-types-and-package': 'true',
                'package': 'model',
                'field-tags': 'json,yaml',
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

        const schemas: string[] = [];
        abstracts.forEach(abstract => {
            const filename = join('abstracts/core', abstract.filename.substring(0, abstract.filename.length - 4) + '.json')
            FS.writeFileSync(join(language.ymlBaseDir, filename), JSON.stringify(abstract.content, null, 2));
            schemas.push(filename);
        });

        types.forEach(type => {
            const filename = join('types/core', type.filename.substring(0, type.filename.length - 4) + '.json')
            FS.writeFileSync(join(language.ymlBaseDir, filename), JSON.stringify(type.content, null, 2));
            schemas.push(filename);
        });

        concepts.forEach(concept => {
            const filename = join('concepts/core', concept.filename.substring(0, concept.filename.length - 4) + '.json');
            FS.writeFileSync(join(language.ymlBaseDir, filename), JSON.stringify(concept.content, null, 2));
            schemas.push(filename);
        });

        FSExtra.copySync(configBase, language.configBaseDir, {recursive: true, overwrite: true});

        if (language.options.lang.name === 'typescript') {
            const filename = join(language.ymlBaseDir, 'index.ts');

            const imports = schemas.map((schema, i) => `import * as schema${i} from "./${schema}";`).join('\n');
            const schemaMap = schemas.map((schema, i) => `  "${schema}": schema${i}`).join(',\n');
            const content = `${imports}\n\nexport default {\n${schemaMap}\n}`;
            FSExtra.writeFileSync(filename, content);
            
            console.log('Wrote schema index to %s', filename);
        }

        if (language.options.lang.name === 'go') {
            function generateEnumValue(str: string): string {
                const sanitized = str
                  .replace(/\.json$/, '')
                  .replace(/[\/-]/g, '_');
                
                return sanitized.toUpperCase();
              }
            const filename = join(language.baseDir, '../files.go');
            const allFilenames = schemas.map((schema, i) => `"${schema}"`).join(',\n');
            const types = schemas.map((schema, i) => `const ${generateEnumValue(schema)} SchemaFile = "${schema}"`).join('\n');
            const content = `package validate\n\ntype SchemaFile string\n\n${types}\n\nvar allFiles = []string{${allFilenames}}\n`;
            FSExtra.writeFileSync(filename, content);
            
            console.log('Wrote schema index to %s', filename);
        }
    }
})()
