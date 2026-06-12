import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageSquare, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

const TIPS = [
  "Use 'useMemo' para evitar cálculos caros em cada renderização.",
  "O Tailwind CSS v4 é incrível para produtividade!",
  "Sempre teste a acessibilidade do seu site.",
  "Firebase resolve 90% do seu backend em minutos.",
  "Estou monitorando sua navegação em tempo real!",
  "Sabia que este site carrega em menos de 1 segundo?",
  "O modo escuro protege seus olhos e economiza energia.",
  "Dê um clique em mim para mais dicas de dev!"
];

export function Robot() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  const [isSleeping, setIsSleeping] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);
  const sleepTimeoutRef = useRef<number | null>(null);

  const wakeUp = () => {
    if (isSleeping) setIsSleeping(false);
    if (sleepTimeoutRef.current) window.clearTimeout(sleepTimeoutRef.current);
    sleepTimeoutRef.current = window.setTimeout(() => setIsSleeping(true), 30000); // 30 seconds of inactivity
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      wakeUp();
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxMove = 5;
        const moveX = (dx / (distance || 1)) * Math.min(distance / 20, maxMove);
        const moveY = (dy / (distance || 1)) * Math.min(distance / 20, maxMove);
        
        setMousePos({ x: moveX, y: moveY });
      }
    };

    const handleActivity = () => wakeUp();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Initial sleep timer
    sleepTimeoutRef.current = window.setTimeout(() => setIsSleeping(true), 30000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (sleepTimeoutRef.current) window.clearTimeout(sleepTimeoutRef.current);
    };
  }, [isSleeping]);

  const handleClick = () => {
    wakeUp();
    const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
    triggerMessage(randomTip);
  };

  // Blinking logic
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    if (isSleeping) return;
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(blink, Math.random() * 4000 + 2000);
    };
    const timer = setTimeout(blink, 2000);
    return () => clearTimeout(timer);
  }, [isSleeping]);

  const timeoutRef = useRef<number | null>(null);

  const triggerMessage = (text: string) => {
    setCurrentTip(text);
    setShowTip(true);
    
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setShowTip(false);
      timeoutRef.current = null;
    }, 4000);
  };

  useEffect(() => {
    const handleExternalMessage = (e: any) => {
      if (e.detail && typeof e.detail.text === 'string') {
        wakeUp();
        triggerMessage(e.detail.text);
      }
    };

    window.addEventListener('robot-message', handleExternalMessage);
    return () => {
      window.removeEventListener('robot-message', handleExternalMessage);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [isSleeping]);

  return (
    <div 
      className="relative group cursor-pointer" 
      ref={robotRef} 
      onClick={handleClick}
      role="button"
      aria-label="Assistente robô. Clique para receber dicas de desenvolvimento."
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full right-0 mb-4 p-4 bg-white text-black rounded-2xl shadow-2xl z-50 pointer-events-none w-56 sm:w-64 md:w-72"
            role="status"
            aria-live="polite"
          >
            <div className="flex gap-2 items-start">
              <Terminal size={14} className="mt-1 flex-shrink-0 text-accent-purple" />
              <p className="text-[11px] font-mono leading-tight">{currentTip}</p>
            </div>
            <div className="absolute top-full right-6 border-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ 
          y: isSleeping ? [0, -5, 0] : [0, -10, 0],
          rotate: isSleeping ? 0 : [0, 1, -1, 0]
        }}
        transition={{ 
          duration: isSleeping ? 6 : 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        {/* Head */}
        <motion.div 
          animate={isSleeping ? { rotate: 0 } : { rotate: mousePos.x * 2 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className={cn(
            "w-16 h-14 bg-gradient-to-b from-card-bg to-[#0a0a0a] border-2 rounded-2xl flex flex-col items-center justify-center shadow-xl relative z-10 transition-colors duration-500", 
            isSleeping ? "border-accent-purple/40 shadow-accent-purple/5" : "border-accent-purple shadow-accent-purple/20 group-hover:border-accent-teal shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]"
          )}
        >
          {/* Glass Reflection */}
          <div className="absolute top-1 left-2 right-2 h-1/2 bg-white/5 rounded-t-xl pointer-events-none skew-x-[-10deg]" />
          
          {/* Antenna */}
          <div className="absolute -top-4 w-0.5 h-4 bg-accent-purple/60">
            <motion.div 
              animate={{ 
                scale: isSleeping ? 1 : [1, 1.5, 1],
                opacity: isSleeping ? 0.2 : [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1.5 -left-[3px] w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(168,85,247,0.8)]"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent pointer-events-none" />
          
          <div className={cn("absolute -top-1 w-1 h-2 rounded-full transition-colors duration-500", isSleeping ? "bg-accent-purple/20" : "bg-accent-purple")} />

          <div className="flex gap-3 mt-1">
            {[0, 1].map((i) => (
              <div key={i} className="w-3 h-4 bg-black/60 rounded-full flex items-center justify-center p-0.5 overflow-hidden">
                <motion.div 
                  animate={isSleeping || isBlinking ? { x: 0, y: isBlinking ? 2 : 1, scaleY: isBlinking ? 0.1 : 1 } : { x: mousePos.x, y: mousePos.y, scaleY: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: isBlinking ? 500 : 350, 
                    damping: isBlinking ? 30 : 18,
                    mass: 0.5
                  }}
                  className={cn(
                    "bg-accent-teal rounded-full shadow-[0_0_8px_rgba(45,212,191,0.9)] transition-all duration-300", 
                    isSleeping ? "w-2 h-0.5 bg-accent-purple/50 shadow-none -mb-1" : "w-1.5 h-1.5"
                  )}
                />
              </div>
            ))}
          </div>
          
          {isSleeping && (
            <motion.div
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20, x: 10 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              className="absolute -top-4 -right-2 text-xs font-mono text-accent-purple/50 pointer-events-none font-bold"
            >
              Z
            </motion.div>
          )}
        </motion.div>

        {/* Neck */}
        <div className="w-4 h-2 bg-accent-purple/40 -mt-1 z-0" />

        {/* Torso/Body */}
        <motion.div 
          animate={{ 
            scale: isSleeping ? 1 : [1, 1.03, 1],
            y: isSleeping ? 0 : [0, 1, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={cn(
            "w-12 h-16 bg-gradient-to-b from-card-bg to-[#080808] border-2 rounded-xl relative shadow-lg flex flex-col items-center pt-2 transition-colors duration-500", 
            isSleeping ? "border-accent-purple/30 shadow-accent-purple/5" : "border-accent-purple/60 shadow-accent-purple/10 group-hover:border-accent-teal/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.03)]"
          )}
        >
          {/* Panel Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 pointer-events-none" />
          
          <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] relative">
            {!isSleeping && (
              <motion.div 
                 animate={{ 
                   opacity: [0.2, 0.4, 0.2],
                   scale: [1, 1.2, 1]
                 }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="w-full h-full bg-accent-purple/30 blur-md"
              />
            )}
            <Bot size={15} className={cn("absolute transition-colors duration-500", isSleeping ? "text-accent-purple/40" : "text-accent-purple drop-shadow-[0_0_2px_rgba(168,85,247,0.5)]")} />
          </div>
          
          {/* Decorative screws/dots */}
          <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-white/10" />
          <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-white/10" />
          
          {/* Arms */}
          <motion.div 
            animate={isSleeping ? { rotate: 5, backgroundColor: "rgba(168,85,247,0.1)" } : { rotate: 12 + mousePos.x, backgroundColor: "rgba(168,85,247,0.3)" }}
            className="absolute -left-2 top-2 w-2 h-8 rounded-full origin-top border border-white/5 transition-colors duration-500" 
          />
          <motion.div 
            animate={isSleeping ? { rotate: -5, backgroundColor: "rgba(168,85,247,0.1)" } : { rotate: -12 + mousePos.x, backgroundColor: "rgba(168,85,247,0.3)" }}
            className="absolute -right-2 top-2 w-2 h-8 rounded-full origin-top border border-white/5 transition-colors duration-500" 
          />
          
          {/* Floating Base */}
          <motion.div 
            animate={{ 
              scale: isSleeping ? 0.8 : [1, 1.3, 1], 
              opacity: isSleeping ? 0.1 : [0.3, 0.7, 0.3],
              boxShadow: isSleeping ? "none" : ["0 0 10px rgba(168,85,247,0.4)", "0 0 20px rgba(168,85,247,0.6)", "0 0 10px rgba(168,85,247,0.4)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-4 w-8 h-1 bg-accent-purple/50 blur-[2px] rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
