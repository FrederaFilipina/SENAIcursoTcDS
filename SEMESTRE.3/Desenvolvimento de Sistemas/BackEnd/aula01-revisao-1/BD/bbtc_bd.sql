DROP DATABASE bbtc_bd;

CREATE DATABASE bbtc_bd;
USE bbtc_bd;

CREATE TABLE livros(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR (255),
categoria VARCHAR (100),
valor_un DECIMAL (10,2) NOT NULL,
estoque_min INT NOT NULL DEFAULT 0,
estoque_max INT NOT NULL DEFAULT 0,
create_ad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo ENUM ('Entrada', 'Saída') NOT NULL,
quantidade INT NOT NULL,
data_movimentacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

livro_id INT NOT NULL,
CONSTRAINT fk_movimentacoes_livros
FOREIGN KEY (livro_id) REFERENCES livros(id)
ON UPDATE CASCADE
ON DELETE RESTRICT
);

INSERT INTO livros
(titulo, categoria, valor_un, estoque_min, estoque_max)
VALUES
('Dom Casmurro', 'Romance', 45.00, 2, 20),
('Capitaes da Areia', 'Literatura Brasileira', 39.90, 2, 15),
('Clean Code', 'Tecnologia', 120.00, 1, 10);

INSERT INTO movimentacoes
(livro_id, tipo, quantidade, data_movimentacao)
VALUES
(1, 'ENTRADA', 10, '2026-01-03 09:00:00'),
(1, 'SAIDA', 3, '2026-01-10 15:10:00'),
(1, 'SAIDA', 2, '2026-01-15 11:30:00'),
(2, 'ENTRADA', 8, '2026-01-04 10:00:00'),
(2, 'SAIDA', 4, '2026-01-17 16:00:00'),
(3, 'ENTRADA', 6, '2026-01-05 08:30:00'),
(3, 'SAIDA', 1, '2026-01-20 13:15:00');

CREATE VIEW vw_livros AS 
SELECT l.id AS livro_id,
l.titulo,
l.categoria,
l.valor_un,
SUM(
CASE
	WHEN m.tipo = 'Entrada' THEN m.quantidade
	WHEN m.tipo = 'Saída' THEN -m.quantidade
    ELSE 0
END) AS saldo_estoque,
SUM(
CASE
	WHEN m.tipo = 'Entrada' THEN m.quantidade
	WHEN m.tipo = 'Saída' THEN -m.quantidade
    ELSE 0
END) * l.valor_un AS valor_total

FROM livros l
LEFT JOIN movimentacoes m ON m.livro_id = l.id
GROUP BY l.id,
l.titulo,
l.categoria,
l.valor_un;