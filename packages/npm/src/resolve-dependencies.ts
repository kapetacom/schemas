import {Dependency, Kind} from "./types";
import schemaMap from "../schemas";

interface AssetReference {
    name: string;
    type: string;
}

function getValuesFromPath(data:any, path:string):string[] {
    const out:string[] = [];
    const parts = path.split('.');
    let current:any = data;
    for(let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const last = i === parts.length - 1
        if (!current.hasOwnProperty(part)) {
            continue;
        }
        const child = current[part];
        if (last) {
            out.push(child);
            continue;
        }
        if (Array.isArray(child)) {
            child.forEach(item => {
                out.push(...getValuesFromPath(item, parts.slice(i + 1).join('.')))
            })
            break;
        }
        current = child;
    }
    return out;
}

export const resolveDependencies = (data:Kind, schema?:any):AssetReference[] => {
    const coreConcept = data.kind.startsWith('core/');
    if (coreConcept) {
        schema = schemaMap['concepts/' + data.kind + '.json'];
    }

    if (!schema) {
        throw new Error(`Unknown schema: ${data.kind}`);
    }

    const dependencies:AssetReference[] = [];

    if (!coreConcept) {
        dependencies.push({
            name: data.kind,
            type: 'Kind'
        })
    }

    schema.spec?.dependencies?.forEach((dep: Dependency) => {
        if (!dep.path) {
            return;
        }
        const references:string[] = getValuesFromPath(data, dep.path);
        if (!references) {
            return;
        }

        references.forEach(ref => {
            dependencies.push({
                name: ref,
                type: dep.type ?? 'asset',
            });
        });
    });

    return dependencies;
}