package nus.shoppingcart_team2_sa60.controller;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.service.ProductService;
import nus.shoppingcart_team2_sa60.service.ProductServiceImplementation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

                                            @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductServiceImplementation productServiceImplementation) {
        this.productService = productServiceImplementation;
    }

    @GetMapping("/products")
    public List<Product> findAll() {
        return  productService.findAll();
    }
}
