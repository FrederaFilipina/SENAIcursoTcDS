CREATE DATABASE lojinha;
USE lojinha;

CREATE TABLE cliente(
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45),
cidade VARCHAR(45)
);

CREATE TABLE acompanhamento(
id_acompanhamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
situacao VARCHAR(45)
);

CREATE TABLE pedido(
id_pedido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dataPedido DATE,
valor DECIMAL(8,2),
cliente_id INT,
acompanhamento_id INT
);

ALTER TABLE pedido
ADD FOREIGN KEY (cliente_id)
REFERENCES cliente (id_cliente);

ALTER TABLE pedido
ADD FOREIGN KEY (acompanhamento_id)
REFERENCES acompanhamento (id_acompanhamento);


INSERT INTO cliente
(nome, cidade)
VALUES
('João', 'Macaé'), ('Carlos', 'Salvador'), ('Maria', 'Niteroí'), ('Ana', 'Campinas'),  ('Marcos', 'Santos');

INSERT INTO acompanhamento
(situacao)
VALUES
('Registrado'), ('Em transporte'), ('Entregue');

INSERT INTO pedido
(dataPedido, valor, cliente_id, acompanhamento_id)
VALUES
('2024-09-24', 250.00, 2, 1), ('2024-09-25', 150.00, 1, 2), ('2024-09-25', 450.00, 4, 3);



-- Consultando duas tabelas (i)
SELECT * FROM pedido
INNER JOIN cliente;
-- Consultando duas tabelas (f)


-- Consultando duas tabelas, junto com uma especificação: Quem apenas solicitou os pedidos (i)
SELECT * FROM pedido
JOIN cliente
ON pedido.cliente_id = cliente.id_cliente;
-- Consultando duas tabelas, junto com uma especificação: Quem apenas solicitou os pedidos (f)


-- Consultando trÊs tabelas, junto com duas especificação: Quem apenas solicitou os pedidos e seus status (i)
SELECT * FROM pedido
JOIN cliente
ON pedido.cliente_id = cliente.id_cliente
JOIN acompanhamento
ON pedido.acompanhamento_id = acompanhamento.id_acompanhamento;
-- Consultando trÊs tabelas, junto com duas especificação: Quem apenas solicitou os pedidos e seus status (f)


-- Consultando trÊs tabelas, junto com duas especificação: Quem apenas solicitou os pedidos e seus status, porém definindo as tabelas que vão aparecer (i)
SELECT pedido.id_pedido,  pedido.dataPedido, cliente.nome, acompanhamento.situacao FROM PEDIDO
JOIN cliente
ON pedido.cliente_id = cliente.id_cliente
JOIN acompanhamento
ON pedido.acompanhamento_id = acompanhamento.id_acompanhamento;
-- Consultando trÊs tabelas, junto com duas especificação: Quem apenas solicitou os pedidos e seus status, porém definindo as tabelas que vão aparecer (f)

-- Criando um atalho para retornar uma pesquisa específica, sempre que precisar (i)
CREATE VIEW vw_consulta_cliente_pedido_situacao AS

SELECT pedido.id_pedido,  pedido.dataPedido, cliente.nome, acompanhamento.situacao FROM PEDIDO
JOIN cliente
ON pedido.cliente_id = cliente.id_cliente
JOIN acompanhamento
ON pedido.acompanhamento_id = acompanhamento.id_acompanhamento;
-- Criando um atalho para retornar uma pesquisa específica, sem que precisar (f)

-- Usando o atalho criado (i)
SELECT * FROM vw_consulta_cliente_pedido_situacao;
-- Usando o atalho criado (f)
