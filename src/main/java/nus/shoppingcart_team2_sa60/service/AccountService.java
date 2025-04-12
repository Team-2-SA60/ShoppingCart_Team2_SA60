package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CreditCardRequestDTO;
import nus.shoppingcart_team2_sa60.model.Customer;

public interface AccountService {
    public Customer createAccount(Customer customer);
    public Customer editName(Customer loggedInCustomer, String newName);
    public Customer editPassword(Customer updateCustomer, String newPassword);
    public Customer checkPassword(Customer loggedInCustomer, String currentPassword);
    public Customer editAddress(Customer loggedInCustomer, String address);
    public Customer editCreditCard(Customer loggedInCustomer, CreditCardRequestDTO creditCardRequestDTO);
}
