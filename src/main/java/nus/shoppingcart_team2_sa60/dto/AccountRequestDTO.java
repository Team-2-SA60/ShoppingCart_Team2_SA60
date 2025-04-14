package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
@AllArgsConstructor
public class AccountRequestDTO {

    @Length(min = 1, max = 50, message = "Name must be between 1 to 50 characters")
    @Pattern(regexp = "^\\S.*", message = "Name cannot start with space")
    private String name;

    @Size(min = 1, max = 50, message = "Email must be between 1 to 50 characters")
    @Email(message = "Email not in proper format")
    private String email;

    @Size(min = 1, max = 50, message = "Password must be between 1 to 50 characters")
    private String password;

    @Size(min = 1, max = 50, message = "New Password must be between 1 to 50 characters")
    private String newPassword;

    public String getTrimmedName() {
        return name.trim();
    }
}
