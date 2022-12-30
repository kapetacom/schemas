package com.blockware.schemas;

import java.util.List;

@lombok.Data
public class DeploymentSpec {
    private AssetReference environment;
    private List<DeploymentService> services;
    private DeploymentTargetReference target;
}
