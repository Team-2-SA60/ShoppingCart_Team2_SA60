package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.dto.CustomerResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CustomerController {

    private final CustomerService cService;

    public CustomerController(CustomerService cService) {
        this.cService = cService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Customer customer, HttpSession session) {
        String email = customer.getEmail();
        String password = customer.getPassword();

        Customer existingCustomer = cService.findCustomerByEmail(email);
        if (existingCustomer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        boolean isPasswordCorrect = cService.checkPassword(existingCustomer, password);
        if(!isPasswordCorrect){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
        }
        session.setAttribute("customer", existingCustomer);
        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/check-session")
    public ResponseEntity<CustomerResponseDTO> checkSession(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("customer");
        if (customer == null) {
            return ResponseEntity.ok(null);
        }
        Customer updatedCustomer = cService.findCustomerById(customer.getId());
        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }

    // GetMapping for logout
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }
}