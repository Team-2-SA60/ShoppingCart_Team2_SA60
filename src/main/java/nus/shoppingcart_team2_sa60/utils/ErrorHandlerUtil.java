package nus.shoppingcart_team2_sa60.utils;

import org.springframework.validation.BindingResult;

public class ErrorHandlerUtil {

    public static String handleBindingResult(BindingResult bindingResult) {
        StringBuilder errors = new StringBuilder();
        bindingResult.getFieldErrors().forEach(error -> {
            errors.append(error.getDefaultMessage());
        });
        return errors.toString();
    }
}
