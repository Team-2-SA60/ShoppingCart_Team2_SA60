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

/*
INSERT INTO Cart (customer_id)
VALUES
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10);
*/

INSERT INTO Orders (customer_id, order_date, order_status, shipping_method, shipping_fee)
VALUES
    (4, '2025-04-04', 'completed', 'Free', 0.00),
    (4, '2025-05-04', 'pending', 'Free', 0.00),
    (5, '2025-03-29', 'completed', 'Free', 0.00),
    (5, '2025-04-01', 'completed', 'Free', 0.00),
    (5, '2025-04-02', 'completed', 'Free', 0.00),
    (5, '2025-05-04', 'pending', 'Free', 0.00),
    (6, '2025-04-01', 'completed', 'Free', 0.00),
    (7, '2025-04-02', 'completed', 'Free', 0.00),
    (8, '2025-03-28', 'completed', 'Free', 0.00),
    (9, '2025-03-30', 'completed', 'Free', 0.00),
    (10, '2025-03-25', 'completed', 'Free', 0.00),
    (4, '2025-06-04', 'pending', 'Free', 0.00),
    (4, '2025-07-04', 'pending', 'Free', 0.00);


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



