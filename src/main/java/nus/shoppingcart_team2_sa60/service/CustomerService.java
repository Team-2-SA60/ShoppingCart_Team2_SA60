package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;

public interface CustomerService {
    public Customer findCustomerByEmail(String email);
    public boolean checkPassword(Customer existingCustomer, String password);
}
