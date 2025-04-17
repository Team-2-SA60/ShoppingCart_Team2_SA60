package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> searchOrdersByCustomerId(int customerId);
    List<Order> searchOrdersByStatus(int customerId, String status);
}
