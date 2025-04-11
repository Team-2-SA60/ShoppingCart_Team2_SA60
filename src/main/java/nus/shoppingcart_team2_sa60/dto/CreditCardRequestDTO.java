package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CreditCardRequestDTO {
    @NotBlank
    private int customer_id;

    @NotBlank
    private String creditCardName;

    @NotBlank
    private Integer creditCardNumber;

    @NotBlank
    @Min(1)
    @Max(12)
    private Integer creditCardExpiryMonth;

    @NotBlank
    private Integer creditCardExpiryYear;

    public CreditCardRequestDTO(String creditCardName, Integer creditCardNumber, Integer creditCardExpiryMonth, Integer creditCardExpiryYear) {
        this.creditCardName = creditCardName;
        this.creditCardNumber = creditCardNumber;
        this.creditCardExpiryMonth = creditCardExpiryMonth;
        this.creditCardExpiryYear = creditCardExpiryYear;
    }
}
