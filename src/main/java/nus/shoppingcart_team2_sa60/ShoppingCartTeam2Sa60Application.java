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

}
