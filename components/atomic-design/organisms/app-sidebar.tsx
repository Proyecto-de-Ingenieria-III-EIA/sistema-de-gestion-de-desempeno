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
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useLogout } from '@/hooks/use-logout';

const AppSidebar = () => {
  const { data: session } = useSession();
  const { handleLogout, isLoggingOut } = useLogout();
  const { toast } = useToast();

  // Get all sidebar items without filtering by role
  const sidebarItems = getSidebarItems();

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
                        className={cn(
                          'flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-indigo-600 cursor-pointer',
                          isLoggingOut && 'opacity-50 cursor-not-allowed'
                        )}
                        onClick={handleLogout}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleLogout();
                          }
                        }}
                      >
                        {item.icon && <item.icon className='text-xl' />}
                        <span>{isLoggingOut ? 'Cerrando sesión...' : item.title}</span>
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
