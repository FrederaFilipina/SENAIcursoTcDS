CREATE TABLE moradores (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    nome VARCHAR(255) NOT NULL,

    bloco CHAR(1) NOT NULL,

    num_ap CHAR(3) NOT NULL,

    usuario VARCHAR(100) NOT NULL UNIQUE,

    senha VARCHAR(255) NOT NULL,

    CONSTRAINT uq_apartamento UNIQUE (bloco, num_ap)
);



CREATE TABLE quadro_recados (

    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    responsavel INT NOT NULL,

    CONSTRAINT fk_responsavel
        FOREIGN KEY (responsavel)
        REFERENCES moradores(id)
        ON DELETE CASCADE,

    tipo_recado VARCHAR(50) NOT NULL,

    recado TEXT NOT NULL,

    status VARCHAR(10) NOT NULL
        DEFAULT 'ativo',

    criado TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP
);



CREATE INDEX idx_quadro_status
ON quadro_recados(status);

CREATE INDEX idx_quadro_criado
ON quadro_recados(criado DESC);

CREATE INDEX idx_quadro_responsavel
ON quadro_recados(responsavel);