package com.kapeta.schemas.entity;

import java.io.IOException;

public enum EnvironmentKind {
    CORE_ENVIRONMENT;

    public String toValue() {
        switch (this) {
            case CORE_ENVIRONMENT: return "core/environment";
        }
        return null;
    }

    public static EnvironmentKind forValue(String value) throws IOException {
        if (value.equals("core/environment")) return CORE_ENVIRONMENT;
        throw new IOException("Cannot deserialize EnvironmentKind");
    }
}
