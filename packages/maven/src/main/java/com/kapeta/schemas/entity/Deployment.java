package com.kapeta.schemas.entity;

@lombok.Data
public class Deployment {
    private String kind;
    private Metadata metadata;
    private DeploymentSpec spec;
}
