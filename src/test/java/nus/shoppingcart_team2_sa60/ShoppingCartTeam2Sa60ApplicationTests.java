//package nus.shoppingcart_team2_sa60;
//
//import nus.shoppingcart_team2_sa60.model.Cart;
//import nus.shoppingcart_team2_sa60.model.CartDetails;
//import nus.shoppingcart_team2_sa60.model.Customer;
//import nus.shoppingcart_team2_sa60.model.Product;
//import nus.shoppingcart_team2_sa60.repository.CartDetailsRepository;
//import nus.shoppingcart_team2_sa60.service.CartService;
//import nus.shoppingcart_team2_sa60.service.CustomerService;
//import nus.shoppingcart_team2_sa60.service.ProductService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.mock.web.MockHttpSession;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@Transactional
//@SpringBootTest
//class ShoppingCartTeam2Sa60ApplicationTests {
//
//    @Autowired
//    private ProductService productService;
//
//    @Autowired
//    private CustomerService customerService;
//
//    @Autowired
//    private CartService cartService;
//    @Autowired
//    private CartDetailsRepository cartDetailsRepo;
//
//    @Test
//    void contextLoads() {
//    }
//
//    @BeforeEach
//    public void initializeTestData() {
//        // Initialise 1 cart detail for testing add/set qty
//        CartDetails cartDetailOne = new CartDetails();
//        cartDetailOne.setProductQty(98);
//        cartDetailsRepo.save(cartDetailOne);
//
//        // Initialise 1 cart detail for testing minus qty
//        CartDetails cartDetailTwo = new CartDetails();
//        cartDetailTwo.setProductQty(2);
//        cartDetailsRepo.save(cartDetailTwo);
//    }
//
//    // 1. Use Case (Browse Products): Product List is available for browsing, should not be null or empty
////    @Test
////    void testProductListAvailableForBrowsing() {
////        Page<Product> products = productService.findProducts(1, 4, "");
////        assertNotNull(products, "Product list should not be null");
////        assertFalse(products.isEmpty(), "Product list should not be empty");
////    }
//    // 2. Use Case (Login): Can login with valid credentials
//    @Test
//    void testSuccessfulLogin(){
//        Customer customer = customerService.findCustomerByEmail("a@a.com");
//        assertNotNull(customer);
//        boolean isPasswordCorrect = customerService.checkPassword(customer, "a");
//        assertTrue(isPasswordCorrect);
//    }
//    // 2. Use Case (Login): Cannot login with invalid credentials
//    @Test
//    void testInvalidUser(){
//        Customer customer = customerService.findCustomerByEmail("b@a.com");
//        assertNull(customer);
//    }
//    @Test
//    void testWrongPassword(){
//        Customer customer = customerService.findCustomerByEmail("a@a.com");
//        assertNotNull(customer);
//        boolean isPasswordCorrect = customerService.checkPassword(customer, "b");
//        assertFalse(isPasswordCorrect);
//    }
//    // 2. Use Case (Log out): Test log out - session should not exist after invalidation
//    @Test
//    void testLogout() {
//        MockHttpSession session = new MockHttpSession();
//        session.setAttribute("customer", new Customer());
//        session.invalidate();
//        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
//            session.getAttribute("customer");
//        });
//    }
//
//    //3. Use Case (Add Product to Cart)
//   @Test
//    void testAddProductToCart() {
//        int productId = 1;
//        int qty = 1;
//        Customer customer = customerService.findCustomerByEmail("a@a.com");
//        Cart cart = customer.getCart();
//        boolean maxQtyReached = cartService.addProductToCart(cart, productId, qty);
//
//        assertFalse(maxQtyReached, "Max quantity should not be reached for newly added items");
//        assertEquals(1, cart.getCartDetails().size(), "Cart should contain 1 item after addition");
//        CartDetails cartDetail = cart.getCartDetails().get(0);
//        assertEquals(productId, cartDetail.getProduct().getId(), "Product ID should match the added product");
//        assertEquals(qty, cartDetail.getProductQty(), "Product quantity should match the added quantity");
//    }
//    //3. Use Case (Add Product Qty to existing product): Success and failure (Cannot exceed 99)
//    @Test
//    void testAddProductQtyToCart() {
//        CartDetails cartDetail = cartDetailsRepo.findAll().get(0);
//        cartService.addCartItemQty(cartDetail.getId());
//
//        CartDetails modifiedCartDetail = cartDetailsRepo.findById(cartDetail.getId()).orElse(null);
//        assertNotNull(modifiedCartDetail, "Cart detail should exist");
//        assertEquals(99, modifiedCartDetail.getProductQty(), "Cart item's quantity should be 99 after addition");
//    }
//
//    @Test
//    void testFailedAddProductQtyToCart() {
//        CartDetails cartDetail = cartDetailsRepo.findAll().get(0);
//        cartService.addCartItemQty(cartDetail.getId());
//
//        CartDetails modifiedCartDetail = cartDetailsRepo.findById(cartDetail.getId()).orElse(null);
//        assertNotNull(modifiedCartDetail, "Cart detail should exist");
//        assertEquals(99, modifiedCartDetail.getProductQty(), "Cart item's quantity should not exceed 99");
//    }
//
//    //4. Use Case (Minus Product Qty from Cart): Success and failure (Cannot go below 1)
//    @Test
//    void testMinusProductQtyFromCart() {
//        CartDetails cartDetail = cartDetailsRepo.findAll().get(1);
//        cartService.minusCartItemQty(cartDetail.getId());
//
//        CartDetails modifiedCartDetail = cartDetailsRepo.findById(cartDetail.getId()).orElse(null);
//        assertNotNull(modifiedCartDetail, "Cart detail should exist");
//        assertEquals(1, modifiedCartDetail.getProductQty(), "Cart item's quantity should be 1 after deduction");
//    }
//
//    @Test
//    void testFailedMinusProductQtyFromCart() {
//        CartDetails cartDetail = cartDetailsRepo.findAll().get(1);
//        cartService.minusCartItemQty(cartDetail.getId());
//
//        CartDetails modifiedCartDetail = cartDetailsRepo.findById(cartDetail.getId()).orElse(null);
//        assertNotNull(modifiedCartDetail, "Cart detail should exist");
//        assertEquals(1, modifiedCartDetail.getProductQty(), "Cart item's quantity should not go below 1");
//    }
//
//    //5. Use Case (Set Qty of Product): Success and Failure (cannot go below 1 or over 99)
//    @Test
//    void testSetProductQtyFromCart() {
//        CartDetails cartDetail = cartDetailsRepo.findAll().get(0);
//        cartService.setCartItemQty(cartDetail.getId(), 33);
//
//        CartDetails modifiedCartDetail = cartDetailsRepo.findById(cartDetail.getId()).orElse(null);
//        assertNotNull(modifiedCartDetail, "Cart detail should exist");
//        assertEquals(33, modifiedCartDetail.getProductQty(), "Cart item's quantity should be 33");
//    }
//
//    @Test
//    void testFailedSetProductQtyFromCart() {
//        CartDetails cartDetail = cartDetailsRepo.findAll().get(0);
//        cartService.setCartItemQty(cartDetail.getId(), -1);
//
//        CartDetails modifiedCartDetail = cartDetailsRepo.findById(cartDetail.getId()).orElse(null);
//        assertNotNull(modifiedCartDetail, "Cart detail should exist");
//        assertEquals(98, modifiedCartDetail.getProductQty(), "Cart item's quantity should remain unchanged if the new quantity is out of bounds");
//    }
//
//    //6. Use Case (Checkout)
//
//    //7. Use Case (Browse Purchase History): Test retrieval of order history
//
//    //8. Use Case (Create account): Test creation of valid account
//
//    //8. Use Case (Create account): Test creation of invalid account
//
//    //9. Use Case (Maintain account): Allow insertion/edit of valid data
//
//    //9. Use Case (Maintain account): Disallow invalid data
//
//    //10. Use Case (Wishlist): Retrieve list of wishlist items
//}
