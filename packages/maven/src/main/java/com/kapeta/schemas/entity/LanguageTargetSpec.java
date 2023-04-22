package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class LanguageTargetSpec {
    private ConfigurationSchema configuration;
    private List<Versioning> versioning;
}
