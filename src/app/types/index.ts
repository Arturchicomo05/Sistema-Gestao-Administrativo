// Types para o ABChicomo Admin System

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt: string;
}

export type ProjectStatus = 'pending' | 'in-progress' | 'completed';

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName?: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
}

export type ServiceType = 
  | 'web-development'
  | 'mobile-app'
  | 'design'
  | 'consulting'
  | 'maintenance'
  | 'other';

export type ServiceStatus = 'new' | 'analyzing' | 'approved' | 'rejected';

export interface ServiceRequest {
  id: string;
  clientName: string;
  email: string;
  serviceType: ServiceType;
  description: string;
  estimatedBudget: string;
  status: ServiceStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  unreadMessages: number;
  pendingServices: number;
}

export interface Activity {
  id: string;
  type: 'client' | 'project' | 'message' | 'service';
  title: string;
  description: string;
  timestamp: string;
}
