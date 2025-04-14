package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CheckoutResponseDTO {
    @NotNull
    private final String shippingMethod;
    @Valid
    private final AddressRequestDTO shippingAddress;

    public CheckoutResponseDTO(String shippingMethod, AddressRequestDTO shippingAddress) {
        this.shippingMethod = shippingMethod;
        this.shippingAddress = shippingAddress;
    }
}
