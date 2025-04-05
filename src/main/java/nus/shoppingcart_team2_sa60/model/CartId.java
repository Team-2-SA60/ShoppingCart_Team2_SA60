package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class CartId implements Serializable {
    private int customerId; // part of composite key
    private int productId; // part of composite key

    public CartId() {}
    public CartId(int customerId, int productId) {
        this.customerId = customerId;
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CartId cartId = (CartId) o;
        return customerId == cartId.customerId && productId == cartId.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, productId);
    }
}
