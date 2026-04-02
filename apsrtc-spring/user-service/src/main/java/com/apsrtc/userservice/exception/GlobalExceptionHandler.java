package com.apsrtc.userservice.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(
                error -> errors.put(error.getField(), error.getDefaultMessage())
        );
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                "Request validation failed");
        problem.setTitle("Validation error");
        problem.setInstance(URI.create(request.getRequestURI()));
        problem.setProperty("code", "VALIDATION_FAILED");
        problem.setProperty("errors", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem);
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<ProblemDetail> handlePasswordMismatch(
            PasswordMismatchException ex,
            HttpServletRequest request) {
        log.warn("Password mismatch: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.BAD_REQUEST, "Incorrect password", "PASSWORD_MISMATCH",
                        ex.getMessage(), request));
    }

    @ExceptionHandler(DutyAlreadyExistsException.class)
    public ResponseEntity<ProblemDetail> handleDutyAlreadyExists(
            DutyAlreadyExistsException ex,
            HttpServletRequest request) {
        log.warn("Duty already exists: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.CONFLICT, "Duty conflict", "DUTY_EXISTS",
                        "Duty already exists for these details", request));
    }

    @ExceptionHandler(UserOperationException.class)
    public ResponseEntity<ProblemDetail> handleUserOperationException(
            UserOperationException ex,
            HttpServletRequest request) {
        log.warn("User operation failed: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.BAD_REQUEST, "Request failed", "USER_OPERATION_ERROR",
                        ex.getMessage(), request));
    }

    @ExceptionHandler(LeaveNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleLeaveNotFound(
            LeaveNotFoundException ex,
            HttpServletRequest request) {
        log.warn("Leave not found: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.NOT_FOUND, "Leave not found", "LEAVE_NOT_FOUND",
                        ex.getMessage(), request));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ProblemDetail> handleAccessDenied(
            AccessDeniedException ex,
            HttpServletRequest request) {
        log.warn("Forbidden: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.FORBIDDEN, "Forbidden", "FORBIDDEN",
                        ex.getMessage(), request));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ProblemDetail> handleIllegalArgument(
            IllegalArgumentException ex,
            HttpServletRequest request) {
        log.warn("Bad request: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.BAD_REQUEST, "Invalid argument", "INVALID_ARGUMENT",
                        ex.getMessage(), request));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleUnhandled(Exception ex, HttpServletRequest request) {
        log.error("Unhandled error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem(HttpStatus.INTERNAL_SERVER_ERROR, "Internal error", "INTERNAL_ERROR",
                        "An unexpected error occurred", request));
    }

    private static ProblemDetail problem(
            HttpStatus status,
            String title,
            String code,
            String detail,
            HttpServletRequest request) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(status, detail);
        pd.setTitle(title);
        pd.setInstance(URI.create(request.getRequestURI()));
        pd.setProperty("code", code);
        return pd;
    }
}
