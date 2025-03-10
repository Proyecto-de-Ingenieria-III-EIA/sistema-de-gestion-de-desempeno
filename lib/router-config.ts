import { Home, LogIn, MessageSquare} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type RouteConfig = {
  id: string;
  name: string;
  path: string;
  isPublic: boolean;
  icon?: LucideIcon;
  showInSidebar?: boolean;
};

export const routerConfig: RouteConfig[] = [
  {
    id: 'home',
    name: 'Pagina Principal',
    path: '/',
    isPublic: false,
    icon: Home, // Página de inicio
    showInSidebar: true,
  },
  {
    id: 'testimonios',
    name: 'Testimonios',
    path: '/page-2',
    isPublic: false,
    icon: MessageSquare, // Testimonios (icono de mensajes)
    showInSidebar: true,
  },
  {
    id: 'login',
    name: 'Cerrar Sesion',
    path: '/login',
    isPublic: true,
    icon: LogIn, // Cerrar sesión
    showInSidebar: true,
  },
 

  // Add more routes as needed
];

// Helper function to get sidebar items
export const getSidebarItems = () =>
  routerConfig
    .filter((route) => route.showInSidebar)
    .map(({ name, path, icon }) => ({
      title: name,
      url: path,
      icon: icon || Home, // Fallback icon if none provided
    }));
