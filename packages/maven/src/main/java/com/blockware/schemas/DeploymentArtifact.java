package com.blockware.schemas;

@lombok.Data
public class DeploymentArtifact {
    private String name;
    private DeploymentArtifactType type;
    private String version;
}
