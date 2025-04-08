package nus.shoppingcart_team2_sa60.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import nus.shoppingcart_team2_sa60.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
}
