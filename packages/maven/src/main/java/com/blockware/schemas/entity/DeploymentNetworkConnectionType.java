package com.blockware.schemas.entity;

import java.io.IOException;

public enum DeploymentNetworkConnectionType {
    RESOURCE, SERVICE;

    public String toValue() {
        switch (this) {
            case RESOURCE: return "resource";
            case SERVICE: return "service";
        }
        return null;
    }

    public static DeploymentNetworkConnectionType forValue(String value) throws IOException {
        if (value.equals("resource")) return RESOURCE;
        if (value.equals("service")) return SERVICE;
        throw new IOException("Cannot deserialize DeploymentNetworkConnectionType");
    }
}
