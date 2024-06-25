package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class ResourceTypeInternalSpec {
    private ConfigurationSchema configuration;
    @Deprecated
    private IconValue icon;
    private List<IconValue> icons;
    private List<Port> ports;
    private Map<String, Object> schema;
    private List<Versioning> versioning;
}
