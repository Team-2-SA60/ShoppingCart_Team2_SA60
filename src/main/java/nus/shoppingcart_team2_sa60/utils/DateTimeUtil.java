package nus.shoppingcart_team2_sa60.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    // Convert credit card expiry (MM/YY) format and  return LocalDate obj
    public static LocalDate ccExpiryToDateTime(String ccExpiry) {
        DateTimeFormatter dF = DateTimeFormatter.ofPattern("dd/MM/yy");
        return LocalDate.parse(ccExpiry, dF);
    }

    // Return today's date as LocalDate obj
    public static LocalDate today() {
        return LocalDate.now();
    }

    // Convert LocalDate obj into String (e.g. 01 Apr 2025)
    public static String orderDateToString(LocalDate orderDate) {
        return orderDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
    }
}
