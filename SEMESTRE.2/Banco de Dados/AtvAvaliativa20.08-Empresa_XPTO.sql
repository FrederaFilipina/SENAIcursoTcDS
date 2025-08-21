CREATE DATABASE empresa_XPTO;
USE empresa_XPTO;

CREATE TABLE empresa(
id_empresa INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
codigo_empresa VARCHAR (100),
nome_empresa VARCHAR (100),
rua_endereco_empresa INT,
numero_endereco_empresa VARCHAR (100),
bairro_endereco_empresa VARCHAR (100),
cidade_endereco_empresa VARCHAR (100),
estado_endereco_empresa VARCHAR (100),
cep_endereco_empresa INT
);

CREATE TABLE consultor(
id_consultor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_consultor VARCHAR (100),
cpf_consultor BIGINT(11),
especializacao_consultor VARCHAR (100),
funcao_exercida_consultor VARCHAR(100)
);

CREATE TABLE unidade(
id_unidade INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_gerente_unidade VARCHAR (100),
nome_supervisor_unidade VARCHAR (100)
);

CREATE TABLE departamento(
id_departamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_departamento VARCHAR (100),
sigla_departamento VARCHAR (10),
centro_custo_departamento INT,
unidade_id INT
);

ALTER TABLE departamento
ADD FOREIGN KEY (unidade_id)
REFERENCES unidade (id_unidade);

CREATE TABLE projeto(
id_projeto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_projeto INT,
data_inicio_projeto DATE,
data_fim_projeto DATE,
valor_projeto DECIMAL(10,2),
empresa_id INT,
consultor_id INT,
departamento_id INT
);

ALTER TABLE projeto
ADD FOREIGN KEY (empresa_id)
REFERENCES empresa (id_empresa);

ALTER TABLE projeto
ADD FOREIGN KEY (consultor_id)
REFERENCES consultor (id_consultor);

ALTER TABLE projeto
ADD FOREIGN KEY (departamento_id)
REFERENCES departamento (id_departamento);