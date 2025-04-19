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

        // Credit card expiry month MUST be within 1 to 12, otherwise it will give error when checking isExpired()
        int expiryMonth = Integer.parseInt(creditCard.getCreditCardExpiryMonth());
        if (expiryMonth < 1 || expiryMonth > 12) {
            errors.rejectValue("creditCardExpiry", "error.creditCardExpiry", "Expiry month must be between 1 and 12");
            return;
        }

        if (creditCard.isExpired()) {
            errors.rejectValue("creditCardExpiry", "error.creditCardExpiry", "Credit Card has already expired");
        }
    }
}
