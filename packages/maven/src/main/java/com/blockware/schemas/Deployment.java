package com.blockware.schemas;

@lombok.Data
public class Deployment {
    private String kind;
    private Metadata metadata;
    private DeploymentSpec spec;
}
