CREATE DATABASE IF NOT EXISTS storage_loan;
USE storage_loan;

CREATE TABLE IF NOT EXISTS users  (
    id VARCHAR(25) PRIMARY KEY NOT NULL,
    login VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(50) NOT NULL, 
    pass VARCHAR(25) NOT NULL,
    level ENUM('1', '2') NOT NULL,
    admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS storage (
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255), 
    category ENUM("A", "B", "C", "D", "E", "F", "G", "H"),
    qtd INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS loan (
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255), 
    Id VARCHAR(25) NOT NULL PRIMARY KEY,
    conditions VARCHAR(50), 
    loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date DATE DEFAULT NULL, 
    provider VARCHAR(50) NOT NULL,
    receiver VARCHAR(50) NOT NULL,
    status ENUM('1', '2', '3') NOT NULL);
