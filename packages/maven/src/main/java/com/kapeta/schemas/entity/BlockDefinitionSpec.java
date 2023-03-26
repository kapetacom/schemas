package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class BlockDefinitionSpec {
    private List<Resource> consumers;
    private EntityList entities;
    private List<Resource> providers;
    private LanguageTargetReference target;
}
