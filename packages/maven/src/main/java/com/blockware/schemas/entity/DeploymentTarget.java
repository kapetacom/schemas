package com.blockware.schemas.entity;

@lombok.Data
public class DeploymentTarget {
    private String kind;
    private Metadata metadata;
    private DeploymentTargetSpec spec;
}
