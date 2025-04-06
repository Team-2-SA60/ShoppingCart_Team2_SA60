package nus.shoppingcart_team2_sa60.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {

    @GetMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        // Forwards any request which does not have a period in it
        return "forward:/";
    }
}