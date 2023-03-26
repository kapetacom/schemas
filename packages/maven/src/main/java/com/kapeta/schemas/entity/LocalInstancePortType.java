package com.kapeta.schemas.entity;

import java.io.IOException;

public enum LocalInstancePortType {
    TCP, UDP;

    public String toValue() {
        switch (this) {
            case TCP: return "tcp";
            case UDP: return "udp";
        }
        return null;
    }

    public static LocalInstancePortType forValue(String value) throws IOException {
        if (value.equals("tcp")) return TCP;
        if (value.equals("udp")) return UDP;
        throw new IOException("Cannot deserialize LocalInstancePortType");
    }
}
