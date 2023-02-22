package com.blockware.schemas.entity;

@lombok.Data
public class EnvironmentSpec {
    private DeploymentTargetConfiguration deploymentTarget;
    private PlanConfiguration plan;
}
