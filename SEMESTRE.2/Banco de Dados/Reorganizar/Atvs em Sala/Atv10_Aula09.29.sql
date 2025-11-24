CREATE DATABASE estacionamento2;
USE estacionamento2;

CREATE TABLE estacionamento(
id_estacionamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
capacidade INT,
subsolo ENUM ('Sim', 'Não'),
especial ENUM ('Sim', 'Não')
);

INSERT INTO estacionamento
(nome, capacidade, subsolo, especial)
VALUES
('Estacionamento A', 20, 'Não', 'Não'),
('Estacionamento B', 35, 'Sim', 'Sim'),
('Estacionamento C', 40, 'Sim', 'Sim'),
('Estacionamento D', 50, 'Sim', 'Sim'),
('Estacionamento E', 15, 'Sim', 'Não'),
('Estacionamento F', 85, 'Sim', 'Sim'),
('Estacionamento G', 100, 'Não', 'Não');

SELECT * FROM estacionamento;

SELECT nome, capacidade FROM estacionamento
WHERE capacidade >= 20 AND capacidade <=40 AND subsolo = 'Sim' AND especial = 'Sim'
ORDER BY capacidade ASC;



-- Filtrar capacidade maiores que 50 em ordem decrescente (i)
SELECT nome, capacidade FROM estacionamento
WHERE 50 <= capacidade
ORDER BY capacidade DESC;
-- Filtrar capacidade maiores que 50 em ordem decrescente (f)

-- Filtrar capacidade maiores que 80 ou então nome do estacionamento for "Estacionamento B" (i)
SELECT nome, capacidade FROM estacionamento
WHERE 80 <= capacidade OR nome = 'Estacionamento B';
-- Filtrar capacidade maiores que 80 ou então nome do estacionamento for "Estacionamento B" (f)

-- Filtrar estacionamentos que sejam Especiais e que sejam Subsolo (i)
SELECT * FROM estacionamento
WHERE subsolo = 'Sim' AND especial = 'Sim';
-- Filtrar estacionamentos que sejam Especiais e que sejam Subsolo (f)