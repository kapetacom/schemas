package com.blockware.schemas;

import java.util.List;

@lombok.Data
public class PlanSpec {
    private List<BlockInstance> blocks;
    private List<Connection> connections;
}
