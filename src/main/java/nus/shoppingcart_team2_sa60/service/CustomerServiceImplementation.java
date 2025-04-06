package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerServiceImplementation implements CustomerInterface {

    @Autowired
    private CustomerRepository cRepo;

    @Override
    public String loginCustomer(String email, String password) {
        Customer customer = cRepo.findByEmail(email);

        if(customer == null) {
            return "Customer not found";
        }

        if(!customer.getPassword().equals(password)) {
            return "Password is incorrect";
        }

        return "Login successful";
    }
}
