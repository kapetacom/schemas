package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class PlanConfiguration {
    private List<BlockInstanceConfiguration> blocks;
    private Map<String, Object> configuration;
    private String ref;
}
