CREATE DATABASE bbtca_senai2;
USE bbtca_senai2;

CREATE TABLE cliente (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_cliente VARCHAR(200) NOT NULL,
rg_cliente INT,
cpf_cliente BIGINT UNIQUE,
cepRua_cliente VARCHAR(200),
cepNumero_cliente INT,
cepBairro_cliente VARCHAR(200),
cepPais_cliente VARCHAR (200) DEFAULT 'Brasil',
cepCEP_cliente INT
);

CREATE TABLE financiador (
id_financiador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_financiador VARCHAR(200),
cnpj_financiador BIGINT
);

CREATE TABLE autor (
id_autor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_autor VARCHAR(200) NOT NULL,
rg_autor INT
);

CREATE TABLE editora(
id_editora INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nomeFantasia_editora VARCHAR(200),
razaoSocial_editora VARCHAR(200) NOT NULL,
cepRua_editora VARCHAR(200),
cepNumero_editora INT,
cepBairro_editora VARCHAR(200),
cepPais_editora VARCHAR (200) DEFAULT 'Brasil',
cepCEP_editora INT,
telefone_editora BIGINT
);

CREATE TABLE livro (
id_livro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
isbn_livro BIGINT,
titulo_livro VARCHAR(500),
preco_livro DECIMAL(7,2),
categoria_livro ENUM ('Horror', 'Ficção', 'Romance', 'Ação'),
autor_id INT,
FOREIGN KEY (autor_id)
REFERENCES autor (id_autor),

editora_id INT,
FOREIGN KEY (editora_id)
REFERENCES editora (id_editora),

financiador_id INT,
FOREIGN KEY (financiador_id)
REFERENCES financiador (id_financiador)
);

CREATE TABLE pedido (
id_pedido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
qnt_pedido INT,
CHECK (qnt_pedido >=0),
cliente_id INT,
FOREIGN KEY (cliente_id)
REFERENCES cliente (id_cliente),

livro_id INT,
FOREIGN KEY (livro_id)
REFERENCES livro (id_livro)
);

INSERT INTO editora
(nomeFantasia_editora, razaoSocial_editora, cepRua_editora, cepNumero_editora, cepBairro_editora, cepCEP_editora, telefone_editora)
VALUES
('Editora Aurora', 'Aurora Publicações LTDA', 'Rua das Letras', 123, 'Centro', 01001000, '1134567890');
SELECT * FROM editora;

INSERT INTO autor
(rg_autor)
VALUES
('1234567');

INSERT INTO cliente
(nome_cliente, rg_cliente, cpf_cliente, cepRua_cliente, cepNumero_cliente, cepBairro_cliente, cepCEP_cliente)
VALUES
('Lucas Martins II', 456789126, 12345678901, 'Avenida Brasil', 456, 'Jardim América', 04567000);
SELECT * FROM cliente;