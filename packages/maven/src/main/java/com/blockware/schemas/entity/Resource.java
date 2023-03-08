package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class Resource {
    private String kind;
    private ResourceMetadata metadata;
    private Map<String, Object> spec;
}
