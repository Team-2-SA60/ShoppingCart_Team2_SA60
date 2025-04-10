package nus.shoppingcart_team2_sa60.controller;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService pService;

    @GetMapping("/products")
    public List<Product> products(@RequestParam(required = false) String keyword) {
        System.out.println(keyword);
        if (keyword != null) {
            return pService.findBySearch(keyword);
        }
        return pService.findAllProducts();
    }

    @GetMapping("/products/{category}")
    public List<Product> productsByKeyword(@PathVariable String category) {
        return pService.findByCategory(category);
    }

}
