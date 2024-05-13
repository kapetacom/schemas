/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {describe, expect, it} from "@jest/globals";
import {BlockDefinition, BlockType, BlockTypeKind, Plan, PlanKind} from "../../src";
import {resolveDependencies} from "../../src/resolve-dependencies";
import * as _ from "lodash";


describe("resolveDependencies", () => {
    it("can resolve dependencies from plan", async () => {
        const plan: Plan = {
            kind: PlanKind.CorePlan,
            metadata: {
                name: 'test',
                version: '1.0.0',
            },
            spec: {
                blocks: [
                    {
                        name: 'someblock',
                        id: 'test',
                        dimensions: {
                            width: 1,
                            height: 1,
                            left: 0,
                            top: 0,
                        },
                        block: {
                            ref: 'somehandle/someblock:1.2.3',
                        }
                    },
                    {
                        name: 'otherblock',
                        id: 'test',
                        dimensions: {
                            width: 1,
                            height: 1,
                            left: 0,
                            top: 0,
                        },
                        block: {
                            ref: 'somehandle/otherblock:1.2.3',
                        }
                    }
                ],
                connections: []
            }
        }

        let dependencies = resolveDependencies(plan);

        expect(dependencies).toEqual([
            {
                name: 'somehandle/someblock:1.2.3',
                path: 'spec.blocks.0.block.ref',
                type: 'Blocks'
            },
            {
                name: 'somehandle/otherblock:1.2.3',
                path: 'spec.blocks.1.block.ref',
                type: 'Blocks'
            }
        ])

        dependencies.forEach(dep => {
            _.set(plan, dep.path, 'changed:' + dep.name);
        });

        dependencies = resolveDependencies(plan);

        expect(dependencies).toEqual([
            {
                name: 'changed:somehandle/someblock:1.2.3',
                path: 'spec.blocks.0.block.ref',
                type: 'Blocks'
            },
            {
                name: 'changed:somehandle/otherblock:1.2.3',
                path: 'spec.blocks.1.block.ref',
                type: 'Blocks'
            }
        ])

    });

    it("can resolve dependencies from block", async () => {
        const blockType: BlockType = {
            kind: BlockTypeKind.CoreBlockType,
            metadata: {
                name: 'someone/block-type-service',
            },
            spec: {
                dependencies: [
                    {
                        path: 'spec.consumers.kind',
                        type: 'Consumers'
                    },
                    {
                        path: 'spec.providers.kind',
                        type: 'Providers'
                    },
                    {
                        path: 'spec.target.kind',
                        type: 'Language target'
                    }
                ],
                schema: {}
            }
        }
        const block: BlockDefinition = {
            kind: 'someone/block-type-service:1.2.3',
            metadata: {
                name: 'test',
                version: '1.0.0',
            },
            spec: {
                target: {
                    kind: 'someone/javascript:1.2.3',
                },
                providers: [
                    {
                        kind: 'someone/api:1.2.3',
                        spec: {
                            port: 'rest',
                        },
                        metadata: {
                            name: 'test',
                        }
                    }
                ]
            }
        }

        let dependencies = resolveDependencies(block, blockType);

        expect(dependencies).toEqual([
            {
                name: 'someone/block-type-service:1.2.3',
                path: 'kind',
                type: 'Kind'
            },
            {
                name: 'someone/api:1.2.3',
                path: 'spec.providers.0.kind',
                type: 'Providers'
            },
            {
                name: 'someone/javascript:1.2.3',
                path: 'spec.target.kind',
                type: 'Language target'
            }
        ]);

        dependencies.forEach(dep => {
            _.set(block, dep.path, 'changed:' + dep.name);
        });

        dependencies = resolveDependencies(block, blockType);

        expect(dependencies).toEqual([
            {
                name: 'changed:someone/block-type-service:1.2.3',
                path: 'kind',
                type: 'Kind'
            },
            {
                name: 'changed:someone/api:1.2.3',
                path: 'spec.providers.0.kind',
                type: 'Providers'
            },
            {
                name: 'changed:someone/javascript:1.2.3',
                path: 'spec.target.kind',
                type: 'Language target'
            }
        ])

    });

});
