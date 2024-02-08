package com.kapeta.schemas.entity;

/**
 * Ports that the operator will expose.
 * The primary port is the one that will be used to access the operator.
 */
@lombok.Data
public class OperatorPorts {
    private Port primary;
}
