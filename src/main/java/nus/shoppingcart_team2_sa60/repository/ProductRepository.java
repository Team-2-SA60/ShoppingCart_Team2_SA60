package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                "OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findProductsBySearch(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p " +
            "WHERE LOWER(p.category) = LOWER(:category)")
    List<Product> findProductsByCategory(@Param("category") String category);

    @Query("SELECT p FROM Product p " +
            "ORDER BY p.name")
    List<Product> sortProductByName();

}
