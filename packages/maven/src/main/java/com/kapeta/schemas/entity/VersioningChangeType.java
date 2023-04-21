package com.kapeta.schemas.entity;

import java.io.IOException;

public enum VersioningChangeType {
    CREATE, DELETE, UPDATE;

    public String toValue() {
        switch (this) {
            case CREATE: return "create";
            case DELETE: return "delete";
            case UPDATE: return "update";
        }
        return null;
    }

    public static VersioningChangeType forValue(String value) throws IOException {
        if (value.equals("create")) return CREATE;
        if (value.equals("delete")) return DELETE;
        if (value.equals("update")) return UPDATE;
        throw new IOException("Cannot deserialize VersioningChangeType");
    }
}
