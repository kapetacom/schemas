package com.kapeta.schemas.entity;

@lombok.Data
public class Resource {
    private String kind;
    private ResourceMetadata metadata;
    private ResourceSpec spec;
}
