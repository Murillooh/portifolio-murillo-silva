import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Layout, 
  Cpu, 
  ChevronDown, 
  ChevronUp,
  Target,
  Maximize2,
  Minimize2,
  Brain,
  Sparkles
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

interface Node {
  id: number;
  x: number;
  y: number;
  icon: any;
  label: string;
  color: 'purple' | 'teal' | 'orange';
  isCenter?: boolean;
}

const INITIAL_NODES: Node[] = [
  { id: 0, x: 50, y: 50, icon: Brain, label: 'CÉREBRO COGNITIVO', color: 'purple', isCenter: true },
  { id: 1, x: 30, y: 32, icon: Layout, label: 'React 19', color: 'purple' },
  { id: 2, x: 70, y: 32, icon: Database, label: 'Node.js / Express', color: 'teal' },
  { id: 3, x: 18, y: 50, icon: Cpu, label: 'TypeScript', color: 'orange' },
  { id: 4, x: 82, y: 50, icon: Database, label: 'PostgreSQL / SQL', color: 'teal' },
  { id: 5, x: 25, y: 68, icon: Target, label: 'Firebase / NoSQL', color: 'purple' },
  { id: 6, x: 75, y: 68, icon: Cpu, label: 'Linux & DevOps', color: 'orange' },
  { id: 7, x: 38, y: 18, icon: Layout, label: 'UI/UX Design', color: 'purple' },
  { id: 8, x: 38, y: 82, icon: Target, label: 'Automação (GAS)', color: 'orange' },
  { id: 9, x: 62, y: 82, icon: Cpu, label: 'Capacitor Mobile', color: 'teal' },
  { id: 10, x: 62, y: 18, icon: Sparkles, label: 'Inteligência Artificial', color: 'purple' }
];

const EXTRA_NODES: Node[] = [
  { id: 11, x: 24, y: 16, icon: Layout, label: 'Tailwind CSS', color: 'purple' },
  { id: 12, x: 14, y: 34, icon: Layout, label: 'Next.js Framework', color: 'purple' },
  { id: 13, x: 10, y: 60, icon: Sparkles, label: 'Framer Motion', color: 'purple' },
  { id: 14, x: 44, y: 92, icon: Target, label: 'Recharts API', color: 'purple' },
  { id: 15, x: 74, y: 92, icon: Cpu, label: 'Git & GitHub', color: 'orange' },
  { id: 16, x: 88, y: 34, icon: Cpu, label: 'Vite Bundler', color: 'orange' },
  { id: 17, x: 82, y: 16, icon: Cpu, label: 'Vercel Cloud', color: 'orange' },
  { id: 18, x: 90, y: 60, icon: Database, label: 'Docker Containers', color: 'teal' }
];

const PRIMARY_LINKS = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 0, target: 4 },
  { source: 0, target: 5 },
  { source: 0, target: 6 },
  { source: 0, target: 7 },
  { source: 0, target: 8 },
  { source: 0, target: 9 },
  { source: 0, target: 10 },
  { source: 1, target: 7 },
  { source: 1, target: 3 },
  { source: 1, target: 2 },
  { source: 2, target: 10 },
  { source: 2, target: 4 },
  { source: 3, target: 5 },
  { source: 4, target: 6 },
  { source: 5, target: 8 },
  { source: 6, target: 9 },
  { source: 8, target: 9 }
];

const EXTRA_LINKS = [
  { source: 0, target: 11 },
  { source: 0, target: 12 },
  { source: 0, target: 13 },
  { source: 0, target: 14 },
  { source: 0, target: 15 },
  { source: 0, target: 16 },
  { source: 0, target: 17 },
  { source: 0, target: 18 },
  { source: 1, target: 11 },
  { source: 11, target: 12 },
  { source: 12, target: 13 },
  { source: 3, target: 13 },
  { source: 5, target: 14 },
  { source: 8, target: 15 },
  { source: 6, target: 18 },
  { source: 4, target: 18 },
  { source: 2, target: 16 },
  { source: 16, target: 17 }
];

function ConstellationMap({ isMinimized, setIsMinimized }: { isMinimized: boolean, setIsMinimized: (v: boolean) => void }) {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [isBrainExpanded, setIsBrainExpanded] = useState(false);
  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [ripples, setRipples] = useState<{ id: number }[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);

  const toggleExpandBrain = () => {
    setIsBrainExpanded(prev => {
      const nextState = !prev;
      if (nextState) {
        setNodes(current => {
          const existingIds = new Set(current.map(n => n.id));
          const toAdd = EXTRA_NODES.filter(n => !existingIds.has(n.id));
          return [...current, ...toAdd];
        });
      } else {
        setNodes(current => {
          return current.filter(n => n.id <= 10);
        });
      }
      return nextState;
    });
  };

  const triggerRipple = () => {
    const newRipple = { id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1200);
  };

  const handlePointerDown = (id: number, e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveDragId(id);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (id: number, e: React.PointerEvent) => {
    if (activeDragId !== id) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    // Convert current client coordinate to container relative percentage
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;

    setNodes(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, x: Math.max(4, Math.min(96, newX)), y: Math.max(5, Math.min(95, newY)) }
          : n
      )
    );
  };

  const handlePointerUp = (id: number, e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setActiveDragId(null);

    if (dragStartRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Tiny move counts as a click
      if (distance < 5) {
        if (id === 0) {
          triggerRipple();
        }
      }
    }
    dragStartRef.current = null;
  };

  const centerNode = nodes.find(n => n.id === 0);
  const cx = centerNode ? centerNode.x : 50;
  const cy = centerNode ? centerNode.y : 50;

  return (
    <motion.div 
      layout
      animate={{ 
        height: isMinimized ? 150 : 480,
        opacity: 1
      }}
      ref={containerRef}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-w-4xl bg-black/50 backdrop-blur-xl border border-white/10 rounded-[40px] relative overflow-hidden group shadow-2xl select-none touch-none"
    >
      {/* Styles for dashed stroke-dashoffset animation */}
      <style>{`
        @keyframes synapse-glow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .synapse-pulse {
          stroke-dasharray: 6, 12;
          animation: synapse-glow 1.2s linear infinite;
        }
        .synapse-pulse-fast {
          stroke-dasharray: 4, 8;
          animation: synapse-glow 0.8s linear infinite;
        }
        @keyframes float-even {
          0% { translate: 0px 0px; }
          50% { translate: 2px -4px; }
          100% { translate: 0px 0px; }
        }
        @keyframes float-odd {
          0% { translate: 0px 0px; }
          50% { translate: -3px 3px; }
          100% { translate: 0px 0px; }
        }
        .animate-float-even {
          animation: float-even 6s ease-in-out infinite;
        }
        .animate-float-odd {
          animation: float-odd 5s ease-in-out infinite;
        }
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-clockwise 25s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-counter 35s linear infinite;
        }
      `}</style>

      {/* Background Grid/Stars */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-purple)_0%,_transparent_70%)] opacity-10" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Ripple Expand Waves Behind Nodes */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            style={{ left: `${cx}%`, top: `${cy}%` }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-accent-purple bg-accent-purple/5 shadow-[0_0_40px_rgba(139,92,246,0.35)] pointer-events-none z-0"
          />
        ))}
      </AnimatePresence>

      {/* SVG Neural Connections */}
      <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500", isMinimized ? "opacity-20 blur-sm" : "opacity-100")}>
        {/* Concentric rotating SVG cognitive brainwave rings */}
        {!isMinimized && (
          <>
            <circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="52"
              className="stroke-accent-purple/30 stroke-[1.2] fill-none animate-spin-slow pointer-events-none"
              strokeDasharray="6 12"
              style={{ transformOrigin: `${cx}% ${cy}%` }}
            />
            <circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="68"
              className="stroke-accent-teal/20 stroke-[0.8] fill-none animate-spin-reverse-slow pointer-events-none"
              strokeDasharray="4 14"
              style={{ transformOrigin: `${cx}% ${cy}%` }}
            />
          </>
        )}

        {(isBrainExpanded ? [...PRIMARY_LINKS, ...EXTRA_LINKS] : PRIMARY_LINKS).map((link, idx) => {
          const sNode = nodes.find(n => n.id === link.source);
          const tNode = nodes.find(n => n.id === link.target);
          if (!sNode || !tNode) return null;
          
          const isCore = link.source === 0 || link.target === 0;
          const isHovered = hoveredNodeId !== null;
          const isConnectedToHovered = link.source === hoveredNodeId || link.target === hoveredNodeId;
          
          let lineOpacity = "opacity-100";
          if (isHovered) {
            lineOpacity = isConnectedToHovered ? "opacity-100" : "opacity-20 transition-opacity duration-300";
          }
          
          return (
            <g key={idx} className={lineOpacity}>
              {/* Static background lines */}
              <line
                x1={`${sNode.x}%`}
                y1={`${sNode.y}%`}
                x2={`${tNode.x}%`}
                y2={`${tNode.y}%`}
                className={cn(
                  isCore ? "stroke-accent-purple/20 stroke-[1]" : "stroke-white/5 stroke-[0.5]",
                  isConnectedToHovered && "stroke-accent-purple/40 stroke-[1.2]"
                )}
              />
              {/* Active pulsing dash lines */}
              <line
                x1={`${sNode.x}%`}
                y1={`${sNode.y}%`}
                x2={`${tNode.x}%`}
                y2={`${tNode.y}%`}
                className={cn(
                  isCore 
                    ? "stroke-accent-teal/40 stroke-[1.5] synapse-pulse-fast" 
                    : "stroke-accent-purple/15 stroke-[0.8] synapse-pulse",
                  isConnectedToHovered && (
                    isCore 
                      ? "stroke-accent-teal/80 stroke-[2] synapse-pulse-fast" 
                      : "stroke-accent-purple/60 stroke-[1.2] synapse-pulse"
                  )
                )}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes Render Container */}
      <div className={cn("relative w-full h-full transition-all duration-500", isMinimized ? "scale-90 opacity-20" : "scale-100 opacity-100")}>
        {!isMinimized && nodes.map((point) => {
          const Icon = point.icon;
          const colors = {
            purple: 'text-accent-purple border-accent-purple/30 bg-accent-purple/10 hover:border-accent-purple/70 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] shadow-[0_0_15px_rgba(139,92,246,0.15)]',
            teal: 'text-accent-teal border-accent-teal/30 bg-accent-teal/10 hover:border-accent-teal/70 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] shadow-[0_0_15px_rgba(20,184,166,0.15)]',
            orange: 'text-accent-orange border-accent-orange/30 bg-accent-orange/10 hover:border-accent-orange/70 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] shadow-[0_0_15px_rgba(249,115,22,0.15)]',
          };
          
          const isCore = point.isCenter;
          const isHovered = hoveredNodeId === point.id;
          
          return (
            <motion.div
              key={point.id}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onMouseEnter={() => setHoveredNodeId(point.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-20 transition-transform duration-300",
                activeDragId !== point.id && (point.id % 2 === 0 ? "animate-float-even" : "animate-float-odd")
              )}
              initial={isCore ? { opacity: 0 } : { opacity: 0, scale: 0 }}
              animate={isCore ? {
                opacity: 1,
                scale: [1, 1.04, 1],
              } : {
                opacity: 1,
                scale: 1,
              }}
              transition={isCore ? {
                opacity: { duration: 0.5 },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {
                opacity: { duration: 0.4 },
                scale: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }
              }}
            >
              <Tooltip content={point.label}>
                <div
                  onPointerDown={(e) => handlePointerDown(point.id, e)}
                  onPointerMove={(e) => handlePointerMove(point.id, e)}
                  onPointerUp={(e) => handlePointerUp(point.id, e)}
                  className={cn(
                    "rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center justify-center select-none",
                    isCore 
                      ? "p-5 rounded-full border-accent-purple bg-black/60 shadow-[0_0_30px_rgba(139,92,246,0.45)] cursor-pointer text-accent-purple hover:scale-105 active:scale-95" 
                      : "p-4 cursor-grab active:cursor-grabbing hover:scale-110",
                    colors[point.color],
                    isHovered && "scale-105"
                  )}
                >
                  <Icon size={isCore ? 28 : 20} className={isCore ? "animate-pulse" : ""} />
                </div>
              </Tooltip>
              <span className={cn(
                "text-[9px] font-mono whitespace-nowrap uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/5 shadow-md transition-all duration-300",
                isCore ? "text-accent-purple border-accent-purple/20 font-bold" : "text-gray-400",
                isHovered && "text-white border-white/10 scale-105"
              )}>
                {point.label}
              </span>
              {isCore && (
                <button
                  onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when interacting with button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpandBrain();
                  }}
                  className="mt-1 px-3 py-1 bg-accent-purple/20 hover:bg-accent-purple/40 border border-accent-purple/40 hover:border-accent-purple rounded-full text-[8px] font-bold font-mono text-white tracking-widest uppercase transition-all shadow-[0_0_10px_rgba(139,92,246,0.15)] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] active:scale-95 cursor-pointer z-30"
                >
                  {isBrainExpanded ? "Reduzir Cérebro" : "Expandir Cérebro (+8)"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Map Controls */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute top-6 right-6 z-30 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-accent-purple/20 transition-all active:scale-90 cursor-pointer"
        title={isMinimized ? "Expandir Mapa" : "Minimizar Mapa"}
      >
        {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
      </button>

      {isMinimized && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-accent-purple uppercase tracking-[0.4em] opacity-50">Skill Brain Network</span>
        </div>
      )}

      {/* Center Label (When not minimized) */}
      {!isMinimized && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="flex items-center gap-2 bg-black/70 border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
              Arraste os nós para moldar o cérebro
            </p>
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
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 rounded-full bg-accent-purple/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-accent-teal/10 blur-[130px] pointer-events-none -z-10" />

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
            className="group relative flex items-center gap-4 px-8 py-4 bg-black border-[3px] border-accent-purple rounded-full text-white font-bold text-lg hover:scale-105 transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] active:scale-95 cursor-pointer"
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
