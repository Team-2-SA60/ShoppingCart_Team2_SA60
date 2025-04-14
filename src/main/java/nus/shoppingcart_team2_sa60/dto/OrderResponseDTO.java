package nus.shoppingcart_team2_sa60.dto;

import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.Order;

import java.time.LocalDate;
import java.util.List;

@Getter
public class OrderResponseDTO {
    private int id;
    private LocalDate orderDate;
    private String orderStatus;
    private String shippingMethod;
    private Double shippingFee;
    private String shippingAddress;
    private List<OrderDetailsResponseDTO> orderDetails;

    public OrderResponseDTO(Order order) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.orderStatus = order.getOrderStatus();
        this.shippingMethod = order.getShippingMethod();
        this.shippingFee = order.getShippingFee();
        this.shippingAddress = order.getShippingAddress();
        this.orderDetails = order.getOrderDetails().stream()
                .map(OrderDetailsResponseDTO::new)
                .toList();
    }
}
