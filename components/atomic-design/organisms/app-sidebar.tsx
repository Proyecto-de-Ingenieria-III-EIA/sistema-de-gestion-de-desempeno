'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getSidebarItems } from '@/lib/router-config';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AppSidebar = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  // Solo muestra los ítems que no tienen restricción o que coinciden con el rol del usuario
  const sidebarItems = getSidebarItems().filter((item) => {
    // Muestra si no hay restricción o si el rol coincide
    return !item.onlyFor || item.onlyFor === userRole;
  });

  const handleLogout = () => {
    signOut({ callbackUrl: window.location.origin });
  };

  return (
    <Sidebar className='bg-gray-800 text-black shadow-lg'>
      <SidebarContent className='py-4 px-6'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-2xl font-semibold text-center mb-6 text-indigo-400'>
            AppLogo
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <SidebarMenuItem className='transition-transform duration-300 hover:scale-105'>
                    {item.title === 'Cerrar Sesion' ? (
                      <div
                        className='flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-indigo-600 cursor-pointer'
                        onClick={handleLogout}
                      >
                        {item.icon && <item.icon className='text-xl' />}
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link href={item.url || '/'} passHref>
                          <div className='flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-indigo-600'>
                            {item.icon && <item.icon className='text-xl' />}
                            <span>{item.title}</span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
