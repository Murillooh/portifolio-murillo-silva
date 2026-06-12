import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

const experiences: Experience[] = [
  {
    company: "Tech Innovators Inc.",
    role: "Senior Full-Stack Developer",
    period: "2023 - Presente",
    description: "Lidero o desenvolvimento de aplicações escaláveis utilizando React, Node.js e arquitetura de microserviços. Responsável pela mentoria de desenvolvedores júnior e otimização de performance do front-end.",
    tags: ["React", "Node.js", "Kubernetes", "TypeScript"]
  },
  {
    company: "Digital Solutions Agency",
    role: "Full-Stack Developer",
    period: "2021 - 2023",
    description: "Desenvolvi e mantive diversos projetos para clientes internacionais, focando em interfaces de alta fidelidade e integrações complexas com APIs de terceiros.",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "AWS"]
  },
  {
    company: "StartUp Hub",
    role: "Front-End Developer",
    period: "2019 - 2021",
    description: "Trabalhei na criação de MVPs rápidos e iterativos, utilizando métodos ágeis e tecnologias modernas para garantir entregas frequentes e de qualidade.",
    tags: ["React", "Redux", "Firebase", "Sass"]
  }
];

export function ExperienceSection() {
  return (
    <section id="experiencia" className="container mx-auto px-4 py-32 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-[10px] font-mono uppercase tracking-[0.2em]">
            <Briefcase size={14} />
            <span>Trajetória Profissional</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Experiência</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-lg">
            Uma linha do tempo da minha evolução como desenvolvedor e dos projetos que ajudei a construir.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple/50 via-accent-teal/50 to-transparent" />

          <div className="space-y-16 pt-8">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4 }}
                  className="relative group/exp"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-card-bg border-4 border-accent-purple z-20 group-hover/exp:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

                  <div className={cn(
                    "flex flex-col md:flex-row items-start md:items-center w-full",
                    isEven ? "md:flex-row-reverse" : ""
                  )}>
                    {/* Content Card */}
                    <div 
                      className={cn(
                        "w-full md:w-[45%] pl-8 md:pl-0",
                        isEven ? "md:pl-12" : "md:pr-12"
                      )}
                    >
                      <div className="bg-card-bg border border-card-border p-6 md:p-8 rounded-3xl hover:border-white/20 transition-colors shadow-xl relative group">
                        {/* Period Tag */}
                        <div className="flex items-center gap-2 text-accent-purple font-mono text-xs mb-4">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-teal transition-colors">
                          {exp.role}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                          <Building2 size={14} />
                          <span>{exp.company}</span>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Date/Spacing for Desktop */}
                    <div className="hidden md:block w-[10%]" />
                    <div className="hidden md:block w-[45%]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
