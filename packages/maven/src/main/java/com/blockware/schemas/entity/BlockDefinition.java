package com.blockware.schemas.entity;

@lombok.Data
public class BlockDefinition {
    private String kind;
    private Metadata metadata;
    private BlockDefinitionSpec spec;
}
