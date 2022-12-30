package com.blockware.schemas;

import java.util.Map;

@lombok.Data
public class DeploymentTargetSpec {
    private Map<String, Object> configuration;
    private String image;
}
