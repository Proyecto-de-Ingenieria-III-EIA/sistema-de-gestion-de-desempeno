import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión. Intenta de nuevo.',
        variant: 'destructive',
      });
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
} 