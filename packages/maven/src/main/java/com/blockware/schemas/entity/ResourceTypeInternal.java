package com.blockware.schemas.entity;

@lombok.Data
public class ResourceTypeInternal {
    private String kind;
    private Metadata metadata;
    private ResourceTypeInternalSpec spec;
}
