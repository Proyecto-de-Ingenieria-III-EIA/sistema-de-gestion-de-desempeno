import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // Get latest self-evaluation
    const selfEvaluation = await prisma.selfEvaluation.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get latest manager evaluation
    const managerEvaluation = await prisma.evaluation.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        manager: {
          select: {
            name: true,
          },
        },
      },
    });

    // If no evaluations exist
    if (!selfEvaluation && !managerEvaluation) {
      return NextResponse.json({
        hasEvaluations: false,
        message: 'Aún no hay evaluaciones disponibles',
      });
    }

    // Calculate improvement suggestions
    const suggestions = [];
    const strengths = [];
    const areas = [];

    if (selfEvaluation && managerEvaluation) {
      // Compare self-evaluation with manager evaluation
      const criteria = [
        { name: 'Habilidad Técnica', self: selfEvaluation.skill, manager: managerEvaluation.skill },
        { name: 'Creatividad', self: selfEvaluation.creativity, manager: managerEvaluation.creativity },
        { name: 'Trabajo en Equipo', self: selfEvaluation.teamwork, manager: managerEvaluation.teamwork },
      ];

      criteria.forEach(criterion => {
        const diff = criterion.manager - criterion.self;
        
        if (Math.abs(diff) >= 2) {
          if (diff > 0) {
            suggestions.push(`Tu ${criterion.name.toLowerCase()} es mejor de lo que piensas. Considera ser más confiado en tus capacidades.`);
          } else {
            suggestions.push(`Podrías ser más objetivo en tu ${criterion.name.toLowerCase()}. Considera pedir feedback específico.`);
          }
        }

        if (criterion.manager >= 8) {
          strengths.push(criterion.name);
        } else if (criterion.manager <= 5) {
          areas.push(criterion.name);
        }
      });
    } else if (selfEvaluation) {
      // Only self-evaluation exists
      const criteria = [
        { name: 'Habilidad Técnica', value: selfEvaluation.skill },
        { name: 'Creatividad', value: selfEvaluation.creativity },
        { name: 'Trabajo en Equipo', value: selfEvaluation.teamwork },
      ];

      criteria.forEach(criterion => {
        if (criterion.value >= 8) {
          strengths.push(criterion.name);
        } else if (criterion.value <= 5) {
          areas.push(criterion.name);
          suggestions.push(`Considera enfocarte en mejorar tu ${criterion.name.toLowerCase()}.`);
        }
      });
    }

    return NextResponse.json({
      hasEvaluations: true,
      selfEvaluation,
      managerEvaluation,
      analysis: {
        suggestions,
        strengths,
        areas,
      },
    });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos de desempeño' },
      { status: 500 }
    );
  }
} 