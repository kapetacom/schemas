package com.kapeta.schemas.entity;

import java.io.IOException;

public enum VersioningIncrementType {
    MAJOR, MINOR, PATCH;

    public String toValue() {
        switch (this) {
            case MAJOR: return "major";
            case MINOR: return "minor";
            case PATCH: return "patch";
        }
        return null;
    }

    public static VersioningIncrementType forValue(String value) throws IOException {
        if (value.equals("major")) return MAJOR;
        if (value.equals("minor")) return MINOR;
        if (value.equals("patch")) return PATCH;
        throw new IOException("Cannot deserialize VersioningIncrementType");
    }
}
