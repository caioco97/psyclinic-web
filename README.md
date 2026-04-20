# PsyClinic Web

Interface web do projeto **PsyClinic**, construída com Next.js para autenticação e acesso ao painel da aplicação.

> Este repositório contém o front-end (web). A API vive no mesmo monorepo/projeto e é consumida por este app.

## ✨ Funcionalidades atuais

- Login com validação de formulário.
- Cadastro de usuário com validação de CPF, telefone e confirmação de senha.
- Feedback visual com toasts e loader global durante requisições.
- Rotas protegidas por middleware (`/dashboard`) e redirecionamentos automáticos de sessão.

## 🧱 Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Sonner (toasts)

## 🚀 Como rodar localmente

### 1) Instalar dependências

```bash
npm install
```

### 2) Configurar variáveis de ambiente

Copie o exemplo e ajuste a URL da sua API:

```bash
cp .env.example .env.local
```

Variável obrigatória:

- `NEXT_PUBLIC_API_URL`: URL base da API (ex.: `http://localhost:3333`).

### 3) Iniciar o projeto

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

## 📁 Estrutura resumida

```text
src/
  app/
    login/
    register/
    dashboard/
    api/auth/         # rotas do Next que repassam requests para API
  features/auth/      # serviços de autenticação
  services/           # cliente HTTP
  components/         # componentes compartilhados
  lib/                # utilitários de loading global
  utils/              # utilitários de toast
```

## ✅ Scripts

- `npm run dev` — ambiente de desenvolvimento.
- `npm run build` — build de produção.
- `npm run start` — inicia app em produção.
- `npm run lint` — validação de lint.