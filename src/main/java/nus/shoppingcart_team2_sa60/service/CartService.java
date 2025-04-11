package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.model.CartDetails;

import java.util.List;

public interface CartService {

    List<CartDetailsResponseDTO> getCartDetailsByCustomerId(int customerId);
    CartDetails addCartItemQty(int cartDetailsId);
    CartDetails minusCartItemQty(int cartDetailsId);
    CartDetails setCartItemQty(int cartDetailsId, int newQty);
    CartDetails deleteItemFromCart(int cartDetailsId);

}
