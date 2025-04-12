package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AddressRequestDTO {

    @NotBlank(message = "Address cannot be blank")
    @Size(min = 1, max = 100, message = "Address must be between 1 to 100 characters")
    private String address;

    @NotBlank(message = "Floor/Unit Number cannot be blank")
    @Size(min = 1, max = 15, message = "Floor/Unit Number must be between 1 to 15 characters")
    private String floorUnitNumber;

    @NotBlank(message = "Postal Code cannot be blank")
    @Digits(integer = 6, fraction = 0, message = "Postal Code must be 6 digits")
    private Integer postalCode;

}
