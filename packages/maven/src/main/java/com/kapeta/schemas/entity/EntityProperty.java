package com.kapeta.schemas.entity;

@lombok.Data
public class EntityProperty {
    private String defaultValue;
    private String description;
    private String format;
    private Boolean global;
    private Boolean primary;
    private String ref;
    private Boolean required;
    private Boolean secret;
    private Boolean sensitive;
    private String type;
}
