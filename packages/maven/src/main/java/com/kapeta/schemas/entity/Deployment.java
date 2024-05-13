package com.kapeta.schemas.entity;

@lombok.Data
public class Deployment {
    private DeploymentKind kind;
    private DeploymentMetadata metadata;
    private DeploymentSpec spec;
}
