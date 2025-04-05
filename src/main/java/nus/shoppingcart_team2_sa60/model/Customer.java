package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Customer {

    // attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String password;
    private String address;
    private String creditCardName;
    private int creditCardNumber;
    private int creditCardExpiryMonth;
    private int creditCardExpiryYear;

    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;

    // constructors

    public Customer() {}
    public Customer(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}
