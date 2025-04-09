package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import java.util.List;

public interface CartService {

    List<CartDetailsResponseDTO> getCartDetailsByCustomerId(int customerId);
//    public void addToCart(CartDetails cartDetails);
//    public void minusFromCart(CartDetails cartDetails);
//    public void deleteFromCart(CartDetails cartDetails);
//    public void setCartQty(CartDetails cartDetails);


}
