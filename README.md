# 🚀 ABChicomo Admin System

Sistema completo de gestão administrativa (Admin Dashboard SaaS-ready) desenvolvido por **Artur Bento Chicomo**.

## 📋 Sobre o Projeto

O **ABChicomo Admin System** é uma plataforma profissional de gestão empresarial que funciona como:

- ✅ Painel administrativo moderno
- ✅ CRM (Customer Relationship Management)
- ✅ Sistema de gestão de projetos
- ✅ Plataforma de pedidos de serviços
- ✅ Base para produto SaaS escalável

## 🎯 Características Principais

### 🔐 Autenticação Segura
- Sistema de login com sessão persistente
- Proteção de rotas (middleware)
- Gerenciamento de usuários
- Preparado para sistema multiusuário

### 📊 Dashboard Analítico
- Métricas em tempo real (clientes, projetos, mensagens, serviços)
- Gráficos interativos (Recharts)
- Atividades recentes
- Design moderno e responsivo

### 👥 Gestão de Clientes (CRM)
- CRUD completo (Create, Read, Update, Delete)
- Busca e filtros avançados
- Armazenamento de informações detalhadas
- Cards visuais com avatares

### 💼 Gestão de Projetos
- CRUD completo
- Status de projetos (Pendente, Em Andamento, Concluído)
- Vinculação com clientes
- Filtros por status
- Datas de início e fim
- Descrição detalhada

### 📨 Gestão de Mensagens
- Inbox de mensagens
- Marcação como lida/não lida
- Visualização detalhada
- Contador de mensagens não lidas
- Interface tipo e-mail

### 📦 Pedidos de Serviço
- CRUD completo
- Tipos de serviço customizados
- Status: Novo, Em Análise, Aprovado, Rejeitado
- Orçamento estimado
- Atualização de status rápida

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Motion (Framer Motion)** - Animações
- **React Router 7** - Navegação
- **Lucide React** - Ícones
- **Recharts** - Gráficos
- **Radix UI** - Componentes acessíveis
- **Sonner** - Notificações toast
- **date-fns** - Manipulação de datas

### Estado e Dados
- **Context API** - Gerenciamento de estado global
- **LocalStorage** - Persistência de dados (mock)
- **Arquitetura Service Layer** - Separação de lógicas

## 📁 Estrutura do Projeto

```
/src
  /app
    /components
      /layout
        - DashboardLayout.tsx    # Layout principal
        - Sidebar.tsx            # Barra lateral de navegação
        - Topbar.tsx             # Barra superior
      /ui                        # Componentes reutilizáveis (Radix UI)
    /contexts
      - AuthContext.tsx          # Contexto de autenticação
      - DataContext.tsx          # Contexto de dados
    /pages
      - Dashboard.tsx            # Página inicial com métricas
      - Clients.tsx              # Gestão de clientes
      - Projects.tsx             # Gestão de projetos
      - Messages.tsx             # Gestão de mensagens
      - Services.tsx             # Pedidos de serviço
      - Login.tsx                # Página de login
      - NotFound.tsx             # Página 404
    /services
      - storage.ts               # Service layer para dados
    /types
      - index.ts                 # Definições TypeScript
    - routes.tsx                 # Configuração de rotas
    - App.tsx                    # Componente principal
  /styles
    - index.css                  # Estilos globais
    - theme.css                  # Tema customizado
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd abchicomo-admin-system
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Execute o projeto:
```bash
npm run dev
# ou
pnpm dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

## 🔑 Credenciais de Acesso

### Demonstração
- **Email**: `admin@abchicomo.com`
- **Senha**: `admin123`

## 📊 Dados de Exemplo

O sistema vem com dados de exemplo (seed data) que são inicializados automaticamente na primeira execução:

- 3 Clientes de exemplo
- 3 Projetos de exemplo
- 2 Mensagens de exemplo
- 2 Pedidos de serviço de exemplo

Os dados são armazenados no **LocalStorage** do navegador para persistência.

## 🎨 Design e UI/UX

### Características do Design
- **Dark Mode** por padrão
- Interface moderna inspirada em SaaS (Stripe, Notion)
- Animações suaves com Framer Motion
- Componentes reutilizáveis
- Totalmente responsivo (Mobile, Tablet, Desktop)
- Gradientes vibrantes (Blue/Violet)
- Estados de loading e feedback visual

### Paleta de Cores
- Background: `#000000` (Black)
- Cards: `#18181b` (Zinc-900)
- Borders: `#27272a` (Zinc-800)
- Primary: Gradient Blue → Violet
- Text: `#ffffff` (White) / `#a1a1aa` (Zinc-400)

## 🔧 Funcionalidades Avançadas

### ✨ Implementadas
- ✅ Validação de formulários
- ✅ Confirmação antes de deletar
- ✅ Toast notifications (Sonner)
- ✅ Loading states
- ✅ Busca em tempo real
- ✅ Filtros por status
- ✅ Animações de entrada/saída
- ✅ Sidebar retrátil
- ✅ Avatares com iniciais
- ✅ Formatação de datas (PT-BR)
- ✅ Sistema de atividades recentes

### 🚧 Preparado para o Futuro
- Sistema multiusuário (roles e permissões)
- Integração com backend real (API REST)
- Autenticação JWT
- Upload de arquivos
- Notificações em tempo real
- Sistema de pagamentos
- Planos e assinaturas (SaaS)
- Webhooks
- Logs de auditoria

## 📈 Escalabilidade

### Arquitetura Preparada para Produção

#### Service Layer
```typescript
// Exemplo de service
export const clientService = {
  getAll: () => Client[],
  getById: (id: string) => Client,
  create: (data) => Client,
  update: (id: string, data) => Client,
  delete: (id: string) => boolean,
};
```

#### Context API
- Separação clara de responsabilidades
- AuthContext para autenticação
- DataContext para gerenciamento de dados
- Fácil migração para Redux/Zustand se necessário

#### TypeScript
- Tipagem completa em todo o projeto
- Interfaces bem definidas
- Type safety

## 🌐 Deploy

### Vercel (Recomendado)

1. Instale a Vercel CLI:
```bash
npm install -g vercel
```

2. Faça o deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente (se necessário)

### Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`

## 🔄 Migração para Backend Real

### Passo 1: Criar API Backend
Substitua os serviços do `storage.ts` por chamadas HTTP:

```typescript
// Antes (LocalStorage)
export const clientService = {
  getAll: () => getFromStorage('clients', []),
};

// Depois (API)
export const clientService = {
  getAll: async () => {
    const response = await fetch('/api/clients');
    return response.json();
  },
};
```

### Passo 2: Configurar Autenticação
- Implementar JWT
- Refresh tokens
- Cookies seguros (httpOnly)

### Passo 3: Banco de Dados
Escolha recomendada:
- **PostgreSQL** + Prisma (estruturado)
- **MongoDB** + Mongoose (flexível)
- **Supabase** (tudo em um)

## 🎓 Conceitos Aplicados

### Boas Práticas
- ✅ Código limpo e organizado
- ✅ Componentização adequada
- ✅ Separação de responsabilidades
- ✅ DRY (Don't Repeat Yourself)
- ✅ Naming conventions
- ✅ Comments quando necessário

### Performance
- ✅ Lazy loading
- ✅ Memoization (useCallback)
- ✅ Componentes otimizados
- ✅ Bundle splitting

### Acessibilidade
- ✅ Componentes Radix UI (acessíveis)
- ✅ Labels apropriados
- ✅ Focus management
- ✅ ARIA attributes

## 📝 Licença

Este projeto foi desenvolvido como produto proprietário da **ABChicomo Services**.

## 👨‍💻 Desenvolvedor

**Artur Bento Chicomo**
- Desenvolvedor Web Full Stack
- Técnico de TI
- Criador Digital Angolano

---

## 🚀 Próximos Passos

### Roadmap Sugerido

1. **Backend Real**
   - Criar API REST com Node.js/Express
   - Implementar autenticação JWT
   - Conectar banco de dados

2. **Funcionalidades Avançadas**
   - Upload de arquivos (avatar de clientes)
   - Notificações em tempo real (WebSockets)
   - Dashboard analytics avançado
   - Exportação de dados (PDF/Excel)
   - Multi-idiomas (i18n)

3. **Versão SaaS**
   - Sistema de planos e assinaturas
   - Integração com Stripe/PayPal
   - Multi-tenancy
   - Onboarding de usuários
   - Billing automatizado

4. **Mobile**
   - Progressive Web App (PWA)
   - React Native app
   - Notificações push

## 💡 Dicas de Uso

### Limpar Dados
Para resetar todos os dados e começar do zero:
```javascript
// No console do navegador
localStorage.clear();
location.reload();
```

### Adicionar Dados de Teste
Os dados de exemplo são carregados automaticamente na primeira vez. Para recarregar:
```javascript
// No console do navegador
localStorage.clear();
location.reload();
```

### Customizar Tema
Edite o arquivo `/src/styles/theme.css` para personalizar cores e estilos.

---

**Construído com ❤️ por Artur Bento Chicomo | ABChicomo Services**

*Sistema pronto para produção e preparado para o futuro como produto SaaS comercial.*
