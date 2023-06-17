package com.kapeta.schemas.entity;

import java.io.IOException;

public enum EntityType {
    DTO, ENUM, NATIVE;

    public String toValue() {
        switch (this) {
            case DTO: return "dto";
            case ENUM: return "enum";
            case NATIVE: return "native";
        }
        return null;
    }

    public static EntityType forValue(String value) throws IOException {
        if (value.equals("dto")) return DTO;
        if (value.equals("enum")) return ENUM;
        if (value.equals("native")) return NATIVE;
        throw new IOException("Cannot deserialize EntityType");
    }
}
