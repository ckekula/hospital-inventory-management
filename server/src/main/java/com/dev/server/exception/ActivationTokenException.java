package com.dev.server.exception;

public class ActivationTokenException extends RuntimeException {
    public ActivationTokenException(String message) {
        super(message);
    }
}