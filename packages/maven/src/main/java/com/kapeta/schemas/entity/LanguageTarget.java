package com.kapeta.schemas.entity;

@lombok.Data
public class LanguageTarget {
    private LanguageTargetKind kind;
    private Metadata metadata;
    private LanguageTargetSpec spec;
}
