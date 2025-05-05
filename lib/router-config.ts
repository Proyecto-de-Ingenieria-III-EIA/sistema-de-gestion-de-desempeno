import {
  Home,
  MessageSquare,
  LogOut,
  Award,
  ClipboardList,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type RouteConfig = {
  id: string;
  name: string;
  path?: string;
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
    icon: Home,
    showInSidebar: true,
  },
  {
    id: 'desempeno',
    name: 'Mi Desempeno',
    path: '/mi-desempeno',
    isPublic: false,
    icon: Award,
    showInSidebar: true,
  },
  {
    id: 'testimonios',
    name: 'Testimonios',
    path: '/page-2',
    isPublic: false,
    icon: MessageSquare,
    showInSidebar: true,
  },

  {
    id: 'logout',
    name: 'Cerrar Sesion',
    isPublic: true,
    icon: LogOut,
    showInSidebar: true,
  },
];

// ✅ Incluimos onlyFor en los ítems del sidebar
export const getSidebarItems = () =>
  routerConfig
    .filter((route) => route.showInSidebar)
    .map(({ name, path, icon }) => ({
      title: name,
      url: path,
      icon: icon || Home,
    }));
