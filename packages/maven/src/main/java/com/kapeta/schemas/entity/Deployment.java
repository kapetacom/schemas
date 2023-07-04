package com.kapeta.schemas.entity;

@lombok.Data
public class Deployment {
    private String kind;
    private DeploymentMetadata metadata;
    private DeploymentSpec spec;
}
