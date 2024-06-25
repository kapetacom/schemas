package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class DeploymentTargetOperator {
    private ColorValue color;
    private ConfigurationSchema configuration;
    private String description;
    @Deprecated
    private IconValue icon;
    private List<IconValue> icons;
    private URLValue link;
    private String title;
}
