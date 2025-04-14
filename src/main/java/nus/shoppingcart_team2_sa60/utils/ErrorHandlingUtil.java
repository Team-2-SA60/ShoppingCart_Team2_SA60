package nus.shoppingcart_team2_sa60.utils;

import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ErrorHandlingUtil {

    public static Map<String, List<String>> handleBindingErrors (BindingResult bindingResult) {
        Map<String, List<String>> errors = new HashMap<>();
        List<String> errorMessages = new ArrayList<>();
        bindingResult.getAllErrors().forEach(error -> {
            String errorMessage = error.getDefaultMessage();
            errorMessages.add(errorMessage);
        });
        errors.put("message", errorMessages);
        return errors;
    }
}
