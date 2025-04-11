package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
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
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer logged in already");

        // Saves new customer (proceed to AccountServiceImpl)
        Customer createdCustomer = aService.createAccount(customer);

        // If customer exists already, does not create new customer and returns null;
        if (createdCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer exists already");

        return ResponseEntity.ok(new CustomerResponseDTO(createdCustomer));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editAccount(@Valid @RequestBody Customer newCustomerDetails, HttpSession session) {
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not logged in");

        Customer updatedCustomer = aService.editAccount(loggedInCustomer, newCustomerDetails);

        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }

    @PutMapping("/edit/address")
    public ResponseEntity<?> editAddress(String address, HttpSession session) {
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not logged in");

        Customer updatedCustomer = aService.editAddress(loggedInCustomer, address);

        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer not updated");

        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }
}
