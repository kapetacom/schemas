package com.blockware.schemas.entity;

@lombok.Data
public class ToEndpoint {
    private String blockId;
    private Port port;
    private String resourceName;
}
