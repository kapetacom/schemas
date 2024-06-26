package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class DeploymentTargetSpec {
    private ConfigurationSchema configuration;
    private IconValue icon;
    private Map<String, DeploymentTargetOperator> operators;
    private RemoteService service;
    private List<Versioning> versioning;
}
