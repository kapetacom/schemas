package com.kapeta.schemas.entity;

@lombok.Data
public class BlockTypeOperator {
    private String kind;
    private Metadata metadata;
    private BlockTypeOperatorSpec spec;
}
