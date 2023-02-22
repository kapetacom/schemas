package com.blockware.schemas.entity;

@lombok.Data
public class Plan {
    private String kind;
    private Metadata metadata;
    private PlanSpec spec;
}
