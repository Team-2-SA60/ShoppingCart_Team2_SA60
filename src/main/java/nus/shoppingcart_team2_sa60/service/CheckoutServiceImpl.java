package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.CartDetails;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.model.OrderDetails;
import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private OrderRepository oRepo;

    @Autowired
    private CustomerRepository cRepo;

    @Autowired
    private CartDetailsRepository cdRepo;

    @Override
    public Order saveOrder(int customerId, List<CartDetails> cartDetails, String shippingMethod, String shippingAddress) {
        Order orderToBeSaved = new Order();
        List<OrderDetails> orderDetailsToBeSaved = new ArrayList<>();

        // save customer to order
        orderToBeSaved.setCustomer(cRepo.findById(customerId).get());

        // save order date and order status to order
        orderToBeSaved.setOrderDate(LocalDate.now());
        orderToBeSaved.setOrderStatus("pending");

        // save shipping method, shipping fee, and shipping address to order
        orderToBeSaved.setShippingMethod(shippingMethod);
        orderToBeSaved.setShippingFee(shippingMethod.equals("standard") ? 0.00 : 10.00);
        orderToBeSaved.setShippingAddress(shippingAddress);

        // save order details from cart details
        cartDetails.forEach(cartDetail -> {
            Product product = cartDetail.getProduct();
            OrderDetails orderDetails = new OrderDetails(product, cartDetail.getProductQty(), product.getPrice());
            orderDetailsToBeSaved.add(orderDetails);
        });
        orderToBeSaved.setOrderDetails(orderDetailsToBeSaved);

        // clear cart items from cart after order confirmation
        cdRepo.deleteAll(cartDetails);

        return oRepo.save(orderToBeSaved);
    }

}
