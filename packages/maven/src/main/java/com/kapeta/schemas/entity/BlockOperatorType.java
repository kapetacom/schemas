package com.kapeta.schemas.entity;

import java.io.IOException;

/**
 * Determines the type of operator.
 * "logical" means the operator is a logical component and won't necessarily actually create
 * a service.
 * "instance" means the operator is an instance and will create a service and be connectable
 * to one or more operators.
 */
public enum BlockOperatorType {
    INSTANCE, LOGICAL;

    public String toValue() {
        switch (this) {
            case INSTANCE: return "instance";
            case LOGICAL: return "logical";
        }
        return null;
    }

    public static BlockOperatorType forValue(String value) throws IOException {
        if (value.equals("instance")) return INSTANCE;
        if (value.equals("logical")) return LOGICAL;
        throw new IOException("Cannot deserialize BlockOperatorType");
    }
}
