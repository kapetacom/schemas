package com.kapeta.schemas.entity;

@lombok.Data
public class DeploymentNetworkConnection {
    private DeploymentNetworkEndpoint consumer;
    private Port port;
    private DeploymentNetworkEndpoint provider;
    private DeploymentNetworkConnectionType type;
}
