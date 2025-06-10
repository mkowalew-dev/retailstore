create database ident_mgmt;

-- users
CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(100) NOT NULL,
                       password VARCHAR(100) NOT NULL
);

-- clients
CREATE TABLE clients (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         client_id VARCHAR(100) UNIQUE ,
                         client_secret VARCHAR(100) NOT NULL,
                         redirect_uris TEXT,
                         grants TEXT
);

-- access tokens
CREATE TABLE access_tokens (
                               access_token VARCHAR(100) PRIMARY KEY,
                               access_token_expires_at DATETIME,
                               client_id VARCHAR(100),
                               user_id INT,
                               FOREIGN KEY (client_id) REFERENCES clients(client_id),
                               FOREIGN KEY (user_id) REFERENCES users(id)
);
