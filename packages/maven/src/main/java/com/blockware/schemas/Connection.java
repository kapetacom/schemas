package com.blockware.schemas;

import java.util.Map;

@lombok.Data
public class Connection {
    private Endpoint from;
    private Map<String, Object> mapping;
    private Endpoint to;
}
