import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export async function GET() {
  try {
    const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS);

    // Get only recent evaluations
    const evaluations = await prisma.evaluation.findMany({
      where: {
        createdAt: {
          gte: threeDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (evaluations.length === 0) {
      return NextResponse.json({
        hasEvaluations: false,
        message: 'No hay evaluaciones activas en este momento',
        skill: 0,
        creativity: 0,
        teamwork: 0,
        punctuality: 0,
        adaptability: 0,
      });
    }

    // Calculate averages with proper rounding
    const totalEvaluations = evaluations.length;
    const averages = evaluations.reduce(
      (acc, evaluation) => ({
        skill: acc.skill + evaluation.skill / totalEvaluations,
        creativity: acc.creativity + evaluation.creativity / totalEvaluations,
        teamwork: acc.teamwork + evaluation.teamwork / totalEvaluations,
        punctuality: acc.punctuality + evaluation.punctuality / totalEvaluations,
        adaptability: acc.adaptability + evaluation.adaptability / totalEvaluations,
      }),
      {
        skill: 0,
        creativity: 0,
        teamwork: 0,
        punctuality: 0,
        adaptability: 0,
      }
    );

    // Round all averages to 1 decimal place
    const roundedAverages = {
      skill: Number(averages.skill.toFixed(1)),
      creativity: Number(averages.creativity.toFixed(1)),
      teamwork: Number(averages.teamwork.toFixed(1)),
      punctuality: Number(averages.punctuality.toFixed(1)),
      adaptability: Number(averages.adaptability.toFixed(1)),
    };

    return NextResponse.json({
      hasEvaluations: true,
      ...roundedAverages,
    });
  } catch (error) {
    console.error('Error fetching evaluation stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas de evaluación' },
      { status: 500 }
    );
  }
} 