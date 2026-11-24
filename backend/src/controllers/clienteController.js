
import * as Cliente from '../models/clienteModel.js';

export const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.listarClientes();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const criarCliente = async (req, res) => {
    try {
        const novoCliente = await Cliente.criarCliente(req.body);
        res.status(201).json(novoCliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const atualizarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.atualizarCliente(
            req.params.id,
            req.body
        );

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente não encontrado'
            });
        }

        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletarCliente = async (req, res) => {
    try {
        const removido = await Cliente.deletarCliente(req.params.id);

        if (!removido) {
            return res.status(404).json({
                error: 'Cliente não encontrado'
            });
        }

        res.json({ message: 'Cliente removido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
