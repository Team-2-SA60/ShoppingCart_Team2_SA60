package nus.shoppingcart_team2_sa60.dto;

import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.OrderDetails;
import nus.shoppingcart_team2_sa60.model.Product;

@Getter
public class OrderDetailsResponseDTO {
    private int quantity;
    private double unitPrice;
    private Product product;  // Instead of Product entity

    public OrderDetailsResponseDTO(OrderDetails orderDetails) {
        // Map only necessary fields
        this.quantity = orderDetails.getProductQty();
        this.unitPrice = orderDetails.getPriceAtPurchase();
        this.product = orderDetails.getProduct();
    }
}