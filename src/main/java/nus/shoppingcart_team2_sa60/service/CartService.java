package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.model.Cart;
import nus.shoppingcart_team2_sa60.model.Customer;

import java.util.List;

public interface CartService {

    List<CartDetailsResponseDTO> getCartDetailsByCustomerId(int customerId);
    void addCartItemQty(int cartDetailsId);
    void minusCartItemQty(int cartDetailsId);
    void setCartItemQty(int cartDetailsId, int newQty);
    void deleteItemFromCart(int cartDetailsId);

    Cart findCartByCustomerId(int customerId);
    boolean addProductToCart(Cart cart, int productId, int qty);
}
