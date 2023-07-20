package com.kapeta.schemas.entity;

import java.io.IOException;

public enum LinkType {
    URL;

    public String toValue() {
        switch (this) {
            case URL: return "url";
        }
        return null;
    }

    public static LinkType forValue(String value) throws IOException {
        if (value.equals("url")) return URL;
        throw new IOException("Cannot deserialize LinkType");
    }
}
