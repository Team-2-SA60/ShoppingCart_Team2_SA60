package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.CartDetails;

import java.util.List;

public interface CartService {

    List<CartDetails> getCartDetailsByCustomerId(int customerId);
    void  addCartItemQty(int cartDetailsId);
    void  minusCartItemQty(int cartDetailsId);
    void  setCartItemQty(int cartDetailsId, int newQty);
    void  deleteItemFromCart(int cartDetailsId);

}
