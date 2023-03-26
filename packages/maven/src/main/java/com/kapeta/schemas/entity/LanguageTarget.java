package com.kapeta.schemas.entity;

@lombok.Data
public class LanguageTarget {
    private String kind;
    private Metadata metadata;
    private LanguageTargetSpec spec;
}
