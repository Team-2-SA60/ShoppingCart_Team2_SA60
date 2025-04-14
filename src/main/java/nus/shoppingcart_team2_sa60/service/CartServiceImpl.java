package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.model.Cart;
import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.CartDetailsRepository;
import nus.shoppingcart_team2_sa60.repository.CartRepository;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private CartDetailsRepository cartDetailsRepo;

    @Autowired
    private ProductRepository productRepo;

    @Override
    public List<CartDetailsResponseDTO> getCartDetailsByCustomerId(int customerId) {
        List<CartDetails> cartDetailsList = cartRepo.getCartDetailsByCustomerId(customerId);

        // Convert to DTO
        return cartDetailsList.stream()
                .map(CartDetailsResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void addCartItemQty(int cartDetailsId) {
        Optional<CartDetails> cartDetails = cartDetailsRepo.findById(cartDetailsId);
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            int newQty = cartDetail.getProductQty() + 1;
            if (newQty >= 1 && newQty <= 99) {
                cartDetail.setProductQty(newQty);
                cartDetailsRepo.save(cartDetail);
            }
        }
    }

    @Override
    public void minusCartItemQty(int cartDetailsId) {
        Optional<CartDetails> cartDetails = cartDetailsRepo.findById(cartDetailsId);
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            int newQty = cartDetail.getProductQty() - 1;
            if (newQty >= 1 && newQty <= 99) {
                cartDetail.setProductQty(newQty);
                cartDetailsRepo.save(cartDetail);
            }
        }
    }

    @Override
    public void setCartItemQty(int cartDetailsId, int newQty) {
        Optional<CartDetails> cartDetails = cartDetailsRepo.findById(cartDetailsId);
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();

            if (newQty >= 1 && newQty <= 99) {
                cartDetail.setProductQty(newQty);
                cartDetailsRepo.save(cartDetail);
            }
        }
    }

    @Override
    public void deleteItemFromCart(int cartDetailsId) {
        Optional<CartDetails> cartDetails = cartDetailsRepo.findById(cartDetailsId);
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            cartDetailsRepo.delete(cartDetail);
        }
    }

    @Override
    public Cart findCartByCustomerId(int customerId) {
        return cartRepo.findCartByCustomer(customerId);
    }

    @Override
    public boolean addProductToCart(Cart cart, int productId, int qty) {
        List<CartDetails> cartDetailsList = cart.getCartDetails();
        CartDetails cartDetail = cartDetailsList.stream()
                .filter(cd -> cd.getProduct().getId() == productId)
                .findFirst()
                .orElse(null);

        boolean maxQtyReached = false;

        if (cartDetail == null) {
            Product product = productRepo.findById(productId).get();
            cartDetail = new CartDetails();
            cartDetail.setProduct(product);
            cartDetail.setProductQty(qty);
            cartDetailsList.add(cartDetail);
        } else {
            int newQty = cartDetail.getProductQty() + qty;
            if(newQty > 99){
                cartDetail.setProductQty(99);
                maxQtyReached = true;
            } else {
                cartDetail.setProductQty(newQty);
            }
        }
        cartDetailsRepo.save(cartDetail);
        return maxQtyReached;
    }
}