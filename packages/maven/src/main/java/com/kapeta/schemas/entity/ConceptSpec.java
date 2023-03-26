package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class ConceptSpec {
    private List<Dependency> dependencies;
    private Map<String, Object> schema;
}
