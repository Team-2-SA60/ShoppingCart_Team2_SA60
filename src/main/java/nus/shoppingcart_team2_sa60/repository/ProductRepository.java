package nus.shoppingcart_team2_sa60.repository;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByName(String name);

    Product findByProductId(int productId);

    Product findByProductName(String productName);

    @Query("SELECT p " +
            "FROM Product p " +
            "ORDER BY name ")
    public List<Product> findProductByName(); //sorting by Alphabetical, from A

    @Query("SELECT p " +
            "FROM Product p " +
            "ORDER BY name DESC")
    public List<Product> findProductByNameDesc(); //sorting by Alphabetical, from Z


    @Query("SELECT p " +
            "FROM Products p " +
            "WHERE p.description LIKE '%n'" +
            "ORDER BY name")
    public List<Product> findProductByDescriptionN();

    @Query("SELECT p " +
            "FROM Products p " +
            "WHERE p.description LIKE '%n'" +
            "ORDER BY name DESC")
    public List<Product> findProductByDescriptionNDESC();

    @Query("Select p " +
            "FROM Products p " +
            "ORDER BY p.price")
    public List<Product> findProductByPrice();

}
