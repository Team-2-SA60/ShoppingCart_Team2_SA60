package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProducts();
    List<Product> findBySearch(String keyword);
    List<Product> findByCategory(String category);
    List<Product> sortByName();
}
