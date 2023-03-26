package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class Entity {
    private String description;
    private String name;
    private Map<String, EntityProperty> properties;
    private String type;
    private List<String> values;
}
