package nus.shoppingcart_team2_sa60.validator;

import nus.shoppingcart_team2_sa60.dto.AccountRequestDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AccountValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return AccountRequestDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        AccountRequestDTO account = (AccountRequestDTO) target;

        // During account creation, Name + email + password should be sent
        // If email is present, then name + password MUST be present to create an account
        if (account.getEmail() != null) {
            if (account.getName() == null){
                errors.rejectValue("name", "error.name", "Name is required");
            }
            if (account.getPassword() == null){
                errors.rejectValue("password", "error.password", "Password is required");
            }
        }

        // Password cannot contain space
        if (account.getPassword() != null) {
            if (account.getPassword().contains(" ")) {
                errors.rejectValue("password", "error.password", "Password cannot contain spaces");
            }
        }

        // During password change, current password + new Password should be sent
        if (account.getNewPassword() != null){

            // New password cannot contain space
            if (account.getNewPassword().contains(" ")) {
                errors.rejectValue("password", "error.password", "Password cannot contain spaces");
            }

            // If new password is present, then current password MUST be present to change password
            if (account.getPassword() == null){
                errors.rejectValue("password", "error.password", "Password is required");
            }

            // New password cannot be same as current password
            if (account.getPassword().equals(account.getNewPassword())){
                errors.rejectValue("password", "error.password", "New password same as current password");
            }
        }
    }
}
