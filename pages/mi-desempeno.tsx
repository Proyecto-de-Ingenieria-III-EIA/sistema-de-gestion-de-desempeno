'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

interface PerformanceData {
  hasEvaluations: boolean;
  message?: string;
  selfEvaluation?: {
    skill: number;
    creativity: number;
    teamwork: number;
    createdAt: string;
  };
  managerEvaluation?: {
    skill: number;
    creativity: number;
    teamwork: number;
    punctuality: number;
    adaptability: number;
    comment: string;
    createdAt: string;
    manager: {
      name: string;
    };
  };
  analysis?: {
    suggestions: string[];
    strengths: string[];
    areas: string[];
  };
}

const getScoreColor = (value: number): string => {
  if (value >= 8) return '#22c55e'; // green-500
  if (value >= 6) return '#3b82f6'; // blue-500
  if (value >= 4) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
};

export default function MiDesempeno() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch('/api/evaluations/my-performance');
        if (!response.ok) throw new Error('Error fetching performance data');
        const data = await response.json();
        setPerformanceData(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!performanceData?.hasEvaluations) {
    return (
      <main className="flex justify-center items-start min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Mi Desempeño
          </h1>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              {performanceData?.message || 'Aún no hay evaluaciones disponibles'}
            </p>
            <Button
              onClick={() => router.push('/autoevaluacion')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Realizar Autoevaluación
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const { selfEvaluation, managerEvaluation, analysis } = performanceData;

  const chartData = selfEvaluation
    ? [
        {
          name: 'Habilidad Técnica',
          self: selfEvaluation.skill,
          manager: managerEvaluation?.skill,
        },
        {
          name: 'Creatividad',
          self: selfEvaluation.creativity,
          manager: managerEvaluation?.creativity,
        },
        {
          name: 'Trabajo en Equipo',
          self: selfEvaluation.teamwork,
          manager: managerEvaluation?.teamwork,
        },
      ]
    : [];

  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-10"
        >
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Mi Desempeño
          </h1>

          {/* Gráfico Comparativo */}
          {selfEvaluation && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Comparativa de Evaluaciones</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar dataKey="self" name="Autoevaluación">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-self-${index}`} fill={getScoreColor(entry.self)} />
                      ))}
                    </Bar>
                    {managerEvaluation && (
                      <Bar dataKey="manager" name="Evaluación del Gerente">
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-manager-${index}`} fill={getScoreColor(entry.manager || 0)} />
                        ))}
                      </Bar>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Análisis y Recomendaciones */}
          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fortalezas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Trophy className="w-5 h-5" />
                    Fortalezas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.strengths.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-700">{strength}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No se han identificado fortalezas específicas</p>
                  )}
                </CardContent>
              </Card>

              {/* Áreas de Mejora */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <TrendingUp className="w-5 h-5" />
                    Áreas de Mejora
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.areas.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {analysis.areas.map((area, index) => (
                        <li key={index} className="text-gray-700">{area}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No se han identificado áreas de mejora específicas</p>
                  )}
                </CardContent>
              </Card>

              {/* Recomendaciones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Lightbulb className="w-5 h-5" />
                    Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.suggestions.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-700">{suggestion}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No hay recomendaciones específicas en este momento</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Comentario del Gerente */}
          {managerEvaluation?.comment && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600">
                  <AlertCircle className="w-5 h-5" />
                  Comentario del Gerente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">"{managerEvaluation.comment}"</p>
                <p className="text-sm text-gray-500 mt-2">
                  Evaluado por: {managerEvaluation.manager.name}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Botón de Autoevaluación */}
          <div className="mt-6 text-center">
            <Button
              onClick={() => router.push('/autoevaluacion')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Realizar Nueva Autoevaluación
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
