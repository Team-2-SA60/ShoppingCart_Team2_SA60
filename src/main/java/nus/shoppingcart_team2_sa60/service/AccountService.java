package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CreditCardRequestDTO;
import nus.shoppingcart_team2_sa60.model.Customer;

public interface AccountService {
    public Customer createAccount(Customer customer);
    public Customer editAccount(Customer loggedInCustomer, Customer newCustomerDetails);
    public Customer editAddress(Customer loggedInCustomer, String address);
    public Customer editCreditCard(Customer loggedInCustomer, CreditCardRequestDTO creditCardRequestDTO);
}
