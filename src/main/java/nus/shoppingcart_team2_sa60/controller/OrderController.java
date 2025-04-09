package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.dto.OrderResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService oService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDTO>> orders(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("customer");
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<Order> orders = oService.searchOrdersByCustomerId(customer.getId());
        return ResponseEntity.ok(orders.stream()
                .map(OrderResponseDTO::new)
                .toList());
    }

    @GetMapping("/orders/{status}")
    public ResponseEntity<List<OrderResponseDTO>> ordersByStatus(HttpSession session, @PathVariable("status") String status) {
        Customer customer = (Customer) session.getAttribute("customer");
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<Order> orders = oService.searchOrdersByStatus(customer.getId(), status);
        return ResponseEntity.ok(orders.stream()
                .map(OrderResponseDTO::new)
                .toList());
    }

}
