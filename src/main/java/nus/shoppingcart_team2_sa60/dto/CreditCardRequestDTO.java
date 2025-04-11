package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CreditCardRequestDTO {
    @NotNull
    private int customer_id;

    @NotNull
    private String creditCardName;

    @NotNull
    private Integer creditCardNumber;

    @NotNull
    @Min(1)
    @Max(12)
    private Integer creditCardExpiryMonth;

    @NotNull
    private Integer creditCardExpiryYear;

    public CreditCardRequestDTO(String creditCardName, Integer creditCardNumber, Integer creditCardExpiryMonth, Integer creditCardExpiryYear) {
        this.creditCardName = creditCardName;
        this.creditCardNumber = creditCardNumber;
        this.creditCardExpiryMonth = creditCardExpiryMonth;
        this.creditCardExpiryYear = creditCardExpiryYear;
    }
}
