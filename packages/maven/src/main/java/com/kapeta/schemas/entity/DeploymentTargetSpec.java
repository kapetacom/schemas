package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class DeploymentTargetSpec {
    private ConfigurationSchema configuration;
    @Deprecated
    private IconValue icon;
    private List<IconValue> icons;
    private Map<String, DeploymentTargetOperator> operators;
    private RemoteService service;
    private List<Versioning> versioning;
}
