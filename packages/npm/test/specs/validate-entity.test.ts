/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {describe, expect, it} from "@jest/globals";
import type {Entity} from "../../src";
import {EntityType, validateSchema} from "../../src";
import {validateEntities} from "../../src/validate-entity";

describe("validateSchema", () => {
    it("can validate an entity with generic types", async () => {
        const user: Entity = {
            name: 'User',
            type: EntityType.Dto,
            properties: {
                name: {
                    type: 'string',
                    required: true,
                }
            }
        };
        const entity: Entity = {
            name: 'Basic',
            type: EntityType.Dto,
            properties: {
                userMap: {
                    ref: 'Map<string, User>',
                    required: true,
                },
                setString: {
                    ref: 'Set<string>',
                    defaultValue: "[\"a\",\"b\"]",
                },
                mapString: {
                    ref: 'Map<string, string>'
                }
            }
        };

        const entities = [entity];

        let errors = validateEntities(entities, {
            Basic: {
                userMap: {
                    a: {
                        name: 'a',
                    },
                    b: {
                        name: 'b',
                    }
                },
                setString: ["a", "b"],
                mapString: {
                    a: "b",
                    c: "d",
                }
            }
        }, [user]);
        expect(errors).toHaveLength(0);

        errors = validateEntities(entities, {
            Basic: {
                userMap: {
                    a: {
                        other: 'a',
                    },
                    b: {
                        name: 'b',
                    }
                },
                setString: ["a", "b"],
                mapString: {
                    a: "b",
                    c: "d",
                }
            }
        }, [user]);
        expect(errors).toEqual([
            'Basic.userMap.a value is invalid: User.name is missing and required'
        ]);

        errors = validateEntities(entities, {
            Basic: {
                userMap: {
                    a: {
                        name: 'a',
                    },
                    b: {
                        name: 'b',
                    }
                },
                setString: ["a", {b:1}],
                mapString: {
                    a: "b",
                    c: {title:'test'},
                }
            }
        }, [user]);
        expect(errors).toEqual([
            'Basic.setString map value is invalid: Value is not a string',
            'Basic.mapString.c value is invalid: Value is not a string'
        ]);
    })
    it("can validate a simple entity", async () => {
        const enumEntity: Entity = {
            name: 'SomeEnum',
            type: EntityType.Enum,
            values: ['ONE','TWO', 'THREE'],
        };
        const entity: Entity = {
            name: 'Basic',
            type: EntityType.Dto,
            properties: {
                requiredProp: {
                    type: 'string',
                    required: true,
                },
                integerProp: {
                    type: 'integer',
                    defaultValue: "1",
                },
                booleanProp: {
                    type: 'boolean',
                    required: true,
                    defaultValue: "true",
                },
                enumProp: {
                    ref: 'SomeEnum',
                    required: true,
                    defaultValue: "SomeEnum.TWO",
                }
            }
        };

        const entities = [enumEntity, entity];

        let errors = validateEntities(entities, {
            Basic: {
                requiredProp: 'a',
                integerProp: 1,
                booleanProp: false,
                enumProp: 'ONE',
            }
        });
        expect(errors).toHaveLength(0);

        errors = validateEntities(entities, {
            Basic: {
                requiredProp: 'a',
                integerProp: 1,
                enumProp: 'ONE',
            }
        });
        expect(errors).toEqual([]);

        errors = validateEntities(entities, {
            Basic: {
                integerProp: 1,
                booleanProp: false,
                enumProp: 'ONE',
            }
        });
        expect(errors).toEqual(['Basic.requiredProp is missing and required']);

        errors = validateEntities(entities, {
            Basic: {
                requiredProp: 'a',
                integerProp: "abc",
                booleanProp: false,
                enumProp: 'ONE',
            }
        });
        expect(errors).toEqual(['Basic.integerProp is invalid: Value is not a integer']);

        errors = validateEntities(entities, {
            Basic: {
                requiredProp: 'a',
                integerProp: 1,
                booleanProp: 1,
                enumProp: 'ONE',
            }
        });
        expect(errors).toEqual(['Basic.booleanProp is invalid: Value is not a boolean']);

        errors = validateEntities(entities, {
            Basic: {
                requiredProp: 'a'
            }
        });
        expect(errors).toEqual([]);

        errors = validateEntities(entities, {
            Basic: {
                requiredProp: 'a',
                integerProp: 1,
                booleanProp: true,
                enumProp: 'NOT_ONE',
            }
        });
        expect(errors).toEqual(['Basic.enumProp is invalid: NOT_ONE is not a valid enum value']);
    });

});
