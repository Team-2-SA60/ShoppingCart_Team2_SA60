package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailsRepository extends JpaRepository<CartDetails, Integer> {

    @Query("SELECT cd " +
            "FROM CartDetails cd " +
            "JOIN cd.cart c " +
            "WHERE c.customer.id = :customerId")
    public List<CartDetails> getCartDetailsByCustomerId(@Param("customerId") int customerId);
}


