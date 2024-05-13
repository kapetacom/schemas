package com.kapeta.schemas.entity;

import java.io.IOException;

public enum BlockTypeOperatorKind {
    CORE_BLOCK_TYPE_OPERATOR;

    public String toValue() {
        switch (this) {
            case CORE_BLOCK_TYPE_OPERATOR: return "core/block-type-operator";
        }
        return null;
    }

    public static BlockTypeOperatorKind forValue(String value) throws IOException {
        if (value.equals("core/block-type-operator")) return CORE_BLOCK_TYPE_OPERATOR;
        throw new IOException("Cannot deserialize BlockTypeOperatorKind");
    }
}
