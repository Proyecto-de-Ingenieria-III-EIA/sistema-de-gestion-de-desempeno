import React from 'react';

export default function MiDesempeno() {
  const criterios = [
    {
      titulo: 'Habilidad Técnica',
      descripcion:
        'Nivel de conocimiento y aplicación de herramientas, lenguajes y procesos técnicos.',
      icono: '🛠️',
    },
    {
      titulo: 'Creatividad',
      descripcion:
        'Capacidad para proponer ideas nuevas, soluciones creativas y pensar fuera de lo común.',
      icono: '🎨',
    },
    {
      titulo: 'Trabajo en Equipo',
      descripcion:
        'Colaboración efectiva, comunicación y aporte al equipo de trabajo.',
      icono: '🤝',
    },
    {
      titulo: 'Puntualidad y Responsabilidad',
      descripcion:
        'Cumplimiento de fechas, asistencia y responsabilidad en las tareas asignadas.',
      icono: '⏰',
    },
    {
      titulo: 'Adaptabilidad',
      descripcion:
        'Capacidad de ajustarse a nuevos cambios, herramientas y dinámicas del equipo.',
      icono: '🔄',
    },
  ];

  return (
    <main className='flex justify-center items-start min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 md:p-10'>
        <h1 className='text-3xl font-bold text-center text-indigo-600 mb-6'>
          Criterios de Evaluación
        </h1>
        <p className='text-center text-gray-600 mb-8'>
          A continuación se presentan los criterios sobre los cuales serás
          evaluado periódicamente.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {criterios.map((criterio) => (
            <div
              key={criterio.titulo}
              className='bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition'
            >
              <h3 className='text-lg font-bold text-indigo-800 flex items-center gap-2'>
                <span className='text-2xl'>{criterio.icono}</span>
                {criterio.titulo}
              </h3>
              <p className='text-gray-700 mt-2'>{criterio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
