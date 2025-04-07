package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.CustomerInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class CustomerController {
    @Autowired
    private CustomerInterface cService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Customer customer, HttpSession session) {
        String email = customer.getEmail();
        String password = customer.getPassword();

        Customer loginedCustomer = cService.loginCustomer(email, password);

        if (loginedCustomer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid account");
        }
        session.setAttribute("customer", loginedCustomer);
        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/check-session")
    public ResponseEntity<Customer> checkSession(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("customer");
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(customer);
    }
}