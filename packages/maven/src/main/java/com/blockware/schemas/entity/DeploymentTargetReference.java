package com.blockware.schemas.entity;

@lombok.Data
public class DeploymentTargetReference {
    private String image;
    private String ref;
}
