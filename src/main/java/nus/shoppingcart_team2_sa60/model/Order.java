package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    private Customer customer;

    private int orderDate;
    private String orderStatus;

    @OneToMany(mappedBy = "order")
    private List<OrderDetails> orderDetails;

    // constructors

    public Order () {}
    public Order (int id, Customer customer, int orderDate, String orderStatus) {
        this.customer = customer;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
    }
}
