package nus.shoppingcart_team2_sa60.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import nus.shoppingcart_team2_sa60.model.CartDetails;

import nus.shoppingcart_team2_sa60.model.Cart;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    @Query("SELECT cd " +
            "FROM Cart c " +
            "JOIN c.cartDetails cd " +
            "WHERE c.customer.id = :customerId")
    List<CartDetails> getCartDetailsByCustomerId(@Param("customerId") int customerId);

}
