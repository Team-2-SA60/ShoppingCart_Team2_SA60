package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.utils.DateTimeUtil;

import java.time.LocalDate;

@Getter
public class CreditCardDTO {
    @NotBlank(message = "Credit Card Name is required")
    @Size(min = 1, max = 50, message = "Name must be between 1 to 50 characters")
    @Pattern(regexp = "^\\S.*", message = "Name cannot start with space")
    private String creditCardName;

    @NotBlank(message = "Credit Card Number is required")
    @Pattern(regexp = "^\\d{16}$", message = "Credit Card Number must be 16 digits")
    private String creditCardNumber;

    @NotNull(message = "Credit Card Expiry is required")
    @Pattern(regexp = "^\\d{2}/\\d{2}$", message = "Expiry must be in MM/YY format")
    private String creditCardExpiry;

    @Pattern(regexp = "\\d{3}", message = "CVV must be 3 digits")
    private String creditCardCVV;

    public CreditCardDTO() {}

    public CreditCardDTO(Customer customer) {
        if (customer.getCreditCardName() != null) {
            this.creditCardName = customer.getCreditCardName();
        }
        if (customer.getCreditCardNumber() != null) {
            this.creditCardNumber = customer.getCreditCardNumber();
        }
        if (customer.getCreditCardExpiryMonth() != null && customer.getCreditCardExpiryYear() != null) {
            this.creditCardExpiry = customer.getCreditCardExpiryMonth() + "/" + customer.getCreditCardExpiryYear();
        }
    }

    public CreditCardDTO(String creditCardName, String creditCardNumber, String creditCardExpiry) {
        this.creditCardName = creditCardName;
        this.creditCardNumber = creditCardNumber;
        this.creditCardExpiry = creditCardExpiry;
    }

    public String getCreditCardExpiryMonth() {
        if (creditCardExpiry == null) {
            return null;
        }
        return creditCardExpiry.split("/")[0];
    }

    public String getCreditCardExpiryYear() {
        if (creditCardExpiry == null) {
            return null;
        }
        return creditCardExpiry.split("/")[1];
    }

    public boolean isExpired() {
        if (creditCardExpiry == null) {
            return false;
        }

        LocalDate today = DateTimeUtil.today();
        LocalDate ccExpiry = DateTimeUtil.ccExpiryToDateTime("01/" + creditCardExpiry);

        return ccExpiry.plusMonths(1).isBefore(today);
    }

    @Override
    public String toString() {
        return this.creditCardName + " " + this.creditCardNumber + " " + this.creditCardExpiry;
    }
}
