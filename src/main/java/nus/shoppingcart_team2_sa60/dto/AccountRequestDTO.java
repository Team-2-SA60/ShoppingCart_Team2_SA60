package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountRequestDTO {

    @Size(min = 1, max = 50, message = "Name must be between 1 to 50 characters")
    private String name;

    @Size(min = 1, max = 50, message = "Email must be between 1 to 50 characters")
    @Email
    private String email;

    @Size(min = 1, max = 50, message = "Password must be between 1 to 50 characters")
    private String password;

    @Size(min = 1, max = 50, message = "New Password must be between 1 to 50 characters")
    private String newPassword;

}
