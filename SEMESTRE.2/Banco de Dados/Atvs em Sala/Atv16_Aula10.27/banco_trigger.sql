CREATE DATABASE banco_trigger;
USE banco_trigger;

CREATE TABLE produto(
id_produto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (100),
preco DECIMAL (10,2),
estoque INT
);

CREATE TABLE pedido (
id_pedido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
data_horario DATETIME,
quantidade INT,
produto_id INT,
FOREIGN KEY (produto_id)
REFERENCES produto (id_produto)
);

INSERT INTO produto
(nome, preco, estoque)
VALUES
('caderno', '19.00', 200),
('caneta', '5.00', 500),
('lápis', '3.00', 1000);
SELECT * FROM produto;

-- Criando um Trigger (i)
DELIMITER $$ 												-- Delimitando um bloco de linha de código para que tudo seja rodado em conjunto
CREATE TRIGGER estoque_atualizado							-- Criando a Trigger
AFTER INSERT ON pedido 										-- Condição de disparo da Trigger
FOR EACH ROW 												-- Onde a Trigger vai interagir
BEGIN														-- O que será feito (i)
UPDATE produto
SET produto.estoque = produto.estoque - new.quantidade
WHERE produto.id_produto = new.produto_id;
END;
$$ 															-- Delimitando um bloco de linha de código para que tudo seja rodado em conjunto
-- Criando um Trigger (f)

INSERT INTO pedido
(data_horario, quantidade, produto_id)
VALUES
('2025-10-16 19:30:00', 49, 1);

SELECT * FROM produto;