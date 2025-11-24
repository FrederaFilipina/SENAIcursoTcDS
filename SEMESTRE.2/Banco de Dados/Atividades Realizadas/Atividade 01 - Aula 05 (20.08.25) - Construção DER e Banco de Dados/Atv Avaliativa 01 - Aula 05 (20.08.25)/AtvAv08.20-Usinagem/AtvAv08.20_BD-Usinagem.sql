CREATE DATABASE usinagem;
USE usinagem;

CREATE TABLE categoria (
id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
descricao_categoria TEXT(500)
);

CREATE TABLE fornecedor(
id_fornecedor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_fornecedor VARCHAR(200),
nacionalidade_fornecedor VARCHAR(100)
);

CREATE TABLE peca (
id_peca INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_peca VARCHAR(200),
peso_peca DECIMAL(7,2),
anoFabricacao_peca YEAR(4),
categoria_id INT,
fornecedor_id INT
);

ALTER TABLE peca
ADD FOREIGN KEY (categoria_id)
REFERENCES categoria (id_categoria);

ALTER TABLE peca
ADD FOREIGN KEY (fornecedor_id)
REFERENCES fornecedor (id_fornecedor);