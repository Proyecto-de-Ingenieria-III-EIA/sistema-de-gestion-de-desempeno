import { useState, useEffect } from 'react';
import { Title } from '@/components/atomic-design/atoms/texts/title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Badge } from "@/components/ui/badge";
import { Search, UserCog } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'default';
    case 'GERENTE':
      return 'destructive';
    case 'EMPLEADO':
      return 'secondary';
    default:
      return 'secondary';
  }
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'Admin';
    case 'GERENTE':
      return 'Gerente';
    case 'EMPLEADO':
      return 'Empleado';
    default:
      return role;
  }
};

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user/all');
      if (!response.ok) throw new Error('Error al cargar usuarios');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los usuarios',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('/api/user/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) throw new Error('Error al actualizar rol');

      toast({
        title: 'Éxito',
        description: 'Rol actualizado correctamente',
      });

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el rol',
        variant: 'destructive',
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin text-indigo-600">
            <UserCog className="h-8 w-8" />
          </div>
          <div className="text-lg text-gray-600">
            Cargando usuarios...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50">
      <div className="w-full border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <CardHeader className="max-w-[2000px] mx-auto">
          <div className="flex flex-col gap-4">
            <CardTitle className="text-2xl font-bold text-center text-indigo-600">
              Gestión de Usuarios
            </CardTitle>
            <div className="relative max-w-2xl mx-auto w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar usuarios por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white/70 backdrop-blur-sm"
              />
            </div>
          </div>
        </CardHeader>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[2000px] mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Total Usuarios</div>
                <div className="text-2xl font-bold text-indigo-600">{users.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Administradores</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {users.filter(u => u.role === 'ADMIN').length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Gerentes</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {users.filter(u => u.role === 'GERENTE').length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Empleados</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {users.filter(u => u.role === 'EMPLEADO').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <Badge 
                        variant={getRoleBadgeVariant(user.role)}
                        className="ml-2"
                      >
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </div>
                    
                    <div className="pt-2">
                      <Select
                        defaultValue={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Cambiar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN" className="cursor-pointer">
                            Administrador
                          </SelectItem>
                          <SelectItem value="GERENTE" className="cursor-pointer">
                            Gerente
                          </SelectItem>
                          <SelectItem value="EMPLEADO" className="cursor-pointer">
                            Empleado
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm">
              <UserCog className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 