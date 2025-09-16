'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Role } from '@prisma/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface Employee {
  id: string;
  name: string;
  email: string;
}

interface EvaluationForm {
  skill: number;
  creativity: number;
  teamwork: number;
  punctuality: number;
  adaptability: number;
  comment: string;
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
  punctuality: {
    title: 'Puntualidad',
    description: 'Cumplimiento de fechas, asistencia y responsabilidad en las tareas asignadas.',
  },
  adaptability: {
    title: 'Adaptabilidad',
    description: 'Capacidad de ajustarse a nuevos cambios, herramientas y dinámicas del equipo.',
  },
};

export default function EvaluarPersonal() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [form, setForm] = useState<EvaluationForm>({
    skill: 0,
    creativity: 0,
    teamwork: 0,
    punctuality: 0,
    adaptability: 0,
    comment: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsFetching(true);
        const response = await fetch('/api/user/');
        if (!response.ok) {
          throw new Error('Error al cargar los empleados');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los empleados',
          variant: 'destructive',
        });
      } finally {
        setIsFetching(false);
      }
    };
    fetchEmployees();
  }, [toast]);

  const handleSliderChange = (value: number, field: keyof EvaluationForm) => {
    setForm(prev => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  const enviarEvaluacion = async () => {
    if (!selectedEmployee) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona un empleado',
        variant: 'destructive',
      });
      return;
    }

    if (form.comment.trim() === '') {
      toast({
        title: 'Error',
        description: 'Por favor agrega un comentario',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
    const res = await fetch('/api/evaluacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ userId: selectedEmployee, ...form }),
    });

      if (!res.ok) {
        throw new Error('Error al enviar la evaluación');
      }

      toast({
        title: 'Éxito',
        description: 'Evaluación enviada correctamente',
      });
      
      // Reset form
      setForm({
        skill: 0,
        creativity: 0,
        teamwork: 0,
        punctuality: 0,
        adaptability: 0,
        comment: '',
      });
      setSelectedEmployee('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la evaluación',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = Object.entries(form)
    .filter(([key]) => key !== 'comment')
    .map(([key, value]) => ({
      name: evaluationCriteria[key as keyof typeof evaluationCriteria].title,
      value: value,
      color: getScoreColor(value),
    }));

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <Card className="h-full shadow-lg">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold text-center text-indigo-600">
            Evaluación del Personal
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
            {/* Columna del Formulario - Ocupa 2 columnas en pantallas grandes */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
                {/* Selector de Empleado */}
                <div className="space-y-2">
                  <Label htmlFor="employee" className="text-base font-semibold text-gray-700">
                    Empleado
                  </Label>
                  <Select 
                    value={selectedEmployee} 
                    onValueChange={setSelectedEmployee}
                    disabled={isFetching}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={isFetching ? "Cargando empleados..." : "Selecciona un empleado"} />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sliders de Evaluación */}
                <div className="space-y-6">
                  {Object.entries(form).map(([key, value]) => {
                    if (key === 'comment') return null;
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
                          onValueChange={([newValue]) => handleSliderChange(newValue, key as keyof EvaluationForm)}
                          max={10}
                          step={1}
                          className="flex-1"
        />
      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sección de Comentarios */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Label htmlFor="comment" className="text-base font-semibold text-gray-700 block mb-2">
                  Comentarios
                </Label>
      <textarea
                  id="comment"
                  value={form.comment}
                  onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-3 border rounded-lg min-h-[120px] resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Escribe tus comentarios aquí..."
                />
              </div>

              {/* Botón de Enviar */}
      <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-semibold shadow-lg"
        onClick={enviarEvaluacion}
                disabled={!selectedEmployee || form.comment.trim() === '' || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Enviando...
                  </>
                ) : (
                  'Enviar Evaluación'
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
