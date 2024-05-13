package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

/**
 * if type is "docker" or empty - Local development container using a fixed docker image.
 * User code will be mounted into the container.
 * if type is "dockerfile" - Local development container using a Dockerfile. User code will
 * be built into the container.
 */
@lombok.Data
public class LocalDevContainer {
    private List<String> env;
    private LocalDevContainerHandlers handlers;
    private String healthcheck;
    private Map<String, Object> hostConfig;
    private String image;
    private Map<String, Object> labels;
    private Map<String, Object> options;
    private LocalDevContainerType type;
    private String userHome;
    private String workingDir;
    private String file;
}
