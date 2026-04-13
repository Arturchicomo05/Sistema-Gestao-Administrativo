import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, DollarSign, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ServiceRequest, ServiceStatus, ServiceType } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig: Record<ServiceStatus, { label: string; color: string; bg: string }> = {
  'new': { label: 'Novo', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  'analyzing': { label: 'Em Análise', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  'approved': { label: 'Aprovado', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  'rejected': { label: 'Rejeitado', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

const serviceTypeLabels: Record<ServiceType, string> = {
  'web-development': 'Desenvolvimento Web',
  'mobile-app': 'Aplicativo Mobile',
  'design': 'Design',
  'consulting': 'Consultoria',
  'maintenance': 'Manutenção',
  'other': 'Outro',
};

export function Services() {
  const { serviceRequests, addServiceRequest, updateServiceStatus, deleteServiceRequest } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'all'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceRequest | null>(null);
  const [deletingService, setDeletingService] = useState<ServiceRequest | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    serviceType: 'web-development' as ServiceType,
    description: '',
    estimatedBudget: '',
  });

  // Filtrar pedidos
  const filteredServices = serviceRequests.filter(service => {
    const matchesSearch = service.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const servicesByStatus = {
    all: serviceRequests.length,
    new: serviceRequests.filter(s => s.status === 'new').length,
    analyzing: serviceRequests.filter(s => s.status === 'analyzing').length,
    approved: serviceRequests.filter(s => s.status === 'approved').length,
    rejected: serviceRequests.filter(s => s.status === 'rejected').length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.email || !formData.description) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    addServiceRequest({
      ...formData,
      status: 'new',
    });

    toast.success('Pedido de serviço criado com sucesso!');
    setFormData({
      clientName: '',
      email: '',
      serviceType: 'web-development',
      description: '',
      estimatedBudget: '',
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (serviceId: string, newStatus: ServiceStatus) => {
    updateServiceStatus(serviceId, newStatus);
    toast.success('Status atualizado com sucesso!');
  };

  const handleDelete = () => {
    if (deletingService) {
      deleteServiceRequest(deletingService.id);
      toast.success('Pedido removido com sucesso!');
      setDeletingService(null);
      if (selectedService?.id === deletingService.id) {
        setSelectedService(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pedidos de Serviço</h1>
          <p className="text-zinc-400">Gerencie solicitações de serviços</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as ServiceStatus | 'all')}>
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-800">
            Todos ({servicesByStatus.all})
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-zinc-800">
            Novos ({servicesByStatus.new})
          </TabsTrigger>
          <TabsTrigger value="analyzing" className="data-[state=active]:bg-zinc-800">
            Em Análise ({servicesByStatus.analyzing})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-zinc-800">
            Aprovados ({servicesByStatus.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800">
            Rejeitados ({servicesByStatus.rejected})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input
          type="text"
          placeholder="Pesquisar pedidos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-200"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => {
            const status = statusConfig[service.status];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{service.clientName}</h3>
                    <p className="text-sm text-zinc-400">{service.email}</p>
                  </div>
                  <Badge className={`${status.bg} ${status.color} border`}>
                    {status.label}
                  </Badge>
                </div>

                {/* Type and Budget */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-500">Serviço:</span>
                    <span className="text-white font-medium">{serviceTypeLabels[service.serviceType]}</span>
                  </div>
                  {service.estimatedBudget && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-400">{service.estimatedBudget}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(service.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-500 mb-4 line-clamp-3">{service.description}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                  <Select
                    value={service.status}
                    onValueChange={(value: ServiceStatus) => handleStatusChange(service.id, value)}
                  >
                    <SelectTrigger className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-200 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="new" className="text-zinc-200">Novo</SelectItem>
                      <SelectItem value="analyzing" className="text-zinc-200">Em Análise</SelectItem>
                      <SelectItem value="approved" className="text-zinc-200">Aprovado</SelectItem>
                      <SelectItem value="rejected" className="text-zinc-200">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeletingService(service)}
                    className="h-9 w-9 p-0 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <span className="sr-only">Deletar</span>
                    ×
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-lg font-medium text-zinc-300 mb-1">Nenhum pedido encontrado</h3>
          <p className="text-sm text-zinc-500">
            {searchQuery ? 'Tente ajustar sua busca' : 'Comece criando um novo pedido'}
          </p>
        </motion.div>
      )}

      {/* Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Pedido de Serviço</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Adicione um novo pedido de serviço ao sistema
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Nome do Cliente *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-zinc-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-zinc-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Tipo de Serviço</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value: ServiceType) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {Object.entries(serviceTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="text-zinc-200">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedBudget">Orçamento Estimado</Label>
              <Input
                id="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-zinc-200"
                placeholder="ex: 500.000 AOA - 1.000.000 AOA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 min-h-[120px]"
                placeholder="Descreva o serviço solicitado..."
                required
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                Criar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingService} onOpenChange={() => setDeletingService(null)}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Esta ação não pode ser desfeita. O pedido de{' '}
              <span className="font-semibold text-white">{deletingService?.clientName}</span> será
              permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
