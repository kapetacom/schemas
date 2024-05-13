package com.kapeta.schemas.entity;

import java.io.IOException;

public enum PlanKind {
    CORE_PLAN;

    public String toValue() {
        switch (this) {
            case CORE_PLAN: return "core/plan";
        }
        return null;
    }

    public static PlanKind forValue(String value) throws IOException {
        if (value.equals("core/plan")) return CORE_PLAN;
        throw new IOException("Cannot deserialize PlanKind");
    }
}
