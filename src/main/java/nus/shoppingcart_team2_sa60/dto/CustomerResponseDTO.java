package nus.shoppingcart_team2_sa60.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.Customer;

@Getter
public class CustomerResponseDTO {
    private int id;
    private String name;
    private String email;

    public CustomerResponseDTO(Customer customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.email = customer.getEmail();
    }
}
