package com.blockware.schemas;

@lombok.Data
public class BlockInstance {
    private AssetReference block;
    private Dimensions dimensions;
    private String id;
    private String name;
}
