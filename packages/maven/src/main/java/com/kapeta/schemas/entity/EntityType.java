package com.kapeta.schemas.entity;

import java.io.IOException;

public enum EntityType {
    DTO, ENUM;

    public String toValue() {
        switch (this) {
            case DTO: return "dto";
            case ENUM: return "enum";
        }
        return null;
    }

    public static EntityType forValue(String value) throws IOException {
        if (value.equals("dto")) return DTO;
        if (value.equals("enum")) return ENUM;
        throw new IOException("Cannot deserialize EntityType");
    }
}
