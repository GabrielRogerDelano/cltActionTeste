
import pool from '../config/database.js';

export const listarVendas = async () => {
    const query = `
        SELECT id,
            id_cliente AS "idCliente",
            TO_CHAR(data, 'YYYY-MM-DD') AS data,
            produto, valor,
            forma_pagamento AS "formaPagamento",
            funcionario
        FROM vendas
        ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
};

export const criarVenda = async (dados) => {
    const {
        idCliente, data, produto, valor,
        formaPagamento, funcionario
    } = dados;

    const query = `
        INSERT INTO vendas (
            id_cliente, data, produto,
            valor, forma_pagamento, funcionario
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id,
            id_cliente AS "idCliente",
            TO_CHAR(data, 'YYYY-MM-DD') AS data,
            produto, valor,
            forma_pagamento AS "formaPagamento",
            funcionario
    `;

    const values = [
        idCliente, data, produto,
        valor, formaPagamento, funcionario
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};
