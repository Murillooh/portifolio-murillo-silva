import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Code2, Cpu, Sparkles } from 'lucide-react';

interface LogMessage {
  threshold: number;
  text: string;
}

const ALL_LOGS: LogMessage[] = [
  { threshold: 0, text: "[SISTEMA] Inicializando núcleo do portfólio V2026..." },
  { threshold: 8, text: "[OK] Módulos de interface gráfica carregados." },
  { threshold: 15, text: "[LINK] Detectando repositórios remotos e sistemas..." },
  { threshold: 22, text: "[COMPILAR] WISE INSTALAÇÕES (React, Tailwind) ... Concluído" },
  { threshold: 30, text: "[COMPILAR] CHAMADOS LOC (Firebase, Gemini AI, Node) ... Concluído" },
  { threshold: 38, text: "[COMPILAR] 15-EJC ESTOQUE (React, Local DB) ... Concluído" },
  { threshold: 46, text: "[COMPILAR] TAREFASIA (Gemini AI, Firebase) ... Concluído" },
  { threshold: 55, text: "[COMPILAR] SISTEMA TELA E TV (React, Realtime) ... Concluído" },
  { threshold: 64, text: "[COMPILAR] FORMS PORTAL MASTER (GAS, Capacitor Android) ... Concluído" },
  { threshold: 72, text: "[LINK] Verificando conexões do banco de dados PostgreSQL/Supabase..." },
  { threshold: 80, text: "[OK] Conexão com banco de dados estabelecida." },
  { threshold: 88, text: "[VISTAS] Sincronizando integridade dos logs de visitas..." },
  { threshold: 94, text: "[OK] Sistema de visitas ativo e monitorado localmente." },
  { threshold: 98, text: "[PRONTO] Executando interface principal de Murillo Silva..." }
];

interface TechBadge {
  name: string;
  threshold: number;
  colorClass: string;
}

const TECH_BADGES: TechBadge[] = [
  { name: "TypeScript", threshold: 10, colorClass: "border-blue-500/30 bg-blue-500/5 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]" },
  { name: "React 19", threshold: 22, colorClass: "border-cyan-500/30 bg-cyan-500/5 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]" },
  { name: "Firebase", threshold: 30, colorClass: "border-yellow-500/30 bg-yellow-500/5 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)]" },
  { name: "Node.js", threshold: 42, colorClass: "border-green-500/30 bg-green-500/5 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)]" },
  { name: "PostgreSQL", threshold: 55, colorClass: "border-indigo-500/30 bg-indigo-500/5 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]" },
  { name: "Tailwind CSS", threshold: 68, colorClass: "border-teal-500/30 bg-teal-500/5 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)]" },
  { name: "Apps Script", threshold: 80, colorClass: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]" },
  { name: "Capacitor", threshold: 90, colorClass: "border-purple-500/30 bg-purple-500/5 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]" }
];

export function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2100; // 2.1s loader duration
    const intervalTime = 21; // ~100 steps
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const visibleLogs = ALL_LOGS.filter((log) => progress >= log.threshold).slice(-5);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] bg-[#030303] flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      {/* Dynamic Cyber Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 blur-[150px] rounded-full z-0 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-teal/10 blur-[150px] rounded-full z-0 animate-pulse" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg text-center">
        
        {/* Core Reactor Icon */}
        <div className="relative mb-6 p-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          >
            <Cpu className="text-accent-teal w-6 h-6 animate-pulse" />
          </motion.div>

          {/* Rotating Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 border-t-2 border-r-2 border-accent-purple/35 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2.5 border-b-2 border-l-2 border-accent-teal/35 rounded-full"
          />
        </div>

        {/* Title Name & Subtitle */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-white text-3xl md:text-4xl font-display font-medium tracking-tight mb-2 selection:bg-transparent"
          >
            ꪑꪊ𝘳𝓲ꪶꪶꪮ 𝘴𝓲ꪶꪜꪖ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-accent-teal" />
            Compilando Sistemas Operacionais
          </motion.p>
        </div>

        {/* Terminal Glassmorphism Log Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full bg-[#080808]/75 backdrop-blur-md border border-white/10 rounded-xl p-4 font-mono text-left shadow-[0_15px_35px_rgba(0,0,0,0.7)] relative overflow-hidden mb-6 h-48 flex flex-col justify-end"
        >
          {/* Terminal Title Bar */}
          <div className="absolute top-0 inset-x-0 bg-white/5 border-b border-white/10 px-4 py-2 flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-accent-purple" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">PORTFOLIO_CONSOLES.log</span>
            <div className="ml-auto flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/40" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <span className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
          </div>

          {/* Logs Output */}
          <div className="space-y-1.5 pr-2 overflow-hidden select-none">
            {visibleLogs.map((log, index) => {
              const isLast = index === visibleLogs.length - 1;
              return (
                <div key={index} className="text-gray-300 flex items-start gap-1 font-mono text-[10px] sm:text-xs">
                  <span className="text-accent-teal font-bold shrink-0">&gt;_</span>
                  <span className={isLast ? "text-white font-medium" : "text-gray-500"}>
                    {log.text}
                    {isLast && progress < 100 && (
                      <span className="inline-block w-1.5 h-3.5 bg-accent-purple ml-1 animate-ping" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="w-full flex items-center justify-between mb-2 px-1 select-none">
          <span className="text-accent-teal font-mono text-[10px] tracking-wider font-bold">
            STATUS: {progress === 100 ? 'COMPILADO' : 'CARREGANDO'}
          </span>
          <span className="text-accent-purple font-mono text-xs font-bold">
            {progress}%
          </span>
        </div>

        {/* Gradient Progress Bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative mb-6 shadow-sm border border-white/5">
          <motion.div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-accent-purple via-violet-500 to-accent-teal shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          />
        </div>

        {/* Technologies Badges Container */}
        <div className="w-full">
          <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mb-3 select-none">
            Arquitetura & Linguagens do Ecossistema
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {TECH_BADGES.map((tech) => {
              const isActive = progress >= tech.threshold;
              return (
                <span
                  key={tech.name}
                  className={`px-2.5 py-1 text-[10px] font-mono border rounded-md transition-all duration-300 ${
                    isActive
                      ? tech.colorClass
                      : "border-white/5 bg-transparent text-gray-600 opacity-25"
                  }`}
                >
                  {tech.name}
                </span>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
