
import * as Venda from '../models/vendaModel.js';

export const listarVendas = async (req, res) => {
    try {
        const vendas = await Venda.listarVendas();
        res.json(vendas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const criarVenda = async (req, res) => {
    try {
        const novaVenda = await Venda.criarVenda(req.body);
        res.status(201).json(novaVenda);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
