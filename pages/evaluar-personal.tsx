'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// eslint-disable-next-line react/function-component-definition
export default function EvaluarPersonal() {
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState({
    skill: 0,
    creativity: 0,
    teamwork: 0,
    punctuality: 0,
    adaptability: 0,
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const enviarEvaluacion = async () => {
    const res = await fetch('/api/evaluacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...form }),
    });

    if (res.ok) {
      alert('✅ Evaluación enviada con éxito');
    } else {
      alert('❌ Error al enviar la evaluación');
    }
  };

  return (
    <div className='p-6 max-w-3xl mx-auto bg-white shadow rounded'>
      <h1 className='text-2xl font-bold text-indigo-600 mb-6'>
        Evaluar Personal
      </h1>
      <Input
        placeholder='ID del empleado'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className='mb-4'
      />
      <div className='grid grid-cols-2 gap-4'>
        <Input
          name='skill'
          type='number'
          placeholder='Habilidad Técnica'
          onChange={handleChange}
        />
        <Input
          name='creativity'
          type='number'
          placeholder='Creatividad'
          onChange={handleChange}
        />
        <Input
          name='teamwork'
          type='number'
          placeholder='Trabajo en Equipo'
          onChange={handleChange}
        />
        <Input
          name='punctuality'
          type='number'
          placeholder='Puntualidad'
          onChange={handleChange}
        />
        <Input
          name='adaptability'
          type='number'
          placeholder='Adaptabilidad'
          onChange={handleChange}
        />
      </div>
      <textarea
        name='comment'
        placeholder='Comentario adicional'
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        className='w-full mt-4 p-2 border rounded'
      />
      <Button
        className='mt-4 w-full bg-indigo-600 text-white'
        onClick={enviarEvaluacion}
      >
        Enviar Evaluación
      </Button>
    </div>
  );
}
