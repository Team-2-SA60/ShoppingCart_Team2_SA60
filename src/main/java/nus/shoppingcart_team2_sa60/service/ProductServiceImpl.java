package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository pRepo;

    // Default impl for landing page as well as for search bar
    @Override
    public Page<Product> findProducts(int page, int size, String keyword, String sortBy, String sortOrder) {

        Pageable pageable;

        // Sort by net price, need a separate repo method on its own as we don't store net price as a product attribute
        if (sortBy.equals("price")) {
            pageable = PageRequest.of(page, size);
            return pRepo.findProductsBySearchAndNetPrice(keyword, sortOrder, pageable);
        }

        // Sort by selected attribute (default is "id") and the order
        if (sortOrder.equals("desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }

        return pRepo.findProductsBySearch(keyword, pageable);
    }

    // Impl for category filter
    @Override
    public Page<Product> findByCategory(int page, int size, String category, String sortBy, String sortOrder) {

        Pageable pageable;

        // Sort by net price, need a separate repo method on its own as we don't store net price as a product attribute
        if (sortBy.equals("price")) {
            pageable = PageRequest.of(page, size);
            return pRepo.findProductsByCategoryAndNetPrice(category, sortOrder, pageable);
        }

        // Sort by selected attribute (default is "id") and the order
        if (sortOrder.equals("desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }

        return pRepo.findProductsByCategory(category, pageable);
    }
}
