package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class Connection {
    private Endpoint consumer;
    private Map<String, Object> mapping;
    private Port port;
    private Endpoint provider;
}
