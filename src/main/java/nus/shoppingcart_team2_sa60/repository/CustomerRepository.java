package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c "
            + "FROM Customer c "
            + "WHERE c.email = :e")
    public Customer findByEmail(@Param("e") String email);
}
