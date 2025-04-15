package nus.shoppingcart_team2_sa60.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class CustomerInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(CustomerInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // To check if user is logged in
        HttpSession session = request.getSession();

        if (session == null || session.getAttribute("customer") == null) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            String message = "Customer not logged in";
            response.getWriter().write(message);
            logger.info("Outgoing Response: Status = {}, Reason = {}", response.getStatus(), message);
            return false;
        }
        return true;
    }
}
