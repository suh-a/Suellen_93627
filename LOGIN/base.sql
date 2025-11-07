CREATE DATABASE produtos;

USE produtos;

CREATE TABLE produtos(
id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    quantidade INT);
    
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
);

INSERT INTO usuarios (nome, email, senha) VALUES ('admin', 'admin@email.com', '123');
