package nus.shoppingcart_team2_sa60.config;

import nus.shoppingcart_team2_sa60.interceptor.CustomerInterceptor;
import nus.shoppingcart_team2_sa60.interceptor.LoggingInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private CustomerInterceptor customerInterceptor;
    @Autowired
    private LoggingInterceptor loggingInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:8080")  // Allow requests from your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);  // Allow cookies to be sent
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor);
        registry.addInterceptor(customerInterceptor)
                .addPathPatterns("/api/account/edit/*",
                        "/api/account/creditcard",
                        "/api/account/delete/*",
                        "/api/wishlist/*",
                        "/api/orders",
                        "/api/orders/*",
                        "/api/cart",
                        "/api/cart/*",
                        "/api/addToCart/*");
    }
}