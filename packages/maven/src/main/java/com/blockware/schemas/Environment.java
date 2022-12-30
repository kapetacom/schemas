package com.blockware.schemas;

@lombok.Data
public class Environment {
    private String kind;
    private Metadata metadata;
    private EnvironmentSpec spec;
}
