package nus.shoppingcart_team2_sa60;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.repository.CustomerRepository;

@SpringBootApplication
public class ShoppingCartTeam2Sa60Application {

    public static void main(String[] args) {
        SpringApplication.run(ShoppingCartTeam2Sa60Application.class, args);
    }

    @Bean
    public CommandLineRunner demo(CustomerRepository cRepo) {
        return (args) -> {
            // Save a few customers
            cRepo.save(new Customer("Alice", "alice@example.com", "password1"));
            cRepo.save(new Customer("Bob", "bob@example.com", "password2"));
            cRepo.save(new Customer("Charlie", "charlie@example.com", "password3"));
        };

}}
