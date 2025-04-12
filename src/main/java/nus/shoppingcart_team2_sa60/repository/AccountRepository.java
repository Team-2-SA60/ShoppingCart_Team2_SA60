package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmail(String email);
}
