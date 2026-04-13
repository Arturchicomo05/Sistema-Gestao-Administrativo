# ⚡ Quick Start Guide - ABChicomo Admin System

Guia rápido para começar a usar o sistema em minutos.

---

## 🚀 Instalação Rápida

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd abchicomo-admin-system

# 2. Instale as dependências
npm install
# ou
pnpm install

# 3. Execute o projeto
npm run dev
# ou
pnpm dev

# 4. Acesse no navegador
http://localhost:5173
```

---

## 🔑 Login

Use as credenciais de demonstração:

- **Email**: `admin@abchicomo.com`
- **Senha**: `admin123`

---

## 📊 O Que Você Pode Fazer?

### 1️⃣ Dashboard
- Visualize métricas em tempo real
- Veja gráficos de crescimento
- Acompanhe atividades recentes

### 2️⃣ Gerenciar Clientes
- ➕ Adicionar novo cliente
- ✏️ Editar informações
- 🔍 Buscar clientes
- 🗑️ Remover clientes

### 3️⃣ Gerenciar Projetos
- ➕ Criar projetos
- 🏷️ Definir status (Pendente, Em Andamento, Concluído)
- 👤 Vincular a clientes
- 📅 Definir datas de início e fim

### 4️⃣ Mensagens
- 📨 Ver mensagens recebidas
- ✅ Marcar como lida/não lida
- 🗑️ Apagar mensagens
- ➕ Adicionar nova mensagem (teste)

### 5️⃣ Pedidos de Serviço
- 📦 Visualizar todos os pedidos
- 🔄 Atualizar status
- 🎯 Filtrar por status
- ➕ Criar novo pedido

---

## ⌨️ Atalhos Úteis

### Navegação
- **Dashboard**: `/dashboard`
- **Clientes**: `/dashboard/clients`
- **Projetos**: `/dashboard/projects`
- **Mensagens**: `/dashboard/messages`
- **Serviços**: `/dashboard/services`

### Ações Rápidas
- **Novo Cliente**: Botão "Novo Cliente" no topo
- **Buscar**: Use a barra de busca em cada página
- **Filtrar Projetos**: Use as tabs por status
- **Sair**: Menu do usuário no canto superior direito

---

## 🎨 Personalização

### Mudar Cores/Tema
Edite o arquivo:
```
/src/styles/theme.css
```

### Adicionar Logo
Substitua no componente:
```
/src/app/components/layout/Sidebar.tsx
```

### Customizar Sidebar
Edite os itens de navegação em:
```
/src/app/components/layout/Sidebar.tsx
```

---

## 📝 Dados de Teste

O sistema vem com dados de exemplo pré-carregados:

- ✅ 3 Clientes
- ✅ 3 Projetos
- ✅ 2 Mensagens
- ✅ 2 Pedidos de Serviço

### Resetar Dados

No console do navegador (F12):
```javascript
localStorage.clear();
location.reload();
```

---

## 🐛 Problemas Comuns

### ❌ "Cannot find module..."
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Porta 5173 já em uso
```bash
npm run dev -- --port 3000
```

### ❌ Build falha
```bash
npm run build --verbose
```

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor dev

# Build
npm run build         # Build para produção
npm run preview       # Preview do build

# Linting
npm run lint          # Verifica erros

# Typecheck
npx tsc --noEmit      # Verifica tipos
```

---

## 📦 Estrutura Rápida

```
src/app/
├── components/
│   ├── layout/       # Sidebar, Topbar
│   └── ui/           # Componentes UI
├── contexts/         # AuthContext, DataContext
├── pages/            # Todas as páginas
├── services/         # Lógica de dados
├── types/            # TypeScript types
└── routes.tsx        # Configuração de rotas
```

---

## 🎯 Próximos Passos

1. **Explore o Dashboard**
   - Veja as métricas e gráficos

2. **Adicione Seus Dados**
   - Crie clientes reais
   - Adicione projetos atuais

3. **Customize**
   - Ajuste cores e logo
   - Adapte para sua marca

4. **Integre Backend**
   - Conecte a uma API real
   - Implemente autenticação JWT

5. **Deploy**
   - Faça deploy na Vercel
   - Configure domínio customizado

---

## 📚 Documentação Completa

Para informações detalhadas, consulte:

- **README.md** - Documentação completa
- **DEPLOYMENT.md** - Guia de deployment
- **API_DOCUMENTATION.md** - Estrutura da API

---

## 💡 Dicas Profissionais

### Performance
- Sistema otimizado para velocidade
- Lazy loading implementado
- Bundle otimizado

### Responsividade
- Funciona em mobile, tablet e desktop
- Sidebar retrátil em telas pequenas
- Touch-friendly

### Acessibilidade
- Componentes acessíveis (Radix UI)
- Navegação por teclado
- Labels apropriados

---

## 🆘 Precisa de Ajuda?

- 📧 **Email**: artur@abchicomo.com
- 📖 **Docs**: Leia README.md
- 🐛 **Issues**: GitHub Issues

---

## ✅ Checklist Inicial

Marque conforme você avança:

- [ ] Sistema instalado e rodando
- [ ] Login realizado com sucesso
- [ ] Dashboard explorado
- [ ] Cliente de teste criado
- [ ] Projeto de teste criado
- [ ] Mensagem visualizada
- [ ] Pedido de serviço criado
- [ ] Sidebar explorada
- [ ] Sistema personalizado (opcional)
- [ ] Pronto para produção!

---

## 🎉 Parabéns!

Você está pronto para usar o **ABChicomo Admin System**!

Este é um sistema profissional, escalável e pronto para crescer com seu negócio.

---

**Desenvolvido com ❤️ por Artur Bento Chicomo**

*Happy coding! 🚀*
