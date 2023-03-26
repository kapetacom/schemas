package com.kapeta.schemas.entity;

@lombok.Data
public class DeploymentNetworkTarget {
    private String id;
    private Port port;
    private String resource;
}
