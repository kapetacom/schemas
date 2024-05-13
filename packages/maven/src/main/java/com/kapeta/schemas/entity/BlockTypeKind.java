package com.kapeta.schemas.entity;

import java.io.IOException;

public enum BlockTypeKind {
    CORE_BLOCK_TYPE;

    public String toValue() {
        switch (this) {
            case CORE_BLOCK_TYPE: return "core/block-type";
        }
        return null;
    }

    public static BlockTypeKind forValue(String value) throws IOException {
        if (value.equals("core/block-type")) return CORE_BLOCK_TYPE;
        throw new IOException("Cannot deserialize BlockTypeKind");
    }
}
