package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class BlockTypeSpec {
    private Port defaultPort;
    private List<Dependency> dependencies;
    private IconValue icon;
    private Map<String, Object> schema;
    private List<Versioning> versioning;
}
