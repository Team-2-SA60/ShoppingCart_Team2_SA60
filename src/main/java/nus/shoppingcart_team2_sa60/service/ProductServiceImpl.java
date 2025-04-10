package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository pRepo;

    @Override
    public List<Product> findAllProducts() {
        return pRepo.findAll();
    }

    @Override
    public List<Product> findBySearch(String keyword) {
        return pRepo.findProductsBySearch(keyword);
    }

    @Override
    public List<Product> findByCategory(String category) {
        return pRepo.findProductsByCategory(category);
    }
}
