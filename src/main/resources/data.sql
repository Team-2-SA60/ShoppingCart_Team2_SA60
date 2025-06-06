INSERT INTO Products (name, description, category, price, discount, image)
VALUES
    ('Duck You', 'Duck Graphic Tee', 'Cute',15.00, 0.00, 'duckyou.png'),
    ('Mewing', 'Cat Graphic Tee', 'Cute', 15.00, 5.00, 'mewing.png'),
    ('Code Doesn''t Work', 'Code Graphic Tee', 'Chill', 10.00, 0.00, 'codedoesntwork.png'),
    ('What The Sigma', 'Cat Graphic Tee', 'Cringe',15.00, 5.00, 'whatthesigma.png'),
    ('Chill Guy', 'Chill Graphic Tee', 'Chill',15.00, 0.00, 'chillguy.png'),
    ('Me Monkey', 'Monkey Graphic Tee', 'Cringe', 15.00, 5.00, 'memonkey.png'),
    ('Ohio Sigma Rizzler', 'Chill Graphic Tee', 'Chill',15.00, 0.00, 'ohiosigmarizzler.png'),
    ('Professional Napper', 'Cat Graphic Tee', 'Cute', 15.00, 0.00, 'professionalnapper.png'),
    ('Wow Hi', 'Cat Graphic Tee', 'Cute', 20.00, 0.00, 'wowhi.png'),
    ('Tang Ping', 'Chill Graphic Tee', 'Chill', 15.00, 0.00, 'tangping.png'),
    ('Paused My Game', 'Game Graphic Tee', 'Cringe', 10.00, 5.00, 'pausedmygame.png'),
    ('My Perfect Day', 'Game Graphic Tee', 'Cringe', 15.00, 0.00, 'myperfectday.png'),
    ('Will Code For Beer', 'Code Graphic Tee', 'Chill', 10.00, 0.00, 'willcodeforbeer.png'),
    ('Human By Day', 'Wolf Graphic Tee', 'Cringe', 10.00, 0.00, 'humanbydayalphabynight.png'),
    ('Huh', 'Cat Graphic Tee', 'Cute', 15.00, 5.00, 'huh.png'),
    ('Hamster Is Calling', 'Hamster Graphic Tee', 'Cute', 20.00, 0.00, 'hamsteriscalling.png'),
    ('I Never Argue', 'Cringe Graphic Tee', 'Cringe', 10.00, 0.00, 'ineverargue.png'),
    ('Bruh', 'Cat Graphic Tee', 'Chill', 8.00, 0.00, 'bruh.png'),
    ('Let Me Cook Lil Bro', 'Cat Graphic Tee', 'Cute', 15.00, 5.00, 'letmecook.png'),
    ('Houston, I Have So Many Problems', 'Space Graphic Tee', 'Chill', 15.00, 0.00, 'houstonihavesomanyproblems.png'),
    ('Mentally Sick, Physically Thicc', 'Racoon Graphic Tee', 'Cringe', 10.00, 5.00, 'mentallysick.png'),
    ('Mona Lifta', 'Cringe Graphic Tee', 'Cringe', 20.00, 0.00, 'monalifta.png'),
    ('Plz Use It', 'Cringe Graphic Tee', 'Cringe', 15.00, 5.00, 'plzuseit.png'),
    ('Sleeping Sushi', 'Sushi Graphic Tee', 'Chill', 20.00, 0.00, 'sushi.png'),
    ('This Is Fine', 'Chill Graphic Tee', 'Chill', 25.00, 5.00, 'thisisfine.png'),
    ('I Eat Soap', 'Cringe Graphic Tee', 'Cringe', 10.00, 5.00, 'ieatsoap.png'),
    ('Glerp Glorp', 'Cat Graphic Tee', 'Cute', 15.00, 0.00, 'glerpglob.png'),
    ('Another Day, Another Slay', 'Cringe Graphic Tee', 'Cringe', 10.00, 0.00, 'anotherdayanotherslay.png'),
    ('Everything Hurts And I''m Tired', 'Duck Graphic Tee', 'Chill', 10.00, 0.00, 'everythinghurtsandimtired.png'),
    ('I''m Not Lazy', 'Sloth Graphic Tee', 'Cute', 10.00, 5.00, 'imnotlazy.png'),
    ('Coffee', 'Cat Graphic Tee', 'Cringe', 15.00, 2.00, 'coffeebecausemurderiswrong.png'),
    ('More Spaghetti, Less Upsetti', 'Cat Graphic Tee', 'Cute', 20.00, 3.00, 'morespaghettilessupsetti.png'),
    ('I''m The Kind Of Nerd', 'Nerd Graphic Tee', 'Cringe', 10.00, 0.00 , 'imthekindofnerd.png'),
    ('Bred Sheeran', 'Funny Graphic Tee', 'Cringe', 15.00, 2.00, 'bredsheeran.png'),
    ('Chill Couple', 'Chill Graphic Tee', 'Chill', 15.00, 3.00, 'chillcouple.png');


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

INSERT INTO Cart_Details (cart_id, product_id, product_qty)
VALUES
    -- Cart with ID 1 has items
    (1, 2, 3),
    (1, 3, 1),

    -- Cart with ID 2 is empty
    -- Cart with ID 3 has items
    (3, 1, 2),
    (3, 5, 1),

    -- Cart with ID 4 is empty
    -- Cart with ID 5 has items
    (5, 4, 2),
    (5, 6, 1),

    -- Cart with ID 6 is empty
    -- Cart with ID 7 has items
    (7, 3, 4);

INSERT INTO Orders (customer_id, order_date, order_status, shipping_method, shipping_fee, shipping_address)
VALUES
    (4, '2025-04-04', 'completed', 'express', 10.00, 'NUS-ISS'),
    (4, '2025-04-05', 'pending', 'standard', 0.00, 'NUS-ISS'),
    (5, '2025-03-29', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (5, '2025-04-01', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (5, '2025-04-02', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (5, '2025-04-05', 'pending', 'standard', 0.00, 'NUS-ISS'),
    (6, '2025-04-01', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (7, '2025-04-02', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (8, '2025-03-28', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (9, '2025-03-30', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (10, '2025-03-25', 'completed', 'standard', 0.00, 'NUS-ISS'),
    (4, '2025-04-06', 'pending', 'express', 10.00, 'NUS-ISS'),
    (4, '2025-04-07', 'pending', 'standard', 0.00, 'NUS-ISS');


INSERT INTO Order_Details (order_id, product_id, price_at_purchase, product_qty)
VALUES
    (1, 1, 15.00, 5),
    (1, 5, 10.00, 10),
    (2, 2, 10.00, 2),
    (2, 3, 10.00, 3),
    (3, 4, 15.00, 6),
    (4, 7, 15.00, 4),
    (4, 6, 15.00, 2),
    (5, 1, 15.00, 1),
    (6, 2, 10.00, 15),
    (6, 3, 10.00, 3),
    (7, 4, 15.00, 11),
    (8, 5, 10.00, 1),
    (9, 7, 15.00, 9),
    (10, 3, 10.00, 13),
    (11, 6, 15.00, 5),
    (12, 2, 15.00, 1),
    (13, 5, 10.00, 2);



