package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class ResourceTypeOperatorSpec {
    private ColorValue color;
    private Map<String, Object> configuration;
    private IconValue icon;
    private List<Port> ports;
}
