# CLI-action — Sistema Integrado de Atendimento, Ouvidoria e Marketing de Retencao

O **CLI-action** e uma aplicacao web Full Stack desenvolvida para centralizar o relacionamento com o cliente, integrando cadastros com validacoes de integridade, historico de vendas/servicos, fluxo completo de Ouvidoria (SAC) com SLA e campanhas segmentadas de Marketing de Retencao em conformidade com a **LGPD**.

---

## Indice

- [Visao Geral da Arquitetura](#visao-geral-da-arquitetura)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Modelagem do Banco de Dados (PostgreSQL)](#modelagem-do-banco-de-dados-postgresql)
- [Endpoints da API RESTful](#endpoints-da-api-restful)
- [Estrutura de Diretorios](#estrutura-de-diretorios)
- [Pre-requisitos e Instalacao](#pre-requisitos-e-instalacao)
- [Como Executar o Projeto](#como-executar-o-projeto)

---

## Visao Geral da Arquitetura

O sistema opera em uma arquitetura cliente-servidor de tres camadas:

1. **Frontend (React + Vite):** Interface Single Page Application (SPA) reativa dividida em modulos funcionais, responsavel pela validacao de formularios em tempo real e consumo assincrono da API via `fetch`.
2. **Backend (Node.js + Express):** Camada intermediaria de API RESTful que gerencia regras de negocio, mapeamento de colunas (`snake_case` para `camelCase`) e seguranca via CORS.
3. **Banco de Dados Relacional (PostgreSQL):** Persistencia estruturada com chaves primarias, chaves estrangeiras (`FOREIGN KEY`) e restricoes de integridade referencial (`ON DELETE CASCADE` / `ON DELETE SET NULL`).

---

## Funcionalidades Principais

### 1. Modulo de Entrada & Formularios
* **Cadastro & Gestao de Clientes:**
  * Validacao de **CPF unico** (bloqueio automatico de duplicidades no frontend e no banco).
  * Controle de **Consentimento LGPD** granular por canal de comunicacao (E-mail, WhatsApp e Ligacoes).
  * Busca dinamica em tempo real por nome ou CPF, edicao completa e **exclusao protegida** (impede a remocao de clientes que possuam vendas ou ocorrencias de ouvidoria vinculadas).
* **Registro de Vendas & Servicos Efetivados:**
  * Vinculo relacional direto com o cliente cadastrado (`id_cliente`).
  * Registro de produto/servico, valor monetario, forma de pagamento (Pix, Cartao, etc.), data e funcionario responsavel pelo atendimento.
* **Formulario Unico de Manifestacao (SAC / Ouvidoria):**
  * Preenchimento inteligente: ao selecionar o ID de um pedido, o sistema identifica e preenche automaticamente o funcionario responsavel pela venda.
  * Calculo automatico de **SLA de atendimento (+7 dias corridos)** a partir da data de abertura.
  * Termo de aceite obrigatorio da **LGPD** antes do registro do protocolo.

### 2. Modulo de Automacao de Marketing
* **Aniversariantes do Mes:** Filtragem automatica de clientes que fazem aniversario no mes vigente e autorizaram contato via E-mail ou WhatsApp.
* **Segmentacao por Perfil de Consumo:** Separacao inteligente entre clientes com preferencia por **Produtos** ou **Servicos**, respeitando estritamente as permissoes de contato registradas.

### 3. Modulo de Relatorio de Auditoria & Ouvidoria
* **Painel de Metricase Indicadores em Tempo Real:** Contabilizacao dinamica do total de ocorrencias e sua distribuicao por status.
* **Ciclo de Vida Completo da Ocorrencia:**
  1. `Em Aberto`: Estado inicial assim que o protocolo e registrado pelo atendimento.
  2. `Em Tratamento`: Ativado pelo botao **Iniciar Tratamento**, sinalizando que a equipe iniciou a apuracao.
  3. `Finalizado`: Concluido mediante emissao obrigatoria do **Parecer Conclusivo do Gerente** (limitado a 250 caracteres para objetividade executiva) com registro automatico da data de encerramento.

---

## Modelagem do Banco de Dados (PostgreSQL)

O banco de dados **`CliAction`** e composto por tres tabelas relacionais:

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    data_nasc DATE,
    sexo VARCHAR(20),
    mkt_email BOOLEAN DEFAULT FALSE,
    mkt_whats BOOLEAN DEFAULT FALSE,
    mkt_ligacao BOOLEAN DEFAULT FALSE,
    preferencia VARCHAR(50)
);

CREATE TABLE vendas (
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    produto VARCHAR(150) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    forma_pagamento VARCHAR(50),
    funcionario VARCHAR(100)
);

CREATE TABLE manifestacoes (
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
    id_pedido INTEGER REFERENCES vendas(id) ON DELETE SET NULL,
    data_registro DATE NOT NULL,
    data_finalizacao DATE,
    prazo DATE,
    tipo VARCHAR(50),
    meio VARCHAR(50),
    texto TEXT,
    classificacao VARCHAR(50),
    funcionario_envolvido VARCHAR(100),
    responsavel VARCHAR(100),
    parecer_gerente TEXT,
    status VARCHAR(50) DEFAULT 'Em Aberto',
    autorizado_retorno BOOLEAN DEFAULT FALSE
);
```

---

## Endpoints da API RESTful

| Metodo | Rota | Descricao |
| :--- | :--- | :--- |
| `GET` | `/api/clientes` | Lista todos os clientes ordenados por ID |
| `POST` | `/api/clientes` | Cadastra um novo cliente |
| `PUT` | `/api/clientes/:id` | Atualiza os dados cadastrais de um cliente |
| `DELETE` | `/api/clientes/:id` | Remove um cliente do banco de dados |
| `GET` | `/api/vendas` | Lista todas as vendas e servicos registrados |
| `POST` | `/api/vendas` | Registra uma nova venda vinculada a um cliente |
| `GET` | `/api/manifestacoes` | Lista todas as ocorrencias da Ouvidoria |
| `POST` | `/api/manifestacoes` | Registra uma nova manifestacao com status `Em Aberto` |
| `PATCH` | `/api/manifestacoes/:id/iniciar` | Altera o status da manifestacao para `Em Tratamento` |
| `PUT` | `/api/manifestacoes/:id/finalizar` | Registra o parecer do gerente e altera o status para `Finalizado` |

---

## Estrutura de Diretorios

```text
Clt-action/
├── server/                  # Camada Backend (API Node.js)
│   ├── index.js             # Servidor Express, conexao Pool PostgreSQL e rotas REST
│   └── package.json         # Dependencias do servidor (express, pg, cors) e "type": "module"
├── src/                     # Camada Frontend (React)
│   ├── App.jsx              # Componente principal, estados, regras de negocio e telas
│   ├── App.css              # Estilizacao modular, badges de status e responsividade
│   └── main.jsx             # Ponto de entrada da aplicacao React
├── index.html               # Estrutura HTML base
├── package.json             # Dependencias do frontend (React, Vite)
└── README.md                # Documentacao oficial do projeto
```

---

## Pre-requisitos e Instalacao

Certifique-se de ter instalado em sua maquina:
* **Node.js** (v18 ou superior)
* **PostgreSQL** (v15 ou superior) e **pgAdmin 4**

### 1. Configuracao do Banco de Dados
1. Abra o **pgAdmin 4** e crie um banco de dados chamado **`CliAction`**.
2. Abra a *Query Tool* no banco `CliAction` e execute o script SQL presente na secao Modelagem do Banco de Dados.

### 2. Configuracao do Backend
Acesse a pasta `server`, instale as dependencias e configure sua senha do PostgreSQL no arquivo `server/index.js`:

```bash
cd server
npm install
```

No arquivo `server/index.js`, ajuste o objeto `Pool` com suas credenciais locais:
```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CliAction',
  password: 'SUA_SENHA_DO_POSTGRES',
  port: 5432,
});
```

### 3. Configuracao do Frontend
Na pasta raiz do projeto (`Clt-action`), instale as dependencias do React:

```bash
npm install
```

---

## Como Executar o Projeto

Para rodar o sistema completo, utilize **dois terminais** simultaneamente:

**Terminal 1 — Iniciar a API Backend (Porta 3001):**
```bash
cd server
node index.js
```

**Terminal 2 — Iniciar a Interface Frontend (Porta 5173):**
```bash
npm run dev
```

Apos iniciar ambos os servicos, acesse **`http://localhost:5173`** no seu navegador.

---

## Licenca e Uso Academico

Projeto desenvolvido para fins de estudo e aplicacao pratica de desenvolvimento **Full Stack** com integracao entre **React**, **Node.js/Express** e **PostgreSQL**.
