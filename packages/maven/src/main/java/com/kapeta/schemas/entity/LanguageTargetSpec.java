package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class LanguageTargetSpec {
    private Map<String, Object> configuration;
    private List<Versioning> versioning;
}
