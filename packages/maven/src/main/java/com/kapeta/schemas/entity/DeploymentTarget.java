package com.kapeta.schemas.entity;

@lombok.Data
public class DeploymentTarget {
    private DeploymentTargetKind kind;
    private Metadata metadata;
    private DeploymentTargetSpec spec;
}
