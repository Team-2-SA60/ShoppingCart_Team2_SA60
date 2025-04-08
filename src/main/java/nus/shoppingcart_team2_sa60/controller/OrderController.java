package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.dto.OrderDetailsResponseDTO;
import nus.shoppingcart_team2_sa60.dto.OrderResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService oService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDTO>> orders(HttpSession session, @RequestParam(name = "filter", required=false) String filter) {
        Customer customer = (Customer) session.getAttribute("customer");
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<Order> orders = oService.searchOrdersByCustomerId(customer.getId(), filter);
        return ResponseEntity.ok(orders.stream()
                .map(order -> new OrderResponseDTO(order))
                .toList());
    }

}
