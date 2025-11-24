CREATE DATABASE banco_senai;
USE banco_senai;

CREATE TABLE categoria_cliente (
id_categoria_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_categoria_cliente VARCHAR(100)
);

CREATE TABLE cliente (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_cliente VARCHAR(100),
num_cpf INT(11),
num_cnpj INT(14),
num_celular BIGINT,
des_endereco_rua VARCHAR(100),
des_endereco_numero INT(10),
des_endereco_bairro VARCHAR(100),
des_endereco_cep INT(11),
des_endereco_cidade VARCHAR(100),
des_endereco_estado VARCHAR(100),
categoria_cliente_id INT,
FOREIGN KEY (categoria_cliente_id)
REFERENCES categoria_cliente (id_categoria_cliente)
);

CREATE TABLE tipo_conta (
id_tipo_conta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
des_tipo_conta VARCHAR(100)
);

CREATE TABLE agencia (
id_agencia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_agencia VARCHAR(100)
);

CREATE TABLE conta(
id_conta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
val_saldo DECIMAL(10,2),
agencia_id INT,
FOREIGN KEY (agencia_id)
REFERENCES agencia (id_agencia),

cliente_id INT,
FOREIGN KEY (cliente_id)
REFERENCES cliente (id_cliente),

tipo_conta_id INT,
FOREIGN KEY (tipo_conta_id)
REFERENCES tipo_conta (id_tipo_conta)
);

ALTER TABLE cliente
RENAME COLUMN num_celular TO telefone;

ALTER TABLE categoria_cliente
ADD COLUMN observacao TEXT;

ALTER TABLE cliente
ADD COLUMN renda DECIMAL(10,2);

ALTER TABLE tipo_conta
MODIFY COLUMN des_tipo_conta TEXT;
 
ALTER TABLE agencia
MODIFY COLUMN nome_agencia VARCHAR(45);

ALTER TABLE cliente
DROP COLUMN des_endereco_estado;

ALTER TABLE categoria_cliente
RENAME TO categoria;

ALTER TABLE tipo_conta
ADD COLUMN observacao TEXT;

INSERT INTO categoria
(nome_categoria_cliente)
VALUES
('Private'),
('Exclusive'),
('Gold'),
('Básico');

INSERT INTO cliente
(nome_cliente, num_cpf, categoria_cliente_id)
VALUES
('Teste A', '00000000000',1),
('Teste B', '00000000000',2),
('Teste C', '00000000000',3),
('Teste D', '00000000000',4),
('Teste E', '00000000000',1),
('Teste F', '00000000000',2),
('Teste G', '00000000000',3),
('Teste H', '00000000000',4);

INSERT INTO agencia
(nome_agencia)
VALUES
('Campeche'),
('Ingleses'),
('Centro');

INSERT INTO tipo_conta
(des_tipo_conta)
VALUES
('Poupança'),
('Corrente');

INSERT INTO conta
(val_saldo, cliente_id, tipo_conta_id, agencia_id)
VALUES
('1000',1,1,1),
('10000',2,1,2),
('10',3,1,3),
('0',4,2,1),
('100000',5,2,1),
('100000',6,2,3),
('10000',7,1,2),
('1000',8,2,1);

SELECT * FROM categoria;
SELECT * FROM cliente;
SELECT * FROM agencia;
SELECT * FROM tipo_conta;
SELECT * FROM conta;
