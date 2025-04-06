package nus.shoppingcart_team2_sa60.controller;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.CustomerInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class CustomerController {
    @Autowired
    private CustomerInterface cService;

    @PostMapping("/login")
    public String login(@RequestBody Customer customer) {
        String email = customer.getEmail();
        String password = customer.getPassword();

        return cService.loginCustomer(email, password);
    }
}