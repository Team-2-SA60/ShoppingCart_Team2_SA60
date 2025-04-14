package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.model.Order;

import java.util.List;

public interface CheckoutService {
    Order saveOrder(int customerId, List<CartDetails> cartDetails, String shippingMethod, String shippingAddress);
}
