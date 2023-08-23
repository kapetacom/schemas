package com.kapeta.schemas.entity;

@lombok.Data
public class BlockType {
    private BlockTypeKind kind;
    private Metadata metadata;
    private BlockTypeSpec spec;
}
