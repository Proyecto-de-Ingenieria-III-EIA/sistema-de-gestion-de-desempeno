import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export function useLogout() {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Cierra la sesión y redirige inmediatamente
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión. Intenta de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return { handleLogout };
}
