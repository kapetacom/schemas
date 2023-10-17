package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class LocalDevContainer {
    private List<String> env;
    private LocalDevContainerHandlers handlers;
    private String healthcheck;
    private Map<String, Object> hostConfig;
    private String image;
    private Map<String, Object> labels;
    private Map<String, Object> options;
    private String userHome;
    private String workingDir;
}
