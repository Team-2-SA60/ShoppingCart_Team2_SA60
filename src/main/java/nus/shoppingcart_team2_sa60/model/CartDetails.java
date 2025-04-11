package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CartDetails {

    // attributes

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Min(1)
    @Max(99)
    private int productQty;

    // constructors

    public CartDetails() {}

}
