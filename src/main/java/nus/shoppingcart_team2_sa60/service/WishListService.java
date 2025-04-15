package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.model.WishList;

import java.util.List;

public interface WishListService {
    List<Product> getCustomerWishList(Customer loggedInCustomer);
    WishList addToWishList(Customer loggedInCustomer, Product product);
    boolean removeFromWishList(Customer loggedInCustomer, Product product);
}
