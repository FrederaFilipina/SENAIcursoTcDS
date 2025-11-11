CREATE DATABASE escola;
USE escola;

CREATE TABLE aluno(
id_aluno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
matricula INT,
curso VARCHAR (200),
cidade VARCHAR (200)
);

INSERT INTO aluno
(nome, matricula, curso, cidade)
VALUES
('Ana Beatriz Silva', 20231001, 'Engenharia Civil', 'São Paulo'),
('Lucas Oliveira Santos', 20231002, 'Ciência da Computação', 'Rio de Janeiro'),
('Mariana Costa Souza', 20231003, 'Administração', 'Belo Horizonte'),
('Rafael Almeida Pereira', 20231004, 'Direito', 'Curitiba'),
('Fernanda Lima Rocha', 20231005, 'Arquitetura e Urbanismo', 'Salvador'),
('Gabriel Martins Nogueira', 20231006, 'Medicina', 'Porto Alegre'),
('Julia Mendes Ferreira', 20231007, 'Psicologia', 'Recife'),
('Pedro Henrique Carvalho', 20231008, 'Engenharia Mecânica', 'Campinas'),
('Camila Duarte Moreira', 20231009, 'Design Gráfico', 'Florianópolis'),
('Bruno Almeida Gonçalves', 20231010, 'Economia', 'Fortaleza');

DELIMITER //
CREATE PROCEDURE busque_id(pesquisa_id INT, curso_atualizado VARCHAR (200), cidade_atualizado VARCHAR(200))
BEGIN
UPDATE aluno
SET
curso = curso_atualizado,
cidade = cidade_atualizado
WHERE id_aluno = pesquisa_id;
SELECT * FROM aluno WHERE id_aluno = pesquisa_id;
END
//


CALL busque_id(3, 'OutroCurso', 'OutraCidade');