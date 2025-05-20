import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Prisma } from '@prisma/client';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { skill, creativity, teamwork } = data;

    // Validar datos
    if (typeof skill !== 'number' || typeof creativity !== 'number' || typeof teamwork !== 'number') {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios y deben ser números válidos' },
        { status: 400 }
      );
    }

    // Verificar si ya existe una autoevaluación activa
    const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS);
    const existingSelfEvaluation = await prisma.selfEvaluation.findFirst({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: threeDaysAgo,
        },
      },
    });

    if (existingSelfEvaluation) {
      return NextResponse.json(
        { error: 'Ya tienes una autoevaluación activa' },
        { status: 400 }
      );
    }

    // Crear nueva autoevaluación
    const selfEvaluation = await prisma.selfEvaluation.create({
      data: {
        userId: session.user.id,
        skill,
        creativity,
        teamwork,
      },
    });

    return NextResponse.json(selfEvaluation, { status: 201 });
  } catch (error) {
    console.error('Error creating self-evaluation:', error);
    return NextResponse.json(
      { error: 'Error al crear la autoevaluación' },
      { status: 500 }
    );
  }
} 