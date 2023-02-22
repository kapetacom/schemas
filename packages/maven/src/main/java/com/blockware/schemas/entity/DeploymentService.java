package com.blockware.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class DeploymentService {
    private DeploymentArtifact artifact;
    private Map<String, Object> configuration;
    private List<String> dependencies;
    private String name;
}
