package com.kapeta.schemas.entity;

/**
 * An attachment is a file that is associated with a definition.
 */
@lombok.Data
public class Attachment {
    private AttachmentContent content;
    private String contentType;
    private String filename;
}
