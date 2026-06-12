import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Layout, 
  Cpu, 
  ChevronDown, 
  ChevronUp,
  Target,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '../lib/utils';

// Reusing design components from App (simplified for the section)
function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
  const [show, setShow] = useState(false);
  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full mb-2 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-white text-[10px] font-mono whitespace-nowrap z-50 pointer-events-none backdrop-blur-md shadow-2xl"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SkillBadge({ children, variant = 'purple' }: { children: React.ReactNode, variant?: 'purple' | 'teal' | 'orange', key?: string }) {
  const styles = {
    purple: 'bg-accent-purple/15 border-accent-purple/40 text-accent-purple',
    teal: 'bg-accent-teal/15 border-accent-teal/40 text-accent-teal',
    orange: 'bg-accent-orange/15 border-accent-orange/40 text-accent-orange',
  };
  return (
    <span className={cn("px-2 py-1 rounded text-[10px] font-mono border whitespace-nowrap uppercase tracking-tighter", styles[variant])}>
      {children}
    </span>
  );
}

const SKILLS_CATEGORIES = [
  {
    title: 'Front-end',
    icon: Layout,
    color: 'purple',
    tags: ['React 19', 'Next.js', 'Tailwind v4', 'Framer Motion', 'Recharts'],
    skills: [
      { name: 'TypeScript', level: 98 },
      { name: 'React', level: 95 },
      { name: 'Tailwind CSS', level: 98 },
    ]
  },
  {
    title: 'Back-end / Banco de Dados',
    icon: Database,
    color: 'teal',
    tags: ['Firebase', 'Node.js', 'Express', 'Gemini AI', 'SendGrid'],
    skills: [
      { name: 'Firebase / Firestore', level: 92 },
      { name: 'Node.js / Express', level: 88 },
      { name: 'APIs (Gemini / AI)', level: 85 },
    ]
  },
  {
    title: 'Ferramentas / DevOps',
    icon: Cpu,
    color: 'orange',
    tags: ['Vite', 'Git', 'Vercel', 'Docker', 'Testing'],
    skills: [
      { name: 'Vite / Build Tools', level: 94 },
      { name: 'Git / Collaboration', level: 92 },
      { name: 'Full-stack Integration', level: 90 },
    ]
  }
];

function ConstellationMap({ isMinimized, setIsMinimized }: { isMinimized: boolean, setIsMinimized: (v: boolean) => void }) {
  const points = [
    { x: 50, y: 50, icon: Layout, label: 'UI/UX', color: 'purple' },
    { x: 30, y: 35, icon: Cpu, label: 'Logic', color: 'orange' },
    { x: 70, y: 35, icon: Database, label: 'Data', color: 'teal' },
    { x: 25, y: 65, icon: Target, label: 'Goals', color: 'purple' },
    { x: 75, y: 65, icon: Database, label: 'Scalability', color: 'teal' },
    { x: 50, y: 20, icon: Layout, label: 'Design', color: 'orange' },
  ];

  return (
    <motion.div 
      layout
      animate={{ 
        height: isMinimized ? 150 : 450,
        opacity: 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] relative overflow-hidden group shadow-2xl"
    >
      {/* Background Grid/Stars */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-purple)_0%,_transparent_70%)] opacity-10" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500", isMinimized ? "opacity-20 blur-sm" : "opacity-100")}>
        {/* Connection Lines */}
        {points.map((p1, i) => 
          points.slice(i + 1).map((p2, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="white"
              strokeWidth="0.5"
              initial={{ opacity: 0.05 }}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, delay: (i + j) * 0.5 }}
            />
          ))
        )}
      </svg>

      <div className={cn("relative w-full h-full transition-all duration-500", isMinimized ? "scale-90 opacity-20" : "scale-100 opacity-100")}>
        {points.map((point, idx) => {
          const Icon = point.icon;
          const colors = {
            purple: 'text-accent-purple border-accent-purple/30 bg-accent-purple/10',
            teal: 'text-accent-teal border-accent-teal/30 bg-accent-teal/10',
            orange: 'text-accent-orange border-accent-orange/30 bg-accent-orange/10',
          };
          
          return (
            <motion.div
              key={idx}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: idx * 0.1 },
                scale: { duration: 0.5, delay: idx * 0.1 },
                y: { duration: 3 + idx, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            >
              <Tooltip content={point.label}>
                <div className={cn(
                  "p-4 rounded-2xl border backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all group-hover:scale-110",
                  colors[point.color as keyof typeof colors]
                )}>
                  <Icon size={24} />
                </div>
              </Tooltip>
              <span className="text-[10px] font-mono whitespace-nowrap text-gray-500 uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded border border-white/5">
                {point.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Map Controls */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute top-6 right-6 z-30 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-accent-purple/20 transition-all active:scale-90"
        title={isMinimized ? "Expandir Mapa" : "Minimizar Mapa"}
      >
        {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
      </button>

      {isMinimized && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-accent-purple uppercase tracking-[0.4em] opacity-50">Skill Universe Map</span>
        </div>
      )}

      {/* Center Label (When not minimized) */}
      {!isMinimized && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Tecnologias & Arquitetura</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function SkillsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMapMinimized, setIsMapMinimized] = useState(false);

  return (
    <section id="habilidades" className="py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[10px] font-mono uppercase tracking-[0.2em]">
          <Cpu size={14} />
          <span>Especialidades Técnicas</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Habilidades</h2>
        <p className="text-gray-400 max-w-2xl leading-relaxed text-lg">
          O arsenal tecnológico que utilizo para transformar ideias complexas em produtos digitais de alta performance.
        </p>
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="w-full flex justify-center">
          <ConstellationMap isMinimized={isMapMinimized} setIsMinimized={setIsMapMinimized} />
        </div>

        {/* Toggle Button - Same style as Experience */}
        <div className="flex justify-center mb-16 relative z-30">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative flex items-center gap-4 px-8 py-4 bg-black border-[3px] border-accent-purple rounded-full text-white font-bold text-lg hover:scale-105 transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] active:scale-95"
          >
            {isExpanded ? (
              <>Recolher Detalhes <ChevronUp size={22} className="group-hover:-translate-y-1 transition-transform" /></>
            ) : (
              <>Ver Habilidades Detalhadas <ChevronDown size={22} className="group-hover:translate-y-1 transition-transform" /></>
            )}
            <div className="absolute inset-0 rounded-full bg-accent-purple/10 animate-pulse pointer-events-none" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SKILLS_CATEGORIES.map((category, idx) => {
              const Icon = category.icon;
              const accentColors = {
                purple: 'text-accent-purple',
                teal: 'text-accent-teal',
                orange: 'text-accent-orange'
              };
              
              const accentClass = accentColors[category.color as keyof typeof accentColors];
              const bgClass = category.color === 'purple' ? 'bg-accent-purple' : category.color === 'teal' ? 'bg-accent-teal' : 'bg-accent-orange';

              return (
                <div 
                  key={category.title}
                  className={cn(
                    "bg-card-bg border border-card-border p-8 rounded-3xl relative overflow-hidden group transition-all duration-300",
                    category.color === 'purple' ? "hover:border-accent-purple/30" : 
                    category.color === 'teal' ? "hover:border-accent-teal/30" : "hover:border-accent-orange/30"
                  )}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Tooltip content={category.title}>
                      <div className={cn("p-3 rounded-xl bg-black/50 border border-white/5", accentClass)}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </Tooltip>
                    <h3 className="text-lg font-display text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {category.tags.map(tag => (
                      <SkillBadge key={tag} variant={category.color as any}>
                        {tag}
                      </SkillBadge>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-[10px] font-mono mb-2 uppercase tracking-tight">
                          <span className="text-gray-400">{skill.name}</span>
                          <span className={cn(accentClass, "font-bold")}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                            className={cn("h-full rounded-full relative", bgClass)}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
