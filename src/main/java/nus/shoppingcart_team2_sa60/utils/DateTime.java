package nus.shoppingcart_team2_sa60.utils;

import java.time.LocalDateTime;

public class DateTime {

    private LocalDateTime now;

    public DateTime() {
        now = LocalDateTime.now();
    }

    public int getYear() {
        return now.getYear();
    }
}
