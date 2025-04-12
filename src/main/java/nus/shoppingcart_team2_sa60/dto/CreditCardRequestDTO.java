package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreditCardRequestDTO {
    @NotBlank(message = "Credit Card Name is required")
    private String creditCardName;

    @NotBlank(message = "Credit Card Number is required")
    private Integer creditCardNumber;

    @NotBlank(message = "Credit Card Expiry Month is required")
    @Min(value = 1, message = "Expiry month cannot be < 12")
    @Max(value = 12, message = "Expiry month cannot be > 12")
    private Integer creditCardExpiryMonth;

    @NotBlank(message = "Credit Card Expiry Year is required")
    private Integer creditCardExpiryYear;

}
