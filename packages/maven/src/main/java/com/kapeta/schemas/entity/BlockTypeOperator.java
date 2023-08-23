package com.kapeta.schemas.entity;

@lombok.Data
public class BlockTypeOperator {
    private BlockTypeOperatorKind kind;
    private Metadata metadata;
    private BlockTypeOperatorSpec spec;
}
