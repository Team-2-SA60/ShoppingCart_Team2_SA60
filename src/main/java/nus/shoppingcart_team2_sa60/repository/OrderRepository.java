package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT o FROM Order o WHERE o.customer.id = :id")
    List<Order> findOrdersByCustomerId(@Param("id") int customerId);

    @Query("SELECT o FROM Order o WHERE o.customer.id = :id AND o.orderStatus = :status")
    List<Order> findOrdersByStatus(@Param("id") int customerId, @Param("status") String status);
}
