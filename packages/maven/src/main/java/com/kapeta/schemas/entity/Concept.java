package com.kapeta.schemas.entity;

@lombok.Data
public class Concept {
    private ConceptKind kind;
    private Metadata metadata;
    private ConceptSpec spec;
}
