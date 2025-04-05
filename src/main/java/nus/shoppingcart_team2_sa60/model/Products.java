package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Products {

    // attributes

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private double price;
    private double discount;
    private String image;

    // constructors

    public Products() {}
    public Products(String name, String description, double price, double discount, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.image = image;
    }

}
