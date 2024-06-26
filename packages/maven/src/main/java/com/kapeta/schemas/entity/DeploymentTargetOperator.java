package com.kapeta.schemas.entity;

@lombok.Data
public class DeploymentTargetOperator {
    private ColorValue color;
    private ConfigurationSchema configuration;
    private String description;
    private IconValue icon;
    private URLValue link;
    private String title;
}
