import pool from '../config/database.js';

export const listarClientes = async () => {
    const query = `
        SELECT id, cpf, nome, email, telefone,
            TO_CHAR(data_nasc, 'YYYY-MM-DD') AS "dataNasc",
            sexo, mkt_email AS "mktEmail",
            mkt_whats AS "mktWhats",
            mkt_ligacao AS "mktLigacao",
            preferencia
        FROM clientes
        ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
};

export const criarCliente = async (dados) => {
    const {
        cpf, nome, email, telefone, dataNasc, sexo,
        mktEmail, mktWhats, mktLigacao, preferencia
    } = dados;

    const query = `
        INSERT INTO clientes (
            cpf, nome, email, telefone, data_nasc, sexo,
            mkt_email, mkt_whats, mkt_ligacao, preferencia
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, cpf, nome, email, telefone,
            TO_CHAR(data_nasc, 'YYYY-MM-DD') AS "dataNasc",
            sexo, mkt_email AS "mktEmail",
            mkt_whats AS "mktWhats",
            mkt_ligacao AS "mktLigacao",
            preferencia
    `;

    const values = [
        cpf, nome, email, telefone, dataNasc || null, sexo,
        mktEmail, mktWhats, mktLigacao, preferencia
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const atualizarCliente = async (id, dados) => {
    const {
        cpf, nome, email, telefone, dataNasc, sexo,
        mktEmail, mktWhats, mktLigacao, preferencia
    } = dados;

    const query = `
        UPDATE clientes
        SET cpf=$1, nome=$2, email=$3, telefone=$4,
            data_nasc=$5, sexo=$6, mkt_email=$7,
            mkt_whats=$8, mkt_ligacao=$9, preferencia=$10
        WHERE id=$11
        RETURNING id, cpf, nome, email, telefone,
            TO_CHAR(data_nasc, 'YYYY-MM-DD') AS "dataNasc",
            sexo, mkt_email AS "mktEmail",
            mkt_whats AS "mktWhats",
            mkt_ligacao AS "mktLigacao",
            preferencia
    `;

    const values = [
        cpf, nome, email, telefone, dataNasc || null, sexo,
        mktEmail, mktWhats, mktLigacao, preferencia, id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const deletarCliente = async (id) => {
    const result = await pool.query(
        'DELETE FROM clientes WHERE id = $1 RETURNING id',
        [id]
    );

    return result.rowCount > 0;
};