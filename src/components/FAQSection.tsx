import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  key?: React.Key;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isTeal = index % 2 !== 0;

  return (
    <div className="border-b border-white/5 last:border-0 relative group/faq">
      {/* Glow Effect */}
      <div 
        className={cn(
          "absolute -inset-x-6 -inset-y-2 opacity-0 group-hover/faq:opacity-100 transition-all duration-700 blur-3xl rounded-[3rem] pointer-events-none",
          isTeal 
            ? "bg-gradient-to-r from-accent-teal/10 via-accent-teal/5 to-transparent"
            : "bg-gradient-to-r from-accent-purple/10 via-accent-purple/5 to-transparent"
        )}
      />
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all relative z-10"
      >
        <span className={cn(
          "text-lg font-medium transition-colors duration-300",
          isOpen 
            ? (isTeal ? "text-accent-teal" : "text-accent-purple")
            : "text-gray-300 group-hover:text-white"
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "p-2 rounded-full bg-white/5 border border-white/10 transition-colors",
            isOpen 
              ? (isTeal ? "bg-accent-teal/10 border-accent-teal/30 text-accent-teal" : "bg-accent-purple/10 border-accent-purple/30 text-accent-purple")
              : "text-gray-500 group-hover:text-white"
          )}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqs = [
  {
    question: "Quais são as stacks principais que você utiliza?",
    answer: "Trabalho principalmente com o ecossistema JavaScript/TypeScript, utilizando React 19 e Next.js no front-end, e Node.js com Express no back-end. Para estilização, sou especialista em Tailwind CSS e Framer Motion para animações fluidas."
  },
  {
    question: "Você desenvolve soluções full-stack integras?",
    answer: "Sim! Desenvolvo aplicações ponta a ponta, desde a interface do usuário até a infraestrutura de banco de dados e APIs robustas, garantindo que o sistema seja performático e escalável."
  },
  {
    question: "Como funciona o seu processo de desenvolvimento?",
    answer: "Meu processo é dividido em etapas: planejamento, arquitetura, design da UI, codificação e testes. Mantenho o cliente atualizado em cada sprint para garantir que o produto final supere as expectativas."
  },
  {
    question: "Você está disponível para trabalhos freelance ou projetos sob demanda?",
    answer: "Sim, estou aberto a discussões para projetos freelance, consultorias técnicas e novos desafios. Você pode entrar em contato através do formulário abaixo ou diretamente via WhatsApp."
  },
  {
    question: "Você tem experiência com Inteligência Artificial?",
    answer: "Tenho experiência integrando APIs de IA, como Gemini e OpenAI, em aplicações web para criar funcionalidades inteligentes, chatbots personalizados e processamento de dados automatizado."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="container mx-auto px-4 py-32 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[10px] font-mono uppercase tracking-[0.2em]">
            <HelpCircle size={14} />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">FAQ</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-lg">
            Respostas para as perguntas mais comuns sobre meu trabalho e serviços. Se a sua dúvida não estiver aqui, sinta-se à vontade para me enviar uma mensagem.
          </p>
        </div>

        <div className="bg-card-bg border border-card-border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden group">
          {/* Spotlight Effect (Inner) */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-accent-purple/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            {faqs.map((faq, index) => (
              <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
