CREATE DATABASE atv02Banco;
USE atv02Banco;

CREATE TABLE categoria_cliente(
id_categoria_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_categoria VARCHAR (100)
);

CREATE TABLE cliente(
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (100),
cpf BIGINT (11),
cnpj BIGINT(14),
celular VARCHAR (100),
rua_endereco VARCHAR (100),
numero_endereco INT(10),
bairro_endereco VARCHAR (100),
cep_endereco INT (10),
cidade_endereco VARCHAR (100),
estado_endereco VARCHAR (100),

categoria_cliente_id INT,
FOREIGN KEY (categoria_cliente_id)
REFERENCES categoria_cliente (id_categoria_cliente)
);

CREATE TABLE tipo_conta(
id_tipo_conta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_conta VARCHAR (100)
);

CREATE TABLE agencia(
id_agencia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
agencia VARCHAR (100)
);

CREATE TABLE conta (
id_conta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
valor_saldo DECIMAL (10,2),

tipo_conta_id INT,
FOREIGN KEY (tipo_conta_id)
REFERENCES tipo_conta (id_tipo_conta),

agencia_id INT,
FOREIGN KEY (agencia_id)
REFERENCES agencia (id_agencia)
);