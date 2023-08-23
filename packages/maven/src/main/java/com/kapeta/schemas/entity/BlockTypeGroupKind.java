package com.kapeta.schemas.entity;

import java.io.IOException;

public enum BlockTypeGroupKind {
    CORE_BLOCK_TYPE_GROUP;

    public String toValue() {
        switch (this) {
            case CORE_BLOCK_TYPE_GROUP: return "core/block-type-group";
        }
        return null;
    }

    public static BlockTypeGroupKind forValue(String value) throws IOException {
        if (value.equals("core/block-type-group")) return CORE_BLOCK_TYPE_GROUP;
        throw new IOException("Cannot deserialize BlockTypeGroupKind");
    }
}
