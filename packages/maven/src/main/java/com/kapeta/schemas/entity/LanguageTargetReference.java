package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class LanguageTargetReference {
    private String kind;
    private Map<String, Object> options;
}
