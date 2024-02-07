package com.kapeta.schemas.entity;

import java.io.IOException;

public enum BlockOperatorType {
    IMAGE, INSTANCE;

    public String toValue() {
        switch (this) {
            case IMAGE: return "image";
            case INSTANCE: return "instance";
        }
        return null;
    }

    public static BlockOperatorType forValue(String value) throws IOException {
        if (value.equals("image")) return IMAGE;
        if (value.equals("instance")) return INSTANCE;
        throw new IOException("Cannot deserialize BlockOperatorType");
    }
}
