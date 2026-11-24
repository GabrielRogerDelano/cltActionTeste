import 'dotenv/config';
console.log({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    passwordExiste: typeof process.env.DB_PASSWORD === 'string',
    port: process.env.DB_PORT
});
import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});