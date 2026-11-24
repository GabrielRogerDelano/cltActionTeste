
import { Router } from 'express';

import {
    listarManifestacoes,
    criarManifestacao,
    iniciarManifestacao,
    finalizarManifestacao
} from '../controllers/manifestacaoController.js';

const router = Router();

router.get('/', listarManifestacoes);
router.post('/', criarManifestacao);
router.patch('/:id/iniciar', iniciarManifestacao);
router.put('/:id/finalizar', finalizarManifestacao);

export default router;
