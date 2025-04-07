package nus.shoppingcart_team2_sa60.config;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@org.springframework.core.annotation.Order(2)
public class CustomerDataInitialiser implements CommandLineRunner {

    @Autowired
    private CustomerRepository cRepo;

    @Override
    public void run(String... args) throws Exception {
        cRepo.save(new Customer("Alice", "alice@example.com", "password1"));
        cRepo.save(new Customer("Bob", "bob@example.com", "password2"));
        cRepo.save(new Customer("Charlie", "charlie@example.com", "password3"));
        cRepo.save(new Customer("Kin Seng", "ks@c.com", "ks"));
    }
}
