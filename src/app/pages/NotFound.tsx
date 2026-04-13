import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 mb-6"
        >
          <Search className="w-12 h-12 text-zinc-600" />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <h2 className="text-2xl font-semibold text-white mb-2">Página não encontrada</h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link to="/dashboard">
          <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
