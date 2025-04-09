package nus.shoppingcart_team2_sa60.service;

import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository oRepo;

    @Override
    public List<Order> searchOrdersByCustomerId(int customerId) {
         return oRepo.findOrdersByCustomerId(customerId);
    }

    @Override
    public List<Order> searchOrdersByStatus(int customerId, String status) {
        return oRepo.findOrdersByStatus(customerId, status);
    }
}
