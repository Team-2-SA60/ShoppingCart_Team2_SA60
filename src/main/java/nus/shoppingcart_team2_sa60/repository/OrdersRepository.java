package nus.shoppingcart_team2_sa60.repository;

import java.util.List;

import nus.shoppingcart_team2_sa60.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Order, Integer> {
}
