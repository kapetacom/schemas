/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {Dependency, Kind} from "./types";
import schemaMap from "../schemas";

export interface DependencyReference {
    name: string;
    path: string;
    type: string;
}

interface ValuePath {
    value: string;
    path: string;
}

function getValuesFromPath(data:any, path:string):ValuePath[] {
    const out:ValuePath[] = [];
    const parts = path.split('.');
    let current:any = data;
    for(let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const last = i === parts.length - 1
        if (!current.hasOwnProperty(part)) {
            continue;
        }
        const child = current[part];
        const currentPath = parts.slice(0, i + 1).join('.');
        if (last) {
            out.push({
                value: child,
                path: currentPath
            });
            continue;
        }
        if (Array.isArray(child)) {
            child.forEach((item, index) => {
                out.push(...getValuesFromPath(item, parts.slice(i + 1).join('.')).map(v => {
                    return {
                        value: v.value,
                        path: currentPath + '.' + index + '.' + v.path
                    }
                }))
            })
            break;
        }
        current = child;
    }
    return out;
}

export const resolveDependencies = (data:Kind, schema?:any):DependencyReference[] => {
    const coreConcept = data.kind.startsWith('core/');
    if (coreConcept) {
        schema = schemaMap['concepts/' + data.kind + '.json'];
        if (!schema) {
            schema = schemaMap['types/' + data.kind + '.json'];
        }
    }

    if (!schema) {
        throw new Error(`Unknown schema: ${data.kind}`);
    }

    const dependencies:DependencyReference[] = [];

    if (!coreConcept) {
        dependencies.push({
            name: data.kind,
            path: 'kind',
            type: 'Kind'
        })
    }

    schema.spec?.dependencies?.forEach((dep: Dependency) => {
        if (!dep.path) {
            return;
        }
        const references:ValuePath[] = getValuesFromPath(data, dep.path);
        if (!references) {
            return;
        }

        references.forEach(ref => {
            dependencies.push({
                name: ref.value,
                path: ref.path,
                type: dep.type ?? 'asset',
            });
        });
    });

    return dependencies;
}