package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Order_Details")
public class OrderDetails {

    // attributes

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private int id;

//    @ManyToOne
//    @JoinColumn(name = "order_id")
//    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int productQty;
    private double priceAtPurchase;

    // constructors

    public OrderDetails() {}

    public OrderDetails(Product product, int productQty, double priceAtPurchase) {
        this.product = product;
        this.productQty = productQty;
        this.priceAtPurchase = priceAtPurchase;
    }
}
