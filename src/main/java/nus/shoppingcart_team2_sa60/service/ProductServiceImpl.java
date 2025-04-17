package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository pRepo;

    @Override
    public Page<Product> findProducts(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page, size);
        return pRepo.findProductsBySearch(keyword, pageable);
    }

    @Override
    public Page<Product> findByCategory(int page, int size, String category) {
        Pageable pageable = PageRequest.of(page, size);
        return pRepo.findProductsByCategory(category, pageable);
    }

    @Override
    public List<Product> sortByName() {
        return pRepo.sortProductByName();
    }

    @Override
    public List<Product> sortByNameDesc() {
        return pRepo.sortProductByNameDesc();
    }

    @Override
    public List<Product> sortByPrice() {
        return pRepo.sortProductByPrice();
    }

    @Override
    public List<Product> sortByPriceDesc() {
        return pRepo.sortProductByPriceDesc();
    }
}
