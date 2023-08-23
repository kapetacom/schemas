package com.kapeta.schemas.entity;

import java.io.IOException;

public enum DeploymentTargetKind {
    CORE_DEPLOYMENT_TARGET;

    public String toValue() {
        switch (this) {
            case CORE_DEPLOYMENT_TARGET: return "core/deployment-target";
        }
        return null;
    }

    public static DeploymentTargetKind forValue(String value) throws IOException {
        if (value.equals("core/deployment-target")) return CORE_DEPLOYMENT_TARGET;
        throw new IOException("Cannot deserialize DeploymentTargetKind");
    }
}
