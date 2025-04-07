package nus.shoppingcart_team2_sa60.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import nus.shoppingcart_team2_sa60.model.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
}
