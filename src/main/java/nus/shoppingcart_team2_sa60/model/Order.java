package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Orders")
public class Order {

    // attributes

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private LocalDate orderDate;
    private String orderStatus;
    private String shippingMethod;
    private Double shippingFee;
    public String shippingAddress;

    @OneToMany(mappedBy = "order")
    private List<OrderDetails> orderDetails;

    // constructors

    public Order () {}
    public Order (Customer customer, LocalDate orderDate, String orderStatus) {
        this.customer = customer;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
    }
}
