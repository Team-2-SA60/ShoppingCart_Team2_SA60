package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository cRepo;

    @Override
    public Customer findCustomerById(int id){
        return cRepo.findById(id).get();
    }

    @Override
    public Customer findCustomerByEmail(String email) {
        return cRepo.findByEmail(email);
    }

    @Override
    public boolean checkPassword(Customer existingCustomer, String password) {
        String correctPassword = existingCustomer.getPassword();
        return password.equals(correctPassword);
    }
}
