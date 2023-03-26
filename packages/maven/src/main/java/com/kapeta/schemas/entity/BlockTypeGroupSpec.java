package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class BlockTypeGroupSpec {
    private List<BlockInstance> blocks;
    private List<Connection> connections;
}
