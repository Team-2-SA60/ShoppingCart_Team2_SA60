package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
