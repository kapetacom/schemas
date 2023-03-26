package com.kapeta.schemas.entity;

@lombok.Data
public class ResourceTypeExtension {
    private String kind;
    private Metadata metadata;
    private ResourceTypeExtensionSpec spec;
}
