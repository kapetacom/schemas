package com.kapeta.schemas.entity;

import java.io.IOException;

public enum LanguageTargetKind {
    CORE_LANGUAGE_TARGET;

    public String toValue() {
        switch (this) {
            case CORE_LANGUAGE_TARGET: return "core/language-target";
        }
        return null;
    }

    public static LanguageTargetKind forValue(String value) throws IOException {
        if (value.equals("core/language-target")) return CORE_LANGUAGE_TARGET;
        throw new IOException("Cannot deserialize LanguageTargetKind");
    }
}
