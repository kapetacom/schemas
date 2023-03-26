package com.kapeta.schemas.entity;

import java.io.IOException;

public enum IconType {
    URL;

    public String toValue() {
        switch (this) {
            case URL: return "url";
        }
        return null;
    }

    public static IconType forValue(String value) throws IOException {
        if (value.equals("url")) return URL;
        throw new IOException("Cannot deserialize IconType");
    }
}
