INSERT INTO Products (id, name, description, price, discount, image)
VALUES
    (1, 'Duck You', 'Cute Graphic Tee', 15.00, 0, 'duckyou.png'),
    (2, 'Mewing', 'Cat Graphic Tee', 15.00, 5.00, 'mewing.png'),
    (3, 'What The Sigma', 'Cat Graphic Tee', 15.00, 5.00, 'whatthesigma.png'),
    (4, 'Chill Guy', 'Chill Graphic Tee', 15.00, 0.00, 'chillguy.png'),
    (5, 'Me Monkey', 'Monkey Graphic Tee', 15.00, 5.00, 'memonkey.png'),
    (6, 'Ohio Sigma Rizzler', 'Chill Graphic Tee', 15.00, 0.00, 'ohiosigmarizzler.png'),
    (7, 'Professional Napper', 'Cat Graphic Tee', 15.00, 0.00, 'professionalnapper.png');


INSERT INTO Customer (id, name, email, password)
VALUES
    (1, 'Alice', 'alice@example.com', 'password1'),
    (2, 'Bob', 'bob@example.com', 'password2'),
    (3, 'Charlie', 'charlie@example.com', 'password3'),
    (4, 'A', 'a@a.com', 'a'),
    (5, 'KS', 'ks@a.com', 'ks'),
    (6, 'CY', 'cy@a.com', 'cy'),
    (7, 'GY', 'gy@a.com', 'gy'),
    (8, 'BF', 'bf@a.com', 'bf'),
    (9, 'DR', 'dr@a.com', 'dr'),
    (10, 'RX', 'rx@a.com', 'rx');


INSERT INTO Cart (id, customer_id)
VALUES
    (1, 4),
    (2, 5),
    (3, 6),
    (4, 7),
    (5, 8),
    (6, 9),
    (7, 10);

INSERT INTO Cart_Details (cart_item_id, cart_id, product_id, product_qty)
VALUES
    -- Cart with ID 1 has items
    (1, 1, 2, 3),
    (2, 1, 3, 1),

    -- Cart with ID 2 is empty
    -- Cart with ID 3 has items
    (3, 3, 1, 2),
    (4, 3, 5, 1),

    -- Cart with ID 4 is empty
    -- Cart with ID 5 has items
    (5, 5, 4, 2),
    (6, 5, 6, 1),

    -- Cart with ID 6 is empty
    -- Cart with ID 7 has items
    (7, 7, 3, 4);

INSERT INTO Orders (id, customer_id, order_date, order_status)
VALUES
    (1, 4, 04042025, 'completed'),
    (2, 4, 05042025, 'pending'),
    (3, 5, 29032025, 'completed'),
    (4, 5, 01042025, 'completed'),
    (5, 5, 02042025, 'completed'),
    (6, 5, 05042025, 'pending'),
    (7, 6, 01042025, 'completed'),
    (8, 7, 02042025, 'completed'),
    (9, 8, 28032025, 'completed'),
    (10, 9, 30032025, 'completed'),
    (11, 10, 25032025, 'completed'),
    (12, 4, 06042025, 'pending'),
    (13, 4, 07042025, 'pending');


INSERT INTO Order_Details (order_item_id, order_id, product_id, price_at_purchase, product_qty)
VALUES
    (1, 1, 1, 15.00, 5),
    (2, 1, 5, 10.00, 10),
    (3, 2, 2, 10.00, 2),
    (4, 2, 3, 10.00, 3),
    (5, 3, 4, 15.00, 6),
    (6, 4, 7, 15.00, 4),
    (7, 4, 6, 15.00, 2),
    (8, 5, 1, 15.00, 1),
    (9, 6, 2, 10.00, 15),
    (10, 6, 3, 10.00, 3),
    (11, 7, 4, 15.00, 11),
    (12, 8, 5, 10.00, 1),
    (13, 9, 7, 15.00, 9),
    (14, 10, 3, 10.00, 13),
    (15, 11, 6, 15.00, 5),
    (16, 12, 2, 15.00, 1),
    (17, 13, 5, 10.00, 2);



