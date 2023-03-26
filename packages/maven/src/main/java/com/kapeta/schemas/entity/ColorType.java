package com.kapeta.schemas.entity;

import java.io.IOException;

public enum ColorType {
    HEX;

    public String toValue() {
        switch (this) {
            case HEX: return "hex";
        }
        return null;
    }

    public static ColorType forValue(String value) throws IOException {
        if (value.equals("hex")) return HEX;
        throw new IOException("Cannot deserialize ColorType");
    }
}
