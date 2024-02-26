package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class BlockDefinition {
    private List<Attachment> attachments;
    private String kind;
    private Metadata metadata;
    private BlockDefinitionSpec spec;
}
