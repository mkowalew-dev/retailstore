CREATE TABLE orders (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        customer_id INT,
                        total DECIMAL(10,2),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          order_id INT,
                          amount DECIMAL(10,2),
                          method VARCHAR(50),
                          paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          order_id INT,
                          issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
