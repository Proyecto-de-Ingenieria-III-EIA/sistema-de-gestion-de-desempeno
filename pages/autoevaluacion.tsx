'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface SelfEvaluationForm {
  skill: number;
  creativity: number;
  teamwork: number;
}

const getScoreColor = (value: number): string => {
  if (value >= 8) return '#22c55e'; // green-500
  if (value >= 6) return '#3b82f6'; // blue-500
  if (value >= 4) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
};

const evaluationCriteria = {
  skill: {
    title: 'Habilidad Técnica',
    description: 'Nivel de conocimiento y aplicación de herramientas, lenguajes y procesos técnicos.',
  },
  creativity: {
    title: 'Creatividad',
    description: 'Capacidad para proponer ideas nuevas, soluciones creativas y pensar fuera de lo común.',
  },
  teamwork: {
    title: 'Trabajo en Equipo',
    description: 'Colaboración efectiva, comunicación y aporte al equipo de trabajo.',
  },
};

export default function Autoevaluacion() {
  const [form, setForm] = useState<SelfEvaluationForm>({
    skill: 0,
    creativity: 0,
    teamwork: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSliderChange = (value: number, field: keyof SelfEvaluationForm) => {
    setForm(prev => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  const enviarAutoevaluacion = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/self-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Error al enviar la autoevaluación');
      }

      toast({
        title: 'Éxito',
        description: 'Autoevaluación enviada correctamente',
      });
      
      // Reset form
      setForm({
        skill: 0,
        creativity: 0,
        teamwork: 0,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la autoevaluación',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = Object.entries(form).map(([key, value]) => ({
    name: evaluationCriteria[key as keyof typeof evaluationCriteria].title,
    value: value,
    color: getScoreColor(value),
  }));

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <Card className="h-full shadow-lg">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold text-center text-indigo-600">
            Autoevaluación
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
            {/* Columna del Formulario - Ocupa 2 columnas en pantallas grandes */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
                {/* Sliders de Evaluación */}
                <div className="space-y-6">
                  {Object.entries(form).map(([key, value]) => {
                    const criterion = evaluationCriteria[key as keyof typeof evaluationCriteria];
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <Label htmlFor={key} className="text-sm font-medium capitalize text-gray-700 flex items-center gap-2">
                              {criterion.title}
                              <span className="text-xs text-gray-500 font-normal">
                                {criterion.description}
                              </span>
                            </Label>
                          </div>
                          <span 
                            className={cn(
                              "text-sm font-semibold px-2 py-1 rounded",
                              value >= 8 ? "bg-green-100 text-green-700" :
                              value >= 6 ? "bg-blue-100 text-blue-700" :
                              value >= 4 ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            )}
                          >
                            {value}/10
                          </span>
                        </div>
                        <Slider
                          value={[value]}
                          onValueChange={([newValue]) => handleSliderChange(newValue, key as keyof SelfEvaluationForm)}
                          max={10}
                          step={1}
                          className="flex-1"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botón de Enviar */}
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-semibold shadow-lg"
                onClick={enviarAutoevaluacion}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Enviando...
                  </>
                ) : (
                  'Enviar Autoevaluación'
                )}
              </Button>
            </div>

            {/* Columna de la Gráfica - Ocupa 3 columnas en pantallas grandes */}
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border">
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
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 