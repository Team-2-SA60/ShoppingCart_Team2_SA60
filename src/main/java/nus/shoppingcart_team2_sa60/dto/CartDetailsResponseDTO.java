package nus.shoppingcart_team2_sa60.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import nus.shoppingcart_team2_sa60.model.CartDetails;

@Getter
public class CartDetailsResponseDTO {
    private int id;

    @Min(1)
    @Max(99)
    private int quantity;
    private double unitPrice;
    private String productName;
    private String productImage;
    private String productDescription;

    public CartDetailsResponseDTO(CartDetails cartDetails) {
        // Map only necessary fields
        this.id = cartDetails.getId();
        this.quantity = cartDetails.getProductQty();
        this.unitPrice = cartDetails.getProduct().getPrice();
        this.productName = cartDetails.getProduct().getName();
        this.productImage = cartDetails.getProduct().getImage();
        this.productDescription = cartDetails.getProduct().getDescription();
    }
}
