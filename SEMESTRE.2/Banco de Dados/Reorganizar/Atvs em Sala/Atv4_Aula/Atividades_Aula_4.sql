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

Tables DROP TABLE peca;

-- Dois traços para comentar o cod!

ALTER TABLE peca
COLUMNS nome VARCHAR (100);

CREATE DATABASE escola;
USE escola;

CREATE TABLE turma(
id_turma INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
periodo VARCHAR (50)
);

CREATE TABLE sala(
id_sala INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
capacidade INT
);

ALTER TABLE turma
ADD FOREIGN KEY (sala_id)
REFERENCES sala (id_sala);

DROP TABLE sala;

ALTER TABLE TURMA
ADD COLUMN sala_id INT;

CREATE TABLE professor (
id_professor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
formacao_prof VARCHAR(50),
turma_id INT
);

ALTER TABLE professor
ADD FOREIGN KEY (turma_id)
REFERENCES turma (id_turma);

CREATE TABLE aula (
id_aula INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
professor_id INT,
FOREIGN KEY (professor_id)
REFERENCES professor (id_professor)
);
