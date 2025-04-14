package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import nus.shoppingcart_team2_sa60.dto.CartDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.dto.CheckoutResponseDTO;
import nus.shoppingcart_team2_sa60.dto.OrderResponseDTO;
import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.service.CartService;
import nus.shoppingcart_team2_sa60.service.CheckoutService;
import nus.shoppingcart_team2_sa60.utils.ErrorHandlingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CheckoutController {
    @Autowired
    private CartService cartService;

    @Autowired
    private CheckoutService checkoutService;

    @GetMapping("/checkout")
    public ResponseEntity<List<CartDetailsResponseDTO>> prepareOrder(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("customer");

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<CartDetails> cartDetails = cartService.getCartDetailsByCustomerId(customer.getId());
        return ResponseEntity.ok(cartDetails.stream()
                .map(CartDetailsResponseDTO::new)
                .collect(Collectors.toList()));
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@Valid @RequestBody CheckoutResponseDTO checkoutDetails,
                                                        HttpSession session,
                                                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorHandlingUtil.handleBindingErrors(bindingResult));
        }

        Customer customer = (Customer) session.getAttribute("customer");

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<CartDetails> cartDetails = cartService.getCartDetailsByCustomerId(customer.getId());
        String shippingMethod = checkoutDetails.getShippingMethod();
        String shippingAddress = checkoutDetails.getShippingAddress().toString();
        Order savedOrder = checkoutService.saveOrder(customer.getId(), cartDetails, shippingMethod, shippingAddress);

        return ResponseEntity.ok(new OrderResponseDTO(savedOrder));
    }

}
