package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import nus.shoppingcart_team2_sa60.dto.CreditCardRequestDTO;
import nus.shoppingcart_team2_sa60.dto.CustomerResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private AccountService aService;

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@Valid @RequestBody Customer customer, HttpSession session, BindingResult bindingResult) {

        // Checks if Customer RequestBody is valid (name + email + password)
        if (bindingResult.hasErrors())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer validation failed");

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer != null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer logged in already");

        // Saves new customer (proceed to AccountServiceImpl)
        Customer createdCustomer = aService.createAccount(customer);

        // If customer exists already, does not create new customer and returns null;
        if (createdCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer exists already");

        return ResponseEntity.ok(new CustomerResponseDTO(createdCustomer));
    }

    @PutMapping("/edit/name")
    public ResponseEntity<?> editName(@RequestParam(value = "name") String name, HttpSession session) {

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Check RequestParam if empty
        if (name == null || name.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name is empty");

        // Update customer name
        Customer updatedCustomer = aService.editName(loggedInCustomer, name);

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }

    @PutMapping("/edit/password")
    public ResponseEntity<?> editPassword(@RequestParam(name = "currentpassword") String currentPassword,
                                          @RequestParam(name = "newpassword") String newPassword,
                                          HttpSession session) {

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Check RequestParam for newPassword if empty
        if (newPassword == null || newPassword.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is empty");
        // Check RequestParam for newPassword if contains space
        if (newPassword.contains(" "))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password contains space");

        // Check existing password with customer's input
        Customer updateCustomer = aService.checkPassword(loggedInCustomer, currentPassword);
        if (updateCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password entered");

        // Update customer password
        Customer updatedCustomer = aService.editPassword(loggedInCustomer, newPassword);
        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }

    @PutMapping("/edit/address")
    public ResponseEntity<?> editAddress(@RequestBody String address, HttpSession session) {

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer address
        Customer updatedCustomer = aService.editAddress(loggedInCustomer, address);

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok("Saved address successfully");
    }

    @PutMapping("/edit/creditcard")
    public ResponseEntity<?> editCreditCard(@Valid @RequestBody CreditCardRequestDTO creditCard, HttpSession session) {

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
