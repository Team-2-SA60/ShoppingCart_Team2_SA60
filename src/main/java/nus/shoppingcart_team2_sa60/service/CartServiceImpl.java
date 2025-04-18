package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Cart;
import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.CartDetailsRepository;
import nus.shoppingcart_team2_sa60.repository.CartRepository;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepo;

    @Override
    public List<CartDetails> getCartDetailsByCustomerId(int customerId) {
        return cartRepo.getCartDetailsByCustomerId(customerId);
    }

    @Override
    public void addCartItemQty(int cartDetailsId) {
        Optional<CartDetails> cartDetails = cartDetailsRepo.findById(cartDetailsId);

        // +1 to cart item
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            int newQty = cartDetail.getProductQty() + 1;

            // Check that new qty is within 1-99 before saving
            if (newQty >= 1 && newQty <= 99) {
                cartDetail.setProductQty(newQty);
                cartDetailsRepo.save(cartDetail);
            }

        }
    }

    @Override
    public void minusCartItemQty(int cartDetailsId) {
        Optional<CartDetails> cartDetails = cartDetailsRepo.findById(cartDetailsId);

        // -1 to cart item
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            int newQty = cartDetail.getProductQty() - 1;

            // Check that new qty is within 1-99 before saving
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

            // Check that new qty is within 1-99 before saving
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

        // Find if the product is already existing in cart
        CartDetails cartDetail = cartDetailsList.stream()
                .filter(cd -> cd.getProduct().getId() == productId)
                .findFirst()
                .orElse(null);

        // Setup boolean flag to detect if max qty of 99 is reached
        boolean maxQtyReached = false;

        // If product is not in the cart, add product by requested qty (from browsing page)
        if (cartDetail == null) {
            Product product = productRepo.findById(productId).get();
            cartDetail = new CartDetails();
            cartDetail.setProduct(product);
            cartDetail.setProductQty(qty);
            cartDetailsList.add(cartDetail);
        } else {
            // Else if product is alr in cart, add qty to the existing product
            int newQty = cartDetail.getProductQty() + qty;
            // If qty > 99, reset it back to 99
            if(newQty > 99){
                cartDetail.setProductQty(99);
                // Activate boolean flag that max qty was reached
                maxQtyReached = true;
            } else {
                cartDetail.setProductQty(newQty);
            }
        }
        cartDetailsRepo.save(cartDetail);
        // Return boolean flag
        return maxQtyReached;
    }
}