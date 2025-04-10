import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth'; // Auth desde App Router

// eslint-disable-next-line func-style
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const {
    userId,
    skill,
    creativity,
    teamwork,
    punctuality,
    adaptability,
    comment,
  } = body;

  // Validación básica
  if (!userId || comment?.trim() === '') {
    return NextResponse.json(
      { error: 'Faltan datos obligatorios' },
      { status: 400 }
    );
  }

  try {
    const evaluacion = await prisma.evaluation.create({
      data: {
        userId,
        managerId: session.user.id,
        skill,
        creativity,
        teamwork,
        punctuality,
        adaptability,
        comment,
      },
    });

    return NextResponse.json(evaluacion, { status: 201 });
  } catch (error) {
    console.error('❌ Error al crear evaluación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
