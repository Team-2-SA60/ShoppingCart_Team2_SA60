package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                "OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> findProductsBySearch(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "WHERE LOWER(p.category) = LOWER(:category)")
    Page<Product> findProductsByCategory(@Param("category") String category, Pageable pageable);

        @Query("SELECT p FROM Product p " +
        "ORDER BY " +
        " p.name ASC ")
        Page<Product> sortProductByNameAsc(Pageable pageable);

        @Query("SELECT p FROM Product p " +
        "ORDER BY " +
        "(p.price - p.discount) ASC " )
        Page<Product> sortProductByPriceAsc(Pageable pageable);

        @Query("SELECT p FROM Product p " +
        "ORDER BY " +
        " p.name DESC ")
        Page<Product> sortProductByNameDesc(Pageable pageable);

        @Query("SELECT p FROM Product p " +
        "ORDER BY " +
        "(p.price - p.discount) DESC " )
        Page<Product> sortProductByPriceDesc(Pageable pageable);
 


}
