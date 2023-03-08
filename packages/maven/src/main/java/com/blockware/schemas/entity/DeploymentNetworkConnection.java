package com.blockware.schemas.entity;

@lombok.Data
public class DeploymentNetworkConnection {
    private DeploymentNetworkSource from;
    private DeploymentNetworkTarget to;
    private DeploymentNetworkConnectionType type;
}
