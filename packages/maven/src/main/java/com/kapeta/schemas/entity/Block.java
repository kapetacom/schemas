package com.kapeta.schemas.entity;

@lombok.Data
public class Block {
    private String kind;
    private Metadata metadata;
    private BlockdefinitionSpec spec;
}
