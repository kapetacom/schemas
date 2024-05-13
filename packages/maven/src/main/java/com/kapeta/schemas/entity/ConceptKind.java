package com.kapeta.schemas.entity;

import java.io.IOException;

public enum ConceptKind {
    CORE_CONCEPT;

    public String toValue() {
        switch (this) {
            case CORE_CONCEPT: return "core/concept";
        }
        return null;
    }

    public static ConceptKind forValue(String value) throws IOException {
        if (value.equals("core/concept")) return CORE_CONCEPT;
        throw new IOException("Cannot deserialize ConceptKind");
    }
}
