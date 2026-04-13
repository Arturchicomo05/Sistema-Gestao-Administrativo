import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Message } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Messages() {
  const { messages, addMessage, markMessageAsRead, deleteMessage } = useData();
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<Message | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Filtrar mensagens
  const filteredMessages = messages.filter(message => {
    if (filter === 'read') return message.isRead;
    if (filter === 'unread') return !message.isRead;
    return true;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markMessageAsRead(message.id, true);
    }
  };

  const handleToggleRead = (message: Message, e: React.MouseEvent) => {
    e.stopPropagation();
    markMessageAsRead(message.id, !message.isRead);
    toast.success(message.isRead ? 'Marcada como não lida' : 'Marcada como lida');
  };

  const handleDelete = () => {
    if (deletingMessage) {
      deleteMessage(deletingMessage.id);
      toast.success('Mensagem removida com sucesso!');
      setDeletingMessage(null);
      if (selectedMessage?.id === deletingMessage.id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleCreateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Preencha todos os campos');
      return;
    }

    addMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      isRead: false,
    });

    toast.success('Mensagem criada com sucesso!');
    setFormData({ name: '', email: '', message: '' });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mensagens</h1>
          <p className="text-zinc-400">Gerencie mensagens recebidas</p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Mensagem
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'read' | 'unread')}>
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-800">
            Todas ({messages.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-zinc-800">
            Não Lidas ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read" className="data-[state=active]:bg-zinc-800">
            Lidas ({messages.length - unreadCount})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleViewMessage(message)}
                className={`p-4 rounded-lg border cursor-pointer transition-all group ${
                  message.isRead
                    ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    : 'bg-zinc-900 border-blue-500/30 hover:border-blue-500/50'
                } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${message.isRead ? 'text-zinc-600' : 'text-blue-400'}`}>
                    {message.isRead ? (
                      <MailOpen className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-medium truncate ${message.isRead ? 'text-zinc-400' : 'text-white'}`}>
                        {message.name}
                      </h3>
                      {!message.isRead && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          Nova
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 truncate mb-2">{message.message}</p>
                    <p className="text-xs text-zinc-600">
                      {format(new Date(message.createdAt), "dd MMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredMessages.length === 0 && (
            <div className="text-center py-16">
              <Mail className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">Nenhuma mensagem encontrada</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedMessage.name}</h2>
                    <p className="text-sm text-zinc-400">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleToggleRead(selectedMessage, e)}
                    className="text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10"
                  >
                    {selectedMessage.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeletingMessage(selectedMessage)}
                    className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm text-zinc-500 mb-2">
                  {format(new Date(selectedMessage.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </p>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <Mail className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-400 mb-2">Selecione uma mensagem</h3>
              <p className="text-sm text-zinc-600">
                Clique em uma mensagem à esquerda para visualizar o conteúdo completo
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Message Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Mensagem</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Adicione uma mensagem ao sistema (para simulação)
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateMessage} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-zinc-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 min-h-[120px]"
                required
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
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
      <AlertDialog open={!!deletingMessage} onOpenChange={() => setDeletingMessage(null)}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Esta ação não pode ser desfeita. A mensagem de{' '}
              <span className="font-semibold text-white">{deletingMessage?.name}</span> será
              permanentemente removida.
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
