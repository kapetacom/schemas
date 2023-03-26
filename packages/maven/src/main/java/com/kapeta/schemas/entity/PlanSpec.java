package com.kapeta.schemas.entity;

import java.util.List;

@lombok.Data
public class PlanSpec {
    private List<BlockInstance> blocks;
    private List<Connection> connections;
}
