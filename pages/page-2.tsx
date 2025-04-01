"use client";

import { motion } from "framer-motion";
import { Title } from "@/components/atomic-design/atoms/texts/title";
import { Button } from "@/components/ui/button";
import { BarChart, ThumbsUp, Users } from "lucide-react";
import Image from "next/image";
import { ResponsivePie } from "@nivo/pie";

const statsData = [
  { id: "Eficiencia", label: "Eficiencia", value: 45, color: "#4F46E5" },
  { id: "Productividad", label: "Productividad", value: 35, color: "#10B981" },
  { id: "Satisfacción", label: "Satisfacción", value: 20, color: "#F59E0B" },
];

const testimonials = [
  {
    name: "Carlos Pérez",
    feedback: "Este sistema ha optimizado nuestro rendimiento en un 50%!",
    image: "/men1.jpg",
  },
  {
    name: "Ana Gómez",
    feedback: "Una plataforma increíblemente intuitiva y fácil de usar.",
    image: "/women1.jpg",
  },
  {
    name: "Luis Rodríguez",
    feedback: "Los reportes estadísticos nos han ayudado a tomar mejores decisiones.",
    image: "/men2.jpg",
  },
];

const Page2 = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      {/* Título animado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <Title>Mejorando el Desempeño con Datos</Title>
        <p className="text-gray-600 text-lg">
          Descubre cómo optimizar la productividad con estadísticas y testimonios.
        </p>
      </motion.div>

      {/* Sección de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de rendimiento */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <h3 className="text-xl font-semibold text-center mb-4">Rendimiento del Equipo</h3>
          <div className="h-64">
            <ResponsivePie
              data={statsData}
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              innerRadius={0.5}
              padAngle={1.5}
              cornerRadius={5}
              colors={{ datum: "data.color" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              animate={true}
              motionConfig="wobbly"
            />
          </div>
        </motion.div>

        {/* Tarjetas de impacto */}
        <div className="flex flex-col gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-lg rounded-xl flex items-center">
            <BarChart className="text-blue-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Análisis de Datos</h3>
              <p className="text-gray-600">Optimiza estrategias con métricas avanzadas.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-lg rounded-xl flex items-center">
            <ThumbsUp className="text-green-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Feedback en Tiempo Real</h3>
              <p className="text-gray-600">Recibe opiniones y mejora continuamente.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white shadow-lg rounded-xl flex items-center">
            <Users className="text-yellow-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Colaboración Eficiente</h3>
              <p className="text-gray-600">Facilita la comunicación entre equipos.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sección de testimonios */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-6">Lo que dicen nuestros usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 shadow-lg rounded-xl text-center"
            >
              <Image
                src={testi.image}
                width={80}
                height={80}
                alt={testi.name}
                className="rounded-full mx-auto mb-4"
              />
              <p className="italic text-gray-700">"{testi.feedback}"</p>
              <h4 className="font-semibold mt-2">{testi.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-12 text-center">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="default" className="px-6 py-3 text-lg">
            Explora más funcionalidades
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page2;
