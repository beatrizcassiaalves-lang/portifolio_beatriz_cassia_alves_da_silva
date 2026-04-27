import { Facebook, Twitter, Github, MessageSquare, Linkedin, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";

const platforms = [
  { icon: <Facebook size={40} />, label: "Redes Sociais", name: "Facebook" },
  { icon: <Twitter size={40} />, label: "Microblogging", name: "Twitter" },
  { icon: <Github size={40} />, label: "Plataformas de Código", name: "GitHub" },
  { icon: <MessageSquare size={40} />, label: "Fóruns", name: "Reddit" },
  { icon: <Linkedin size={40} />, label: "Profissional", name: "LinkedIn" },
  { icon: <Gamepad2 size={40} />, label: "Jogos", name: "Gaming" },
];

export function PlatformCoverageSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-dark mb-4">
            Cobertura de Plataformas do App WhereAmI
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-sans">
            Descoberta abrangente de nomes de usuário em todo o cenário digital
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="text-brand-blue transition-transform group-hover:scale-110 duration-300">
                {platform.icon}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-brand-blue uppercase tracking-wider font-sans">
                  {platform.name}
                </span>
                <span className="text-xs text-brand-blue-pastel font-medium font-sans">
                  {platform.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
