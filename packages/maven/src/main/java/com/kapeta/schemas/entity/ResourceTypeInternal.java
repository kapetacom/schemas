package com.kapeta.schemas.entity;

@lombok.Data
public class ResourceTypeInternal {
    private ResourceTypeInternalKind kind;
    private Metadata metadata;
    private ResourceTypeInternalSpec spec;
}
