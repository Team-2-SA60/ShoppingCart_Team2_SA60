package nus.shoppingcart_team2_sa60.dto;

import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.Customer;

@Getter
public class CustomerResponseDTO {
    private final int id;
    private final String name;
    private final String email;
    private final String address;
    private final int cartSize;

    public CustomerResponseDTO(Customer customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.email = customer.getEmail();
        this.address = customer.getAddress();
        this.cartSize = customer.getCart().getCartDetails().size();

    }
}
