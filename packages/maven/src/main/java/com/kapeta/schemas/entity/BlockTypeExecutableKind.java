package com.kapeta.schemas.entity;

import java.io.IOException;

public enum BlockTypeExecutableKind {
    CORE_BLOCK_TYPE_EXECUTABLE;

    public String toValue() {
        switch (this) {
            case CORE_BLOCK_TYPE_EXECUTABLE: return "core/block-type-executable";
        }
        return null;
    }

    public static BlockTypeExecutableKind forValue(String value) throws IOException {
        if (value.equals("core/block-type-executable")) return CORE_BLOCK_TYPE_EXECUTABLE;
        throw new IOException("Cannot deserialize BlockTypeExecutableKind");
    }
}
