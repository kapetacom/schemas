package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class DeploymentTargetConfiguration {
    private Map<String, Object> configuration;
    private String ref;
}
