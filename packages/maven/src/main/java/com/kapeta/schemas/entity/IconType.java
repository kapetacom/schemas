package com.kapeta.schemas.entity;

import java.io.IOException;

public enum IconType {
    FONTAWESOME5, URL;

    public String toValue() {
        switch (this) {
            case FONTAWESOME5: return "fontawesome5";
            case URL: return "url";
        }
        return null;
    }

    public static IconType forValue(String value) throws IOException {
        if (value.equals("fontawesome5")) return FONTAWESOME5;
        if (value.equals("url")) return URL;
        throw new IOException("Cannot deserialize IconType");
    }
}
