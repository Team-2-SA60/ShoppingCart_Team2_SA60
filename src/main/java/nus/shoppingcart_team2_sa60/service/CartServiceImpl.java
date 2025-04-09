package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.repository.CartDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartServiceImpl implements CartService {

//    @Autowired
//    private CartRepository cartRepo;

    @Autowired
    private CartDetailsRepository cartDetailsRepo;

    @Override
    public List<CartDetailsResponseDTO> getCartDetailsByCustomerId(int customerId) {
        List<CartDetails> cartDetailsList = cartDetailsRepo.getCartDetailsByCustomerId(customerId);

        // Convert to DTO
        return cartDetailsList.stream()
                .map(cartDetails -> new CartDetailsResponseDTO(cartDetails))
                .collect(Collectors.toList());
    }
//    public void addToCart(CartDetails cartDetails);
//    public void minusFromCart(CartDetails cartDetails);
//    public void deleteFromCart(CartDetails cartDetails);
//    public void setCartQty(CartDetails cartDetails);
}
