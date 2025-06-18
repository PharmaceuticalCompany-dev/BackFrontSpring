# Guia de Configuração do Projeto

Este guia ajudará você a configurar e executar o projeto. É recomendado abrir este projeto no IntelliJ IDEA para a melhor experiência de desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

- **Docker**: Essencial para a execução dos serviços de backend.

## Primeiros Passos

Siga estas etapas para configurar e executar o projeto:

### Iniciar os Serviços do Backend

```bash
# Navegue até o diretório backend no seu terminal:
cd backend

```bash
# Suba os serviços de backend usando o Docker Compose em modo detached (segundo plano):
docker compose up -d

```bash
# Assim que os serviços estiverem rodando, volte para a raiz do projeto:
cd ..

## Rodar o Front-end

```bash
# Navegue até o diretório frontend:
cd frontend

```bash
# Instale as dependências Node.js necessárias:
npm i

```bash
# Inicie o servidor de desenvolvimento:
npm run dev
