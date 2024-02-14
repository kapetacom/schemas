package com.kapeta.schemas.entity;

/**
 * The standard block type which is used to define a block that can be deployed as a
 * service.
 * The expected output of any such block is a docker image that can be deployed to a
 * kubernetes cluster.
 */
@lombok.Data
public class BlockType {
    private String kind;
    private Metadata metadata;
    private BlockTypeSpec spec;
}
