package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class ConfigurationSchema {
    private Map<String, Object> defaultValue;
    private Map<String, Object> schema;
    private Map<String, Map<String, Object>> uiSchema;
}
