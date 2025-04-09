package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        if(customer == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        int customerId = customer.getId();

        List<CartDetailsResponseDTO> cartDetails = cartService.getCartDetailsByCustomerId(customerId);

        if(cartDetails.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.ok(cartDetails);

    }


}
