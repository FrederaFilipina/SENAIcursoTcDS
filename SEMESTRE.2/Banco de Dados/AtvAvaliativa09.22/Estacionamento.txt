CREATE DATABASE estacionamento;
USE estacionamento;

CREATE TABLE cliente(
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
dataNascimento DATE
);

CREATE TABLE categoria(
id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
descricao TEXT
);

CREATE TABLE veiculo(
id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
placa VARCHAR(10),
cor VARCHAR(100),
categoria_id INT,
FOREIGN KEY (categoria_id)
REFERENCES categoria (id_categoria),

cliente_id INT,
FOREIGN KEY (cliente_id)
REFERENCES cliente (id_cliente)
);

CREATE TABLE estacionamento(
id_estacionamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
capacidade INT,
dataEntrada DATE,
dataSaida DATE,
horaEntrada TIME,
horaSaida TIME,
veiculo_id INT,
FOREIGN KEY (veiculo_id)
REFERENCES veiculo (id_veiculo)
);


INSERT INTO cliente
(nome, dataNascimento)
VALUES
('Antonio', '1991-01-31'), ('Augusto', '1992-06-01'), ('Pedro', '1993-12-25');

INSERT INTO categoria
(nome, descricao)
VALUES
('Utilitário','05 Pessoas'),('Van','12 Pessoas'),('Pick-UP', '03 Pessoas');

INSERT INTO veiculo
(placa, cor, categoria_id, cliente_id)
VALUES
('AAA-2020', 'Preto', 1, 2),
('BBB-1111', 'Branco', 1, 3),
('CCCC-5050', 'Azul', 2, 3),
('DDD-1234', 'Branco', 1, 2);

INSERT INTO veiculo
(placa, cor)
VALUES
('RRR-2525', 'Azul');

INSERT INTO estacionamento
(nome, capacidade, dataEntrada, dataSaida, horaEntrada, horaSaida, veiculo_id)
VALUES
('Park A', 30, '2025-09-22', '2025-09-22', '07:00:00', '10:30:00', 1),
('Park A', 30, '2025-09-22', '2025-09-22', '07:30:00', '09:30:00', 2),
('Park A', 30, '2025-09-22', '2025-09-22', '08:45:00', '12:15:00', 5),
('Park A', 30, '2025-09-22', '2025-09-22', '14:30:00', '15:30:00', 4),
('Park A', 30, '2025-09-22', '2025-09-22', '15:15:00', '17:30:00', 3),

('Park B', 50, '2025-08-22', '2025-08-22', '07:00:00', '10:30:00', 2),
('Park B', 50, '2025-08-22', '2025-08-22', '07:30:00', '09:30:00', 1),
('Park B', 50, '2025-08-22', '2025-08-22', '08:45:00', '12:15:00', 5),
('Park B', 50, '2025-08-22', '2025-08-22', '14:30:00', '15:30:00', 3),
('Park B', 50, '2025-08-22', '2025-08-22', '15:15:00', '17:30:00', 4),

('Park C', 10, '2025-07-22', '2025-07-22', '07:00:00', '10:30:00', 1),
('Park C', 10, '2025-07-22', '2025-07-22', '07:30:00', '09:30:00', 2),
('Park C', 10, '2025-07-22', '2025-07-22', '08:45:00', '12:15:00', 5),
('Park C', 10, '2025-07-22', '2025-07-22', '14:30:00', '15:30:00', 4),
('Park C', 10, '2025-07-22', '2025-07-22', '15:15:00', '17:30:00', 3);


SELECT * FROM veiculo
JOIN categoria
ON veiculo.categoria_id = categoria.id_categoria
JOIN cliente
ON veiculo.cliente_id = cliente.id_cliente;

SELECT veiculo.placa, veiculo.cor, cliente.nome FROM veiculo
LEFT JOIN cliente
ON veiculo.cliente_id = cliente.id_cliente;

SELECT veiculo.placa, veiculo.cor, categoria.nome, categoria.descricao FROM veiculo
RIGHT JOIN categoria
ON veiculo.categoria_id = categoria.id_categoria;

SELECT veiculo.placa, veiculo.cor, cliente.nome, cliente.dataNascimento FROM veiculo
LEFT JOIN cliente
ON veiculo.cliente_id = cliente.id_cliente
UNION
SELECT veiculo.placa, veiculo.cor, cliente.nome, cliente.dataNascimento FROM veiculo
RIGHT JOIN cliente
ON veiculo.cliente_id = cliente.id_cliente;

SELECT veiculo.id_veiculo, veiculo.placa AS placa_registrada, veiculo.cor, cliente.nome AS nome_do_cliente FROM veiculo
JOIN cliente
ON veiculo.cliente_id = cliente.id_cliente;

CREATE VIEW vw_veiculo_cliente AS
SELECT veiculo.id_veiculo, veiculo.placa AS placa_registrada, veiculo.cor, cliente.nome AS nome_do_cliente FROM veiculo
JOIN cliente
ON veiculo.cliente_id = cliente.id_cliente;

SELECT * FROM vw_veiculo_cliente;