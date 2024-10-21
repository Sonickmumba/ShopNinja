CREATE DATABASE ShopNinja;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE product_categories (
    product_id INT REFERENCES products(id),
    category_id INT REFERENCES categories(id),
    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    user_id INT REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


queries:

INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'john@example.com', 'securepassword123');

INSERT INTO users (name, email, password) 
VALUES ('Jane Smith', 'jane@example.com', 'strongpassword456');

INSERT INTO users (name, email, password) 
VALUES ('Mike Johnson', 'mike@example.com', 'hashedpassword789');

INSERT INTO users (name, email, password) 
VALUES ('Sarah Brown', 'sarah@example.com', 'encryptedpassword321');

INSERT INTO users (name, email, password) 
VALUES ('Chris Lee', 'chris@example.com', 'randompassword987');


INSERT INTO products (name, description, price, stock) 
VALUES ('Laptop', 'High-performance laptop', 999.99, 10);

INSERT INTO products (name, description, price, stock) 
VALUES ('Smartphone', 'Latest model smartphone with 128GB storage', 699.99, 50);

INSERT INTO products (name, description, price, stock) 
VALUES ('Headphones', 'Noise-canceling wireless headphones', 199.99, 30);

INSERT INTO products (name, description, price, stock) 
VALUES ('Smartwatch', 'Wearable fitness tracker with heart rate monitor', 149.99, 20);

INSERT INTO products (name, description, price, stock) 
VALUES ('Tablet', '10-inch tablet with 64GB storage', 299.99, 15);

INSERT INTO orders (user_id, total, status) 
VALUES (1, 1699.98, 'pending');

INSERT INTO orders (user_id, total, status) 
VALUES (2, 899.99, 'processing');

INSERT INTO orders (user_id, total, status) 
VALUES (3, 399.99, 'shipped');

INSERT INTO orders (user_id, total, status) 
VALUES (4, 599.99, 'completed');

INSERT INTO orders (user_id, total, status) 
VALUES (5, 149.99, 'pending');

INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (1, 1, 1, 999.99);

INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (1, 2, 1, 699.99);

INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (2, 3, 2, 199.99);

INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (3, 4, 1, 149.99);

INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (4, 5, 1, 299.99);


INSERT INTO categories (name, description, image_url) 
VALUES ('Electronics', 'Devices and gadgets', 'https://example.com/images/electronics.jpg');

INSERT INTO categories (name, description, image_url) 
VALUES ('Home Appliances', 'Household electronic appliances', 'https://example.com/images/appliances.jpg');

INSERT INTO categories (name, description, image_url) 
VALUES ('Sports', 'Sports equipment and accessories', 'https://example.com/images/sports.jpg');

INSERT INTO categories (name, description, image_url) 
VALUES ('Fashion', 'Clothing and accessories', 'https://example.com/images/fashion.jpg');

INSERT INTO categories (name, description, image_url) 
VALUES ('Books', 'Wide range of books and eBooks', 'https://example.com/images/books.jpg');

INSERT INTO product_categories (product_id, category_id) 
VALUES (1, 1);

INSERT INTO product_categories (product_id, category_id) 
VALUES (2, 1);

INSERT INTO product_categories (product_id, category_id) 
VALUES (3, 3);

INSERT INTO product_categories (product_id, category_id) 
VALUES (4, 4);

INSERT INTO product_categories (product_id, category_id) 
VALUES (5, 5);


INSERT INTO reviews (product_id, user_id, rating, comment) 
VALUES (1, 1, 5, 'Excellent product! Highly recommend.');

INSERT INTO reviews (product_id, user_id, rating, comment) 
VALUES (2, 2, 4, 'Good value for the price.');

INSERT INTO reviews (product_id, user_id, rating, comment) 
VALUES (3, 3, 3, 'Decent but could be better.');

INSERT INTO reviews (product_id, user_id, rating, comment) 
VALUES (4, 4, 5, 'Love this product! Works great.');

INSERT INTO reviews (product_id, user_id, rating, comment) 
VALUES (5, 5, 2, 'Not satisfied with the quality.');


INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country) 
VALUES (1, '123 Main St', 'Apt 4B', 'New York', 'NY', '10001', 'USA');

INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country) 
VALUES (2, '456 Oak St', NULL, 'San Francisco', 'CA', '94103', 'USA');

INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country) 
VALUES (3, '789 Pine St', 'Suite 100', 'Chicago', 'IL', '60605', 'USA');

INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country) 
VALUES (4, '321 Maple St', NULL, 'Austin', 'TX', '73301', 'USA');

INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country) 
VALUES (5, '654 Cedar St', 'Floor 2', 'Los Angeles', 'CA', '90001', 'USA');


INSERT INTO payments (order_id, amount, method, status) 
VALUES (1, 1699.98, 'credit card', 'completed');

INSERT INTO payments (order_id, amount, method, status) 
VALUES (2, 899.99, 'paypal', 'pending');

INSERT INTO payments (order_id, amount, method, status) 
VALUES (3, 399.99, 'debit card', 'completed');

INSERT INTO payments (order_id, amount, method, status) 
VALUES (4, 599.99, 'credit card', 'completed');

INSERT INTO payments (order_id, amount, method, status) 
VALUES (5, 149.99, 'paypal', 'pending');


INSERT INTO carts (user_id) 
VALUES (1);

INSERT INTO carts (user_id) 
VALUES (2);

INSERT INTO carts (user_id) 
VALUES (3);

INSERT INTO carts (user_id) 
VALUES (4);

INSERT INTO carts (user_id) 
VALUES (5);


INSERT INTO cart_items (cart_id, product_id, quantity, price) 
VALUES (1, 1, 1, 999.99);

INSERT INTO cart_items (cart_id, product_id, quantity, price) 
VALUES (1, 2, 1, 699.99);

INSERT INTO cart_items (cart_id, product_id, quantity, price) 
VALUES (2, 3, 2, 199.99);

INSERT INTO cart_items (cart_id, product_id, quantity, price) 
VALUES (3, 4, 1, 149.99);

INSERT INTO cart_items (cart_id, product_id, quantity, price) 
VALUES (4, 5, 1, 299.99);










-- Sample categories
INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Books');
INSERT INTO categories (name) VALUES ('Clothing');

-- Sample products
INSERT INTO products (name, description, price, stock) VALUES
  ('Smartphone', 'Latest model smartphone with advanced features.', 699.99, 50),
  ('Laptop', 'High-performance laptop for gaming and work.', 1199.99, 30),
  ('Headphones', 'Noise-cancelling wireless headphones.', 199.99, 100),
  ('JavaScript: The Good Parts', 'A concise guide to the core principles of JavaScript.', 29.99, 150),
  ('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald.', 10.99, 200),
  ('T-Shirt', 'Comfortable cotton t-shirt available in various sizes.', 15.99, 300),
  ('Jeans', 'Stylish denim jeans available in multiple sizes.', 39.99, 150);

-- Sample product_categories
INSERT INTO product_categories (product_id, category_id) VALUES
  (1, 1), -- Smartphone -> Electronics
  (2, 1), -- Laptop -> Electronics
  (3, 1), -- Headphones -> Electronics
  (4, 2), -- JavaScript: The Good Parts -> Books
  (5, 2), -- The Great Gatsby -> Books
  (6, 3), -- T-Shirt -> Clothing
  (7, 3); -- Jeans -> Clothing

