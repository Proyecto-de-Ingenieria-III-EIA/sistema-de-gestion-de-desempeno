import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const employees = await prisma.user.findMany({
      where: {
        role: 'EMPLEADO',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los empleados' },
      { status: 500 }
    );
  }
} 