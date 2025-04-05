package nus.shoppingcart_team2_sa60.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class OrderDetailsId implements Serializable {
    private int orderId; // part of composite key
    private int productId; // part of composite key

    public OrderDetailsId() {}
    public OrderDetailsId(int orderId, int productId) {
        this.orderId = orderId;
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetailsId that = (OrderDetailsId) o;
        return orderId == that.orderId && productId == that.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, productId);
    }
}
