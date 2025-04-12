package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class CreditCardRequestDTO {
    @NotBlank(message = "Credit Card Name is required")
    @Getter
    private String creditCardName;

    @NotBlank(message = "Credit Card Number is required")
    @Getter
    private String creditCardNumber;

    @NotBlank(message = "Credit Card Expiry is required")
    @Pattern(regexp = "^\\d{2}/\\d{2}$")
    private String creditCardExpiry;

    public String getCreditCardExpiryMonth() {
        return creditCardExpiry.split("/")[0];
    }

    public String getCreditCardExpiryYear() {
        return creditCardExpiry.split("/")[1];
    }

}
