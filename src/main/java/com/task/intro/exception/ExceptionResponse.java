package com.task.intro.exception;

import java.time.LocalDateTime;

public record ExceptionResponse(LocalDateTime timestamp, String message, String details) {
}