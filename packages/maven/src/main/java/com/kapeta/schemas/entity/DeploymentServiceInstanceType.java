package com.kapeta.schemas.entity;

import java.io.IOException;

public enum DeploymentServiceInstanceType {
    OPERATOR, SERVICE;

    public String toValue() {
        switch (this) {
            case OPERATOR: return "operator";
            case SERVICE: return "service";
        }
        return null;
    }

    public static DeploymentServiceInstanceType forValue(String value) throws IOException {
        if (value.equals("operator")) return OPERATOR;
        if (value.equals("service")) return SERVICE;
        throw new IOException("Cannot deserialize DeploymentServiceInstanceType");
    }
}
