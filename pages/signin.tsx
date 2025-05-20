'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const SignInPage = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='p-8 border rounded-xl shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Iniciar sesión</h1>
        <Button onClick={() => signIn('auth0')}>Iniciar sesión</Button>
      </div>
    </div>
  );
};

export default SignInPage;
