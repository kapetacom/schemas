/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import {describe, expect, test} from "@jest/globals";
import {
    createDefaultValue,
    EntityType,
    getCompatibilityIssuesForTypes,
    getSchemaEntityCompatibilityIssues,
    getSchemaEnumValuesCompatibilityIssues,
    hasEntityReference,
    isBuiltInType,
    isCompatibleTypes,
    isList,
    isSchemaEntityCompatible,
    isSchemaEnumValuesCompatible,
    isStringableType,
    toStringName,
    typeName,
    typeValue
} from "../../src";


describe('schemas', () => {

    describe('types', () => {


        test('can convert type to string', () => {

            expect(toStringName()).toBe('void');
            expect(toStringName({type: "string"})).toBe('string');
            expect(toStringName({type: "string[]"})).toBe('string[]');

            expect(toStringName({ref: 'User'})).toBe('User');
            expect(toStringName({ref: 'User[]'})).toBe('User[]');

        });

        test('can determine if type is list', () => {

            expect(isList()).toBe(false);
            expect(isList({type: "string"})).toBe(false);
            expect(isList({type: "string[]"})).toBe(true);

            expect(isList({ref: 'User'})).toBe(false);
            expect(isList({ref: 'User[]'})).toBe(true);

        });

        test('can get actual type name', () => {

            expect(typeName()).toBe('void');
            expect(typeName({type: "string"})).toBe('string');
            expect(typeName({type: "string[]"})).toBe('string');

            expect(typeName({ref: 'User'})).toBe('User');
            expect(typeName({ref: 'User[]'})).toBe('User');

        });

        test('can get type value', () => {

            expect(typeValue()).toBe('void');
            expect(typeValue({type: "string"})).toBe('string');
            expect(typeValue({type: "string[]"})).toBe('string[]');

            expect(typeValue({ref: 'User'})).toBe('ref:User');
            expect(typeValue({ref: 'User[]'})).toBe('ref:User[]');

        });

        test('can determine if type is built-in', () => {

            expect(isBuiltInType()).toBe(true);
            expect(isBuiltInType({type: "string"})).toBe(true);
            expect(isBuiltInType({type: "string[]"})).toBe(true);
            expect(isBuiltInType({type: "void"})).toBe(true);

            expect(isBuiltInType({ref: 'User'})).toBe(false);
            expect(isBuiltInType({ref: 'User[]'})).toBe(false);

        });

        test('can determine if type is stringable', () => {
            expect(isStringableType(undefined)).toBe(false);
            expect(isStringableType("string")).toBe(true);
            expect(isStringableType("string[]")).toBe(false);

            expect(isStringableType('boolean')).toBe(true);
            expect(isStringableType('float')).toBe(true);
            expect(isStringableType('float[]')).toBe(false);
        });
    });

    describe('default values', () => {
        test('can create default object for entity', () => {

            expect(createDefaultValue({
                type: EntityType.Dto,
                name: 'Test',
                properties: {
                    name: {
                        type: 'string',
                        defaultValue: 'default-name'
                    },
                    age: {
                        type: 'float',
                        defaultValue: "10"
                    },
                    type: {
                        ref: 'SomeEnum',
                        defaultValue: 'SomeEnum.ONE'
                    }
                }
            })).toEqual({
                Test: {
                    name: 'default-name',
                    age: 10,
                    type: 'ONE'
                }
            });
        })
    })

    describe('references', () => {

        test('can determine if value has reference to entity', () => {

            expect(hasEntityReference({
                anything: [{
                    ref: 'Test'
                }]
            }, 'Test')).toBe(true)

            expect(hasEntityReference({
                anything: [{
                    inner: [
                        {
                            ref: 'More'
                        },{
                            ref: 'More'
                        },{
                            ref: 'More'
                        }
                    ]
                }]
            }, 'Test')).toBe(false);

            expect(hasEntityReference({
                anything: [{
                    inner: [
                        {
                            ref: 'More'
                        },{
                            ref: 'More'
                        },{
                            ref: 'More'
                        }
                    ]
                }]
            }, 'More')).toBe(true);

            expect(hasEntityReference(null, 'More')).toBe(false);
        })
    })

    describe('comparisons', () => {

        test('can compare simple types', () => {

            expect(isCompatibleTypes(undefined, undefined, [], [])).toBe(true);
            expect(isCompatibleTypes(undefined, {type: 'void'}, [], [])).toBe(true);
            expect(isCompatibleTypes({type: 'string'}, {type: 'string'}, [], [])).toBe(true);
            expect(isCompatibleTypes({type: 'string'}, {type: 'float'}, [], [])).toBe(true);
            expect(isCompatibleTypes({type: 'boolean'}, {type: 'float'}, [], [])).toBe(false);
            expect(getCompatibilityIssuesForTypes({type: 'boolean'}, {type: 'float'}, [], [])).toEqual([
                'Types are not compatible'
            ]);
            expect(isCompatibleTypes(undefined, {type: 'float'}, [], [])).toBe(false);
            expect(isCompatibleTypes({type: 'float'}, undefined, [], [])).toBe(false);

            expect(isCompatibleTypes({type: 'string[]'}, {type: 'string'}, [], [])).toBe(false);
            expect(isCompatibleTypes({type: 'string[]'}, {type: 'float[]'}, [], [])).toBe(true);

            expect(isCompatibleTypes({type: 'string'}, {ref:'User'}, [], [])).toBe(false);
            expect(getCompatibilityIssuesForTypes({type: 'string'}, {ref:'User'}, [], [])).toEqual([
                'Types are not compatible'
            ]);
            expect(isCompatibleTypes({ref:'User'}, {type: 'string'}, [], [])).toBe(false);
        });

        test('If entities do not exist it is not compatible', () => {
            expect(isCompatibleTypes({ref:'User'}, {ref:'User'}, [], [])).toBe(false);

            expect(isCompatibleTypes({ref:'User'}, {ref:'Person'}, [], [
                {
                    type: EntityType.Dto,
                    name: 'Person',
                    properties: {}
                }
            ])).toBe(false);

            expect(getCompatibilityIssuesForTypes({ref:'User'}, {ref:'Person'}, [], [
                {
                    type: EntityType.Dto,
                    name: 'Person',
                    properties: {}
                }
            ])).toEqual([
                'User was not defined'
            ]);
        })

        test('entities of different name can be compatible', () => {
            expect(isCompatibleTypes({ref:'User'}, {ref:'Person'}, [
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {}
                }
            ], [
                {
                    type: EntityType.Dto,
                    name: 'Person',
                    properties: {}
                }
            ])).toBe(true);
        })

        test('Simple entity that matches is compatible', () => {

            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    }
                },
        [],[]
            )).toBe(true);

        });

        test('Simple entity that have compatible value types and same structure is compatible', () => {

            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'integer'
                        }
                    }
                },
                [],[]
            )).toBe(true);

        });

        test('Simple entity with different properties is not compatible', () => {
            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    }
                },
                [],[]
            )).toBe(false);

            expect(getSchemaEntityCompatibilityIssues(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        }
                    }
                },
                [],[]
            )).toEqual(['Property counts did not match']);

            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        fullName: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                },
                [],[]
            )).toBe(false);

            expect(getSchemaEntityCompatibilityIssues(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        fullName: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                },
                [],[]
            )).toEqual(['Property not found: fullName']);
        })

        test('Simple entity with same properties but different types is not compatible', () => {
            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                },
                [],[]
            )).toBe(false);

            expect(getSchemaEntityCompatibilityIssues(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                },
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                },
                [],[]
            )).toEqual(['Types are not compatible for property: name']);
        });

        test('Simple entity with different types is not compatible', () => {
            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {}
                },
                {
                    type: EntityType.Enum,
                    name: 'User',
                    values: []
                },
                [],[]
            )).toBe(false);

            expect(getSchemaEntityCompatibilityIssues(
                {
                    type: EntityType.Dto,
                    name: 'User',
                    properties: {}
                },
                {
                    type: EntityType.Enum,
                    name: 'User',
                    values: []
                },
                [],[]
            )).toEqual(['Enum and DTO are not compatible']);
        });

        test('Simple enum entities is compatible if they have the same values', () => {
            expect(isSchemaEntityCompatible(
                {
                    type: EntityType.Enum,
                    name: 'User',
                    values: ['A','B']
                },
                {
                    type: EntityType.Enum,
                    name: 'User',
                    values: ['A','B']
                },
                [],[]
            )).toBe(true);
        });

        test('enum values must contain all the values to be a mtach', () => {
            expect(isSchemaEnumValuesCompatible(['A','B','C'], ['B','C'])).toBe(false);

            expect(isSchemaEnumValuesCompatible(['A','B'], ['A','B','C'])).toBe(false);
            expect(isSchemaEnumValuesCompatible(['A','B','C','D'], ['A','B','C'])).toBe(false);
            expect(
                getSchemaEnumValuesCompatibilityIssues(['A','B','C','D'], ['A','B','C'])
            ).toEqual(['Mismatch in number of enum values']);

            expect(isSchemaEnumValuesCompatible(['A','B'], ['B','C'])).toBe(false);
            expect(
                getSchemaEnumValuesCompatibilityIssues(['A','B'], ['B','C'])
            ).toEqual(['Missing enum value: A']);
        })

        test('enum values are compatible regardless of order', () => {
            expect(isSchemaEnumValuesCompatible(['A','B','C'], ['B','C', 'A'])).toBe(true);
        })

    });
});