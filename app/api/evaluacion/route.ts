import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth'; // Auth desde App Router
import { Prisma } from '@prisma/client';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

// eslint-disable-next-line func-style
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { userId, skill, creativity, teamwork, punctuality, adaptability, comment } = data;

    // Validar datos
    if (!userId || typeof skill !== 'number' || typeof creativity !== 'number' || 
        typeof teamwork !== 'number' || typeof punctuality !== 'number' || 
        typeof adaptability !== 'number' || !comment?.trim()) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios y deben ser válidos' },
        { status: 400 }
      );
    }

    // Verificar si ya existe una evaluación activa para este usuario
    const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS);
    const existingEvaluation = await prisma.evaluation.findFirst({
      where: {
        userId,
        createdAt: {
          gte: threeDaysAgo,
        },
      },
    });

    if (existingEvaluation) {
      return NextResponse.json(
        { error: 'Ya existe una evaluación activa para este usuario' },
        { status: 400 }
      );
    }

    // Crear nueva evaluación
    const evaluation = await prisma.evaluation.create({
      data: {
        userId,
        managerId: session.user.id,
        skill,
        creativity,
        teamwork,
        punctuality,
        adaptability,
        comment: comment.trim(),
      },
    });

    return NextResponse.json(evaluation, { status: 201 });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    return NextResponse.json(
      { error: 'Error al crear la evaluación' },
      { status: 500 }
    );
  }
}
