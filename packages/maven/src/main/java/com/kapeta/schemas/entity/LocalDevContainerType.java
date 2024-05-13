package com.kapeta.schemas.entity;

import java.io.IOException;

public enum LocalDevContainerType {
    DOCKER, DOCKERFILE;

    public String toValue() {
        switch (this) {
            case DOCKER: return "docker";
            case DOCKERFILE: return "dockerfile";
        }
        return null;
    }

    public static LocalDevContainerType forValue(String value) throws IOException {
        if (value.equals("docker")) return DOCKER;
        if (value.equals("dockerfile")) return DOCKERFILE;
        throw new IOException("Cannot deserialize LocalDevContainerType");
    }
}
