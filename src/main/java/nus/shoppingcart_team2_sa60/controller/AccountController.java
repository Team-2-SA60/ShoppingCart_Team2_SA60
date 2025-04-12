package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import nus.shoppingcart_team2_sa60.dto.AccountRequestDTO;
import nus.shoppingcart_team2_sa60.dto.AddressRequestDTO;
import nus.shoppingcart_team2_sa60.dto.CreditCardRequestDTO;
import nus.shoppingcart_team2_sa60.dto.CustomerResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.AccountService;
import nus.shoppingcart_team2_sa60.utils.ErrorHandlerUtil;
import nus.shoppingcart_team2_sa60.validator.AccountValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private AccountService aService;

    @Autowired
    private AccountValidator aValidator;

    @InitBinder
    public void initAccountBinder(WebDataBinder binder) {
        binder.setValidator(aValidator);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@Valid @RequestBody AccountRequestDTO customerAccount,
                                           HttpSession session,
                                           BindingResult bindingResult) {

        // Checks if AccountRequestDTO RequestBody is valid (name + email + password)
        // Custom validator if got email, MUST have name + password as well
        if (bindingResult.hasErrors()) {
            String errors = ErrorHandlerUtil.handleBindingResult(bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer != null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer logged in already");

        // Saves new customer (proceed to AccountServiceImpl)
        Customer createdCustomer = aService.createAccount(customerAccount);

        // If customer exists already, does not create new customer and returns null;
        if (createdCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer exists already");

        return ResponseEntity.ok(new CustomerResponseDTO(createdCustomer));
    }


    @PutMapping("/edit/name")
    public ResponseEntity<?> editName(@Valid @RequestBody AccountRequestDTO customerAccount,
                                      HttpSession session,
                                      BindingResult bindingResult) {

        // Checks if AccountRequestDTO RequestBody is valid (name only)
        if (bindingResult.hasErrors()) {
            String errors = ErrorHandlerUtil.handleBindingResult(bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer name
        Customer updatedCustomer = aService.editName(loggedInCustomer, customerAccount.getName());

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }


    @PutMapping("/edit/password")
    public ResponseEntity<?> editPassword(@Valid @RequestBody AccountRequestDTO customerAccount,
                                          HttpSession session,
                                          BindingResult bindingResult) {

        // Checks if AccountRequestDTO RequestBody is valid (password + newPassword)
        // Custom validator if got new Password, MUST have current password as well
        if (bindingResult.hasErrors()) {
            String errors = ErrorHandlerUtil.handleBindingResult(bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Check existing password with customer's input
        Customer updateCustomer = aService.checkPassword(loggedInCustomer, customerAccount.getPassword());
        if (updateCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password entered");

        // Update customer password with new password
        Customer updatedCustomer = aService.editPassword(loggedInCustomer, customerAccount.getNewPassword());
        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }


    @PutMapping("/edit/address")
    public ResponseEntity<?> editAddress(@Valid @RequestBody AddressRequestDTO addressDTO,
                                         HttpSession session,
                                         BindingResult bindingResult) {

        // Checks if AddressRequestDTO RequestBody is valid (address)
        if (bindingResult.hasErrors()) {
            String errors = ErrorHandlerUtil.handleBindingResult(bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer address
        Customer updatedCustomer = aService.editAddress(loggedInCustomer, addressDTO.toString());

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok("Saved address successfully");
    }


    @PutMapping("/edit/creditcard")
    public ResponseEntity<?> editCreditCard(@Valid @RequestBody CreditCardRequestDTO creditCard,
                                            HttpSession session,
                                            BindingResult bindingResult) {

        // Checks if CreditCardRequestDTO RequestBody is valid (all credit card info)
        if (bindingResult.hasErrors()) {
            String errors = ErrorHandlerUtil.handleBindingResult(bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer credit card
        Customer updatedCustomer = aService.editCreditCard(loggedInCustomer, creditCard);

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok("Saved credit card successfully");
    }
}
