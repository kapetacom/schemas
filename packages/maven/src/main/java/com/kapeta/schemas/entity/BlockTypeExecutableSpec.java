package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class BlockTypeExecutableSpec {
    private ConfigurationSchema configuration;
    private List<Dependency> dependencies;
    @Deprecated
    private IconValue icon;
    private List<IconValue> icons;
    private Map<String, Object> schema;
    private List<Versioning> versioning;
}
