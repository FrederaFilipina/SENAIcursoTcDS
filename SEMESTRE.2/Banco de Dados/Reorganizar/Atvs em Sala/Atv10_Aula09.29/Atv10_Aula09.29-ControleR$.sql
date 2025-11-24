CREATE DATABASE controleR$;
USE controleR$;

CREATE TABLE cliente(
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (200)
);

CREATE TABLE mensalidade(
id_mensalidade INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
cliente_id INT,
FOREIGN KEY (cliente_id)
REFERENCES cliente (id_cliente),
valor DECIMAL (8,2),
status_pagamento ENUM ('Fatura Paga', 'Em Débito')
);

INSERT INTO cliente
(nome)
VALUES
('Jose'),
('Carlos'),
('Marcos');

SELECT * FROM cliente;

INSERT INTO mensalidade
(cliente_id, valor, status_pagamento)
VALUES
(1, 650.00, 'Fatura Paga'),
(2, 670.00, 'Fatura Paga'),
(3, 690.00, 'Fatura Paga'),
(1, 720.00, 'Em Débito'),
(2, 740.00, 'Em Débito'),
(3, 760.00, 'Em Débito'),
(3, 800.00, 'Em Débito');

SELECT * FROM mensalidade;

-- Utilizando o Count para contar quantas mensalidades existem (i)
-- mensalidade. = nome da tabela
-- status_pagamento = nome da coluna
SELECT count(mensalidade.status_pagamento) AS contagem_mensalidade FROM mensalidade;
-- Utilizando o Count para contar quantas mensalidades existem (f)

-- Agrupando por as mensalidades cliente (i)
SELECT cliente.nome, count(mensalidade.status_pagamento) FROM mensalidade
JOIN cliente
ON cliente.id_cliente = mensalidade.cliente_id
GROUP BY cliente.nome;
-- Agrupando por as mensalidades cliente (f)

-- Saber a soma das mensalidade por cliente (i)
SELECT cliente.nome, sum(mensalidade.valor) FROM mensalidade
JOIN cliente
ON cliente.id_cliente = mensalidade.cliente_id
GROUP BY cliente.nome;
-- Saber a soma das mensalidade por cliente (f)

-- Saber a média das mensalidade por clinete (i)
SELECT cliente.nome, avg(mensalidade.valor) FROM mensalidade
JOIN cliente
ON cliente.id_cliente = mensalidade.cliente_id
GROUP BY cliente.nome;
-- Saber a média das mensalidade por clinete (f)

-- Saber a soma dos valores em débitos por cliente (i)
SELECT cliente.nome, sum(mensalidade.valor) FROM mensalidade
JOIN cliente
ON cliente.id_cliente = mensalidade.cliente_id
WHERE status_pagamento = 'Em Débito'
GROUP BY cliente.nome;
-- Saber a soma dos valores em débitos por cliente (f)