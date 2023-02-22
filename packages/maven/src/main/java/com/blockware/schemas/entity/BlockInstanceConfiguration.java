package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class BlockInstanceConfiguration {
    private Map<String, Object> configuration;
    private String id;
}
