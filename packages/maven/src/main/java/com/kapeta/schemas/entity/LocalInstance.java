package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class LocalInstance {
    private Map<String, Object> credentials;
    private Map<String, String> env;
    private LocalInstanceHealth health;
    private String image;
    private Map<String, String> mounts;
    private Map<String, LocalInstancePort> ports;
    private Boolean singleton;
}
