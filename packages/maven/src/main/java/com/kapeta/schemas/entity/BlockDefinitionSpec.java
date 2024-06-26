package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class BlockDefinitionSpec {
    private EntityList configuration;
    private List<Resource> consumers;
    private EntityList entities;
    private IconValue icon;
    private List<IconValue> icons;
    private List<Resource> providers;
    private LanguageTargetReference target;
}
