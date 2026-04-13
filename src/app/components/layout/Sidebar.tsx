import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  MessageSquare,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../ui/utils';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Clientes', path: '/dashboard/clients', icon: Users },
  { name: 'Projetos', path: '/dashboard/projects', icon: FolderKanban },
  { name: 'Mensagens', path: '/dashboard/messages', icon: MessageSquare },
  { name: 'Serviços', path: '/dashboard/services', icon: Briefcase },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? '80px' : '280px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col z-40"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 0 : 1,
            display: isCollapsed ? 'none' : 'block',
          }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            ABChicomo
          </h1>
          <p className="text-xs text-zinc-500">Admin System</p>
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 1 : 0,
            display: isCollapsed ? 'block' : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="w-full flex justify-center"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
            AB
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative',
                  isActive
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-500/20"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                )}
                
                <Icon className={cn('w-5 h-5 relative z-10', isActive && 'text-blue-400')} />
                
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isCollapsed ? 0 : 1,
                    display: isCollapsed ? 'none' : 'block',
                  }}
                  transition={{ duration: 0.2 }}
                  className="font-medium relative z-10"
                >
                  {item.name}
                </motion.span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-800">
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Recolher</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
