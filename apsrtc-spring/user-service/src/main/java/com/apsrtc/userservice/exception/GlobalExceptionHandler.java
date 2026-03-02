package com.apsrtc.userservice.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

//  This class is basically to centralize all the exception handler logic, and it keeps our controllers and services clean.
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        // We are getting all the errors and fetching the field errors.
        // and then for each of the error we are mapping the field with its corresponding default error message.
        ex.getBindingResult().getFieldErrors().forEach(
                error -> errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<Map<String, String >> handlePasswordMismatch(PasswordMismatchException ex) {
        log.warn(ex.getMessage());
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(DutyAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleDutyAlreadyExists(DutyAlreadyExistsException ex) {
        log.warn("Duty already exists with these details!");
        return ResponseEntity.badRequest().body(Map.of("error", "duty already exists!"));
    }

    @ExceptionHandler(UserOperationException.class)
    public ResponseEntity<String> handleUserOperationException(UserOperationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}

