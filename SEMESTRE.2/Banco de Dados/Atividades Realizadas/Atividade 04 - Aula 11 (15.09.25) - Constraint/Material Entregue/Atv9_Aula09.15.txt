CREATE DATABASE regra_constraint;
USE regra_constraint;

CREATE TABLE usuario (
id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (50) NOT NULL,
cpf BIGINT UNIQUE,
pais VARCHAR (50) DEFAULT 'Brasil',
graduado ENUM ('Sim', 'Não'),
num_filhos INT,
CHECK (num_filhos >=0)
);

SELECT * FROM usuario;

-- Teste para verificar constraint NOT NULL
INSERT INTO usuario
(cpf, pais, graduado, num_filhos)
VALUES
(12345678912, 'Brasil', 'Sim', 2);
-- Nesse caso é para dar erro, pois o campo 'nome' está vazio.... porém na tabela o campo está como NOT NULL, ou seja, Campo Não Vazio!

INSERT INTO usuario
(nome, cpf, pais, graduado, num_filhos)
VALUES
('Carlos', 12345678912, 'Brasil', 'Sim', 2);
-- Inserção ajustada!

-- Teste para verificar constraint UNIQUE (repetindo o cpf já existente)
INSERT INTO usuario
(nome, cpf, pais, graduado, num_filhos)
VALUES
('Antonio', 12345678913, 'Brasil', 'Sim', 5);
-- Nesse caso é para dar erro, pois o campo 'cpf' está marcado como Único, ou seja, cada informação é única não é permitido repetir

-- Teste para verificar constraint DEFAULT (o nome país está vaizo)
INSERT INTO usuario
(nome, cpf, graduado, num_filhos)
VALUES
('Pedro', 12345678914, 'Sim', 5);
SELECT * FROM usuario;

-- Teste para verificar constraint ENUM (vamos colocar graduação imcompleta)
INSERT INTO usuario
(nome, cpf, pais, graduado, num_filhos)
VALUES
('Eduardo', 12345678915, 'Brasil', 'Imcompleto', 1);
-- Nesse caso é para dar erro, pois o campo 'graduado' está marcado para receber apenas as informações précadastradas
INSERT INTO usuario
(nome, cpf, pais, graduado, num_filhos)
VALUES
('Eduardo', 12345678915, 'Brasil', 'Não', 1);
SELECT * FROM usuario;
-- Inserção ajustada!

-- Teste para verificar constraint CHECK (vamos colocar o número de filhos negativo)
INSERT INTO usuario
(nome, cpf, pais, graduado, num_filhos)
VALUES
('Paulo', 12345678916, 'Brasil', 'Sim', -1);