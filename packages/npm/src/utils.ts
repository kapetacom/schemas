/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import schemaMap from "../schemas";

export function getSchema(type:'concept'|'types'|'abstracts', name:string) {
    return schemaMap[type + '/' + name + '.json'];
}