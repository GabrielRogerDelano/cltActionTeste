
import express from 'express';
import cors from 'cors';

import clienteRoutes from './routes/clienteRouter.js';
import vendaRoutes from './routes/vendaRouter.js';
import manifestacaoRoutes from './routes/manifestacaoRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/clientes', clienteRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/manifestacoes', manifestacaoRoutes);

export default app;
 