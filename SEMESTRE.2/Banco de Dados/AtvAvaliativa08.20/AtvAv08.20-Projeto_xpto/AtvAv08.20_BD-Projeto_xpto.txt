CREATE DATABASE projeto_xpto;
USE projeto_xpto;

CREATE TABLE empresa(
id_empresa INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
codigo_empresa INT,
nome_empresa VARCHAR(200),
cepRua_empresa VARCHAR(200),
cepNumero_empresa INT,
cepBairro_empresa VARCHAR(200),
cepCidade_empresa VARCHAR(200),
cepEstado_empresa VARCHAR(100),
cepCEP_empresa INT
);

CREATE TABLE consultor(
id_consultor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_consultor VARCHAR(200),
cpf_consultor BIGINT(11),
especializacao_consultor VARCHAR(100),
funcaoExercida_consultor VARCHAR(100)
);

CREATE TABLE unidade(
id_unidade INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nomeGerente_unidade VARCHAR(200),
nomeSupervisor_unidade VARCHAR(200)
);

CREATE TABLE departamento(
id_departamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_departamento VARCHAR(200),
sigla_departamento VARCHAR(25),
centroCusto_departamento INT,
unidade_id INT
);

ALTER TABLE departamento
ADD FOREIGN KEY (unidade_id)
REFERENCES unidade (id_unidade);

CREATE TABLE projeto(
id_projeto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_projeto INT,
dataInicio_projeto DATE,
dataFim_pojeto DATE,
valor_projeto DECIMAL(8,2),
consultor_id INT,
empresa_id INT,
departamento_id INT
);

ALTER TABLE projeto
ADD FOREIGN KEY (consultor_id)
REFERENCES consultor (id_consultor);

ALTER TABLE projeto
ADD FOREIGN KEY (empresa_id)
REFERENCES empresa (id_empresa);

ALTER TABLE projeto
ADD FOREIGN KEY (departamento_id)
REFERENCES departamento (id_departamento);