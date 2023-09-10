package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class PlanSpec {
    private List<BlockInstance> blocks;
    private EntityList configuration;
    private List<Connection> connections;
    private Map<String, Object> defaultConfiguration;
}
