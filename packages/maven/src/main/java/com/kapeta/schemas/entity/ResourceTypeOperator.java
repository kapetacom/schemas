package com.kapeta.schemas.entity;

@lombok.Data
public class ResourceTypeOperator {
    private String kind;
    private Metadata metadata;
    private ResourceTypeOperatorSpec spec;
}
