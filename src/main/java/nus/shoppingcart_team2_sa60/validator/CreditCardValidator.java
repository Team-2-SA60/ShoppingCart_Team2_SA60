package nus.shoppingcart_team2_sa60.validator;

import nus.shoppingcart_team2_sa60.dto.CreditCardDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CreditCardValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return CreditCardDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CreditCardDTO creditCard = (CreditCardDTO) target;

        if (creditCard.isExpired()) {
            errors.rejectValue("creditCardExpiry", "error.creditCardExpiry", "Credit Card has already expired");
        }
    }
}
