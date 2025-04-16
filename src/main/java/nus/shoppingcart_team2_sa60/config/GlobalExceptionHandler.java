package nus.shoppingcart_team2_sa60.config;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Guide from:
    // https://medium.com/@cat.edelveis/creating-spring-boot-custom-validators-17790c33447e

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = new HashMap<>();
        List<String> errorMessages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String errorMessage = error.getDefaultMessage();
            errorMessages.add(errorMessage);
        });
        errors.put("message", errorMessages);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, List<String>>> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String,List<String>> errors = new HashMap<>();
        List<String> errorMessages = new ArrayList<>();
        ex.getConstraintViolations().forEach(violation -> {
            String errorMessage = violation.getMessage();
            errorMessages.add(errorMessage);
        });
        errors.put("message", errorMessages);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }


}
