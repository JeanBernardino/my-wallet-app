# My Wallet App

Aplicação React moderna para gerenciamento de carteira digital.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool rápida e moderna
- **Tailwind CSS** - Framework CSS utilitário
- **pnpm** - Gerenciador de pacotes eficiente

## 📁 Estrutura do Projeto

```
my-wallet-app/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── hooks/          # Custom React Hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── services/       # Serviços e lógica de negócio
│   │   ├── api.service.ts
│   │   ├── storage.service.ts
│   │   └── index.ts
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Ponto de entrada
│   └── index.css       # Estilos globais
├── public/             # Arquivos estáticos
└── index.html          # HTML principal
```

## 🛠️ Instalação

```bash
# Instalar dependências
pnpm install
```

## 🏃 Executando o Projeto

```bash
# Modo desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build de produção
pnpm preview

# Verificar tipos TypeScript
pnpm lint
```

## 📝 Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis necessárias:

```bash
cp .env.example .env
```

## 🎨 Componentes Disponíveis

### Button
Componente de botão com variantes (primary, secondary, outline).

### Card
Componente de card com título e conteúdo.

## 🪝 Hooks Personalizados

### useLocalStorage
Hook para gerenciar dados no localStorage com estado React.

### useDebounce
Hook para debounce de valores (útil para inputs de busca).

## 🔌 Services

### apiService
Serviço para requisições HTTP (GET, POST, PUT, DELETE).

### storageService
Serviço para manipulação do localStorage.

## 📦 Scripts Disponíveis

- `pnpm dev` - Inicia servidor de desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm preview` - Preview da build de produção
- `pnpm lint` - Verifica tipos TypeScript

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.
