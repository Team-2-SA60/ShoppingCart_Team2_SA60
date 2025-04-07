package nus.shoppingcart_team2_sa60.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@org.springframework.core.annotation.Order(1)
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Allow requests from your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);  // Allow cookies to be sent
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080")  // Allow requests from your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);  // Allow cookies to be sent
    }
}