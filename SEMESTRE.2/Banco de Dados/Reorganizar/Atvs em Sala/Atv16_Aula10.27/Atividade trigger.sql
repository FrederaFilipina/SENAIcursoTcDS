DROP DATABASE abastecimento;
CREATE DATABASE abastecimento;

USE abastecimento;


CREATE TABLE posto(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
preco DECIMAL(8,2) DEFAULT('6.50'),
estoque DECIMAL(8,2),
CHECK(estoque > 0)
);

INSERT INTO posto(estoque) VALUES('1000.00');

SELECT*FROM posto;


CREATE TABLE veiculo(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
placa VARCHAR(100),
litros_abastecidos DECIMAL(8,2),
posto_id INT,
FOREIGN KEY (posto_id)
REFERENCES posto (id)
);

INSERT INTO veiculo(placa,litros_abastecidos,posto_id) VALUES ('MEU','1000.01','1');


CREATE TABLE pedido(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
data_hora DATETIME,
tipo_entrega ENUM('Normal','Urgente'),
preco DECIMAL(8,2),
quantidade INT,
valor_total DECIMAL(8,2),
valor_total_com_desconto DECIMAL(8,2)
);



DELIMITER $$
CREATE TRIGGER estoque_atualizado
AFTER INSERT ON veiculo 
FOR EACH ROW
BEGIN

UPDATE posto
SET posto.estoque = posto.estoque - new.litros_abastecidos 
WHERE posto.id = new.posto_id;
END;
$$




DELIMITER $$
CREATE TRIGGER inserindo_valores
BEFORE INSERT ON pedido
FOR EACH ROW
BEGIN
SET new.valor_total = new.preco * new.quantidade;
SET new.valor_total_com_desconto = new.valor_total * 0.9;
END;
$$

INSERT INTO pedido(data_hora,tipo_entrega,preco,quantidade)
VALUES
("2025-10-16 19:30:00","Urgente","10.00","6.00"),
("2025-10-16 19:30:00","Normal","150.00","8.00"),
("2025-10-16 19:30:00","Urgente","130.00","8.00"),
("2025-10-16 19:30:00","Normal","80.00","3.00"),
("2025-10-16 19:30:00","Urgente","90.00","4.00"),
("2025-10-16 19:30:00","Normal","15.00","5.00")
;

SELECT *FROM pedido;