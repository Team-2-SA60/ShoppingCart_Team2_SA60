package nus.shoppingcart_team2_sa60.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    public static LocalDate ccExpiryToDateTime(String ccExpiry) {
        DateTimeFormatter dF = DateTimeFormatter.ofPattern("dd/MM/yy");
        return LocalDate.parse(ccExpiry, dF);
    }

    public static LocalDate today() {
        return LocalDate.now();
    }

    public static String orderDateToString(LocalDate orderDate) {
        return orderDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
    }
}
