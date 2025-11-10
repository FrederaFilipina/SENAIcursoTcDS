DROP DATABASE posto_Trigger;

CREATE DATABASE posto_Trigger;
USE posto_Trigger;

CREATE TABLE bomba(
id_bomba INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
litros_abst DECIMAL (10,3) NOT NULL,
valor DECIMAL(10,2) DEFAULT ('6.50')
);

CREATE TABLE tanque (
id_tanque INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
estoque DECIMAL(10,3), CHECK (estoque > 0),

bomba_id INT,
FOREIGN KEY (bomba_id)
REFERENCES bomba (id_bomba)
);

INSERT INTO tanque
(estoque)
VALUES
('100.00');
SELECT * FROM tanque;

CREATE TRIGGER verificando_estoque
BEFORE INSERT ON bomba
FOR EACH ROW
BEGIN
	DECLARE 
