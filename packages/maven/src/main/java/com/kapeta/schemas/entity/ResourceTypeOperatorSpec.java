package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class ResourceTypeOperatorSpec {
    private TypedValue color;
    private Map<String, Object> configuration;
    private TypedValue icon;
    private List<Port> ports;
}
