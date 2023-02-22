package com.blockware.schemas.entity;

@lombok.Data
public class Environment {
    private String kind;
    private Metadata metadata;
    private EnvironmentSpec spec;
}
