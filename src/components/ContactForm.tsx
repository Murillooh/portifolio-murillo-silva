import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    // Construct WhatsApp message
    const whatsappMessage = `Olá, meu nome é ${formData.name}.
E-mail: ${formData.email}

Mensagem:
${formData.message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/5511951366825?text=${encodedMessage}`;

    // Simulate a brief delay for UX and to show the loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card-bg border border-card-border rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-accent-purple/10 transition-colors duration-700" />
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center py-12 relative z-10"
            >
              <div className="w-24 h-24 rounded-full bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center mb-8 relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                  className="absolute inset-0 bg-accent-teal/20 rounded-full blur-xl"
                />
                <CheckCircle2 size={48} className="text-accent-teal relative z-10" />
              </div>
              <h3 className="text-3xl font-display mb-4">Mensagem Enviada!</h3>
              <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                Obrigado pelo contato, {formData.name || 'amigo'}! Responderei no WhatsApp o mais breve possível.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-10 px-8 py-3 rounded-full border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10 transition-all font-mono text-[10px] uppercase tracking-widest"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-accent-purple transition-colors duration-300 pointer-events-none">
                      <User size={18} />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none transition-all duration-300",
                        errors.name 
                          ? "border-red-500/50 focus:border-red-500 ring-2 ring-red-500/10" 
                          : "border-white/10 focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 focus:bg-black/70"
                      )}
                    />
                    <label 
                      htmlFor="name" 
                      className={cn(
                        "absolute left-12 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest font-mono text-gray-500 transition-all duration-300 pointer-events-none px-1",
                        formData.name 
                          ? "-top-2 left-4 text-accent-purple bg-card-bg scale-90" 
                          : "group-focus-within/input:-top-2 group-focus-within/input:left-4 group-focus-within/input:text-accent-purple group-focus-within/input:bg-card-bg group-focus-within/input:scale-90"
                      )}
                    >
                      Nome Completo
                    </label>
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1 font-mono">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-accent-purple transition-colors duration-300 pointer-events-none">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none transition-all duration-300",
                        errors.email 
                          ? "border-red-500/50 focus:border-red-500 ring-2 ring-red-500/10" 
                          : "border-white/10 focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 focus:bg-black/70"
                      )}
                    />
                    <label 
                      htmlFor="email" 
                      className={cn(
                        "absolute left-12 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest font-mono text-gray-500 transition-all duration-300 pointer-events-none px-1",
                        formData.email 
                          ? "-top-2 left-4 text-accent-purple bg-card-bg scale-90" 
                          : "group-focus-within/input:-top-2 group-focus-within/input:left-4 group-focus-within/input:text-accent-purple group-focus-within/input:bg-card-bg group-focus-within/input:scale-90"
                      )}
                    >
                      E-mail
                    </label>
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <div className="relative group/input">
                  <div className="absolute left-4 top-4 text-gray-500 group-focus-within/input:text-accent-purple transition-colors duration-300 pointer-events-none">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={cn(
                      "w-full bg-black/40 border rounded-2xl pt-4 pb-4 pl-12 pr-4 text-sm focus:outline-none transition-all duration-300 resize-none",
                      errors.message 
                        ? "border-red-500/50 focus:border-red-500 ring-2 ring-red-500/10" 
                        : "border-white/10 focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 focus:bg-black/70"
                    )}
                  />
                  <label 
                    htmlFor="message" 
                    className={cn(
                      "absolute left-12 top-4 text-[10px] uppercase tracking-widest font-mono text-gray-500 transition-all duration-300 pointer-events-none px-1",
                      formData.message 
                        ? "-top-2 left-4 text-accent-purple bg-card-bg scale-90" 
                        : "group-focus-within/input:-top-2 group-focus-within/input:left-4 group-focus-within/input:text-accent-purple group-focus-within/input:bg-card-bg group-focus-within/input:scale-90"
                    )}
                  >
                    Mensagem
                  </label>
                </div>
                {errors.message && <p className="text-[10px] text-red-500 mt-1 ml-1 font-mono">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  "w-full py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 font-bold text-[13px] uppercase tracking-wider overflow-hidden relative group shadow-xl",
                  status === 'submitting' 
                    ? "bg-gray-800 text-gray-400 cursor-not-allowed" 
                    : "bg-white text-black hover:bg-accent-purple hover:text-white"
                )}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {status === 'submitting' ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-accent-purple border-t-transparent rounded-full"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar via WhatsApp
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Send size={18} />
                      </motion.div>
                    </>
                  )}
                </span>
                
                {/* Button shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  initial={{ left: '-100%' }}
                  whileHover={{ left: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
