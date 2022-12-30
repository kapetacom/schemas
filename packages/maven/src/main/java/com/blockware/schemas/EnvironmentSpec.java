package com.blockware.schemas;

@lombok.Data
public class EnvironmentSpec {
    private DeploymentTargetConfiguration deploymentTarget;
    private PlanConfiguration plan;
}
