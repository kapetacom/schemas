package com.blockware.schemas;

import java.io.IOException;

public enum DeploymentArtifactType {
    DOCKER, MANAGED;

    public String toValue() {
        switch (this) {
            case DOCKER: return "docker";
            case MANAGED: return "managed";
        }
        return null;
    }

    public static DeploymentArtifactType forValue(String value) throws IOException {
        if (value.equals("docker")) return DOCKER;
        if (value.equals("managed")) return MANAGED;
        throw new IOException("Cannot deserialize DeploymentArtifactType");
    }
}
