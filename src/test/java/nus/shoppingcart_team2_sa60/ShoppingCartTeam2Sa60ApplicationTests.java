package nus.shoppingcart_team2_sa60;

import nus.shoppingcart_team2_sa60.dto.AccountRequestDTO;
import nus.shoppingcart_team2_sa60.dto.CreditCardDTO;
import nus.shoppingcart_team2_sa60.model.*;
import nus.shoppingcart_team2_sa60.repository.CartDetailsRepository;
import nus.shoppingcart_team2_sa60.service.*;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@Transactional
@SpringBootTest
class ShoppingCartTeam2Sa60ApplicationTests {

    @Autowired
    private ProductService productService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CartService cartService;
    @Autowired
    private CartDetailsRepository cartDetailsRepo;

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private WishListService wishListService;

    @Test
    void contextLoads() {
    }

    // 1. Use Case (Browse Products): Product List is available for browsing, should not be null or empty
    @Test
    void testProductListAvailableForBrowsing() {
        Page<Product> products = productService.findProducts(1, 4, "");
        assertNotNull(products, "Product list should not be null");
        assertFalse(products.isEmpty(), "Product list should not be empty");
    }

    // 2. Use Case (Login): Can log in with valid credentials
    @Test
    void testSuccessfulLogin(){
        Customer customer = customerService.findCustomerByEmail("a@a.com");
        assertNotNull(customer);
        boolean isPasswordCorrect = customerService.checkPassword(customer, "a");
        assertTrue(isPasswordCorrect);
    }

    // 2. Use Case (Login): Cannot log in with invalid credentials
    @Test
    void testInvalidUser(){
        Customer customer = customerService.findCustomerByEmail("b@a.com");
        assertNull(customer);
    }

    @Test
    void testWrongPassword(){
        Customer customer = customerService.findCustomerByEmail("a@a.com");
        assertNotNull(customer);
        boolean isPasswordCorrect = customerService.checkPassword(customer, "b");
        assertFalse(isPasswordCorrect);
    }

    // 2. Use Case (Log out): Test log out - session should not exist after invalidation
    @Test
    void testLogout() {
        MockHttpSession session = new MockHttpSession();
        session.setAttribute("customer", new Customer());
        session.invalidate();

        try {
            session.getAttribute("customer");
        } catch (IllegalStateException e) {
            System.out.println("Session invalidated - No session found");
        }
    }

    //3. Use Case (Add Product to Cart): Add 1 product to cart
   @Test
    void testAddProductToCart() {
        // Preloaded Customer with empty cart
        Customer customer = customerService.findCustomerByEmail("dr@a.com");
        Cart cart = customer.getCart();
        cartService.addProductToCart(cart, 1, 1);
        assertEquals(1, cart.getCartDetails().size(), "Cart should contain 1 item after addition");
        assertEquals(1, cart.getCartDetails().get(0).getProductQty(), "Quantity of the cart item should be 1");
    }

    //3. Use Case (Add Product Qty to existing product): Success and failure (Cannot exceed 99)
    @Test
    void testAddProductQtyToCart() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartService.addCartItemQty(1);
        assertNotNull(cartDetail, "Cart detail should exist");
        assertEquals(4, cartDetail.getProductQty(), "Cart item's quantity should be 3+1=4");
    }

    @Test
    void testFailedAddProductQtyToCart() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartDetail.setProductQty(99);
        cartService.addCartItemQty(1);
        assertEquals(99, cartDetail.getProductQty(), "Cart item's quantity should not exceed 99");
    }

    //4. Use Case (Minus Product Qty from Cart): Success and failure (Cannot go below 1)
    @Test
    void testMinusProductQtyFromCart() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartService.minusCartItemQty(1);
        assertEquals(2, cartDetail.getProductQty(), "Cart item's quantity should be 3-1=2");
    }

    @Test
    void testFailedMinusProductQtyFromCart() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartDetail.setProductQty(1);
        cartService.minusCartItemQty(1);
        assertEquals(1, cartDetail.getProductQty(), "Cart item's quantity should not go lower than 1");
    }

    //5. Use Case (Set Qty of Product): Success and Failure (cannot go below 1 or over 99)
    @Test
    void testSetProductQtyFromCart() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartService.setCartItemQty(1, 33);
        assertEquals(33, cartDetail.getProductQty(), "Cart item's quantity should be 33");
    }

    @Test
    void testFailedSetProductQtyFromCart() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartService.setCartItemQty(1, -1);
        assertEquals(3, cartDetail.getProductQty(), "Cart item's quantity should remain unchanged if the new quantity is out of bounds");
    }

    @Test
    void testFailedSetProductQtyFromCartTwo() {
        //Preloaded Cart detail with id:1 and qty:3
        CartDetails cartDetail = cartDetailsRepo.findById(1).get();
        cartService.setCartItemQty(1, 2000);
        assertEquals(3, cartDetail.getProductQty(), "Cart item's quantity should remain unchanged if the new quantity is out of bounds");
    }

    //6. Use Case (Checkout): Successfully save order after placing order
    @Test
    void testSuccessCheckout(){
        //Customer with existing cart items with 1 existing order
        Customer customer = customerService.findCustomerById(10);
        List<CartDetails> cartDetails = cartService.getCartDetailsByCustomerId(10);
        assertNotNull(cartDetails, "Cart details should not be null");
        checkoutService.saveOrder(10, cartDetails, "standard", "NUS");
        //check that orders of customer with id has increased
        assertEquals(2, customer.getOrders().size(), "Customer should have 1+1=2 orders");
    }

    //7. Use Case (Browse Purchase History): Test retrieval of order history by customerId & status
    @Test
    void testSearchOrdersByCustomerId(){
        //Customer with 1 existing order
        List<Order> orders = orderService.searchOrdersByCustomerId(10);
        assertNotNull(orders, "Orders should not be null");
        assertEquals(1, orders.size(), "There should be 1 existing order");
    }

    @Test
    void testSearchOrdersByStatus(){
        //Customer with 1 existing completed order
        List<Order> orders = orderService.searchOrdersByCustomerId(10);
        String status = orders.get(0).getOrderStatus();
        assertEquals("completed", status,"Customer should have 1 completed order");
    }

    //8. Use Case (Create account): Test creation of valid account
    @Test
    void testCreateAccountSuccess(){
        AccountRequestDTO accountRequestDTO = new AccountRequestDTO("GY", "gy@gy.com", "GY", "GY");
        Customer newCustomer = accountService.createAccount(accountRequestDTO);
        assertNotNull(newCustomer, "Successfully created account");
    }

    //8. Use Case (Create account): Test creation of invalid account
    @Test
    void testCreateAccountFailure(){
        // Use existing email account: a@a.com
        AccountRequestDTO accountRequestDTO = new AccountRequestDTO("GY", "a@a.com", "GY", "GY");
        Customer newCustomer = accountService.createAccount(accountRequestDTO);
        assertNull(newCustomer, "Failed to create account - email already exists");
    }

    //9. Use Case (Maintain account): Allow insertion/edit of valid data
    @Test
    void testEditNameSuccess(){   // Edit to allowable name 1-50 chars
        Customer a = customerService.findCustomerById(4);
        //Check existing name is still "A"
        assertEquals("A", a.getName());

        accountService.editName(a, "Adrian");
        //Check name is changed to "Adrian"
        assertEquals("Adrian", a.getName());
    }

    @Test
    void testEditPasswordSuccess(){
        Customer a = customerService.findCustomerById(4);
        //Check existing password is still "a"
        assertEquals("a", a.getPassword());

        accountService.editPassword(a, "b");
        //Check password is changed to "b"
        assertEquals("b", a.getPassword());
    }

    @Test
    void testEditAddressSuccess(){
        Customer a = customerService.findCustomerById(4);
        //Check existing address is null
        assertNull(a.getAddress());

        accountService.editAddress(a, "NUS NA 111111");
        //Check address is changed to "  "
        assertEquals("NUS NA 111111", a.getAddress());
    }

    @Test
    void testEditCreditCardSuccess(){
        Customer a = customerService.findCustomerById(4);
        // Check that customer has no credit card at first
        assertNull(accountService.getCreditCard(a).getCreditCardNumber());

        CreditCardDTO creditCard = new CreditCardDTO("a", "1234123412341234", "02/25");
        accountService.editCreditCard(a, creditCard);
        // Check that customer has credit card now
        assertEquals("1234123412341234", accountService.getCreditCard(a).getCreditCardNumber());
    }

    //9. Use Case (Maintain account): Check delete credit card, delete address works
    @Test
    void testDeleteCreditCardSuccess(){
        Customer a = customerService.findCustomerById(4);
        CreditCardDTO creditCard = new CreditCardDTO("a", "1234123412341234", "02/25");
        accountService.editCreditCard(a, creditCard);

        accountService.deleteCreditCard(a);
        assertNull(accountService.getCreditCard(a).getCreditCardNumber());
    }

    @Test
    void testDeleteAddressSuccess(){
        Customer a = customerService.findCustomerById(4);
        accountService.editAddress(a, "NUS NA 111111");
        accountService.deleteAddress(a);
        //Check existing address is now null
        assertNull(a.getAddress());
    }

    //10. Use Case (Wishlist): Retrieve list of wishlist items if exists, Add non-duplicated product, Delete product
    @Test
    void testGetCustomerWishList(){
        // Existing customer with empty wishlist
        Customer a = customerService.findCustomerById(4);
        List<Product> wishlist = wishListService.getCustomerWishList(a);

        // check that wishlist is empty
        assertTrue(wishlist.isEmpty(), "Wishlist should be empty");
    }

    @Test
    void testAddToWishList(){
        Customer a = customerService.findCustomerById(4);
        // Try adding duplicated product to wishlist
        wishListService.addToWishList(a, 1);
        wishListService.addToWishList(a, 1);
        List<Product> wishlist = wishListService.getCustomerWishList(a);

        // check that wishlist is not empty
        assertFalse(wishlist.isEmpty(), "Wishlist should not be empty after adding item");
        assertEquals(1, wishlist.size(), "Wishlist should contain 1 product and not duplicated");
    }

    @Test
    void testRemoveFromWishList(){
        Customer a = customerService.findCustomerById(4);
        // Try adding duplicated product to wishlist
        wishListService.addToWishList(a, 1);

        // Check that removeFromWishList() returned true
        boolean removed = wishListService.removeFromWishList(a, 1);
        assertTrue(removed, "Wishlist item with product_id 1 successfully removed");

        // check that wishlist is not empty
        List<Product> wishlist = wishListService.getCustomerWishList(a);
        assertTrue(wishlist.isEmpty(), "Wishlist should not be empty after adding item");
    }

}
