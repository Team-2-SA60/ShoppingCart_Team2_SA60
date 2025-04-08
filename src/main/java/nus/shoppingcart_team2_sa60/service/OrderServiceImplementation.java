package nus.shoppingcart_team2_sa60.service;

import jakarta.transaction.Transactional;
import nus.shoppingcart_team2_sa60.model.Order;
import nus.shoppingcart_team2_sa60.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OrderServiceImplementation implements OrderService {
    @Autowired
    private OrderRepository oRepo;

    @Override
    public List<Order> searchOrdersByCustomerId(int customerId, String filter) {
        if (filter == null) {
            return oRepo.findOrdersByCustomerId(customerId);
        }
        else return null;
    }

}
