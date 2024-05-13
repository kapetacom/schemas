package com.kapeta.schemas.entity;

@lombok.Data
public class ResourceTypeExtension {
    private ResourceTypeExtensionKind kind;
    private Metadata metadata;
    private ResourceTypeExtensionSpec spec;
}
