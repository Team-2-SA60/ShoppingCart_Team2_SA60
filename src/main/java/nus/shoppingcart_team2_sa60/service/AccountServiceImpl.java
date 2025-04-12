package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.AccountRequestDTO;
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
    public Customer createAccount(AccountRequestDTO customerAccount) {

        // Check if customer already exists (by email)
        Optional<Customer> existingCustomer = aRepo.findByEmail(customerAccount.getEmail());
        if (existingCustomer.isPresent()) {
            return null;
        }

        Customer newCustomer = new Customer(customerAccount.getName(), customerAccount.getEmail(), customerAccount.getPassword());
        return aRepo.save(newCustomer);
    }

    @Override
    @Transactional
    public Customer editName(Customer loggedInCustomer, String newName) {

        // Get up-to-date customer before proceeding to update
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Set updated name then save;
        Customer updateCustomer = existingCustomer.get();
        updateCustomer.setName(newName);

        return aRepo.save(updateCustomer);
    }

    @Override
    @Transactional
    public Customer editPassword(Customer updateCustomer, String newPassword) {

        // Saves password
        updateCustomer.setPassword(newPassword);
        return aRepo.save(updateCustomer);
    }

    @Override
    public Customer checkPassword(Customer loggedInCustomer, String currentPassword) {

        // Get up-to-date customer to check password
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Checks password
        Customer updateCustomer = existingCustomer.get();
        String correctPassword = updateCustomer.getPassword();
        if (!correctPassword.equals(currentPassword))
            return null;

        return updateCustomer;
    }

    @Override
    @Transactional
    public Customer editAddress(Customer loggedInCustomer, String address) {

        // Get up-to-date customer before proceeding to update
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Only allow to change address, NOTHING else
        Customer updateCustomer = existingCustomer.get();
        updateCustomer.setAddress(address);
        return aRepo.save(updateCustomer);
    }

    @Override
    @Transactional
    public Customer editCreditCard(Customer loggedInCustomer, CreditCardRequestDTO creditCardRequestDTO) {
        // Get up-to-date customer before proceeding to update
        Optional<Customer> existingCustomer = aRepo.findById(loggedInCustomer.getId());
        if (existingCustomer.isEmpty())
            return null;

        // Only allow to change credit card information, NOTHING else
        Customer updateCustomer = existingCustomer.get();
        updateCustomer.setCreditCardName(creditCardRequestDTO.getCreditCardName());
        updateCustomer.setCreditCardNumber(creditCardRequestDTO.getCreditCardNumber());
        updateCustomer.setCreditCardExpiryMonth(creditCardRequestDTO.getCreditCardExpiryMonth());
        updateCustomer.setCreditCardExpiryYear(creditCardRequestDTO.getCreditCardExpiryYear());
        return aRepo.save(updateCustomer);
    }
}
