package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CreditCardRequestDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository aRepo;

    @Override
    @Transactional
    public Customer createAccount(Customer customer) {
        Optional<Customer> existingCustomer = aRepo.findByEmail(customer.getEmail());

        if (existingCustomer.isPresent()) {
            return null;
        }

        Customer newCustomer = new Customer(customer.getName(), customer.getEmail(), customer.getPassword());
        return aRepo.save(newCustomer);
    }

    @Override
    @Transactional
    public Customer editAccount(Customer loggedInCustomer, Customer updatedCustomer) {
        return null;
    }

    @Override
    @Transactional
    public Customer editAddress(Customer loggedInCustomer, String address) {
        return null;
    }

    @Override
    @Transactional
    public Customer editCreditCard(Customer loggedInCustomer, CreditCardRequestDTO creditCardRequestDTO) {
        return null;
    }
}
