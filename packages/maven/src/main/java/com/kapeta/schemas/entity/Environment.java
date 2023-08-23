package com.kapeta.schemas.entity;

@lombok.Data
public class Environment {
    private EnvironmentKind kind;
    private Metadata metadata;
    private EnvironmentSpec spec;
}
