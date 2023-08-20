package com.kapeta.schemas.entity;

import java.io.IOException;

public enum DeploymentKind {
    CORE_DEPLOYMENT;

    public String toValue() {
        switch (this) {
            case CORE_DEPLOYMENT: return "core/deployment";
        }
        return null;
    }

    public static DeploymentKind forValue(String value) throws IOException {
        if (value.equals("core/deployment")) return CORE_DEPLOYMENT;
        throw new IOException("Cannot deserialize DeploymentKind");
    }
}
