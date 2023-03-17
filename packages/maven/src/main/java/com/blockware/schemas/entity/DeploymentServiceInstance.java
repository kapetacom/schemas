package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class DeploymentServiceInstance {
    private Map<String, Object> configuration;
    private String id;
    private String image;
    private String kind;
    private String ref;
    private String title;
}