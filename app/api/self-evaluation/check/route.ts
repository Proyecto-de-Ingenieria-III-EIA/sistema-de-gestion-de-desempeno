import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS);
    const existingSelfEvaluation = await prisma.selfEvaluation.findFirst({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: threeDaysAgo,
        },
      },
    });

    return NextResponse.json({ hasEvaluation: !!existingSelfEvaluation });
  } catch (error) {
    console.error('Error checking self-evaluation:', error);
    return NextResponse.json(
      { error: 'Error al verificar la autoevaluación' },
      { status: 500 }
    );
  }
} 