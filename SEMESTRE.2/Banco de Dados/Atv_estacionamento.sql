CREATE DATABASE estacionamento;
USE estacionamento;

CREATE TABLE ticket (
id_ticket INT NOT NULL PRIMARY KEY,
codigo_barra VARCHAR(45),
observacao TEXT);

CREATE TABLE estacionamento (
id_estacionamento INT NOT NULL PRIMARY KEY,
nome VARCHAR(45),
cnpj BIGINT(14),
ticket_id INT);

ALTER TABLE estacionamento
ADD FOREIGN KEY (ticket_id)
REFERENCES ticket (id_ticket);

CREATE TABLE setor (
id_setor INT NOT NULL PRIMARY KEY,
nome VARCHAR(45),
descricao VARCHAR(45),
estacionamento_id INT);

ALTER TABLE setor
ADD FOREIGN KEY (estacionamento_id)
REFERENCES estacionamento (id_estacionamento);

CREATE TABLE vafa (
id_vaga INT NOT NULL PRIMARY KEY,
numero_vagas VARCHAR(45),
setor_id INT);

DROP TABLE vafa;

CREATE TABLE vaga (
id_vaga INT NOT NULL PRIMARY KEY,
numero_vagas VARCHAR(45),
setor_id INT);

ALTER TABLE vaga
ADD FOREIGN KEY (setor_id)
REFERENCES setor (id_setor);