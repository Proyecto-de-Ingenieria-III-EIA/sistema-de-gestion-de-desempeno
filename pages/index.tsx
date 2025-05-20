'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Title } from '@/components/atomic-design/atoms/texts/title';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, CheckCircle, PlayCircle } from 'lucide-react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const role = session?.user?.role;

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

      {/* 🔐 Cards según el rol */}
      <div className='grid-cols-1 md:grid-cols-3 gap-6 flex justify-center'>
        {/* USER y GERENTE → Autoevaluación */}
        {(role === 'USER' || role === 'GERENTE') && (
          <motion.div whileHover={{ scale: 1.05 }} className='col-span-1'>
            <Card className='shadow-lg'>
              <CardContent className='flex items-center p-6'>
                <BarChart className='text-blue-500 w-12 h-12 mr-4' />
                <div>
                  <h3 className='text-lg font-semibold'>Autoevaluación</h3>
                  <p className='text-gray-500'>
                    Realiza tu propia evaluación de desempeño
                  </p>
                  <Button
                    className='mt-2'
                    variant='outline'
                    onClick={() => router.push('/autoevaluacion')}
                  >
                    Autoevaluarme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ADMIN → Usuarios Registrados */}
        {role === 'ADMIN' && (
          <motion.div whileHover={{ scale: 1.05 }} className='col-span-1'>
            <Card className='shadow-lg flex justify-center'>
              <CardContent className='flex items-center p-6'>
                <Users className='text-green-500 w-12 h-12 mr-4' />
                <div>
                  <h3 className='text-lg font-semibold'>
                    Usuarios Registrados
                  </h3>
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
        )}

        {/* GERENTE → Evaluación del Personal */}
        {role === 'GERENTE' && (
          <motion.div whileHover={{ scale: 1.05 }} className='col-span-1'>
            <Card className='shadow-lg flex justify-center'>
              <CardContent className='flex items-center p-6'>
                <CheckCircle className='text-yellow-500 w-12 h-12 mr-4' />
                <div>
                  <h3 className='text-lg font-semibold'>
                    Evaluación del Personal
                  </h3>
                  <p className='text-gray-500'>
                    Realiza la evaluación al personal de la empresa
                  </p>
                  <Button
                    className='mt-2'
                    variant='outline'
                    onClick={() => router.push('/evaluar-personal')}
                  >
                    Evaluar el Personal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* 🎥 Videos educativos */}
      <div className='mt-12 text-center'>
        <Title>Mejora tu Desempeño</Title>
        <p className='text-gray-600 mb-6'>
          Accede a videos y recursos para potenciar tu rendimiento.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            {
              title: 'Consejos para la Productividad',
              color: 'text-red-500',
              videoId: 'T4CB5RPbtCk',
              desc: 'Descubre técnicas efectivas para mejorar tu desempeño laboral.',
            },
            {
              title: 'Gestión del Tiempo',
              color: 'text-blue-500',
              videoId: 'n3kNlFMXslo',
              desc: 'Aprende cómo organizar tu día para ser mucho más eficiente.',
            },
            {
              title: 'Trabajo en Equipo',
              color: 'text-green-500',
              videoId: 'hHIikHJV9fI',
              desc: 'Mejora tus habilidades de colaboración con estrategias clave.',
            },
          ].map((vid, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <Card className='shadow-lg'>
                <CardContent className='flex flex-col items-center p-6'>
                  <PlayCircle className={`${vid.color} w-16 h-16 mb-4`} />
                  <h3 className='text-lg font-semibold'>{vid.title}</h3>
                  <p className='text-gray-500 text-sm'>{vid.desc}</p>
                  <Button
                    className='mt-2'
                    variant='outline'
                    onClick={() => handleVideoClick(vid.videoId)}
                  >
                    Ver Video
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
