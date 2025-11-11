CREATE DATABASE outraEscola;
USE outraEscola;

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
('Ana Beatriz Silva', 20231001, 'Eng. Mecânica', 'Florianópolis'),
('Lucas Oliveira Santos', 20231002, 'Tec. de Informação', 'São José'),
('Mariana Costa Souza', 20231003, 'Administração', 'Palhoça'),
('Rafael Almeida Pereira', 20231004, 'Eng. Mecânica', 'Florianópolis'),
('Fernanda Lima Rocha', 20231005, 'Tec. de Informação', 'São José'),
('Gabriel Martins Nogueira', 20231006, 'Administração', 'Palhoça'),
('Julia Mendes Ferreira', 20231007, 'Eng. Mecânica', 'Florianópolis'),
('Pedro Henrique Carvalho', 20231008, 'Tec. de Informação', 'São José'),
('Camila Duarte Moreira', 20231009, 'Administração', 'Palhoça'),
('Bruno Almeida Gonçalves', 20231010, 'Eng. Mecânica', 'Florianópolis');

SELECT * FROM aluno;

DELIMITER //
CREATE PROCEDURE busque_id(pesquisa_id INT, curso_atualizado VARCHAR (200), cidade_atualizado VARCHAR(200))
BEGIN
UPDATE aluno
SET
curso = curso_atualizado,
cidade = cidade_atualizado
WHERE id_aluno = pesquisa_id;
SELECT * FROM aluno WHERE id_aluno = pesquisa_id;
END //
CALL busque_id(3, 'Agricultura', 'Santo Amaro');



DELIMITER //
CREATE PROCEDURE deletar_id(pesquisa_id INT)
BEGIN
DELETE FROM aluno WHERE id_aluno = pesquisa_id;
SELECT * FROM aluno;
END//
CALL deletar_id(3);

DELIMITER //
CREATE PROCEDURE pesqCurso(curso VARCHAR)

END//

