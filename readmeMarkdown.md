# Clt-action — Sistema de Gestão de Clientes e Manifestações

Aplicação Full Stack desenvolvida para o cadastro, consulta e gerenciamento de clientes e manifestações de atendimento. O projeto utiliza uma interface moderna em **React** integrada a uma API REST em **Node.js** com banco de dados relacional **PostgreSQL**.

---

## Tecnologias Utilizadas

### Front-end
* **React** (Biblioteca para construção da interface de usuário)
* **Vite** (Ferramenta de build e servidor de desenvolvimento)
* **CSS3 / HTML5** (Estilização e estruturação das telas)

### Back-end
* **Node.js** (Ambiente de execução JavaScript)
* **Express** (Framework para criação das rotas e API REST)
* **PostgreSQL** (Sistema gerenciador de banco de dados relacional)
* **pg (node-postgres)** (Driver de conexão entre o Node.js e o PostgreSQL)

---

## Estrutura de Pastas do Projeto

```text
Clt-action/
├── public/                 # Arquivos estáticos públicos
├── server/                 # Código-fonte do Back-end (API Node.js)
│   ├── index.js            # Arquivo principal do servidor e rotas
│   └── package.json        # Dependências do back-end
├── src/                    # Código-fonte do Front-end (React)
│   ├── assets/             # Imagens e ícones
│   ├── components/         # Componentes reutilizáveis da interface
│   ├── data/               # Dados auxiliares
│   ├── App.css             # Estilos principais da aplicação
│   ├── App.jsx             # Componente raiz com a lógica de telas e requisições
│   ├── index.css           # Estilos globais
│   └── main.jsx            # Ponto de entrada do React
├── .gitignore              # Arquivos e pastas ignorados pelo Git (ex: node_modules)
├── index.html              # Arquivo HTML principal carregado pelo Vite
├── package.json            # Dependências e scripts do front-end
├── README.md               # Documentação oficial do projeto
└── vite.config.js          # Configurações do Vite
```

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* **Node.js** (versão 18 ou superior)
* **PostgreSQL** (ativo e rodando na porta padrão `5432`)
* **Git** (para clonar o repositório)
* **Visual Studio Code** (recomendado)

---

## Configuração do Banco de Dados (PostgreSQL)

Antes de ligar o servidor, abra o **pgAdmin** (ou terminal `psql`), crie o banco de dados do projeto e execute o script SQL abaixo para criar as tabelas necessárias:

```sql
-- 1. Criação da tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    data_nasc DATE,
    sexo VARCHAR(20),
    mkt_email BOOLEAN DEFAULT FALSE,
    mkt_whats BOOLEAN DEFAULT FALSE,
    mkt_ligacao BOOLEAN DEFAULT FALSE,
    preferencia VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Criação da tabela de Manifestações (vinculada ao cliente)
CREATE TABLE IF NOT EXISTS manifestacoes (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    meio VARCHAR(50),
    texto TEXT NOT NULL,
    classificacao VARCHAR(50),
    responsavel VARCHAR(100),
    parecer_gerente TEXT,
    status VARCHAR(30) DEFAULT 'Em Aberto',
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prazo DATE
);
```

---

## Como Rodar o Projeto Localmente

Para o sistema funcionar por completo, é necessário manter **dois terminais abertos simultaneamente** no VS Code (um para o Back-end e outro para o Front-end).

### 1º Passo: Clonar o repositório
```bash
git clone https://github.com
cd Clt-action_Final_Silveira
```

### 2º Passo: Configurar e iniciar o Back-end (Porta 3001)
No primeiro terminal, acesse a pasta `server`, instale as dependências e inicie o servidor Node:

```bash
cd server
npm install
node index.js
```
> **Nota:** Certifique-se de que as credenciais do banco de dados PostgreSQL estão configuradas corretamente no arquivo `server/index.js` (ou no `.env`). Ao iniciar, o terminal exibirá a confirmação de que o servidor está rodando na porta **3001**.

### 3º Passo: Configurar e iniciar o Front-end (Porta 5173)
Abra um **segundo terminal** na pasta raiz do projeto (`Clt-action`), instale as dependências do React e inicie o Vite:

```bash
npm install
npm run dev
```
> Após executar o comando, segure `Ctrl` e clique no endereço exibido no terminal (geralmente **`http://localhost:5173`**) para abrir a aplicação no navegador.

---

## Funcionalidades Principais

* **Cadastro de Clientes:** Formulário completo para inclusão de novos clientes com validação e envio direto para o PostgreSQL.
* **Registro de Manifestações:** Acompanhamento e registro de solicitações vinculadas aos clientes.
* **Integração Full Stack:** Comunicação assíncrona entre o front-end (porta `5173`) e a API back-end (porta `3001`).

---

## Equipe de Desenvolvimento

Projeto desenvolvido como atividade prática do curso de Desenvolvimento Full Stack (**Geração Tech 4.0**).
