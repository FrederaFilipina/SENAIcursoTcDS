CREATE DATABASE bbtca_senai;
USE bbtca_senai;

CREATE TABLE cliente (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_cliente VARCHAR(200),
rg_cliente INT(9),
cpf_cliente BIGINT(11),
cepRua_cliente VARCHAR(200),
cepNumero_cliente INT(10),
cepBairro_cliente VARCHAR(200),
cepCEP_cliente INT(8)
);

CREATE TABLE financiador (
id_financiador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_financiador VARCHAR(200),
cnpj_financiador BIGINT(14)
);

CREATE TABLE autor (
id_autor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_autor VARCHAR(200),
rg_autor INT(9)
);

CREATE TABLE editora(
id_editora INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nomeFantasia_editora VARCHAR(200),
razaoSocial_editora VARCHAR(200),
cepRua_editora VARCHAR(200),
cepNumero_editora INT(10),
cepBairro_editora VARCHAR(200),
cepCEP_editora INT(8),
telefone_editora BIGINT(13)
);

CREATE TABLE livro (
id_livro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
isbn_livro BIGINT(13),
titulo_livro VARCHAR(500),
preco_livro DECIMAL(7,2),
categoria_livro VARCHAR(100),
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
cliente_id INT,
FOREIGN KEY (cliente_id)
REFERENCES cliente (id_cliente),

livro_id INT,
FOREIGN KEY (livro_id)
REFERENCES livro (id_livro)
);

INSERT INTO autor
(nome_autor, rg_autor)
VALUES
('Clarice Lima', '123456789'), 
('João Mendes', '234567890'), 
('Ana Souza', '345678901'),
('Ana Aline', '345678902'),  
('Carlos Braga', '456789012');

INSERT INTO financiador
(nome_financiador, cnpj_financiador)
VALUES
('Escola Horizonte', '12345678000190'),
('Fundação Literária Brasil', '98765432000110'),
('Instituto Cultural Aurora', '1223344000155'),
('Patrocínio Letras Vivas', '22334556000166'),
('Fomento Editorial Alfa', '3344566700177');

INSERT INTO editora
(nomeFantasia_editora, razaoSocial_editora, cepRua_editora, cepNumero_editora, cepBairro_editora, telefone_editora)
VALUES
('Editora Lumiar', 'Lumiar Publicações Ltda.', 'Rua das Letras', '123', 'Centro', '1134567890'),
('Mundo das Palavras', 'Mundo das Palavras Editora e Distribuição S/A', 'Avenida Cultural', '456', 'Jardim das Artes', '2198765432'),
('Vento Editorial','Vento Norte Edições LTDA','Rua do Conhecimento', '789','Vila Sabedoria', '31912345678'),
('Nova Página','Nova Página Editorial ME', 'Travessa dos Autores', '101', 'Bairro Literário', '41998761234'),
('Editora Horizonte', 'Horizonte Gráfica e Editora Ltda.', 'Alameda dos Livros', '202', 'Parque das Letras', '5133445566');

INSERT INTO livro
(isbn_livro, titulo_livro, preco_livro, categoria_livro, autor_id, editora_id, financiador_id)
VALUES
('9788512345010','O Silêncio das Palavras', 49.90, 'Romance', 1, 1, 1 ),
('9788512345027', 'Caminhos do Vento', 59.50, 'Poesia', 2, 2, 2),
('9788512345034', 'Histórias que Contam', 39.90, 'Conto', 3, 3, 3),
('9788512345041', 'Além do Horizonte', 69.90, 'Ficção Científica', 4, 4, 4),
('9788512345058', 'Raízes do Tempo', 54.00, 'História', 1, 5, 5);

INSERT INTO cliente
(nome_cliente, rg_cliente, cpf_cliente, cepRua_cliente, cepNumero_cliente, cepBairro_cliente)
VALUES
('Mariana Souza', '123456789', '12345678900', 'Rua das Palmeiras', '101', 'Centro'),
('João Fernandes', '234567890', '23456789011', 'Avenida Brasil', '202', 'Jardim América'),
('Ana Paula Lima', '345678901', '34567890122', 'Rua do Sol', '303', 'Vila Nova'),
('Carlos Henrique', '456789012', '45678901233', 'Rua das Acácias', '404', 'Bela Vista'),
('Luciana Ribeiro', '567890123', '56789012344', 'Alameda das Árvores', '505', 'Santa Cecília');

INSERT INTO pedido
(qnt_pedido, cliente_id, livro_id)
Values
(2, 1, 3),
(1, 2, 5),
(4, 3, 1),
(3, 4, 4),
(1, 5, 2);

SELECT * FROM autor;
SELECT * FROM cliente;
SELECT * FROM editora;
SELECT * FROM financiador;
SELECT * FROM livro;
SELECT * FROM pedido;

DROP TABLE autor;
DROP TABLE cliente;
DROP TABLE editora;
DROP TABLE financiador;
DROP TABLE livro;