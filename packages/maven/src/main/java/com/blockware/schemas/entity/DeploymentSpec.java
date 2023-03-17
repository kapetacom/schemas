package com.blockware.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class DeploymentSpec {
    private Map<String, Object> configuration;
    private AssetReference environment;
    private List<DeploymentNetworkConnection> network;
    private AssetReference plan;
    private List<DeploymentServiceInstance> services;
    private DeploymentTargetReference target;
}