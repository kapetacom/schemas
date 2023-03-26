package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class BlockInstanceConfiguration {
    private Map<String, Object> configuration;
    private String id;
    private List<BlockServiceConfiguration> services;
}
