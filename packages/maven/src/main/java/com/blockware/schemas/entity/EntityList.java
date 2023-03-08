package com.blockware.schemas.entity;

import java.util.List;

@lombok.Data
public class EntityList {
    private SourceCode source;
    private List<Entity> types;
}
