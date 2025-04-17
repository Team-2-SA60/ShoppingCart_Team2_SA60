package nus.shoppingcart_team2_sa60.controller;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService pService;

    @GetMapping("/products")
    public Page<Product> products(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "4") int size,
                                  @RequestParam(required = false) String keyword) {

        return pService.findProducts(page, size, keyword);
    }

    @GetMapping("/products/{category}")
    public Page<Product> productsByKeyword(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "4") int size,
                                            @PathVariable String category) {

        return pService.findByCategory(page, size, category);
    }

    @GetMapping("/products/name/asc")
    public Page<Product> sortByNameAsc(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "4") int size) {
        return pService.sortByNameAsc(page, size);
    }
    

    @GetMapping("/products/price/asc")
    public Page<Product> sortByPriceAsc(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "4") int size) {
        return pService.sortByPriceAsc(page, size);
    }

    @GetMapping("/products/name/desc")
    public Page<Product> sortByNameDesc(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "4") int size) {
        return pService.sortByNameDesc(page, size);
    }
    

    @GetMapping("/products/price/desc")
    public Page<Product> sortByPriceDesc(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "4") int size) {
        return pService.sortByPriceDesc(page, size);
    }
 
}
