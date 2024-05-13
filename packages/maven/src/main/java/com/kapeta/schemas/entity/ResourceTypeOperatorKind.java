package com.kapeta.schemas.entity;

import java.io.IOException;

public enum ResourceTypeOperatorKind {
    CORE_RESOURCE_TYPE_OPERATOR;

    public String toValue() {
        switch (this) {
            case CORE_RESOURCE_TYPE_OPERATOR: return "core/resource-type-operator";
        }
        return null;
    }

    public static ResourceTypeOperatorKind forValue(String value) throws IOException {
        if (value.equals("core/resource-type-operator")) return CORE_RESOURCE_TYPE_OPERATOR;
        throw new IOException("Cannot deserialize ResourceTypeOperatorKind");
    }
}
