package com.kapeta.schemas.entity;

import java.util.Map;

@lombok.Data
public class BlockInstance {
    private AssetReference block;
    private Map<String, Object> defaultConfiguration;
    private Dimensions dimensions;
    private String id;
    private String name;
}
