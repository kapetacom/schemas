package com.kapeta.schemas.entity;

import java.io.IOException;

public enum AttachmentContentType {
    BASE64, BASE64_GZIP, PLAIN, URL;

    public String toValue() {
        switch (this) {
            case BASE64: return "base64";
            case BASE64_GZIP: return "base64-gzip";
            case PLAIN: return "plain";
            case URL: return "url";
        }
        return null;
    }

    public static AttachmentContentType forValue(String value) throws IOException {
        if (value.equals("base64")) return BASE64;
        if (value.equals("base64-gzip")) return BASE64_GZIP;
        if (value.equals("plain")) return PLAIN;
        if (value.equals("url")) return URL;
        throw new IOException("Cannot deserialize AttachmentContentType");
    }
}
