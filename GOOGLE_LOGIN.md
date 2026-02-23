# Configuração do Login com Google

Para habilitar o login com Google no seu app, siga estes passos:

## 1. Habilitar Google Sign-in no Firebase Console

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto **mywallet-158c1**
3. No menu lateral, vá em **Authentication** (Autenticação)
4. Clique na aba **Sign-in method** (Método de login)
5. Clique em **Add new provider** ou em **Google** na lista de provedores
6. Ative o interruptor **Enable** (Ativar)
7. Configure:
   - **Project support email**: Selecione um e-mail do projeto
   - **Project public-facing name**: MyWallet (ou deixe o padrão)
8. Clique em **Save** (Salvar)

## 2. Configurar domínios autorizados (para produção)

Se você for fazer deploy da aplicação, adicione seu domínio aos domínios autorizados:

1. Ainda em **Authentication** > **Settings** (Configurações)
2. Role até **Authorized domains** (Domínios autorizados)
3. Clique em **Add domain** (Adicionar domínio)
4. Adicione seu domínio (ex: `mywallet.com` ou `mywallet.vercel.app`)

**Nota:** `localhost` já está autorizado por padrão para desenvolvimento.

## 3. Como funciona

A aplicação já está configurada para usar o login com Google:

- ✅ Botão de login com Google na tela inicial
- ✅ Autenticação via popup
- ✅ Gerenciamento de sessão automático
- ✅ Exibição de informações do usuário após login
- ✅ Botão de logout

## 4. Testar o login

1. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

2. Acesse `http://localhost:5173` no navegador

3. Clique no botão "Entrar com Google"

4. Uma janela popup abrirá solicitando que você escolha sua conta Google

5. Após autorizar, você será redirecionado para a tela principal do app

## 5. Estrutura criada

### Componentes
- `src/components/Login.tsx` - Tela de login com botão do Google

### Hooks
- `src/hooks/useAuth.ts` - Hook personalizado para gerenciar autenticação

### Serviços
- `src/services/firebase.service.ts` - Métodos de autenticação do Firebase
  - `signInWithGoogle()` - Login com Google
  - `signOut()` - Logout
  - `onAuthStateChange()` - Observador de estado de autenticação

### App.tsx
- Gerencia exibição entre tela de login e tela principal
- Exibe informações do usuário logado
- Fornece botão de logout

## 6. Segurança

O Firebase gerencia toda a segurança da autenticação, incluindo:
- Tokens JWT seguros
- Refresh tokens automáticos
- Proteção contra CSRF
- Validação de domínios

## 7. Próximos passos

Agora que a autenticação está funcionando, você pode:

1. Criar regras de segurança no Firestore para proteger dados do usuário
2. Adicionar campos personalizados ao perfil do usuário
3. Implementar funcionalidades específicas para usuários autenticados
4. Criar sistema de permissões e roles
