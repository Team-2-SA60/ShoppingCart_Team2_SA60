
![Logo](https://i.imgur.com/ITKVVSm.png)


# 🛒 Shopping Cart Team 2 SA4105 👕

DELULU is an E-Commerce Store focusing on T-Shirts developed as our Web Application Development Project with Java EE and ReactJS.



## Team 2️⃣

- [@Adrian](https://github.com/adriantlh)
- [@Bo Fei](https://github.com/Bofei2058)
- [@Cai Yun](https://github.com/vegecloud)
- [@Duan Ran](https://github.com/Daverduan)
- [@Kin Seng](https://github.com/im-ksc)
- [@Gong Yuan](https://github.com/gongyuannn)
- [@Run Xin](https://github.com/ZRX471)

## 🧐 Core Features

- Browse Products
- Login & Logout
- Add Product To Shopping Cart
- Checkout Products
- Browse Purchase History

## 😮 Additional Features

- Account Creation
- Account Management
- Wish List
- Browse Products Sorting and Filtering
- Browse Products Pagination

## 🙌 Landing Page (Browse Products)

![App Screenshot](https://i.imgur.com/pnZaUS3.png)


## 🛠️ Getting started

This Project uses JDK-17, node.js v20.19.0 and MySQL
- Install JDK-17 at [https://www.oracle.com/sg/java/technologies/downloads/](https://www.oracle.com/sg/java/technologies/downloads/)
- Install node.js v20.19.0 at [https://nodejs.org/en/download](https://nodejs.org/en/download)
- Install MySQL at [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)

1. Clone repository

```
  git clone https://github.com/Team-2-SA60/ShoppingCart_Team2_SA60.git
```
OR
- Download ZIP file at [https://github.com/Team-2-SA60/ShoppingCart_Team2_SA60](https://github.com/Team-2-SA60/ShoppingCart_Team2_SA60)
  - Extract ZIP file to your directory

2. Open Terminal and change working directory
```
  cd ShoppingCart_Team2_SA60
```

3. Install dependencies (npm install integrated in pom.xml)
```
  ./mvnw clean install
```

4. Create a schema in MySQL database
```
CREATE DATABASE delulu;
```

5. Update application.properties
```
    ShoppingCart_Team2_SA60
    ├── src
    │   ├── main
    │   │   ├── resources
    │   │   │   └── application.properties
```
Change the following to your configuration:
```
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

6. Run Spring-Boot
```
./mvnw spring-boot:run
```

7. Access website with [http://localhost:8080/](http://localhost:8080/)
#
**Optional**

8. To run a separate frontend server for ReactJS. 
Open another terminal, change working directory to 'frontend'
```
cd frontend
```

9. Run Front-End ReactJS
```
npm start
```

10. Access website with [http://localhost:3000/](http://localhost:3000/)
    
## 🍰 Contributors - based on features ##

**Core Features**
- Browse Products
    - Kin Seng and Adrian
- Login & Logout
    - Gong Yuan
- Add Product To Shopping Cart
    - Gong Yuan and Bo Fei
- Checkout Products
    - Cai Yun
- Browse Purchase History
    - Cai Yun and Bo Fei

**Additional Features**
- Account Creation and Management
    - Kin Seng
- Wish List
    - Kin Seng
- Browse Products Sorting and Filtering
    - Adrian
- Browse Products Pagination
    - Kin Seng

## 💻 Built With

**Front-End**
- React v19.1.0
- TailwindCSS v3.4.17
- BootStrap v5.3.5

**Back-End**
- Lombok
- Spring Data JDBC
- Spring Data JPA
- Spring Web
- Spring Session
- Spring Boot DevTools
- MySQL Driver
- Validation
## Thank you
We hope you like the website we have built!
