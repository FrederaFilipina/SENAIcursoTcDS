CREATE DATABASE escola_xyz;
USE escola_xyz;

CREATE TABLE aluno(
id_aluno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200)
);

CREATE TABLE curso(
id_curso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (200),
duracao INT
);

CREATE TABLE inscricao(
id_inscricao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dt_inscricao DATE,

aluno_id INT,
FOREIGN KEY (aluno_id)
REFERENCES aluno (id_aluno),

curso_id INT,
FOREIGN KEY (curso_id)
REFERENCES curso (id_curso)
);

CREATE TABLE mensalidade(
id_mensalidade INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dt_vencimento DATE,
valor DECIMAL,
status_pagamento ENUM('Pago', 'Não Pago'),

inscricao_id INT,
FOREIGN KEY (inscricao_id)
REFERENCES inscricao (id_inscricao)
);

INSERT INTO aluno
(nome)
VALUES
('Frederico'),('Augusto'),('Soares'),('Almeida'),('Campos');

INSERT INTO curso
(nome, duracao)
VALUES
('Banco de Dados', 120),
('Programação de Aplicativos', 100),
('Intro ao Desenvolvimento de Projetos', 40),
('Modelagem de Sistemas', 100),
('Lógica de Programação', 220);

INSERT INTO inscricao
(dt_inscricao, aluno_id, curso_id)
VALUES
('2020-01-02', 4, 4),
('2020-01-02', 3, 3),
('2020-01-02', 2, 2),
('2020-06-02', 4, 4),
('2020-06-02', 3, 3),
('2020-06-02', 2, 2);

INSERT INTO inscricao
(dt_inscricao)
VALUES
('2020-06-02');

INSERT INTO mensalidade
(dt_vencimento, valor, status_pagamento, inscricao_id)
VALUES
('2020-01-10', 550, 'Pago', 1),
('2020-01-10', 540, 'Pago', 2),
('2020-01-10', 530, 'Pago', 3),
('2020-06-10', 580, 'Não Pago', 4),
('2020-06-10', 570, 'Não Pago', 5),
('2020-06-10', 560, 'Não Pago', 6);

-- a) Exiba a SOMA de todas as mensalidades por aluno (i)
SELECT aluno.nome AS 'Nome Aluno', sum(mensalidade.valor) AS 'Ttl Mensalidade' FROM aluno
JOIN inscricao
ON aluno.id_aluno = inscricao.aluno_id
JOIN mensalidade
ON mensalidade.inscricao_id = inscricao.id_inscricao
GROUP BY aluno.nome;
-- a) Exiba a SOMA de todas as mensalidades por aluno (f)

-- b) Exiba a SOMA de todas as mensalidades com o status 'Não Pago' (i)
SELECT sum(mensalidade.valor) AS 'Ttl Mensalidade Ñ Pagos' FROM mensalidade
WHERE status_pagamento = 'Não Pago'
GROUP BY status_pagamento;
-- b) Exiba a SOMA de todas as mensalidades com o status 'Não Pago' (f)

-- c) Exiba o VALOR MÉDIO de mensalidade pago por aluno (i)
SELECT aluno.nome AS 'Nome Aluno', avg(mensalidade.valor) AS 'Média Mensalidade Paga por aluno' FROM aluno
JOIN inscricao
ON aluno.id_aluno = inscricao.aluno_id
JOIN mensalidade
ON mensalidade.inscricao_id = inscricao.id_inscricao
GROUP BY aluno.nome;
-- c) Exiba o VALOR MÉDIO de mensalidade pago por aluno (f)

-- d) Exiba o VALOR MÁXIMO da mensalidade (i)
SELECT max(mensalidade.valor) AS 'Valor Máximo Mensalidade' FROM mensalidade;
-- d) Exiba o VALOR MÁXIMO da mensalidade (f)

-- e) Exiba o VALOR MÍNIMO da mensalidade (i)
SELECT min(mensalidade.valor) AS 'Valor Mínimo Mensalidade' FROM mensalidade;
-- e) Exiba o VALOR MÍNIMO da mensalidade (f)

-- f) Exiba o VALOR MÍNIMO da mensalidade não paga (i)
SELECT min(mensalidade.valor) AS 'Valor Mínimo Mensalidade Ñ Paga' FROM mensalidade
WHERE status_pagamento = 'Não Pago';
-- f) Exiba o VALOR MÍNIMO da mensalidade não paga (f)

-- g) Exiba os nomes dos alunos sem duplicar utilizando DISTINCT e também GROU BY (i)
SELECT aluno.nome AS 'Nome Aluno' FROM aluno
JOIN inscricao
ON aluno.id_aluno = inscricao.aluno_id
GROUP BY aluno.nome;
-- g) Exiba os nomes dos alunos sem duplicar utilizando DISTINCT e também GROU BY (f)

-- h) Exiba o somatório das mensalidades anterior a 10/jun/2020 (i)
SELECT sum(mensalidade.valor) AS 'Ttl Mensalidade antes de 10/jun/202' FROM mensalidade
WHERE '2020-06-10' > dt_vencimento;
-- h) Exiba o somatório das mensalidades anterior a 10/jun/2020 (f)

-- i) Exiba o somatório das mensalidades posterior a 09/jun/2020 (i)
SELECT sum(mensalidade.valor) AS 'Ttl Mensalidade posterior de 09/jun/202' FROM mensalidade
WHERE '2020-06-09' < dt_vencimento;
-- i) Exiba o somatório das mensalidades anterior a 09/jun/2020 (f)

-- j) Exiba o somatório das mensalidades entre id_mensalidade 2 e id_mensalidade 5 (i)
SELECT mensalidade.id_mensalidade, sum(mensalidade.valor) AS 'Ttl Mensalidade entre os Id 2 e 5' from mensalidade
WHERE 2 <= id_mensalidade AND id_mensalidade <= 5
GROUP BY mensalidade.id_mensalidade;

 -- OU
SELECT mensalidade.id_mensalidade, sum(mensalidade.valor) AS 'Ttl Mensalidade entre os Id 2 e 5' from mensalidade
WHERE id_mensalidade BETWEEN 2 AND 5
GROUP BY mensalidade.id_mensalidade;

-- j) Exiba o somatório das mensalidades entre id_mensalidade 2 e id_mensalidade 5 (f)