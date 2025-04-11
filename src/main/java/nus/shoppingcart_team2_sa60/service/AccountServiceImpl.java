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

        // Check if customer already exists (by email)
        Optional<Customer> existingCustomer = aRepo.findByEmail(customer.getEmail());
        if (existingCustomer.isPresent()) {
            return null;
        }

        Customer newCustomer = new Customer(customer.getName(), customer.getEmail(), customer.getPassword());
        return aRepo.save(newCustomer);
    }

    @Override
    @Transactional
    public Customer editAccount(Customer loggedInCustomer, Customer newCustomerDetails) {

        // Get up-to-date customer before proceeding to update
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Only allow to change name and password, NOT email
        Customer updatedCustomer = existingCustomer.get();
        updatedCustomer.setName(newCustomerDetails.getName());
        updatedCustomer.setPassword(newCustomerDetails.getPassword());
        return aRepo.save(updatedCustomer);
    }

    @Override
    @Transactional
    public Customer editAddress(Customer loggedInCustomer, String address) {

        // Get up-to-date customer before proceeding to update
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Only allow to change address, NOTHING else
        Customer updatedCustomer = existingCustomer.get();
        updatedCustomer.setAddress(address);
        return aRepo.save(updatedCustomer);
    }

    @Override
    @Transactional
    public Customer editCreditCard(Customer loggedInCustomer, CreditCardRequestDTO creditCardRequestDTO) {
        // Get up-to-date customer before proceeding to update
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Only allow to change credit card information, NOTHING else
        Customer updatedCustomer = existingCustomer.get();
        updatedCustomer.setCreditCardName(creditCardRequestDTO.getCreditCardName());
        updatedCustomer.setCreditCardNumber(creditCardRequestDTO.getCreditCardNumber());
        updatedCustomer.setCreditCardExpiryMonth(creditCardRequestDTO.getCreditCardExpiryMonth());
        updatedCustomer.setCreditCardExpiryYear(creditCardRequestDTO.getCreditCardExpiryYear());
        return aRepo.save(updatedCustomer);
    }
}
