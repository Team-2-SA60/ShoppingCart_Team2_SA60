package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;
import org.springframework.data.domain.Page;


public interface ProductService {
    Page<Product> findProducts(int page, int size, String keyword, String sortBy, String sortOrder);
    Page<Product> findByCategory(int page, int size, String category, String sortBy, String sortOrder);
}
