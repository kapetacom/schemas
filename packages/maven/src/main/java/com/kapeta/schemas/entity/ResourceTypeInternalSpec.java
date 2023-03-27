package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class ResourceTypeInternalSpec {
    private ConfigurationSchema configuration;
    private List<Port> ports;
}
