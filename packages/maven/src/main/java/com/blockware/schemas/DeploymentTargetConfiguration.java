package com.blockware.schemas;

import java.util.Map;

@lombok.Data
public class DeploymentTargetConfiguration {
    private Map<String, Object> configuration;
    private String ref;
}
