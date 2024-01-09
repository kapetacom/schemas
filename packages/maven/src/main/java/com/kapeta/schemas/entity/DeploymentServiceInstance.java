package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class DeploymentServiceInstance {
    private BlockDefinition blockDefinition;
    private Map<String, Object> configuration;
    private String fallbackDNS;
    private String id;
    private String image;
    private String kind;
    private String ref;
    private String title;
}
