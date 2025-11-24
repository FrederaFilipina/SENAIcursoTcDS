CREATE DATABASE familha;
USE familha;

CREATE TABLE filho(
id_filho INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_filho VARCHAR(200)
);

CREATE TABLE pai(
id_pai INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_pai VARCHAR(200),
filho_id INT,
FOREIGN KEY (filho_id)
REFERENCES filho (id_filho)
);

INSERT INTO filho
(nome_filho)
VALUES
('Joãozinho'),('Mariazinha'),('Carlinha'),('Aninha');

INSERT INTO pai
(nome_pai, filho_id)
VALUES
('Antonio', 4),('Antonio', 3),('Carlos', 2);

INSERT INTO pai
(nome_pai)
VALUES
('Mateus');

SELECT * FROM filho;
SELECT * FROM pai;

-- Utilizando o JOIN (i)
SELECT pai.nome_pai, filho.nome_filho FROm pai
JOIN filho
ON pai.filho_id = filho.id_filho;
-- Utilizando o JOIN (f)

-- Utilizando o LEFT JOIN (i)
SELECT pai.nome_pai, filho.nome_filho FROm pai
LEFT JOIN filho
ON pai.filho_id = filho.id_filho;
-- Utilizando o LEFT JOIN (f)

-- Utilizando o RIGHT JOIN (i)
SELECT pai.nome_pai, filho.nome_filho FROm pai
RIGHT JOIN filho
ON pai.filho_id = filho.id_filho;
-- Utilizando o RIGHT JOIN (f)

-- Utilizando o FULL (i)
SELECT pai.nome_pai, filho.nome_filho FROm pai
LEFT JOIN filho
ON pai.filho_id = filho.id_filho
UNION
SELECT pai.nome_pai, filho.nome_filho FROm pai
RIGHT JOIN filho
ON pai.filho_id = filho.id_filho;
-- Utilizando o FULL (f)