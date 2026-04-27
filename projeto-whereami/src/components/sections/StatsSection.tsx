import { motion } from "motion/react";

const stats = [
  {
    value: "500+",
    label: "Plataformas Escaneadas",
    description: "Cobertura abrangente",
  },
  {
    value: "99.9%",
    label: "Taxa de Precisão",
    description: "Resultados verificados",
  },
  {
    value: "<3s",
    label: "Tempo Médio de Busca",
    description: "Rápido como um raio",
  },
  {
    value: "24/7",
    label: "Disponibilidade do Serviço",
    description: "Sempre online",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-brand-light-blue to-brand-gray p-12 md:p-20 text-brand-dark shadow-2xl shadow-brand-blue/20"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-title font-bold mb-4">
              App WhereAmI em Números
            </h2>
            <div className="w-16 h-1 bg-brand-blue/30 mx-auto rounded-full" />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-title font-black mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-lg font-title font-bold mb-1 opacity-90">
                  {stat.label}
                </span>
                <span className="text-sm opacity-70 font-medium font-sans">
                  {stat.description}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
