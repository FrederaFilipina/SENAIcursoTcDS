CREATE DATABASE atv01Escola;
USE atv01Escola;

CREATE TABLE sala(
id_sala INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
capacidade INT
);

CREATE TABLE turma(
id_turma INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_turma VARCHAR (100),
periodo_turma VARCHAR (50),
sala_id INT
);
ALTER TABLE turma
ADD FOREIGN KEY (sala_id)
REFERENCES sala (id_sala);

CREATE TABLE professor (
id_professor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_professor VARCHAR (100),
formacao_academica_professor VARCHAR (100),
turma_id INT
);
ALTER TABLE professor
ADD FOREIGN KEY (turma_id)
REFERENCES turma (id_turma);

CREATE TABLE aula (
id_aula INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_aula VARCHAR (100),
professor_id INT
);
ALTER TABLE aula
ADD FOREIGN KEY (professor_id)
REFERENCES professor (id_professor);