## Como rodar o projeto localmente

Siga o passo a passo abaixo para configurar e executar o projeto em sua máquina:

### 1. Baixar o projeto
Escolha uma das opções abaixo:
* **Via terminal:** Clone o repositório executando:
  ```bash
  git clone https://github.com/GabrielRogerDelano/Clt-action/
  ```
* **Via ZIP:** Baixe o arquivo `.ZIP` direto do GitHub e extraia os arquivos.

### 2. Abrir a pasta
Entre na pasta do projeto pelo terminal:
```bash
cd Clt-action
```

### 3. Instalar as dependências
> ⚠️ **Requisito:** Você precisa ter o [Node.js](https://nodejs.org) instalado na máquina.

Abra o terminal na raiz do projeto e instale as bibliotecas necessárias executando:
```bash
npm install
```
*(Caso utilize o Yarn, execute apenas `yarn`)*

### 4. Iniciar o projeto
Para rodar o projeto em modo de desenvolvimento, execute:

```bash
npm run dev
```
*(Se o projeto foi feito com Create React App, utilize `npm start`)*

### 5. Criar uma nova branch para trabalhar
Antes de fazer alterações no código, crie e mude para uma nova branch:
```bash
git checkout -b nome-da-sua-branch (pode ser seu nome)
```
*(Se fizer alguma mudaça e quiser enviar, coloquena sua branch)*