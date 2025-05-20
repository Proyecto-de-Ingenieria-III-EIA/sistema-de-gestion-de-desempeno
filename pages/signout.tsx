'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export const SignOutPage = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='p-8 border rounded-xl shadow-lg text-center'>
        <h1 className='text-xl font-bold mb-4'>¿Deseas cerrar sesión?</h1>
        <Button onClick={() => signOut()}>Cerrar sesión</Button>
      </div>
    </div>
  );
};

export default SignOutPage;
