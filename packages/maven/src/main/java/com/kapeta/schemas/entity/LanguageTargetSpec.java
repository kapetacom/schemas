package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class LanguageTargetSpec {
    private IconValue icon;
    private List<IconValue> icons;
    private LocalDevContainer local;
    private Map<String, Object> schema;
    private List<Versioning> versioning;
}
