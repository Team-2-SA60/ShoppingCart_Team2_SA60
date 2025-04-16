package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Page<Product> findProducts(int page, int size, String keyword);
    Page<Product> findByCategory(int page, int size, String category);
    List<Product> sortByName();
    List<Product> sortByNameDesc();
    List<Product> sortByPrice();
    List<Product> sortByPriceDesc();

}
