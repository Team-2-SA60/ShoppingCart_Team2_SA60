package nus.shoppingcart_team2_sa60.dto;

import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.Order;

import java.util.List;

@Getter
public class OrderResponseDTO {
    private int id;
    private int orderDate;
    private String orderStatus;
    private String shippingMethod;
    private Double shippingFee;
    private List<OrderDetailsResponseDTO> orderDetails;

    public OrderResponseDTO(Order order) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.orderStatus = order.getOrderStatus();
        this.shippingMethod = order.getShippingMethod();
        this.shippingFee = order.getShippingFee();
        this.orderDetails = order.getOrderDetails().stream()
                .map(OrderDetailsResponseDTO::new)
                .toList();
    }
}
