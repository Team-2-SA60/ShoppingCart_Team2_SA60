package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class OrderDetails {
    @EmbeddedId
    private OrderDetailsId orderDetailsId;

    // attributes

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Orders orders;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Products product;

    private int productQty;
    private double priceAtPurchase;

    // constructors

    public OrderDetails() {}
}
