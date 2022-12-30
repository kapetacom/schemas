package com.blockware.schemas;

@lombok.Data
public class Concept {
    private String kind;
    private Metadata metadata;
    private ConceptSpec spec;
}
