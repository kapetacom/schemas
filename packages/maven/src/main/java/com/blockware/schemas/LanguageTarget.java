package com.blockware.schemas;

@lombok.Data
public class LanguageTarget {
    private String kind;
    private Metadata metadata;
    private LanguageTargetSpec spec;
}
