
import pool from '../config/database.js';

const camposManifestacao = `
    id,
    id_cliente AS "idCliente",
    id_pedido AS "idPedido",
    TO_CHAR(data_registro, 'YYYY-MM-DD') AS "dataRegistro",
    COALESCE(
        TO_CHAR(data_finalizacao, 'YYYY-MM-DD'), '-'
    ) AS "dataFinalizacao",
    TO_CHAR(prazo, 'YYYY-MM-DD') AS prazo,
    tipo, meio, texto, classificacao,
    funcionario_envolvido AS "funcionarioEnvolvido",
    responsavel,
    parecer_gerente AS "parecerGerente",
    status,
    autorizado_retorno AS "autorizadoRetorno"
`;

export const listarManifestacoes = async () => {
    const query = `
        SELECT ${camposManifestacao}
        FROM manifestacoes
        ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
};

export const criarManifestacao = async (dados) => {
    const {
        idCliente, idPedido, dataRegistro, prazo, tipo,
        meio, texto, classificacao, funcionarioEnvolvido,
        responsavel, status, autorizadoRetorno
    } = dados;

    const query = `
        INSERT INTO manifestacoes (
            id_cliente, id_pedido, data_registro, prazo,
            tipo, meio, texto, classificacao,
            funcionario_envolvido, responsavel,
            parecer_gerente, status, autorizado_retorno
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, '', $11, $12
        )
        RETURNING
            id,
            id_cliente AS "idCliente",
            id_pedido AS "idPedido",
            TO_CHAR(data_registro, 'YYYY-MM-DD') AS "dataRegistro",
            '-' AS "dataFinalizacao",
            TO_CHAR(prazo, 'YYYY-MM-DD') AS prazo,
            tipo, meio, texto, classificacao,
            funcionario_envolvido AS "funcionarioEnvolvido",
            responsavel,
            parecer_gerente AS "parecerGerente",
            status,
            autorizado_retorno AS "autorizadoRetorno"
    `;

    const values = [
        idCliente, idPedido || null, dataRegistro, prazo,
        tipo, meio, texto, classificacao,
        funcionarioEnvolvido, responsavel,
        status || 'Em Aberto', autorizadoRetorno
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const iniciarManifestacao = async (id) => {
    const query = `
        UPDATE manifestacoes
        SET status = 'Em Tratamento'
        WHERE id = $1
        RETURNING ${camposManifestacao}
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const finalizarManifestacao = async (id, dados) => {
    const { dataFinalizacao, responsavel, parecerGerente } = dados;

    const query = `
        UPDATE manifestacoes
        SET status = 'Finalizado',
            data_finalizacao = $1,
            responsavel = $2,
            parecer_gerente = $3
        WHERE id = $4
        RETURNING ${camposManifestacao}
    `;

    const values = [
        dataFinalizacao, responsavel, parecerGerente, id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};
