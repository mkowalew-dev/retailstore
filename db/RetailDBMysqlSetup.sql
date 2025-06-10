-- Create the database
create database retailonlinestore;
USE retailonlinestore;
CREATE TABLE customers (
                           customer_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each customer
                           first_name VARCHAR(50) NOT NULL,            -- Customer's first name
                           last_name VARCHAR(50) NOT NULL,             -- Customer's last name
                           email VARCHAR(100) UNIQUE NOT NULL,         -- Customer's email (must be unique)
                           phone_number VARCHAR(15),                   -- Customer's phone number
                           address TEXT,                               -- Customer's address
                           city VARCHAR(50),                           -- City of the customer
                           state VARCHAR(50),                          -- State/Province of the customer
                           postal_code VARCHAR(20),                    -- Postal/ZIP code
                           country VARCHAR(50),                        -- Country of the customer
                           registration_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date and time when the customer registered
                           status ENUM('active', 'inactive') DEFAULT 'active' -- Status of the customer
);
INSERT INTO customers (first_name, last_name, email, phone_number, address, city, state, postal_code, country)
VALUES
    ('Alice', 'Smith', 'alice.smith1@example.com', '1234567890', '123 Oak Street', 'Springfield', 'Illinois', '62701', 'USA'),
    ('Bob', 'Johnson', 'bob.johnson2@example.com', '1234567891', '456 Pine Street', 'Chicago', 'Illinois', '60601', 'USA'),
    ('Charlie', 'Brown', 'charlie.brown3@example.com', '1234567892', '789 Maple Avenue', 'Boston', 'Massachusetts', '02108', 'USA'),
    ('Diana', 'Williams', 'diana.williams4@example.com', '1234567893', '321 Cedar Lane', 'Austin', 'Texas', '73301', 'USA'),
    ('Ethan', 'Jones', 'ethan.jones5@example.com', '1234567894', '654 Elm Street', 'Seattle', 'Washington', '98101', 'USA'),
    ('Fiona', 'Taylor', 'fiona.taylor6@example.com', '1234567895', '987 Birch Drive', 'Denver', 'Colorado', '80201', 'USA'),
    ('George', 'Martinez', 'george.martinez7@example.com', '1234567896', '159 Walnut Street', 'San Diego', 'California', '92101', 'USA'),
    ('Hannah', 'Garcia', 'hannah.garcia8@example.com', '1234567897', '753 Cherry Lane', 'Miami', 'Florida', '33101', 'USA'),
    ('Ian', 'Moore', 'ian.moore9@example.com', '1234567898', '852 Palm Avenue', 'Dallas', 'Texas', '75201', 'USA'),
    ('Julia', 'Davis', 'julia.davis10@example.com', '1234567899', '951 Spruce Street', 'Atlanta', 'Georgia', '30301', 'USA'),

    ('Kevin', 'Lopez', 'kevin.lopez11@example.com', '2234567890', '345 Pine Avenue', 'Los Angeles', 'California', '90001', 'USA'),
    ('Laura', 'Clark', 'laura.clark12@example.com', '2234567891', '678 Oak Boulevard', 'Phoenix', 'Arizona', '85001', 'USA'),
    ('Michael', 'Harris', 'michael.harris13@example.com', '2234567892', '112 Maple Lane', 'Philadelphia', 'Pennsylvania', '19019', 'USA'),
    ('Natalie', 'Martinez', 'natalie.martinez14@example.com', '2234567893', '223 Birch Street', 'Columbus', 'Ohio', '43004', 'USA'),
    ('Oliver', 'Lewis', 'oliver.lewis15@example.com', '2234567894', '334 Cedar Avenue', 'Charlotte', 'North Carolina', '28201', 'USA'),
    ('Paula', 'Walker', 'paula.walker16@example.com', '2234567895', '445 Spruce Lane', 'Las Vegas', 'Nevada', '89101', 'USA'),
    ('Quentin', 'Hall', 'quentin.hall17@example.com', '2234567896', '556 Palm Street', 'New Orleans', 'Louisiana', '70112', 'USA'),
    ('Rachel', 'Allen', 'rachel.allen18@example.com', '2234567897', '667 Walnut Boulevard', 'Portland', 'Oregon', '97201', 'USA'),
    ('Sean', 'Young', 'sean.young19@example.com', '2234567898', '778 Cherry Avenue', 'San Francisco', 'California', '94101', 'USA'),
    ('Tina', 'King', 'tina.king20@example.com', '2234567899', '889 Elm Drive', 'Orlando', 'Florida', '32801', 'USA'),

    ('Uma', 'Hernandez', 'uma.hernandez21@example.com', '3234567890', '990 Oak Lane', 'Salt Lake City', 'Utah', '84101', 'USA'),
    ('Victor', 'Wright', 'victor.wright22@example.com', '3234567891', '111 Maple Boulevard', 'Cleveland', 'Ohio', '44101', 'USA'),
    ('Wendy', 'Green', 'wendy.green23@example.com', '3234567892', '222 Cedar Lane', 'Detroit', 'Michigan', '48201', 'USA'),
    ('Xander', 'Adams', 'xander.adams24@example.com', '3234567893', '333 Birch Avenue', 'Indianapolis', 'Indiana', '46201', 'USA'),
    ('Yvonne', 'Nelson', 'yvonne.nelson25@example.com', '3234567894', '444 Spruce Street', 'Kansas City', 'Missouri', '64101', 'USA'),
    ('Zach', 'Carter', 'zach.carter26@example.com', '3234567895', '555 Palm Drive', 'Louisville', 'Kentucky', '40201', 'USA'),
    ('Amy', 'Mitchell', 'amy.mitchell27@example.com', '3234567896', '666 Walnut Lane', 'Nashville', 'Tennessee', '37201', 'USA'),
    ('Brian', 'Perez', 'brian.perez28@example.com', '3234567897', '777 Cherry Drive', 'Milwaukee', 'Wisconsin', '53201', 'USA'),
    ('Catherine', 'Roberts', 'catherine.roberts29@example.com', '3234567898', '888 Elm Avenue', 'Albuquerque', 'New Mexico', '87101', 'USA'),
    ('Daniel', 'Evans', 'daniel.evans30@example.com', '3234567899', '999 Pine Street', 'Tucson', 'Arizona', '85701', 'USA'),

    ('Emma', 'Collins', 'emma.collins31@example.com', '4234567890', '101 Maple Lane', 'Fresno', 'California', '93701', 'USA'),
    ('Frank', 'Stewart', 'frank.stewart32@example.com', '4234567891', '202 Cedar Boulevard', 'Sacramento', 'California', '94203', 'USA'),
    ('Grace', 'Sanders', 'grace.sanders33@example.com', '4234567892', '303 Birch Lane', 'Mesa', 'Arizona', '85201', 'USA'),
    ('Henry', 'Morris', 'henry.morris34@example.com', '4234567893', '404 Spruce Avenue', 'Omaha', 'Nebraska', '68101', 'USA'),
    ('Isla', 'Rogers', 'isla.rogers35@example.com', '4234567894', '505 Palm Lane', 'Virginia Beach', 'Virginia', '23450', 'USA'),
    ('Jack', 'Reed', 'jack.reed36@example.com', '4234567895', '606 Walnut Street', 'Raleigh', 'North Carolina', '27601', 'USA'),
    ('Kara', 'Cook', 'kara.cook37@example.com', '4234567896', '707 Cherry Boulevard', 'Tulsa', 'Oklahoma', '74101', 'USA'),
    ('Liam', 'Morgan', 'liam.morgan38@example.com', '4234567897', '808 Elm Lane', 'Honolulu', 'Hawaii', '96801', 'USA'),
    ('Mia', 'Bell', 'mia.bell39@example.com', '4234567898', '909 Pine Avenue', 'Anchorage', 'Alaska', '99501', 'USA'),
    ('Noah', 'Murphy', 'noah.murphy40@example.com', '4234567899', '1010 Maple Drive', 'Boise', 'Idaho', '83701', 'USA');