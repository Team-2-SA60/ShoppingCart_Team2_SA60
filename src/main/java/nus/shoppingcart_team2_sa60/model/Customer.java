package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
    private String address;
    private String creditCardName;
    private String creditCardNumber;
    private String creditCardExpiryMonth;
    private String creditCardExpiryYear;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private Cart cart = new Cart(this);

    @OneToMany(mappedBy = "customer")
    private List<Order> orders;

    // constructors

    public Customer() {}
    public Customer(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}
