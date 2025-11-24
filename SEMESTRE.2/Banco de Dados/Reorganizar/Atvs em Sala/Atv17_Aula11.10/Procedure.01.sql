CREATE DATABASE estudantes;
USE estudantes;

CREATE TABLE alunos(
id_aluno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200)
);

INSERT INTO alunos
(nome)
VALUES
('nome do id 1'),
('nome do id 2'),
('nome do id 3');

DELIMITER //
CREATE PROCEDURE selecione_id(pesquisa_id INT)
BEGIN
SELECT * FROM alunos
WHERE id_aluno = pesquisa_id;
END
//

CALL selecione_id(3)