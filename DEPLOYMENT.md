# 🚀 Guia de Deployment - ABChicomo Admin System

Este guia fornece instruções detalhadas para fazer o deploy do sistema em produção.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Vercel (gratuita)
- Git instalado
- Repositório no GitHub/GitLab

---

## 🎯 Deploy na Vercel (Recomendado)

### Método 1: Via Vercel Dashboard (Mais Fácil)

1. **Acesse o Vercel**
   - Vá para [https://vercel.com](https://vercel.com)
   - Faça login ou crie uma conta gratuita

2. **Conecte seu Repositório**
   - Clique em "Add New Project"
   - Importe seu repositório do GitHub/GitLab
   - Autorize o Vercel a acessar o repositório

3. **Configure o Projeto**
   - Framework Preset: **Vite**
   - Root Directory: `.` (padrão)
   - Build Command: `npm run build` (ou `pnpm build`)
   - Output Directory: `dist` (padrão)

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build (2-3 minutos)
   - Seu site estará online!

### Método 2: Via Vercel CLI

1. **Instale a Vercel CLI**
```bash
npm install -g vercel
```

2. **Faça Login**
```bash
vercel login
```

3. **Deploy o Projeto**
```bash
# No diretório raiz do projeto
vercel

# Para produção
vercel --prod
```

4. **Resultado**
   - O Vercel retornará uma URL de produção
   - Exemplo: `abchicomo-admin.vercel.app`

---

## 🌐 Deploy em Outros Serviços

### Netlify

1. **Via Dashboard**
   - Acesse [https://netlify.com](https://netlify.com)
   - "Add new site" → "Import an existing project"
   - Conecte seu repositório

2. **Configurações**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

3. **Via CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### GitHub Pages

⚠️ **Atenção**: GitHub Pages não suporta routing do React Router nativamente. Você precisará configurar um arquivo `404.html` para redirecionar rotas.

1. **Adicionar gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Adicionar scripts no package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

4. **Configurar no GitHub**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

---

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

Se você migrar para uma API real, adicione variáveis de ambiente:

**Vercel Dashboard:**
- Settings → Environment Variables
- Adicione suas variáveis

**Arquivo `.env.local` (desenvolvimento):**
```env
VITE_API_URL=https://api.exemplo.com
VITE_SUPABASE_URL=sua_url
VITE_SUPABASE_KEY=sua_chave
```

⚠️ **Importante**: Nunca commite arquivos `.env` com dados sensíveis!

### Configuração de Domínio Customizado

**Vercel:**
1. Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

**Exemplo DNS:**
```
Type: CNAME
Name: admin (ou @)
Value: cname.vercel-dns.com
```

---

## 📦 Build Local

Para testar o build localmente antes do deploy:

```bash
# Build do projeto
npm run build

# Preview do build
npm run preview
# ou
npx vite preview
```

Acesse: `http://localhost:4173`

---

## 🔒 Considerações de Segurança

### Para Produção com Backend Real

1. **HTTPS Obrigatório**
   - Vercel/Netlify fornecem HTTPS automático
   - Nunca use HTTP em produção

2. **Autenticação JWT**
   - Implemente tokens JWT com expiração
   - Use refresh tokens
   - Armazene tokens em httpOnly cookies

3. **CORS**
   - Configure CORS no backend
   - Whitelist apenas domínios autorizados

4. **Rate Limiting**
   - Implemente rate limiting na API
   - Previna ataques de força bruta

5. **Validação**
   - Valide dados no frontend E backend
   - Sanitize inputs

---

## 🗄️ Migração para Backend Real

### Passo 1: Escolha o Backend

**Opções Recomendadas:**

1. **Node.js + Express**
   - Setup rápido
   - Familiar para devs JavaScript
   - Grande comunidade

2. **Next.js API Routes**
   - Fullstack em um projeto
   - Serverless
   - Deploy fácil na Vercel

3. **Supabase**
   - Backend-as-a-Service
   - Banco PostgreSQL
   - Auth integrado
   - Realtime
   - Gratuito para começar

### Passo 2: Estrutura da API

```
/api
  /auth
    - POST /login
    - POST /logout
    - POST /refresh
  /clients
    - GET /clients
    - GET /clients/:id
    - POST /clients
    - PUT /clients/:id
    - DELETE /clients/:id
  /projects
    - GET /projects
    - POST /projects
    - PUT /projects/:id
    - DELETE /projects/:id
  /messages
    - GET /messages
    - POST /messages
    - PATCH /messages/:id/read
    - DELETE /messages/:id
  /services
    - GET /services
    - POST /services
    - PATCH /services/:id/status
    - DELETE /services/:id
```

### Passo 3: Atualizar Services

```typescript
// Antes (LocalStorage)
export const clientService = {
  getAll: () => getFromStorage('clients', []),
};

// Depois (API)
const API_URL = import.meta.env.VITE_API_URL;

export const clientService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/clients`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
```

---

## 🔄 CI/CD - Deploy Automático

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 Monitoramento

### Ferramentas Recomendadas

1. **Vercel Analytics**
   - Gratuito com Vercel
   - Métricas de performance
   - Visitor insights

2. **Google Analytics**
   - Adicione o script no index.html
   - Rastreie usuários

3. **Sentry**
   - Monitoramento de erros
   - Alertas em tempo real

4. **LogRocket**
   - Session replay
   - Console logs
   - Network requests

---

## 🧪 Testes Antes do Deploy

### Checklist

- [ ] Build passa sem erros
- [ ] Todas as páginas funcionam
- [ ] Formulários validam corretamente
- [ ] Autenticação funciona
- [ ] CRUD completo funciona
- [ ] Responsivo (mobile/tablet/desktop)
- [ ] Dark mode aplicado
- [ ] Performance aceitável (Lighthouse)
- [ ] Sem erros no console

### Comandos Úteis

```bash
# Lint
npm run lint

# Typecheck
npx tsc --noEmit

# Build
npm run build

# Preview
npm run preview
```

---

## 📈 Otimizações de Performance

### Implementadas

✅ Code splitting (Vite automático)
✅ Tree shaking
✅ Minificação
✅ Lazy loading de componentes

### Recomendações Futuras

1. **Imagens**
   - Use WebP
   - Lazy load images
   - CDN para assets

2. **Cache**
   - Configure cache headers
   - Service Worker (PWA)

3. **Bundle Size**
   - Analise com `vite-bundle-visualizer`
   - Remova dependências não usadas

---

## 🆘 Troubleshooting

### Build Falha

**Erro: Module not found**
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

**Erro: Out of memory**
```bash
# Aumente memória do Node
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Deploy Falha

**404 em rotas**
- Configure rewrites no Vercel (automático)
- Para outros: adicione `_redirects` ou `vercel.json`

**Variáveis de ambiente não funcionam**
- Verifique que começam com `VITE_`
- Rebuild após adicionar variáveis

---

## 📞 Suporte

Para problemas específicos do projeto ABChicomo Admin System:

- **Email**: artur@abchicomo.com
- **Issues**: GitHub Issues do repositório

---

## ✅ Checklist de Produção

- [ ] Código testado localmente
- [ ] Build funciona sem erros
- [ ] Dados sensíveis removidos do código
- [ ] Variáveis de ambiente configuradas
- [ ] SSL/HTTPS configurado
- [ ] Domínio customizado configurado (opcional)
- [ ] Analytics configurado
- [ ] Monitoramento de erros configurado
- [ ] Backup de dados configurado
- [ ] Documentação atualizada
- [ ] README.md atualizado com URL de produção

---

**✨ Pronto para o Deploy!**

O sistema está otimizado e pronto para produção. Boa sorte! 🚀

---

**Desenvolvido por Artur Bento Chicomo | ABChicomo Services**
