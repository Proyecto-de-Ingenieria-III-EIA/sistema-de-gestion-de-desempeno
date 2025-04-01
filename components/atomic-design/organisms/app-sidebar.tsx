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
import { signOut } from 'next-auth/react'; // Importamos signOut de next-auth
import Link from 'next/link'; // Importamos Link de next/link
import { motion } from 'framer-motion'; // Importamos framer-motion para las animaciones


const AppSidebar = () => {
  const sidebarItems = getSidebarItems();


  const handleLogout = () => {
    // Ejecutamos signOut y redirigimos al inicio
    signOut({ callbackUrl: window.location.origin }); // Se redirige al home después de cerrar sesión
  };

  return (
    <Sidebar className="bg-gray-800 text-black shadow-lg">
      <SidebarContent className="py-4 px-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-semibold text-center mb-6 text-indigo-400">
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
                  <SidebarMenuItem className="transition-transform duration-300 hover:scale-105">
                    {item.title === 'Cerrar Sesion' ? (
                      <div
                        className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-indigo-600 cursor-pointer"
                        onClick={handleLogout} // Al hacer clic, ejecutamos el logout
                      >
                        {item.icon && <item.icon className="text-xl" />}
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link href={item.url || '/'} passHref>
                          <div className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-indigo-600">
                            {item.icon && <item.icon className="text-xl" />}
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
