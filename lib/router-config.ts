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
  onlyFor?: string;
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
    id: 'testimonios',
    name: 'Testimonios',
    path: '/page-2',
    isPublic: false,
    icon: MessageSquare,
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
    id: 'evaluar',
    name: 'Evaluar Personal',
    path: '/evaluar-personal',
    isPublic: false,
    icon: ClipboardList,
    showInSidebar: true,
    onlyFor: 'GERENTE',
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
    .map(({ name, path, icon, onlyFor }) => ({
      title: name,
      url: path,
      icon: icon || Home,
      onlyFor, // ✅ añadimos esta propiedad
    }));
