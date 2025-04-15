package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.model.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Integer> {

    @Query("SELECT p " +
            "FROM WishList w " +
                "JOIN w.product p " +
                "JOIN w.customer c " +
            "WHERE c.id = :customerId")
    List<Product> findByCustomerId(@Param("customerId") int customerId);

    @Query("SELECT w " +
            "FROM WishList w " +
                "JOIN w.product p " +
                "JOIN w.customer c " +
            "WHERE c.id = :customerId " +
                "AND p.id = :productId")
    Optional<WishList> findByProductAndCustomerId(@Param("customerId") int customerId, @Param("productId") int productId);
}
