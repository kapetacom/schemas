package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class BlockTypeOperatorSpec {
    private List<Dependency> dependencies;
    private IconValue icon;
    private LocalInstance local;
    private Map<String, Object> schema;
    private List<Versioning> versioning;
}
