package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.model.WishList;
import nus.shoppingcart_team2_sa60.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/wishlist")
public class WishListController {
    @Autowired
    private WishListService wlService;

    @GetMapping("/list")
    public ResponseEntity<?> getWishList(HttpSession session) {

        Customer loggedInCustomer = (Customer) session.getAttribute("customer");

        List<Product> customerWishList = wlService.getCustomerWishList(loggedInCustomer);
        return ResponseEntity.ok(customerWishList);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addWishList(HttpSession session, @PathVariable int productId) {

        Customer loggedInCustomer = (Customer) session.getAttribute("customer");

        // Add to wishlist
        WishList addedProduct = wlService.addToWishList(loggedInCustomer, productId);

        // Return 417 error if Product was already in customer's wishlist, product will return as null
        if (addedProduct == null) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Product not added to wishlist");
        }

        return ResponseEntity.ok("Product added to wishlist");
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeWishList(HttpSession session, @PathVariable int productId) {

        Customer loggedInCustomer = (Customer) session.getAttribute("customer");

        // Delete product from wishlist
        boolean deleteSuccess = wlService.removeFromWishList(loggedInCustomer, productId);

        // Return 417 error if product was not in wishlist
        if (!deleteSuccess) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Product not removed from wishlist");
        }

        return ResponseEntity.ok("Product removed from wishlist");
    }
}
