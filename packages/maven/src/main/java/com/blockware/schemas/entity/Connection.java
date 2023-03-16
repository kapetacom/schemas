package com.blockware.schemas.entity;

import java.util.Map;

@lombok.Data
public class Connection {
    private Endpoint from;
    private Map<String, Object> mapping;
    private ToEndpoint to;
}
