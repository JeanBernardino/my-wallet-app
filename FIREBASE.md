# Configuração do Firebase

## Passo 1: Criar um projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou selecione um projeto existente
3. Siga as instruções para criar seu projeto

## Passo 2: Registrar seu app

1. No console do Firebase, clique no ícone da web (`</>`) para adicionar um app web
2. Registre seu app com um apelido (ex: "My Wallet App")
3. Copie as configurações do Firebase que aparecem

## Passo 3: Configurar variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Abra o arquivo `.env` e preencha com as credenciais do seu projeto Firebase:
   ```
   VITE_FIREBASE_API_KEY=sua_api_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
   ```

## Passo 4: Habilitar serviços no Firebase

### Authentication
1. No console do Firebase, vá em "Authentication" → "Sign-in method"
2. Habilite os provedores desejados (ex: Email/Password)

### Firestore Database
1. No console do Firebase, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo de teste ou produção
4. Selecione uma localização

## Como usar

### Autenticação

```typescript
import { firebaseAuthService } from './services';

// Cadastrar usuário
const signup = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseAuthService.signUp(email, password);
    console.log('User:', userCredential.user);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Fazer login
const signin = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseAuthService.signIn(email, password);
    console.log('User:', userCredential.user);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Fazer logout
const logout = async () => {
  try {
    await firebaseAuthService.signOut();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Monitorar estado de autenticação
firebaseAuthService.onAuthStateChange((user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('User is signed out');
  }
});
```

### Firestore

```typescript
import { firestoreService, where, orderBy } from './services';

// Adicionar documento
const addTransaction = async () => {
  const id = await firestoreService.addDocument('transactions', {
    amount: 100,
    description: 'Compra no mercado',
    date: new Date(),
  });
  console.log('Document ID:', id);
};

// Buscar documento
const getTransaction = async (id: string) => {
  const transaction = await firestoreService.getDocument('transactions', id);
  console.log('Transaction:', transaction);
};

// Buscar documentos com filtros
const getTransactions = async () => {
  const transactions = await firestoreService.getDocuments(
    'transactions',
    where('amount', '>', 0),
    orderBy('date', 'desc')
  );
  console.log('Transactions:', transactions);
};

// Atualizar documento
const updateTransaction = async (id: string) => {
  await firestoreService.updateDocument('transactions', id, {
    amount: 150,
  });
};

// Deletar documento
const deleteTransaction = async (id: string) => {
  await firestoreService.deleteDocument('transactions', id);
};
```

## Estrutura criada

- `src/config/firebase.config.ts` - Configuração e inicialização do Firebase
- `src/services/firebase.service.ts` - Serviços de autenticação e Firestore
- `.env.example` - Exemplo de variáveis de ambiente

## Segurança

⚠️ **Importante:** Nunca commite o arquivo `.env` com suas credenciais reais. O arquivo já está listado no `.gitignore` para evitar isso.
