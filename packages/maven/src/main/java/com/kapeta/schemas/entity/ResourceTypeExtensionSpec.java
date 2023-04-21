package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class ResourceTypeExtensionSpec {
    private ConfigurationSchema configuration;
    private List<Port> ports;
    private Map<String, Object> schema;
    private List<Versioning> versioning;
}
