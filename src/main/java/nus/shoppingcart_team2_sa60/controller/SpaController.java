package nus.shoppingcart_team2_sa60.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


// Single Page Application Controller
// This is a controller that helps to integrate ReactJS and Spring
// After running 'mvn package' and then 'mvn spring-boot:run'
// It is possible to access the entire website on localhost:8080, no need for 2 servers!!
@Controller
public class SpaController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
