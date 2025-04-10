import NextAuth from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma'; // usa tu path correcto a prisma.ts
import type { Session, User } from 'next-auth';

export const authOptions = {
  providers: [Auth0],
  adapter: PrismaAdapter(prisma),

  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (user.id) session.user.id = user.id;
      if (user.role) session.user.role = user.role;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
