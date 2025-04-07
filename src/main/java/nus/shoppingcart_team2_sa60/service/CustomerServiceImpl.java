package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerInterface {

    @Autowired
    private CustomerRepository cRepo;

    @Override
    public Customer loginCustomer(String email, String password) {
        Customer customer = cRepo.findByEmail(email);

        if(customer == null) {
            System.out.println("Customer not found");
            return null;
        }

        if(!customer.getPassword().equals(password)) {
            System.out.println("Password does not match");
            return null;
        }

        return customer;
    }
}
