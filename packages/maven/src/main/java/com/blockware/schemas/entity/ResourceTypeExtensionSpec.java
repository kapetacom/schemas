package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class ResourceTypeExtensionSpec {
    private Map<String, Object> configuration;
    private Map<String, Object> schema;
}
