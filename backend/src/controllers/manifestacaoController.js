
import * as Manifestacao from '../models/manifestacaoModel.js';

export const listarManifestacoes = async (req, res) => {
    try {
        const manifestacoes = await Manifestacao.listarManifestacoes();
        res.json(manifestacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const criarManifestacao = async (req, res) => {
    try {
        const novaManifestacao =
            await Manifestacao.criarManifestacao(req.body);

        res.status(201).json(novaManifestacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const iniciarManifestacao = async (req, res) => {
    try {
        const manifestacao =
            await Manifestacao.iniciarManifestacao(req.params.id);

        if (!manifestacao) {
            return res.status(404).json({
                error: 'Manifestação não encontrada'
            });
        }

        res.json(manifestacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const finalizarManifestacao = async (req, res) => {
    try {
        const manifestacao =
            await Manifestacao.finalizarManifestacao(
                req.params.id,
                req.body
            );

        if (!manifestacao) {
            return res.status(404).json({
                error: 'Manifestação não encontrada'
            });
        }

        res.json(manifestacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
