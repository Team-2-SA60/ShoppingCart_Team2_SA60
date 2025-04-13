package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AddressRequestDTO {

    @NotBlank(message = "Address cannot be blank")
    @Pattern(regexp = "^[^\\n]*$")
    @Size(min = 1, max = 100, message = "Address must be between 1 to 100 characters")
    private String address;

    @NotBlank(message = "Floor/Unit Number cannot be blank")
    @Size(min = 1, max = 15, message = "Floor/Unit Number must be between 1 to 15 characters")
    @Pattern(regexp = "^[^\\n]*$")
    private String floorUnitNumber;

    @NotBlank(message = "Postal Code cannot be blank")
    @Pattern(regexp = "\\d{6}")
    private String postalCode;

    @Override
    public String toString() {
        return address + "\n" + floorUnitNumber + "\n" + postalCode;
    }
}
