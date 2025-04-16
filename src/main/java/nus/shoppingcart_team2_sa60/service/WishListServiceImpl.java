package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.model.WishList;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
import nus.shoppingcart_team2_sa60.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WishListServiceImpl implements WishListService {

    @Autowired
    private WishListRepository wlRepo;

    @Autowired
    private ProductRepository pRepo;

    @Override
    public List<Product> getCustomerWishList(Customer loggedInCustomer) {
        return wlRepo.findByCustomerId(loggedInCustomer.getId());
    }

    @Override
    @Transactional
    public WishList addToWishList(Customer loggedInCustomer, int productId) {

        // Checks Customer's WishList if product had been added before
        // If added before, do NOT add again and return null
        // Otherwise, add product to wishlist
        Optional<WishList> productAlreadyOnWishlist = wlRepo.findByProductAndCustomerId(loggedInCustomer.getId(), productId);

        // If exists
        if (productAlreadyOnWishlist.isPresent()) {
            return null;
        }

        // Get Product using productId
        Optional<Product> product = pRepo.findById(productId);
        if (product.isEmpty()) {
            return null;
        }
        Product productToAdd = product.get();

        // Add
        WishList wishList = new WishList();
        wishList.setProduct(productToAdd);
        wishList.setCustomer(loggedInCustomer);
        return wlRepo.save(wishList);
    }

    @Override
    public boolean removeFromWishList(Customer loggedInCustomer, int productId) {

        // Get Customer's WishList for the specific product
        Optional<WishList> productAlreadyOnWishlist = wlRepo.findByProductAndCustomerId(loggedInCustomer.getId(), productId);

        // If not found, return false
        if (productAlreadyOnWishlist.isEmpty()) {
            return false;
        }

        // If found, delete from wishlist and return true
        productAlreadyOnWishlist.ifPresent(wishList -> wlRepo.delete(wishList));
        return true;
    }

}
