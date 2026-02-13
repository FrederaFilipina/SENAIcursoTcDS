DROP DATABASE almox_ind;

CREATE DATABASE almox_ind;
USE almox_ind;

CREATE TABLE matLimpeza (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (255) NOT NULL,
categoria VARCHAR (100) NOT NULL,
valor_un DECIMAL (10,2) NOT NULL,
estoque_min INT NOT NULL DEFAULT 0,
estoque_max INT NOT NULL DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movEstoque(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
qntdd_mov INT NOT NULL,
tipo_mov ENUM ('Entrada', 'Saída') NOT NULL,
data_mov DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

matLimpeza_id INT NOT NULL,
CONSTRAINT fk_movEstoque_matLimpeza
FOREIGN KEY (matLimpeza_id) REFERENCES matLimpeza(id)
ON UPDATE CASCADE
ON DELETE RESTRICT
);

INSERT INTO matLimpeza
(nome, categoria, valor_un, estoque_min, estoque_max)
VALUES
('Sabão Lqd - Azul', 'Cozinha', 5.50, 25, 100),
('Sabão Lqd - Verde', 'Cozinha', 5.50, 25, 100),
('Sabão Lqd - Roza', 'Cozinha', 5.50, 25, 100);

INSERT INTO movEstoque
(matLimpeza_id, qntdd_mov, tipo_mov, data_mov)
VALUES
(1, 10, 'Entrada','2026-02-12 20:07:00'),
(1, 10, 'Entrada','2026-02-12 20:07:00'),
(2, 10, 'Entrada','2026-02-12 20:07:00'),
(3, 5, 'Entrada','2026-02-12 20:07:00'),
(1, 5, 'Saída','2026-02-12 20:07:00'),
(1, 5, 'Saída','2026-02-12 20:07:00'),
(2, 5, 'Saída','2026-02-12 20:07:00'),
(3, 4, 'Saída','2026-02-12 20:07:00');

CREATE VIEW vw_estoque AS
SELECT matLimpeza.id AS matLimpeza_id,
matLimpeza.nome,
matLimpeza.categoria,
matLimpeza.valor_un,
SUM(
CASE
	WHEN movEstoque.tipo_mov = 'Entrada' THEN movEstoque.qntdd_mov
	WHEN movEstoque.tipo_mov = 'Saída' THEN -movEstoque.qntdd_mov
    ELSE 0
END) AS saldo_estoque,
SUM(
CASE
	WHEN movEstoque.tipo_mov = 'Entrada' THEN movEstoque.qntdd_mov
	WHEN movEstoque.tipo_mov = 'Saída' THEN -movEstoque.qntdd_mov
    ELSE 0
END) * matLimpeza.valor_un AS valor_total

FROM matLimpeza
LEFT JOIN movEstoque ON movEstoque.matLimpeza_id = matLimpeza.id
GROUP BY matLimpeza.id,
matLimpeza.nome,
matLimpeza.categoria,
matLimpeza.valor_un;