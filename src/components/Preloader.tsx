import React from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

export function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center p-6"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 p-4 rounded-full bg-accent-purple/10 border border-accent-purple/20 relative"
        >
          <Code2 className="text-accent-purple w-12 h-12" />
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -inset-2 border-t-2 border-accent-purple/40 rounded-full"
          />
        </motion.div>

        {/* Text Content */}
        <div className="text-center overflow-hidden">
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "circOut" }}
            className="text-white text-2xl md:text-3xl font-display font-medium tracking-tight mb-2"
          >
            ꪑꪊ𝘳𝓲ꪶꪶꪮ 𝘴𝓲ꪶꪜꪖ
          </motion.h1>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent my-3"
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "circOut" }}
            className="text-accent-purple font-mono text-[10px] uppercase tracking-[0.4em]"
          >
            Portifolio 2026
          </motion.p>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-[-100px] w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-accent-purple shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent-purple/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent-teal/5 blur-[100px] rounded-full" />
    </motion.div>
  );
}
