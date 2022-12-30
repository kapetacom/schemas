package com.blockware.schemas;

@lombok.Data
public class DeploymentTarget {
    private String kind;
    private Metadata metadata;
    private DeploymentTargetSpec spec;
}
