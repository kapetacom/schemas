package com.kapeta.schemas.entity;

/**
 * An executable block provides a type of block that does not get deployed as a service.
 * This is typically a command line tool, a desktop block or a mobile app.
 * What's also common for executable blocks is that they do not have direct access to other
 * service blocks, and can't rely on other services or software being available at runtime.
 * They are also typically distributed as a downloadable artifact - like a setup file or a
 * package.
 */
@lombok.Data
public class BlockTypeExecutable {
    private String kind;
    private Metadata metadata;
    private BlockTypeExecutableSpec spec;
}
