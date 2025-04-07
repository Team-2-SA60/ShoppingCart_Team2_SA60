package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetailsRepository extends JpaRepository<CartDetails, Integer> {
}
