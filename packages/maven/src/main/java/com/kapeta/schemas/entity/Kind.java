package com.kapeta.schemas.entity;

import java.util.List;
import java.util.Map;

@lombok.Data
public class Kind {
    private List<Attachment> attachments;
    private String kind;
    private Metadata metadata;
    private Map<String, Object> spec;
}
