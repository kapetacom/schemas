package com.kapeta.schemas.entity;

/**
 * A block type operator provides a type of block that does not require code to be written.
 * This can be anywhere from a HTTP gateway to a database block.
 * Note that most databases can more easily be implemented as a resource operator.
 * Blocks are good for representing more complex scenarios where there are connections
 * between this and other services.
 * Message queues, for example, are a good example of something that could be an operator
 * block.
 */
@lombok.Data
public class BlockTypeOperator {
    private String kind;
    private Metadata metadata;
    private BlockTypeOperatorSpec spec;
}
