package com.blockware.schemas;

@lombok.Data
public class BlockType {
    private String kind;
    private Metadata metadata;
    private BlockTypeSpec spec;
}
