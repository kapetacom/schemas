package com.kapeta.schemas.entity;

import java.io.IOException;

public enum Theme {
    DARK, LIGHT;

    public String toValue() {
        switch (this) {
            case DARK: return "dark";
            case LIGHT: return "light";
        }
        return null;
    }

    public static Theme forValue(String value) throws IOException {
        if (value.equals("dark")) return DARK;
        if (value.equals("light")) return LIGHT;
        throw new IOException("Cannot deserialize Theme");
    }
}
