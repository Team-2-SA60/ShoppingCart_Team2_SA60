DROP TABLE IF EXISTS cart_details;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS wish_list;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customer;

CREATE TABLE products (
    id                  INT             NOT NULL    AUTO_INCREMENT,
    name                VARCHAR(255),
    description         VARCHAR(255),
    category            VARCHAR(255),
    price               FLOAT,
    discount            FLOAT,
    image               VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE customer (
    id                          INT             NOT NULL    AUTO_INCREMENT,
    name                        VARCHAR(255)    NOT NULL,
    email                       VARCHAR(255)    NOT NULL,
    password                    VARCHAR(255)    NOT NULL,
    address                     VARCHAR(255),
    credit_card_name            VARCHAR(255),
    credit_card_number          VARCHAR(255),
    credit_card_expiry_month    VARCHAR(255),
    credit_card_expiry_year     VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE wish_list (
    id                  INT             NOT NULL    AUTO_INCREMENT,
    customer_id         INT             NOT NULL,
    product_id          INT             NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id)   REFERENCES  customer(id),
    FOREIGN KEY (product_id)    REFERENCES  products(id)
);

CREATE TABLE cart (
    id                  INT             NOT NULL    AUTO_INCREMENT,
    customer_id         INT             NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id)   REFERENCES  customer(id)
);

CREATE TABLE cart_details (
    cart_item_id    INT     NOT NULL        AUTO_INCREMENT,
    cart_id         INT     ,
    product_id      INT     NOT NULL,
    product_qty     INT     NOT NULL,
    PRIMARY KEY (cart_item_id),
    FOREIGN KEY (cart_id)       REFERENCES cart(id),
    FOREIGN KEY (product_id)    REFERENCES products(id)
);

CREATE TABLE orders (
    id                  INT             NOT NULL    AUTO_INCREMENT,
    order_date          DATE            NOT NULL,
    order_status        VARCHAR(255)    NOT NULL,
    shipping_fee        FLOAT           NOT NULL,
    shipping_method     VARCHAR(255)    NOT NULL,
    shipping_address    VARCHAR(255)    NOT NULL,
    customer_id         INT             NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id)   REFERENCES customer(id)
);

CREATE TABLE order_details (
    order_item_id       INT             NOT NULL    AUTO_INCREMENT,
    price_at_purchase   FLOAT           NOT NULL,
    product_qty         INT             NOT NULL,
    order_id            INT             ,
    product_id          INT             NOT NULL,
    PRIMARY KEY (order_item_id),
    FOREIGN KEY (order_id)      REFERENCES orders(id),
    FOREIGN KEY (product_id)    REFERENCES products(id)
);