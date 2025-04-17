package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.domain.Page;


public interface ProductService {
    Page<Product> findProducts(int page, int size, String keyword);
    Page<Product> findByCategory(int page, int size, String category);
    Page<Product> sortByNameAsc(int page, int size);
    Page<Product> sortByPriceAsc(int page, int size);
    Page<Product> sortByNameDesc(int page, int size);
    Page<Product> sortByPriceDesc(int page, int size);
}
