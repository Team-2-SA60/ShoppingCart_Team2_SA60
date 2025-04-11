INSERT INTO Products (name, description, category, price, discount, image)
VALUES
    ('Duck You', 'Duck Graphic Tee', 'Cute',15.00, 0.00, 'duckyou.png'),
    ('Mewing', 'Cat Graphic Tee', 'Cute', 15.00, 5.00, 'mewing.png'),
    ('What The Sigma', 'Cat Graphic Tee', 'Cringe',15.00, 5.00, 'whatthesigma.png'),
    ('Chill Guy', 'Chill Graphic Tee', 'Chill',15.00, 0.00, 'chillguy.png'),
    ('Me Monkey', 'Monkey Graphic Tee', 'Cringe', 15.00, 5.00, 'memonkey.png'),
    ('Ohio Sigma Rizzler', 'Chill Graphic Tee', 'Chill',15.00, 0.00, 'ohiosigmarizzler.png'),
    ('Professional Napper', 'Cat Graphic Tee', 'Cute', 15.00, 0.00, 'professionalnapper.png'),
    ('Wow Hi', 'Cat Graphic Tee', 'Cute', 20.00, 0.00, 'wowhi.png'),
    ('Tang Ping', 'Chill Graphic Tee', 'Chill', 15.00, 0.00, 'tangping.png'),
    ('Paused My Game', 'Game Graphic Tee', 'Cringe', 10.00, 5.00, 'pausedmygame.png'),
    ('My Perfect Day', 'Game Graphic Tee', 'Cringe', 15.00, 0.00, 'myperfectday.png'),
    ('Human By Day', 'Wolf Graphic Tee', 'Cringe', 10.00, 0.00, 'humanbydayalphabynight.png'),
    ('Huh', 'Cat Graphic Tee', 'Cute', 15.00, 5.00, 'huh.png'),
    ('Hamster Is Calling', 'Hamster Graphic Tee', 'Cute', 20.00, 0.00, 'hamsteriscalling.png'),
    ('I Never Argue', 'Cringe Graphic Tee', 'Cringe', 10.00, 0.00, 'ineverargue.png'),
    ('Let Me Cook Lil Bro', 'Cat Graphic Tee', 'Cute', 15.00, 5.00, 'letmecook.png'),
    ('Mentally Sick, Physically Thicc', 'Racoon Graphic Tee', 'Cringe', 10.00, 5.00, 'mentallysick.png'),
    ('Mona Lifta', 'Cringe Graphic Tee', 'Cringe', 20.00, 0.00, 'monalifta.png'),
    ('Plz Use It', 'Cringe Graphic Tee', 'Cringe', 15.00, 5.00, 'plzuseit.png'),
    ('Sleeping Sushi', 'Sushi Graphic Tee', 'Chill', 20.00, 0.00, 'sushi.png');


INSERT INTO Customer (name, email, password)
VALUES
    ('Alice', 'alice@example.com', 'password1'),
    ('Bob', 'bob@example.com', 'password2'),
    ('Charlie', 'charlie@example.com', 'password3'),
    ('A', 'a@a.com', 'a'),
    ('KS', 'ks@a.com', 'ks'),
    ('CY', 'cy@a.com', 'cy'),
    ('GY', 'gy@a.com', 'gy'),
    ('BF', 'bf@a.com', 'bf'),
    ('DR', 'dr@a.com', 'dr'),
    ('RX', 'rx@a.com', 'rx');


INSERT INTO Cart (customer_id)
VALUES
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10);

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

INSERT INTO Orders (customer_id, order_date, order_status, shipping_method, shipping_fee)
VALUES
    (4, 04042025, 'completed', 'Free', 0.00),
    (4, 05042025, 'pending', 'Free', 0.00),
    (5, 29032025, 'completed', 'Free', 0.00),
    (5, 01042025, 'completed', 'Free', 0.00),
    (5, 02042025, 'completed', 'Free', 0.00),
    (5, 05042025, 'pending', 'Free', 0.00),
    (6, 01042025, 'completed', 'Free', 0.00),
    (7, 02042025, 'completed', 'Free', 0.00),
    (8, 28032025, 'completed', 'Free', 0.00),
    (9, 30032025, 'completed', 'Free', 0.00),
    (10, 25032025, 'completed', 'Free', 0.00),
    (4, 06042025, 'pending', 'Free', 0.00),
    (4, 07042025, 'pending', 'Free', 0.00);


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



