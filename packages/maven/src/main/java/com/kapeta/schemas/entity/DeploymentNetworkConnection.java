package com.kapeta.schemas.entity;

@lombok.Data
public class DeploymentNetworkConnection {
    private DeploymentNetworkSource from;
    private DeploymentNetworkTarget to;
    private DeploymentNetworkConnectionType type;
}
