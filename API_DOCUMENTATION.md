# 📘 Documentação da API - ABChicomo Admin System

Esta documentação descreve a estrutura de dados e as futuras rotas da API quando o sistema migrar para um backend real.

## 📊 Estruturas de Dados (Types)

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
```

### Client
```typescript
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt: string; // ISO 8601
}
```

### Project
```typescript
type ProjectStatus = 'pending' | 'in-progress' | 'completed';

interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName?: string; // Populado pelo frontend
  status: ProjectStatus;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  description: string;
  createdAt: string; // ISO 8601
}
```

### Message
```typescript
interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string; // ISO 8601
}
```

### ServiceRequest
```typescript
type ServiceType = 
  | 'web-development'
  | 'mobile-app'
  | 'design'
  | 'consulting'
  | 'maintenance'
  | 'other';

type ServiceStatus = 'new' | 'analyzing' | 'approved' | 'rejected';

interface ServiceRequest {
  id: string;
  clientName: string;
  email: string;
  serviceType: ServiceType;
  description: string;
  estimatedBudget: string;
  status: ServiceStatus;
  createdAt: string; // ISO 8601
}
```

---

## 🔐 Autenticação

### POST /api/auth/login
Autentica o usuário e retorna um token JWT.

**Request Body:**
```json
{
  "email": "admin@abchicomo.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "Artur Bento Chicomo",
      "email": "admin@abchicomo.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "message": "Credenciais inválidas",
    "code": "INVALID_CREDENTIALS"
  }
}
```

### POST /api/auth/logout
Invalida o token atual.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

### POST /api/auth/refresh
Renova o token de acesso usando o refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "novo_token_jwt",
    "refreshToken": "novo_refresh_token"
  }
}
```

---

## 👥 Clientes (Clients)

### GET /api/clients
Lista todos os clientes.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `search` (opcional): Busca por nome, email ou empresa
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "client-123",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "phone": "+244 923 456 789",
      "company": "Tech Solutions AO",
      "notes": "Cliente interessado em desenvolvimento web",
      "createdAt": "2026-04-01T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### GET /api/clients/:id
Obtém um cliente específico.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "client-123",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "+244 923 456 789",
    "company": "Tech Solutions AO",
    "notes": "Cliente interessado em desenvolvimento web",
    "createdAt": "2026-04-01T10:30:00Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Cliente não encontrado",
    "code": "CLIENT_NOT_FOUND"
  }
}
```

### POST /api/clients
Cria um novo cliente.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+244 923 456 789",
  "company": "Tech Solutions AO",
  "notes": "Cliente interessado em desenvolvimento web"
}
```

**Validation:**
- `name`: obrigatório, min 2 caracteres
- `email`: obrigatório, formato válido
- `phone`: opcional
- `company`: opcional
- `notes`: opcional

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "client-456",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "+244 923 456 789",
    "company": "Tech Solutions AO",
    "notes": "Cliente interessado em desenvolvimento web",
    "createdAt": "2026-04-09T14:20:00Z"
  }
}
```

### PUT /api/clients/:id
Atualiza um cliente existente.

**Request Body:** (todos os campos opcionais)
```json
{
  "name": "João Silva Updated",
  "phone": "+244 999 888 777"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "client-123",
    "name": "João Silva Updated",
    "email": "joao@exemplo.com",
    "phone": "+244 999 888 777",
    "company": "Tech Solutions AO",
    "notes": "Cliente interessado em desenvolvimento web",
    "createdAt": "2026-04-01T10:30:00Z"
  }
}
```

### DELETE /api/clients/:id
Remove um cliente.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cliente removido com sucesso"
}
```

---

## 💼 Projetos (Projects)

### GET /api/projects
Lista todos os projetos.

**Query Parameters:**
- `status` (opcional): 'pending' | 'in-progress' | 'completed'
- `clientId` (opcional): Filtrar por cliente
- `search` (opcional): Busca por nome
- `page`, `limit`: Paginação

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "project-789",
      "name": "Website Corporativo",
      "clientId": "client-123",
      "status": "in-progress",
      "startDate": "2026-03-01",
      "endDate": "2026-05-01",
      "description": "Desenvolvimento de website institucional responsivo",
      "createdAt": "2026-03-01T09:00:00Z"
    }
  ]
}
```

### GET /api/projects/:id
Obtém um projeto específico com informações do cliente.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "project-789",
    "name": "Website Corporativo",
    "clientId": "client-123",
    "client": {
      "id": "client-123",
      "name": "João Silva",
      "email": "joao@exemplo.com"
    },
    "status": "in-progress",
    "startDate": "2026-03-01",
    "endDate": "2026-05-01",
    "description": "Desenvolvimento de website institucional responsivo",
    "createdAt": "2026-03-01T09:00:00Z"
  }
}
```

### POST /api/projects
Cria um novo projeto.

**Request Body:**
```json
{
  "name": "Novo Projeto",
  "clientId": "client-123",
  "status": "pending",
  "startDate": "2026-05-01",
  "endDate": "2026-07-01",
  "description": "Descrição do projeto"
}
```

**Validation:**
- `name`: obrigatório
- `clientId`: obrigatório, deve existir
- `status`: opcional, padrão 'pending'
- `startDate`: obrigatório, formato YYYY-MM-DD
- `endDate`: opcional, deve ser >= startDate
- `description`: opcional

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "project-999",
    "name": "Novo Projeto",
    "clientId": "client-123",
    "status": "pending",
    "startDate": "2026-05-01",
    "endDate": "2026-07-01",
    "description": "Descrição do projeto",
    "createdAt": "2026-04-09T14:30:00Z"
  }
}
```

### PUT /api/projects/:id
Atualiza um projeto.

### DELETE /api/projects/:id
Remove um projeto.

---

## 📨 Mensagens (Messages)

### GET /api/messages
Lista todas as mensagens.

**Query Parameters:**
- `isRead` (opcional): true | false
- `page`, `limit`: Paginação

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "msg-555",
      "name": "Ana Pereira",
      "email": "ana@exemplo.com",
      "message": "Olá, gostaria de informações sobre desenvolvimento de websites.",
      "isRead": false,
      "createdAt": "2026-04-08T16:45:00Z"
    }
  ]
}
```

### GET /api/messages/:id
Obtém uma mensagem específica.

### POST /api/messages
Cria uma nova mensagem (geralmente vindo de formulário público).

**Request Body:**
```json
{
  "name": "Carlos Mendes",
  "email": "carlos@exemplo.com",
  "message": "Preciso de suporte técnico para meu sistema atual."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "msg-666",
    "name": "Carlos Mendes",
    "email": "carlos@exemplo.com",
    "message": "Preciso de suporte técnico para meu sistema atual.",
    "isRead": false,
    "createdAt": "2026-04-09T14:35:00Z"
  }
}
```

### PATCH /api/messages/:id/read
Marca uma mensagem como lida ou não lida.

**Request Body:**
```json
{
  "isRead": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Mensagem atualizada"
}
```

### DELETE /api/messages/:id
Remove uma mensagem.

---

## 📦 Pedidos de Serviço (Service Requests)

### GET /api/services
Lista todos os pedidos de serviço.

**Query Parameters:**
- `status` (opcional): 'new' | 'analyzing' | 'approved' | 'rejected'
- `serviceType` (opcional): Tipo de serviço
- `page`, `limit`: Paginação

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "service-321",
      "clientName": "Empresa XYZ",
      "email": "contato@xyz.com",
      "serviceType": "web-development",
      "description": "Precisamos de um e-commerce completo",
      "estimatedBudget": "500.000 AOA - 1.000.000 AOA",
      "status": "new",
      "createdAt": "2026-04-07T11:20:00Z"
    }
  ]
}
```

### GET /api/services/:id
Obtém um pedido específico.

### POST /api/services
Cria um novo pedido de serviço.

**Request Body:**
```json
{
  "clientName": "Start Tech",
  "email": "info@starttech.com",
  "serviceType": "mobile-app",
  "description": "Aplicativo de delivery para Android e iOS",
  "estimatedBudget": "1.000.000 AOA - 2.000.000 AOA"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "service-444",
    "clientName": "Start Tech",
    "email": "info@starttech.com",
    "serviceType": "mobile-app",
    "description": "Aplicativo de delivery para Android e iOS",
    "estimatedBudget": "1.000.000 AOA - 2.000.000 AOA",
    "status": "new",
    "createdAt": "2026-04-09T14:40:00Z"
  }
}
```

### PATCH /api/services/:id/status
Atualiza o status de um pedido.

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Status atualizado"
}
```

### DELETE /api/services/:id
Remove um pedido de serviço.

---

## 📊 Dashboard / Estatísticas

### GET /api/dashboard/stats
Retorna estatísticas gerais do sistema.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalClients": 45,
    "activeProjects": 12,
    "unreadMessages": 5,
    "pendingServices": 8,
    "growthRate": {
      "clients": 12.5,
      "projects": 8.3
    }
  }
}
```

### GET /api/dashboard/activities
Retorna atividades recentes do sistema.

**Query Parameters:**
- `limit` (opcional): Número de atividades (padrão: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "activity-1",
      "type": "client",
      "title": "Novo Cliente",
      "description": "João Silva foi adicionado",
      "timestamp": "2026-04-09T14:20:00Z"
    },
    {
      "id": "activity-2",
      "type": "project",
      "title": "Projeto Atualizado",
      "description": "Website Corporativo foi atualizado",
      "timestamp": "2026-04-09T13:15:00Z"
    }
  ]
}
```

---

## 🔒 Segurança

### Headers Obrigatórios

Todas as rotas protegidas requerem:
```
Authorization: Bearer {jwt_token}
```

### Rate Limiting

- **Login**: 5 tentativas por 15 minutos por IP
- **API Geral**: 100 requisições por minuto por usuário
- **Criação**: 10 requisições por minuto por usuário

### Respostas de Erro

**401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "message": "Token inválido ou expirado",
    "code": "UNAUTHORIZED"
  }
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": {
    "message": "Você não tem permissão para esta ação",
    "code": "FORBIDDEN"
  }
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "error": {
    "message": "Muitas requisições. Tente novamente em 60 segundos",
    "code": "RATE_LIMIT_EXCEEDED"
  }
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": {
    "message": "Erro interno do servidor",
    "code": "INTERNAL_ERROR"
  }
}
```

---

## 🧪 Exemplos de Uso

### JavaScript/Fetch

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('https://api.abchicomo.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.data.token);
  }
  return data;
};

// Listar clientes
const getClients = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://api.abchicomo.com/clients', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
};

// Criar cliente
const createClient = async (clientData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://api.abchicomo.com/clients', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  });
  
  return response.json();
};
```

---

## 🔄 Versionamento

A API usa versionamento na URL:

- **v1**: `https://api.abchicomo.com/v1/...`
- **v2**: `https://api.abchicomo.com/v2/...` (futuro)

Sempre use a versão mais recente para novos projetos.

---

## 📞 Suporte

Para dúvidas sobre a API:

- **Email**: api@abchicomo.com
- **Documentação**: https://docs.abchicomo.com

---

**Desenvolvido por Artur Bento Chicomo | ABChicomo Services**
