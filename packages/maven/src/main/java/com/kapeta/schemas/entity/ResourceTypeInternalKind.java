package com.kapeta.schemas.entity;

import java.io.IOException;

public enum ResourceTypeInternalKind {
    CORE_RESOURCE_TYPE_INTERNAL;

    public String toValue() {
        switch (this) {
            case CORE_RESOURCE_TYPE_INTERNAL: return "core/resource-type-internal";
        }
        return null;
    }

    public static ResourceTypeInternalKind forValue(String value) throws IOException {
        if (value.equals("core/resource-type-internal")) return CORE_RESOURCE_TYPE_INTERNAL;
        throw new IOException("Cannot deserialize ResourceTypeInternalKind");
    }
}
