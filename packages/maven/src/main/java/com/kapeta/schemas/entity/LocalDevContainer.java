package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class LocalDevContainer {
    private LocalDevContainerHandlers handlers;
    private String healthcheck;
    private String image;
    private Map<String, Object> options;
    private String userHome;
    private String workingDir;
}
