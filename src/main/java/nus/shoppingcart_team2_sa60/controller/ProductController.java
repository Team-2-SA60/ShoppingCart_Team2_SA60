package nus.shoppingcart_team2_sa60.controller;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/products/name")
    public List<Product> sortByName() {
        return pService.sortByName();
    }

    @GetMapping("/products/namedesc")
    public List<Product> sortByNameDesc() {
        return pService.sortByNameDesc();
    }

    @GetMapping("/products/price")
    public List<Product> sortByPrice() {
        return pService.sortByPrice();
    }

    @GetMapping("/products/priceDesc")
    public List<Product> sortByPriceDesc() {
        return pService.sortByPriceDesc();
    }
}
