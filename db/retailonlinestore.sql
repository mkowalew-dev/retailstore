create database retailonlinestore;
use retailonlinestore;

CREATE TABLE Customers (
                           customer_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           first_name VARCHAR(100) NOT NULL,
                           last_name VARCHAR(100) NOT NULL,
                           email VARCHAR(255) UNIQUE NOT NULL,
                           phone VARCHAR(20),
                           address VARCHAR(255),
                           city VARCHAR(100),
                           state VARCHAR(100),
                           zip_code VARCHAR(10),
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;

CREATE TABLE Employees (
                           employee_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           first_name VARCHAR(100) NOT NULL,
                           last_name VARCHAR(100) NOT NULL,
                           email VARCHAR(255) UNIQUE NOT NULL,
                           phone VARCHAR(20),
                           position VARCHAR(100),
                           salary DECIMAL(10, 2),
                           hire_date DATE,
                           avatar_url VARCHAR(255),
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;

CREATE TABLE StoreLocations (
                                location_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                name VARCHAR(255) NOT NULL,
                                address VARCHAR(255) NOT NULL,
                                city VARCHAR(100),
                                state VARCHAR(100),
                                zip_code VARCHAR(10),
                                phone VARCHAR(20),
                                manager_id BIGINT UNSIGNED,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (manager_id) REFERENCES Employees(employee_id)
                                    ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE products (
                          product_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price DECIMAL(10, 2) NOT NULL,
                          category VARCHAR(100),
                          photo_url VARCHAR(255),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;

CREATE TABLE stock (
                       stock_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                       product_id BIGINT UNSIGNED NOT NULL,
                       supplier_id BIGINT UNSIGNED NOT NULL,
                       location_id BIGINT UNSIGNED NOT NULL,          -- reference to store location
                       quantity INT NOT NULL DEFAULT 0,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       FOREIGN KEY (product_id) REFERENCES products(product_id)
                           ON DELETE CASCADE ON UPDATE CASCADE,
                       FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
                           ON DELETE RESTRICT ON UPDATE CASCADE,
                       FOREIGN KEY (location_id) REFERENCES StoreLocations(location_id)
                           ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE suppliers (
                           supplier_id INT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(100),
                           contact_email VARCHAR(100)
)ENGINE=InnoDB;
DELIMITER $$

CREATE TRIGGER after_product_insert
    AFTER INSERT ON products
    FOR EACH ROW
BEGIN
    INSERT INTO stock (product_id, supplier_id, quantity)
    VALUES (NEW.product_id, 1, 0); -- 1 = default supplier
END $$

DELIMITER ;