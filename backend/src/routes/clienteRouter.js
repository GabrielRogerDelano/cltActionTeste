
import { Router } from 'express';

import {
    listarClientes,
    criarCliente,
    atualizarCliente,
    deletarCliente
} from '../controllers/clienteController.js';

const router = Router();

router.get('/', listarClientes);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

export default router;
