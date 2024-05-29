package com.kapeta.schemas.entity;

import java.io.IOException;

public enum EntityType {
    DTO, ENUM, MODEL, NATIVE;

    public String toValue() {
        switch (this) {
            case DTO: return "dto";
            case ENUM: return "enum";
            case MODEL: return "model";
            case NATIVE: return "native";
        }
        return null;
    }

    public static EntityType forValue(String value) throws IOException {
        if (value.equals("dto")) return DTO;
        if (value.equals("enum")) return ENUM;
        if (value.equals("model")) return MODEL;
        if (value.equals("native")) return NATIVE;
        throw new IOException("Cannot deserialize EntityType");
    }
}
