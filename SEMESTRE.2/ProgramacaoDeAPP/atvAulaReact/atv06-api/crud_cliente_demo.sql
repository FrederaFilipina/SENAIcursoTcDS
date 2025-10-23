CREATE DATABASE crud_cliente_demo;
USE crud_cliente_demo;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(200),
  email VARCHAR(100),
  telefone VARCHAR(20)
);