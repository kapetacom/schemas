package com.kapeta.schemas.entity;

import java.io.IOException;

public enum ResourceTypeExtensionKind {
    CORE_RESOURCE_TYPE_EXTENSION;

    public String toValue() {
        switch (this) {
            case CORE_RESOURCE_TYPE_EXTENSION: return "core/resource-type-extension";
        }
        return null;
    }

    public static ResourceTypeExtensionKind forValue(String value) throws IOException {
        if (value.equals("core/resource-type-extension")) return CORE_RESOURCE_TYPE_EXTENSION;
        throw new IOException("Cannot deserialize ResourceTypeExtensionKind");
    }
}
