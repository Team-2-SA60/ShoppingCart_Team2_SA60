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
@RequestMapping("/api")
public class AccountController {
    @Autowired
    private AccountService aService;

    @PostMapping("/create-account")
    public ResponseEntity<?> createAccount(@Valid @RequestBody Customer customer, HttpSession session, BindingResult bindingResult) {
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer != null) {
            System.out.println("Customer logged in already");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Customer logged in already");
        }
        if (bindingResult.hasErrors()) {
            System.out.println("Customer validation failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer validation failed");
        }

        System.out.println(customer.getId());

        Customer createdCustomer = aService.createAccount(customer);
        return ResponseEntity.ok(new CustomerResponseDTO(createdCustomer));
    }

}
