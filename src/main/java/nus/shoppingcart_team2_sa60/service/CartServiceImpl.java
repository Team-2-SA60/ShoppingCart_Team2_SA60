package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.repository.CartDetailsRepository;
import nus.shoppingcart_team2_sa60.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private CartDetailsRepository cartDetailsRepo;

    @Override
    public List<CartDetails> getCartDetailsByCustomerId(int customerId) {
        return cartRepo.getCartDetailsByCustomerId(customerId);
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
}