package com.kapeta.schemas.entity;

@lombok.Data
public class ResourceTypeOperator {
    private ResourceTypeOperatorKind kind;
    private Metadata metadata;
    private ResourceTypeOperatorSpec spec;
}
