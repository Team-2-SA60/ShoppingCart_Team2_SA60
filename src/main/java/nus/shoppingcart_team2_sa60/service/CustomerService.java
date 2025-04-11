package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;

public interface CustomerService {
    Customer findCustomerByEmail(String email);
    boolean checkPassword(Customer existingCustomer, String password);
}
