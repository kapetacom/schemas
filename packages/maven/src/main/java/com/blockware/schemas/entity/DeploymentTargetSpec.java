package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class DeploymentTargetSpec {
    private Map<String, Object> configuration;
    private String logo;
    private RemoteService service;
}
