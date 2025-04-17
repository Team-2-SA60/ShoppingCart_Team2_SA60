package nus.shoppingcart_team2_sa60.controller;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService pService;

    @GetMapping("/products")
    public Page<Product> findProducts(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "4") int size,
                                      @RequestParam(defaultValue = "") String keyword,
                                      @RequestParam(defaultValue = "id") String sortBy,
                                      @RequestParam(defaultValue = "asc") String sortOrder) {

        return pService.findProducts(page, size, keyword, sortBy, sortOrder);
    }

    @GetMapping("/products/{category}")
    public Page<Product> findByCategory(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "4") int size,
                                        @PathVariable String category,
                                        @RequestParam(defaultValue = "id") String sortBy,
                                        @RequestParam(defaultValue = "asc") String sortOrder) {

        return pService.findByCategory(page, size, category, sortBy, sortOrder);
    }

}
