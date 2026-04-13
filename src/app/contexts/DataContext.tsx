import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  Client,
  Project,
  Message,
  ServiceRequest,
  Activity,
  DashboardStats,
} from '../types';
import {
  clientService,
  projectService,
  messageService,
  serviceRequestService,
  activityService,
  initializeSeedData,
} from '../services/storage';

interface DataContextType {
  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, data: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  markMessageAsRead: (id: string, isRead: boolean) => void;
  deleteMessage: (id: string) => void;
  
  // Service Requests
  serviceRequests: ServiceRequest[];
  addServiceRequest: (service: Omit<ServiceRequest, 'id' | 'createdAt'>) => void;
  updateServiceStatus: (id: string, status: ServiceRequest['status']) => void;
  deleteServiceRequest: (id: string) => void;
  
  // Activities
  activities: Activity[];
  
  // Stats
  stats: DashboardStats;
  
  // Refresh
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeProjects: 0,
    unreadMessages: 0,
    pendingServices: 0,
  });

  // Carregar dados
  const loadData = useCallback(() => {
    setClients(clientService.getAll());
    setProjects(projectService.getAll());
    setMessages(messageService.getAll());
    setServiceRequests(serviceRequestService.getAll());
    setActivities(activityService.getRecent(10));
  }, []);

  // Calcular estatísticas
  const calculateStats = useCallback(() => {
    const totalClients = clientService.getAll().length;
    const activeProjects = projectService.getAll().filter(
      p => p.status === 'in-progress'
    ).length;
    const unreadMessages = messageService.getUnreadCount();
    const pendingServices = serviceRequestService.getPendingCount();

    setStats({
      totalClients,
      activeProjects,
      unreadMessages,
      pendingServices,
    });
  }, []);

  // Inicializar dados na primeira renderização
  useEffect(() => {
    initializeSeedData();
    loadData();
    calculateStats();
  }, [loadData, calculateStats]);

  const refreshData = useCallback(() => {
    loadData();
    calculateStats();
  }, [loadData, calculateStats]);

  // Client operations
  const addClient = useCallback((client: Omit<Client, 'id' | 'createdAt'>) => {
    clientService.create(client);
    refreshData();
  }, [refreshData]);

  const updateClient = useCallback((id: string, data: Partial<Client>) => {
    clientService.update(id, data);
    refreshData();
  }, [refreshData]);

  const deleteClient = useCallback((id: string) => {
    clientService.delete(id);
    refreshData();
  }, [refreshData]);

  // Project operations
  const addProject = useCallback((project: Omit<Project, 'id' | 'createdAt'>) => {
    projectService.create(project);
    refreshData();
  }, [refreshData]);

  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    projectService.update(id, data);
    refreshData();
  }, [refreshData]);

  const deleteProject = useCallback((id: string) => {
    projectService.delete(id);
    refreshData();
  }, [refreshData]);

  // Message operations
  const addMessage = useCallback((message: Omit<Message, 'id' | 'createdAt'>) => {
    messageService.create(message);
    refreshData();
  }, [refreshData]);

  const markMessageAsRead = useCallback((id: string, isRead: boolean) => {
    messageService.markAsRead(id, isRead);
    refreshData();
  }, [refreshData]);

  const deleteMessage = useCallback((id: string) => {
    messageService.delete(id);
    refreshData();
  }, [refreshData]);

  // Service Request operations
  const addServiceRequest = useCallback((service: Omit<ServiceRequest, 'id' | 'createdAt'>) => {
    serviceRequestService.create(service);
    refreshData();
  }, [refreshData]);

  const updateServiceStatus = useCallback((id: string, status: ServiceRequest['status']) => {
    serviceRequestService.updateStatus(id, status);
    refreshData();
  }, [refreshData]);

  const deleteServiceRequest = useCallback((id: string) => {
    serviceRequestService.delete(id);
    refreshData();
  }, [refreshData]);

  return (
    <DataContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        projects,
        addProject,
        updateProject,
        deleteProject,
        messages,
        addMessage,
        markMessageAsRead,
        deleteMessage,
        serviceRequests,
        addServiceRequest,
        updateServiceStatus,
        deleteServiceRequest,
        activities,
        stats,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
