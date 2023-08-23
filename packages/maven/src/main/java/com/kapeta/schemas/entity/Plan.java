package com.kapeta.schemas.entity;

@lombok.Data
public class Plan {
    private PlanKind kind;
    private Metadata metadata;
    private PlanSpec spec;
}
