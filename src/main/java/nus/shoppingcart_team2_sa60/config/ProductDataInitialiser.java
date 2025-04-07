package nus.shoppingcart_team2_sa60.config;

import nus.shoppingcart_team2_sa60.model.Product;
import nus.shoppingcart_team2_sa60.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

//@Component
public class ProductDataInitialiser implements CommandLineRunner {
    
    @Autowired
    private ProductRepository pRepo;

    @Override
    public void run(String... args) throws Exception {
        Product product1 = new Product();
        product1.setName("Duck You");
        product1.setDescription("Cute Graphic Tee");
        product1.setPrice(15.00);
        product1.setDiscount(0);
        product1.setImage("duckyou.png");
        pRepo.save(product1);

        Product product2 = new Product();
        product2.setName("Mewing");
        product2.setDescription("Cat Graphic Tee");
        product2.setPrice(15.00);
        product2.setDiscount(5.00);
        product2.setImage("mewing.png");
        pRepo.save(product2);

        Product product3 = new Product();
        product3.setName("What The Sigma");
        product3.setDescription("Cat Graphic Tee");
        product3.setPrice(15.00);
        product3.setDiscount(5.00);
        product3.setImage("whatthesigma.png");
        pRepo.save(product3);

        Product product4 = new Product();
        product4.setName("Chill Guy");
        product4.setDescription("Chill Graphic Tee");
        product4.setPrice(15.00);
        product4.setDiscount(0.00);
        product4.setImage("chillguy.png");
        pRepo.save(product4);

        Product product5 = new Product();
        product5.setName("Me Monkey");
        product5.setDescription("Monkey Graphic Tee");
        product5.setPrice(15.00);
        product5.setDiscount(5.00);
        product5.setImage("memonkey.png");
        pRepo.save(product5);

        Product product6 = new Product();
        product6.setName("Ohio Sigma Rizzler");
        product6.setDescription("Chill Graphic Tee");
        product6.setPrice(15.00);
        product6.setDiscount(0.00);
        product6.setImage("ohiosigmarizzler.png");
        pRepo.save(product6);

        Product product7 = new Product();
        product7.setName("Professional Napper");
        product7.setDescription("Cat Graphic Tee");
        product7.setPrice(15.00);
        product7.setDiscount(0.00);
        product7.setImage("professionalnapper.png");
        pRepo.save(product7);
    }
}
