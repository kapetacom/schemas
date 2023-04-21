package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class Versioning {
    private VersioningIncrementType increment;
    private List<VersioningChangeType> on;
    private List<String> paths;
}
