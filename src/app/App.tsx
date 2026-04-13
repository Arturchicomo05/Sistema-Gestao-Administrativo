import { RouterProvider } from 'react-router';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { router } from './routes';

export default function App() {
  // Aplicar dark mode por padrão
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <Toaster 
          theme="dark"
          position="top-right"
          richColors
          closeButton
        />
      </DataProvider>
    </AuthProvider>
  );
}