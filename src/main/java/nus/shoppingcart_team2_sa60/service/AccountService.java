package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.AccountRequestDTO;
import nus.shoppingcart_team2_sa60.dto.CreditCardRequestDTO;
import nus.shoppingcart_team2_sa60.model.Customer;

public interface AccountService {
    Customer createAccount(AccountRequestDTO customerAccount);
    Customer editName(Customer loggedInCustomer, String newName);
    Customer editPassword(Customer updateCustomer, String newPassword);
    Customer checkPassword(Customer loggedInCustomer, String currentPassword);
    Customer editAddress(Customer loggedInCustomer, String address);
    Customer editCreditCard(Customer loggedInCustomer, CreditCardRequestDTO creditCardRequestDTO);
}
