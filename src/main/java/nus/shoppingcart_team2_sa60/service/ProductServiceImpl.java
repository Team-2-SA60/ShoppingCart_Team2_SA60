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
    public Page<Product> sortByNameAsc(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pRepo.sortProductByNameAsc(pageable);
    }

    @Override
    public Page<Product> sortByPriceAsc(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pRepo.sortProductByPriceAsc(pageable);
    }

    @Override
    public Page<Product> sortByNameDesc(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pRepo.sortProductByNameDesc(pageable);
    }

    @Override
    public Page<Product> sortByPriceDesc(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pRepo.sortProductByPriceDesc(pageable);
    }

}
