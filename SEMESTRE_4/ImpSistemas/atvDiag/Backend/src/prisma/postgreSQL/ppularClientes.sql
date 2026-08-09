INSERT INTO "Cliente" (
    nome,
    telefone,
    rua,
    numero,
    bairro,
    observacoes,
    "criadoEm",
    "atualizadoEm"
)
VALUES
(
    'João da Silva',
    '48999990001',
    'Rua das Flores',
    '120',
    'Centro',
    'Possui dois cachorros.',
    NOW(),
    NOW()
),
(
    'Maria Oliveira',
    '48999990002',
    'Rua dos Pinheiros',
    '250',
    'Trindade',
    'Prefere atendimento pela manhã.',
    NOW(),
    NOW()
),
(
    'Pedro Santos',
    '48999990003',
    'Avenida Brasil',
    '850',
    'Estreito',
    'Solicita atenção especial à cozinha.',
    NOW(),
    NOW()
);