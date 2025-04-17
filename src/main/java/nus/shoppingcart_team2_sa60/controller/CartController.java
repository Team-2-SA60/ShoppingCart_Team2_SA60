package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Cart;
import nus.shoppingcart_team2_sa60.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService){
        this.cartService = cartService;
    }

    @GetMapping("/cart")
    public ResponseEntity<List<CartDetailsResponseDTO>> getCartByCustomerId(HttpSession session){

        Customer customer = (Customer)session.getAttribute("customer");
        int customerId = customer.getId();

        List<CartDetails> cartDetails = cartService.getCartDetailsByCustomerId(customerId);

        if(cartDetails.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.ok(cartDetails.stream()
                .map(CartDetailsResponseDTO::new)
                .collect(Collectors.toList()));
    }

    @PutMapping("cart/addQty/{id}")
    public ResponseEntity<String> addCartItemQty(@PathVariable("id") int cartItemId){
        cartService.addCartItemQty(cartItemId);
        return ResponseEntity.ok("Qty added successfully");
    }

    @PutMapping("cart/minusQty/{id}")
    public ResponseEntity<String> minusCartItemQty(@PathVariable("id") int cartItemId){
        cartService.minusCartItemQty(cartItemId);
        return ResponseEntity.ok("Qty deducted successfully");
    }

    @PutMapping("cart/setQty/{id}")
    public ResponseEntity<String> setCartItemQty(@PathVariable("id") int cartItemId, @RequestBody Map<String, Integer> payLoad){
        int qty = payLoad.get("qty");
        cartService.setCartItemQty(cartItemId, qty);
        return ResponseEntity.ok("Qty set successfully");
    }

    @DeleteMapping("cart/delete/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable("id") int cartItemId){
        cartService.deleteItemFromCart(cartItemId);
        return ResponseEntity.ok("Item deleted successfully");
    }

    @PostMapping("addToCart/{id}")
    public ResponseEntity<?> addToCart(@PathVariable("id") int productId, @RequestBody Map<String, Integer> payLoad, HttpSession session){
        int qty = payLoad.get("qty");

        Customer customer = (Customer)session.getAttribute("customer");
        Cart cart = cartService.findCartByCustomerId(customer.getId());

        boolean maxQtyReached = cartService.addProductToCart(cart, productId, qty);
        if(maxQtyReached){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of("message", "Item added to cart. Adjusted to max allowed quantity of 99."));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of("message", "Item added to cart."));
        }
    }

}
