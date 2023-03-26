package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class EnvironmentService {
    private Map<String, Object> configuration;
    private String id;
    private String kind;
    private String ref;
    private String title;
}
