package com.apsrtc.userservice.exception;

public class LeaveNotFoundException extends RuntimeException {
    public LeaveNotFoundException(String message) {
        super(message);
    }
}
