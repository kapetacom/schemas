package com.blockware.schemas;

import java.util.List;
import java.util.Map;

@lombok.Data
public class BlockTypeSpec {
    private List<String> dependencies;
    private Map<String, Object> schema;
}
