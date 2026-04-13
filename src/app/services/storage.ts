// Storage Service - Gerenciamento de dados com LocalStorage
// Em produção, isso seria substituído por chamadas de API real

import { Client, Project, Message, ServiceRequest, Activity } from '../types';

const STORAGE_KEYS = {
  CLIENTS: 'abchicomo_clients',
  PROJECTS: 'abchicomo_projects',
  MESSAGES: 'abchicomo_messages',
  SERVICES: 'abchicomo_services',
  ACTIVITIES: 'abchicomo_activities',
  USER: 'abchicomo_user',
};

// Helpers genéricos
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}

// Gerar ID único
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Adicionar atividade
function addActivity(type: Activity['type'], title: string, description: string): void {
  const activities = getFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);
  const newActivity: Activity = {
    id: generateId(),
    type,
    title,
    description,
    timestamp: new Date().toISOString(),
  };
  activities.unshift(newActivity);
  // Manter apenas as 50 atividades mais recentes
  saveToStorage(STORAGE_KEYS.ACTIVITIES, activities.slice(0, 50));
}

// ==================== CLIENTS ====================
export const clientService = {
  getAll: (): Client[] => {
    return getFromStorage<Client[]>(STORAGE_KEYS.CLIENTS, []);
  },

  getById: (id: string): Client | undefined => {
    const clients = clientService.getAll();
    return clients.find(c => c.id === id);
  },

  create: (client: Omit<Client, 'id' | 'createdAt'>): Client => {
    const clients = clientService.getAll();
    const newClient: Client = {
      ...client,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    clients.push(newClient);
    saveToStorage(STORAGE_KEYS.CLIENTS, clients);
    addActivity('client', 'Novo Cliente', `${newClient.name} foi adicionado`);
    return newClient;
  },

  update: (id: string, data: Partial<Client>): Client | null => {
    const clients = clientService.getAll();
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    clients[index] = { ...clients[index], ...data };
    saveToStorage(STORAGE_KEYS.CLIENTS, clients);
    addActivity('client', 'Cliente Atualizado', `${clients[index].name} foi atualizado`);
    return clients[index];
  },

  delete: (id: string): boolean => {
    const clients = clientService.getAll();
    const client = clients.find(c => c.id === id);
    if (!client) return false;
    
    const filtered = clients.filter(c => c.id !== id);
    saveToStorage(STORAGE_KEYS.CLIENTS, filtered);
    addActivity('client', 'Cliente Removido', `${client.name} foi removido`);
    return true;
  },

  search: (query: string): Client[] => {
    const clients = clientService.getAll();
    const lowerQuery = query.toLowerCase();
    return clients.filter(c =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery) ||
      c.company.toLowerCase().includes(lowerQuery)
    );
  },
};

// ==================== PROJECTS ====================
export const projectService = {
  getAll: (): Project[] => {
    const projects = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const clients = clientService.getAll();
    
    // Enriquecer projetos com nome do cliente
    return projects.map(project => {
      const client = clients.find(c => c.id === project.clientId);
      return {
        ...project,
        clientName: client?.name || 'Cliente Desconhecido',
      };
    });
  },

  getById: (id: string): Project | undefined => {
    const projects = projectService.getAll();
    return projects.find(p => p.id === id);
  },

  create: (project: Omit<Project, 'id' | 'createdAt'>): Project => {
    const projects = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const clients = clientService.getAll();
    const client = clients.find(c => c.id === project.clientId);
    
    const newProject: Project = {
      ...project,
      id: generateId(),
      clientName: client?.name || 'Cliente Desconhecido',
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    addActivity('project', 'Novo Projeto', `${newProject.name} foi criado`);
    return newProject;
  },

  update: (id: string, data: Partial<Project>): Project | null => {
    const projects = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    projects[index] = { ...projects[index], ...data };
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    
    const updatedProject = projectService.getById(id);
    if (updatedProject) {
      addActivity('project', 'Projeto Atualizado', `${updatedProject.name} foi atualizado`);
    }
    return updatedProject || null;
  },

  delete: (id: string): boolean => {
    const projects = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const project = projects.find(p => p.id === id);
    if (!project) return false;
    
    const filtered = projects.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PROJECTS, filtered);
    addActivity('project', 'Projeto Removido', `${project.name} foi removido`);
    return true;
  },

  getByStatus: (status: Project['status']): Project[] => {
    const projects = projectService.getAll();
    return projects.filter(p => p.status === status);
  },
};

// ==================== MESSAGES ====================
export const messageService = {
  getAll: (): Message[] => {
    return getFromStorage<Message[]>(STORAGE_KEYS.MESSAGES, []);
  },

  getById: (id: string): Message | undefined => {
    const messages = messageService.getAll();
    return messages.find(m => m.id === id);
  },

  create: (message: Omit<Message, 'id' | 'createdAt'>): Message => {
    const messages = messageService.getAll();
    const newMessage: Message = {
      ...message,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMessage);
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    addActivity('message', 'Nova Mensagem', `Mensagem de ${newMessage.name}`);
    return newMessage;
  },

  markAsRead: (id: string, isRead: boolean): boolean => {
    const messages = messageService.getAll();
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    messages[index].isRead = isRead;
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    return true;
  },

  delete: (id: string): boolean => {
    const messages = messageService.getAll();
    const filtered = messages.filter(m => m.id !== id);
    saveToStorage(STORAGE_KEYS.MESSAGES, filtered);
    return true;
  },

  getUnreadCount: (): number => {
    const messages = messageService.getAll();
    return messages.filter(m => !m.isRead).length;
  },
};

// ==================== SERVICES ====================
export const serviceRequestService = {
  getAll: (): ServiceRequest[] => {
    return getFromStorage<ServiceRequest[]>(STORAGE_KEYS.SERVICES, []);
  },

  getById: (id: string): ServiceRequest | undefined => {
    const services = serviceRequestService.getAll();
    return services.find(s => s.id === id);
  },

  create: (service: Omit<ServiceRequest, 'id' | 'createdAt'>): ServiceRequest => {
    const services = serviceRequestService.getAll();
    const newService: ServiceRequest = {
      ...service,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    services.unshift(newService);
    saveToStorage(STORAGE_KEYS.SERVICES, services);
    addActivity('service', 'Novo Pedido', `Pedido de ${newService.clientName}`);
    return newService;
  },

  updateStatus: (id: string, status: ServiceRequest['status']): ServiceRequest | null => {
    const services = serviceRequestService.getAll();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    services[index].status = status;
    saveToStorage(STORAGE_KEYS.SERVICES, services);
    addActivity('service', 'Status Atualizado', `Pedido #${id.slice(0, 8)} - ${status}`);
    return services[index];
  },

  delete: (id: string): boolean => {
    const services = serviceRequestService.getAll();
    const filtered = services.filter(s => s.id !== id);
    saveToStorage(STORAGE_KEYS.SERVICES, filtered);
    return true;
  },

  getByStatus: (status: ServiceRequest['status']): ServiceRequest[] => {
    const services = serviceRequestService.getAll();
    return services.filter(s => s.status === status);
  },

  getPendingCount: (): number => {
    const services = serviceRequestService.getAll();
    return services.filter(s => s.status === 'new' || s.status === 'analyzing').length;
  },
};

// ==================== ACTIVITIES ====================
export const activityService = {
  getAll: (): Activity[] => {
    return getFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);
  },

  getRecent: (limit: number = 10): Activity[] => {
    const activities = activityService.getAll();
    return activities.slice(0, limit);
  },
};

// ==================== SEED DATA ====================
export function initializeSeedData(): void {
  // Verificar se já existe dados
  const clients = clientService.getAll();
  if (clients.length > 0) return;

  // Criar dados de exemplo
  const sampleClients = [
    {
      name: 'João Silva',
      email: 'joao.silva@exemplo.com',
      phone: '+244 923 456 789',
      company: 'Tech Solutions AO',
      notes: 'Cliente interessado em desenvolvimento web',
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@exemplo.com',
      phone: '+244 912 345 678',
      company: 'Digital Agency',
      notes: 'Necessita de um sistema de gestão',
    },
    {
      name: 'Pedro Costa',
      email: 'pedro.costa@exemplo.com',
      phone: '+244 934 567 890',
      company: 'Startup Innovations',
      notes: 'Projeto de aplicativo móvel',
    },
  ];

  sampleClients.forEach(client => clientService.create(client));

  const clientsList = clientService.getAll();

  // Criar projetos de exemplo
  const sampleProjects = [
    {
      name: 'Website Corporativo',
      clientId: clientsList[0].id,
      status: 'in-progress' as const,
      startDate: '2026-03-01',
      endDate: '2026-05-01',
      description: 'Desenvolvimento de website institucional responsivo',
    },
    {
      name: 'Sistema de Gestão',
      clientId: clientsList[1].id,
      status: 'pending' as const,
      startDate: '2026-04-15',
      endDate: '2026-08-15',
      description: 'Sistema completo de gestão empresarial',
    },
    {
      name: 'App Mobile',
      clientId: clientsList[2].id,
      status: 'in-progress' as const,
      startDate: '2026-02-01',
      endDate: '2026-06-01',
      description: 'Aplicativo mobile para iOS e Android',
    },
  ];

  sampleProjects.forEach(project => projectService.create(project));

  // Criar mensagens de exemplo
  const sampleMessages = [
    {
      name: 'Ana Pereira',
      email: 'ana@exemplo.com',
      message: 'Olá, gostaria de informações sobre desenvolvimento de websites.',
      isRead: false,
    },
    {
      name: 'Carlos Mendes',
      email: 'carlos@exemplo.com',
      message: 'Preciso de suporte técnico para meu sistema atual.',
      isRead: true,
    },
  ];

  sampleMessages.forEach(message => messageService.create(message));

  // Criar pedidos de serviço de exemplo
  const sampleServices = [
    {
      clientName: 'Empresa XYZ',
      email: 'contato@xyz.com',
      serviceType: 'web-development' as const,
      description: 'Precisamos de um e-commerce completo com integração de pagamentos',
      estimatedBudget: '500.000 AOA - 1.000.000 AOA',
      status: 'new' as const,
    },
    {
      clientName: 'Start Tech',
      email: 'info@starttech.com',
      serviceType: 'mobile-app' as const,
      description: 'Aplicativo de delivery para Android e iOS',
      estimatedBudget: '1.000.000 AOA - 2.000.000 AOA',
      status: 'analyzing' as const,
    },
  ];

  sampleServices.forEach(service => serviceRequestService.create(service));

  console.log('✅ Dados de exemplo inicializados com sucesso!');
}
