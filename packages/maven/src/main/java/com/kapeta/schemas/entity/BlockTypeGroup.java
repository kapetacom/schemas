package com.kapeta.schemas.entity;

@lombok.Data
public class BlockTypeGroup {
    private BlockTypeGroupKind kind;
    private Metadata metadata;
    private BlockTypeGroupSpec spec;
}
