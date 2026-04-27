import { Shield, Zap, Cpu } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Inteligência Avançada de Usuário",
    description: "O App WhereAmI Web varre mais de 500 plataformas, incluindo redes sociais, fóruns, sites de jogos e redes profissionais usando algoritmos de descoberta de ponta.",
    icon: <Cpu className="text-brand-blue" size={32} />,
  },
  {
    title: "Mecanismo de Descoberta em Tempo Real",
    description: "A tecnologia de processamento paralelo do App WhereAmI entrega resultados abrangentes de nomes de usuário em segundos em todas as plataformas monitoradas.",
    icon: <Zap className="text-brand-blue" size={32} />,
  },
  {
    title: "Privacidade de Nível Empresarial",
    description: "O WhereAmI Web garante privacidade total com buscas criptografadas, retenção zero de dados e protocolos de segurança avançados.",
    icon: <Shield className="text-brand-blue" size={32} />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-title font-bold text-brand-dark mb-4"
          >
            Por que o WhereAmI Web Lidera a Descoberta de Usuários
          </motion.h2>
          <div className="w-20 h-1.5 bg-brand-yellow mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-brand-blue/5 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-title font-bold text-brand-dark mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-sans">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
