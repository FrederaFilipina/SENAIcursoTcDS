CREATE DATABASE empresa_xpto;

USE empresa_xpto;

CREATE TABLE fornecedor (
id_fornecedor INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (75),
nacionalidade VARCHAR (75),
PRIMARY KEY(id_fornecedor)
);

CREATE TABLE peca(
id_peca INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (75),
peso DECIMAL(10,2),
ano_fabricacao DATE,
fornecedor_id INT,
PRIMARY KEY (id_peca)
);

ALTER TABLE peca
ADD FOREIGN KEY (fornecedor_id)
REFERENCES fornecedor (id_fornecedor);

ALTER TABLE peca
ADD COLUMN fornecedor_id INT;

DROP TABLE peca;