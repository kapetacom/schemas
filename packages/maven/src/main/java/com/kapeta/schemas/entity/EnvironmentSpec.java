package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class EnvironmentSpec {
    private DeploymentTargetConfiguration deploymentTarget;
    private PlanConfiguration plan;
    private List<EnvironmentService> services;
}
