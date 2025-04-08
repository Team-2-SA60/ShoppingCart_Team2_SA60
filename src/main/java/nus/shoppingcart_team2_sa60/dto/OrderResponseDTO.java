package nus.shoppingcart_team2_sa60.dto;

import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.model.OrderDetails;

import java.util.List;

@Getter
public class OrderResponseDTO {
    private int id;
    private int orderDate;
    private String orderStatus;
    private List<OrderDetailsResponseDTO> orderDetails;

    public OrderResponseDTO(Order order) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.orderStatus = order.getOrderStatus();
        this.orderDetails = order.getOrderDetails().stream()
                .map(OrderDetailsResponseDTO::new)
                .toList();
    }
}
