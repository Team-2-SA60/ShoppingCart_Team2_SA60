package nus.shoppingcart_team2_sa60.config;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.repository.CustomerRepository;
import nus.shoppingcart_team2_sa60.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;

//@Component
@org.springframework.core.annotation.Order(4)
public class OrderDataInitialiser implements CommandLineRunner {

    @Autowired
    private OrderRepository oRepo;
    @Autowired
    private CustomerRepository cRepo;

    @Override
    public void run(String... args) throws Exception {

        Optional<Customer> optionalCustomer1 = cRepo.findById(1);
        Customer customer1 = optionalCustomer1.orElse(null);
        Order order1 = new Order();
        order1.setCustomer(customer1);
        order1.setOrderDate(20250704);
        order1.setOrderStatus("pending");
        order1.setOrderDetails(new ArrayList<>());
        oRepo.save(order1);

        Optional<Customer> optionalCustomer2 = cRepo.findById(2);
        Customer customer2 = optionalCustomer2.orElse(null);
        Order order2 = new Order();
        order2.setCustomer(customer2);
        order2.setOrderDate(20250805);
        order2.setOrderStatus("completed");
        order2.setOrderDetails(new ArrayList<>());
        oRepo.save(order2);

    }

}
