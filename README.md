# CLI-action — Sistema Integrado de Atendimento, Ouvidoria e Marketing de Retenção

O **CLI-action** é uma aplicação web Full Stack desenvolvida para centralizar a gestão do relacionamento com clientes. O sistema reúne cadastro de clientes, gerenciamento de vendas e serviços, atendimento de manifestações (SAC/Ouvidoria), relatórios de auditoria e segmentação de campanhas de marketing.

O projeto utiliza uma arquitetura dividida entre frontend e backend, com persistência de dados em PostgreSQL e comunicação por meio de uma API REST.

---

## 📌 Funcionalidades

### 1. Cadastro e Gestão de Clientes
- Cadastro de clientes com validação de CPF.
- Verificação de duplicidade de CPF.
- Formatação e validação de telefone.
- Consulta e pesquisa de clientes por nome ou CPF.
- Edição e exclusão de registros.
- Controle de consentimento LGPD por canal de comunicação:
  - E-mail;
  - WhatsApp;
  - Ligações.
- Definição da preferência de consumo do cliente.

### 2. Gestão de Vendas e Serviços
- Registro de vendas e serviços realizados.
- Associação de cada venda a um cliente cadastrado.
- Registro de produto ou serviço, valor, data e forma de pagamento.
- Identificação do funcionário responsável.
- Consulta dos registros utilizados em outros módulos do sistema.

### 3. SAC e Ouvidoria
- Registro de manifestações vinculadas a clientes.
- Classificação e identificação do tipo de manifestação.
- Associação opcional com pedidos ou vendas existentes.
- Identificação do funcionário envolvido e do gerente responsável.
- Preenchimento do funcionário a partir da venda vinculada.
- Registro de consentimento LGPD.
- Cálculo do prazo de atendimento de 7 dias corridos.

**Fluxo de atendimento:**

| Status | Descrição |
|---|---|
| Em Aberto | Manifestação registrada no sistema. |
| Em Tratamento | Atendimento iniciado pela equipe responsável. |
| Finalizado | Manifestação concluída com parecer do gerente. |

A finalização exige um parecer conclusivo, limitado a 250 caracteres, e registra a data de encerramento.

### 4. Marketing e Retenção
- Identificação automática dos aniversariantes do mês.
- Segmentação de clientes por preferência de consumo.
- Identificação de clientes com autorização para receber comunicações.
- Consideração das permissões LGPD antes da segmentação.
- Organização de públicos para campanhas de retenção.

### 5. Relatórios de Auditoria e Ouvidoria
- Painel de indicadores das manifestações.
- Contabilização de ocorrências registradas.
- Distribuição das manifestações por status.
- Acompanhamento do ciclo de atendimento.
- Consulta dos registros e pareceres de encerramento.

---

## 🏗️ Arquitetura do Projeto

O sistema utiliza uma arquitetura cliente-servidor, dividida em duas aplicações principais:

| Camada | Tecnologias | Responsabilidade |
|---|---|---|
| Frontend | React, Vite e JavaScript | Interface, componentes, formulários e interação com o usuário. |
| Backend | Node.js e Express | API REST, rotas, processamento das requisições e regras de negócio. |
| Banco de dados | PostgreSQL | Persistência de dados e relacionamentos entre registros. |

A comunicação entre frontend e backend acontece por meio de requisições HTTP, utilizando `fetch` para consumir os endpoints da API.

---

## 🛠️ Tecnologias Utilizadas

**Frontend**
- React 19
- Vite
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express 5
- JavaScript (ES Modules)
- CORS
- Dotenv

**Banco de Dados**
- PostgreSQL
- Driver `pg`

**Ferramentas**
- Git e GitHub
- Visual Studio Code
- pgAdmin 4

---

## 📂 Estrutura de Diretórios

O projeto está organizado em duas aplicações independentes:

```text
cltActionTeste/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── clienteRouter.js
│   │   │   ├── vendaRouter.js
│   │   │   └── manifestacaoRouter.js
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CadastroCliente.jsx
│   │   │   ├── CadastroVenda.jsx
│   │   │   ├── CadastroManifestacao.jsx
│   │   │   ├── Marketing.jsx
│   │   │   ├── Relatorios.jsx
│   │   │   └── ModalParecer.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── index.html
│   └── ...
│
├── .gitignore
└── README.md
```

**Observação:** os diretórios `backend` e `frontend` possuem seus próprios arquivos `package.json`, permitindo instalar e executar as dependências de cada aplicação separadamente.

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clonar o repositório

```bash
git clone https://github.com/GabrielRogerDelano/cltActionTeste.git

cd cltActionTeste
```

### 2. Configurar o banco de dados

1. Abra o PostgreSQL pelo pgAdmin 4.
2. Crie um banco de dados para a aplicação.
3. Configure as credenciais de conexão utilizadas pelo backend.
4. Certifique-se de que as tabelas necessárias estejam criadas antes de iniciar o sistema.

### 3. Configurar o Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`, de acordo com os parâmetros de conexão utilizados pelo projeto.

Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

O backend utiliza a porta `3001` por padrão, caso nenhuma porta seja definida pela variável de ambiente `PORT`.

### 4. Configurar o Frontend

Abra outro terminal e acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

O Vite disponibilizará o endereço local para acessar a interface, normalmente:

```text
http://localhost:5173
```

---

## 🔗 Endpoints da API

A API está organizada em três grupos principais de recursos:

### Clientes — `/api/clientes`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/clientes` | Consulta os clientes cadastrados. |
| POST | `/api/clientes` | Cadastra um novo cliente. |
| PUT | `/api/clientes/:id` | Atualiza um cliente. |
| DELETE | `/api/clientes/:id` | Exclui um cliente. |

### Vendas — `/api/vendas`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/vendas` | Consulta as vendas registradas. |
| POST | `/api/vendas` | Registra uma nova venda. |

### Manifestações — `/api/manifestacoes`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/manifestacoes` | Consulta as manifestações. |
| POST | `/api/manifestacoes` | Registra uma manifestação. |
| PATCH | `/api/manifestacoes/:id/iniciar` | Inicia o tratamento. |
| PUT | `/api/manifestacoes/:id/finalizar` | Finaliza a manifestação e registra o parecer. |

---

## 🔒 Segurança e LGPD

O sistema considera princípios de proteção de dados pessoais por meio de:

- Registro de consentimento para comunicações de marketing.
- Controle de permissões por canal de contato.
- Consentimento para registro de manifestações.
- Associação dos registros por identificadores relacionais.
- Configuração de credenciais do banco de dados por variáveis de ambiente.

---

## 🎯 Objetivo do Projeto

O CLI-action foi desenvolvido com o objetivo de aplicar conhecimentos de desenvolvimento Full Stack em um cenário próximo de uma aplicação empresarial.

O projeto permite praticar:

- Desenvolvimento de interfaces com React.
- Criação e organização de APIs REST com Node.js e Express.
- Integração entre frontend e backend.
- Operações CRUD.
- Modelagem e consultas em banco de dados relacional.
- Relacionamentos entre entidades no PostgreSQL.
- Validação de dados e regras de negócio.
- Separação de responsabilidades e modularização de componentes.

---

## 👨‍💻 Autor

**Gabriel Roger Delano**

[GitHub](https://github.com/GabrielRogerDelano)
