package com.blockware.schemas.entity;

@lombok.Data
public class BlockTypeGroup {
    private String kind;
    private Metadata metadata;
    private BlockTypeGroupSpec spec;
}
