package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class Kind {
    private String kind;
    private Metadata metadata;
    private Map<String, Object> spec;
}
