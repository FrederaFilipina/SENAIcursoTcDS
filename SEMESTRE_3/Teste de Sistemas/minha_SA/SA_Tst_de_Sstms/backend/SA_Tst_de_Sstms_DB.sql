CREATE TABLE moradores (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    bloco CHAR(1) NOT NULL CHECK (bloco IN ('A', 'B')),
    num_ap CHAR(3) NOT NULL CHECK (num_ap ~ '^[0-9]{3}$')
);

CREATE TABLE quadro_recados (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    responsavel INT NOT NULL,
    CONSTRAINT fk_responsavel
        FOREIGN KEY (responsavel)
        REFERENCES moradores(id),

    tipo_recado VARCHAR(50) NOT NULL CHECK (tipo_recado IN (
        'Avisos Administrativos',
        'Alerta de Serviços',
        'Entregas de Pedidos',
        'Comunicados Gerais'
    )),

    recado TEXT NOT NULL,

    status VARCHAR(10) NOT NULL DEFAULT 'ativo' CHECK (status IN (
        'ativo', 'encerrado'
    )),

    criado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);