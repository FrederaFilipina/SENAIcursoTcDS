CREATE DATABASE usinagem;
USE usinagem;

CREATE TABLE categoria(
id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
descricao TEXT
);

CREATE TABLE fornecedor(
id_fornecedor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_fornecedor VARCHAR (100),
nacionalidade_fornecedor VARCHAR(100)
);

CREATE TABLE peca (
id_peca INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_peca VARCHAR(100),
peso_peca DECIMAL(10,2),
ano_fabricacao_peca YEAR (4),
categoria_id INT,
fornecedor_id INT);

ALTER TABLE peca
ADD FOREIGN KEY (categoria_id)
REFERENCES categoria (id_categoria);

ALTER TABLE peca
ADD FOREIGN KEY (fornecedor_id)
REFERENCES fornecedor (id_fornecedor);