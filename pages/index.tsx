import { Title } from '@/components/atomic-design/atoms/texts/title';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, CheckCircle, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import EvaluarPersonal from './evaluar-personal';
const Home = () => {
  const router = useRouter();

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className='min-h-screen w-full bg-gray-100 p-6'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-6'
      >
        <Title>Bienvenido</Title>
        <p className='text-gray-600'>
          Visualiza y gestiona el rendimiento de tu equipo con facilidad.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Tarjeta de Evaluaciones */}
        <motion.div whileHover={{ scale: 1.05 }} className='col-span-1'>
          <Card className='shadow-lg'>
            <CardContent className='flex items-center p-6'>
              <BarChart className='text-blue-500 w-12 h-12 mr-4' />
              <div>
                <h3 className='text-lg font-semibold'>
                  Evaluaciones Recientes
                </h3>
                <p className='text-gray-500'>
                  Revisa el desempeño de los últimos 30 días
                </p>
                <Button 
                  className='mt-2' 
                  variant='outline'
                 >
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tarjeta de Usuarios */}
        <motion.div whileHover={{ scale: 1.05 }} className='col-span-1'>
          <Card className='shadow-lg'>
            <CardContent className='flex items-center p-6'>
              <Users className='text-green-500 w-12 h-12 mr-4' />
              <div>
                <h3 className='text-lg font-semibold'>Usuarios Registrados</h3>
                <p className='text-gray-500'>
                  Administra los perfiles y roles de los miembros
                </p>
                <Button 
                  className='mt-2' 
                  variant='outline'
                  onClick={() => router.push('/usuarios')}
                >
                  Ver usuarios
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tarjeta de Evaluaciones */}
        <motion.div whileHover={{ scale: 1.05 }} className='col-span-1'>
          <Card className='shadow-lg'>
            <CardContent className='flex items-center p-6'>
              <CheckCircle className='text-yellow-500 w-12 h-12 mr-4' />
              <div>
                <h3 className='text-lg font-semibold'>Evaluacion del Personal</h3>
                <p className='text-gray-500'>
                  Realiza la evaluacion del personal
                </p>
                <Button 
                  className='mt-2' 
                  variant='outline'
                  onClick={() => router.push('/evaluar-personal')}>
                 Evaluar el Personal
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sección de videos para mejorar el desempeño */}
      <div className='mt-12 text-center'>
        <Title>Mejora tu Desempeño</Title>
        <p className='text-gray-600 mb-6'>
          Accede a videos y recursos para potenciar tu rendimiento.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className='shadow-lg'>
              <CardContent className='flex flex-col items-center p-6'>
                <PlayCircle className='text-red-500 w-16 h-16 mb-4' />
                <h3 className='text-lg font-semibold'>
                  Consejos para la Productividad
                </h3>
                <p className='text-gray-500 text-sm'>
                  Descubre técnicas efectivas para mejorar tu desempeño laboral.
                </p>
                <Button 
                  className='mt-2' 
                  variant='outline'
                  onClick={() => handleVideoClick('T4CB5RPbtCk')}
                >
                  Ver Video
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className='shadow-lg'>
              <CardContent className='flex flex-col items-center p-6'>
                <PlayCircle className='text-blue-500 w-16 h-16 mb-4' />
                <h3 className='text-lg font-semibold'>Gestión del Tiempo</h3>
                <p className='text-gray-500 text-sm'>
                  Aprende cómo organizar tu día para ser más eficiente.
                </p>
                <Button 
                  className='mt-2' 
                  variant='outline'
                  onClick={() => handleVideoClick('n3kNlFMXslo')}
                >
                  Ver Video
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className='shadow-lg'>
              <CardContent className='flex flex-col items-center p-6'>
                <PlayCircle className='text-green-500 w-16 h-16 mb-4' />
                <h3 className='text-lg font-semibold'>Trabajo en Equipo</h3>
                <p className='text-gray-500 text-sm'>
                  Mejora tus habilidades de colaboración con estrategias clave.
                </p>
                <Button 
                  className='mt-2' 
                  variant='outline'
                  onClick={() => handleVideoClick('hHIikHJV9fI')}
                >
                  Ver Video
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
