import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, HTMLMotionProps, useMotionTemplate } from 'motion/react';
import {
  Code2,
  Database,
  Terminal,
  ExternalLink,
  MapPin,
  CheckCircle2,
  History,
  Layout,
  Cpu,
  Layers,
  Github,
  Linkedin,
  X,
  Eye
} from 'lucide-react';
import { cn } from './lib/utils';
import { Robot } from './components/Robot';
import { LazyImage } from './components/LazyImage';
import { Preloader } from './components/Preloader';
import { BackToTop } from './components/BackToTop';
import { ContactForm } from './components/ContactForm';
import { FAQSection } from './components/FAQSection';
import { SkillsSection } from './components/SkillsSection';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markup';

// --- Types ---
interface Skill {
  name: string;
  level: number; // 0 to 100
}

interface Project {
  id: string;
  name: string;
  url: string;
  githubUrl?: string; // Add this line
  tags: string[];
  description: string;
  previewUrl?: string;
}

// --- Data ---
const INITIAL_PROJECTS: Project[] = [
  {
    id: 'wise-instalacoes',
    name: 'WISE INSTALAÇÕES',
    url: 'wiseinstalacoes.com',
    githubUrl: 'https://github.com/Murillooh/wise-engenharia',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Engineering'],
    description: 'Plataforma digital moderna para a WISE, com foco em inteligência em instalações e construções. Apresenta design responsivo e alta performance.',
    previewUrl: 'https://wiseinstalacoes.com/img1/logo.png'
  },
  {
    id: 'chamados-loc',
    name: 'CHAMADOS LOC',
    url: 'chamados-loc.onrender.com',
    githubUrl: 'https://github.com/Murillooh/chamados-loc',
    tags: ['React 19', 'Firebase', 'Gemini AI', 'Node.js'],
    description: 'Sistema operacional de chamados (Operational OS V4.2) com automação inteligente, interface moderna e integração total com ecossistema Firebase.',
    previewUrl: '/chamados_loc_preview.png'
  },
  {
    id: 'ejc-estoque',
    name: '15-EJC Estoque',
    url: '15-ejc.netlify.app',
    githubUrl: 'https://github.com/Murillooh/15-EJC',
    tags: ['React', 'Tailwind CSS', 'PWA', 'Local Database'],
    description: 'Sistema de controle de estoque e caixa para a bomboniere do 15° EJC. Conta com interface minimalista preta e dourada, suporte a modo offline/local e relatórios de fluxo de caixa em tempo real.',
    previewUrl: '/ejc_estoque_preview.png'
  },
  {
    id: 'tarefasia',
    name: 'Tarefasia',
    url: 'tarefasia.vercel.app',
    githubUrl: 'https://github.com/Murillooh/Tarefas-IA',
    tags: ['React', 'Gemini AI', 'Tailwind CSS', 'Firebase'],
    description: 'Gerenciador de tarefas inteligente com inteligência artificial integrada (Gemini AI). Conta com produtividade semanal ágil, assistente para detalhamento de tarefas em tempo real, relatórios executivos em PDF e autenticação segura com Google.',
    previewUrl: '/tarefasia_preview.png'
  },
  {
    id: 'sistema-tela-tv',
    name: 'Sistema Tela e TV',
    url: 'sistema-tela-tv.com',
    githubUrl: 'https://github.com/Murillooh/sitema-tela-tv',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'Realtime'],
    description: 'Sistema de monitoramento e controle em tempo real para frotas de motocicletas e painéis operacionais de TV integrados. Gerencie locatários, acompanhe veículos em trânsito e visualize chamados instantaneamente.',
    previewUrl: '/sistema_tela_tv.png'
  },
  {
    id: 'pedidos-master',
    name: 'Forms Portal Master',
    url: 'pedidos-master.com',
    githubUrl: 'https://github.com/Murillooh/pedidos-master',
    tags: ['JavaScript', 'Google Apps Script', 'Capacitor', 'HTML5'],
    description: 'Sistema automatizado de solicitação de pedidos de dispositivos. Apresenta formulário inteligente passo a passo, busca de endereço por CEP, integração em nuvem com Google Sheets/Drive para gerar relatórios em PDF e empacotamento nativo Android.',
    previewUrl: '/pedidos_master_preview.png'
  }
];

// --- Constants ---
const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

// --- Components ---

function Badge({ children, variant = 'purple' }: { children: React.ReactNode, variant?: 'purple' | 'teal' | 'orange' }) {
  const styles = {
    purple: 'bg-accent-purple/15 border-accent-purple/40 text-accent-purple font-semibold shadow-sm shadow-accent-purple/5',
    teal: 'bg-accent-teal/15 border-accent-teal/40 text-accent-teal font-semibold shadow-sm shadow-accent-teal/5',
    orange: 'bg-accent-orange/15 border-accent-orange/40 text-accent-orange font-semibold shadow-sm shadow-accent-orange/5',
  };
  return (
    <span className={cn("px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono border whitespace-nowrap", styles[variant])}>
      {children}
    </span>
  );
}

function SectionLabel({ children, tag }: { children: React.ReactNode, tag: string }) {
  return (
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
      <span className="bg-accent-purple/20 text-accent-purple text-[8px] md:text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider">
        {tag}
      </span>
      <h2 className="text-2xl md:text-3xl font-display">{children}</h2>
    </div>
  );
}

function FadeInView({ children, delay = 0, y = 30, direction = 'up' }: { children: React.ReactNode, delay?: number, y?: number, direction?: 'up' | 'down' | 'left' | 'right' }) {
  const directions = {
    up: { y },
    down: { y: -y },
    left: { x: y },
    right: { x: -y }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for smooth reveal
      }}
    >
      {children}
    </motion.div>
  );
}

function Tooltip({ children, text }: { children: React.ReactNode, text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex flex-col items-center group"
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
            className="absolute bottom-full mb-3 px-3 py-1.5 bg-accent-purple text-white text-[10px] font-mono rounded shadow-xl whitespace-nowrap z-50 pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-accent-purple" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
}

function TiltCard({ children, className, onClick, glowColor = "rgba(168, 85, 247, 0.15)", ...props }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseX.set(mX);
    mouseY.set(mY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative group/card", className)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[inherit]"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`
        }}
      />
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
}

function GlobalSpotlight() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 z-[1] pointer-events-none opacity-20 mix-blend-screen"
      style={{
        background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.03), rgba(239,68,68,0.02), transparent 90%)`
      }}
    />
  );
}

function ReadmeSkeleton() {
  return (
    <div className="animate-pulse space-y-4 mb-6">
      <div className="h-4 bg-white/10 rounded w-3/4"></div>
      <div className="h-3 bg-white/5 rounded w-full"></div>
      <div className="h-3 bg-white/5 rounded w-5/6"></div>
      <div className="h-3 bg-white/5 rounded w-full"></div>
      <div className="h-4 bg-white/10 rounded w-1/2 mt-6"></div>
      <div className="h-3 bg-white/5 rounded w-full"></div>
      <div className="h-3 bg-white/5 rounded w-2/3"></div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/portifolio-murillo-silva/visits/up');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === 'number') {
            setVisitorCount(data.count);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar o contador de visitas:", err);
      }
    };
    fetchVisitorCount();
  }, []);

  const [activeTab, setActiveTab] = useState<'about' | 'readme'>('about');
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [readmeStatus, setReadmeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const loadReadme = async (githubUrl: string, projectId: string) => {
    setReadmeStatus('loading');
    try {
      const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) throw new Error("URL do GitHub inválida");
      
      const [_, owner, repo] = match;
      const cleanRepo = repo.replace(/\/$/, "");
      
      let markdown = '';
      let success = false;
      
      try {
        const res = await fetch(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/README.md`);
        if (res.ok) {
          markdown = await res.text();
          success = true;
        }
      } catch {}
      
      if (!success) {
        try {
          const res = await fetch(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/README.md`);
          if (res.ok) {
            markdown = await res.text();
            success = true;
          }
        } catch {}
      }
      
      if (!success) {
        try {
          const res = await fetch(`/readmes/${projectId}.md`);
          if (res.ok) {
            markdown = await res.text();
            success = true;
          }
        } catch {}
      }
      
      if (!success) throw new Error("README não pôde ser carregado.");
      
      const parsedHtml = await marked.parse(markdown);
      setReadmeContent(parsedHtml);
      setReadmeStatus('success');
    } catch (error) {
      console.error(error);
      setReadmeStatus('error');
    }
  };

  const say = (text: string) => {
    window.dispatchEvent(new CustomEvent('robot-message', { detail: { text } }));
  };

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const isTagMatch = (itemTags: string[], targetTag: string) => {
    return itemTags.some(t => t.toLowerCase().includes(targetTag.toLowerCase()));
  };

  const filteredProjects = activeTag
    ? projects.filter(p => isTagMatch(p.tags, activeTag))
    : projects;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['inicio', 'projetos', 'habilidades', 'faq', 'contato'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const welcomeTimer = setTimeout(() => {
      say("Olá! Sou o assistente do Murillo. Sinta-se à vontade para explorar!");
    }, 7000); // Increased delay to account for longer preloader

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Auto-refresh on 5 minutes of inactivity
    let inactivityTimeout: ReturnType<typeof setTimeout>;
    const resetInactivityTimer = () => {
      if (inactivityTimeout) clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        window.location.reload();
      }, 300000); // 5 minutes
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      observer.disconnect();
      clearTimeout(welcomeTimer);
      clearTimeout(loadingTimer);
      if (inactivityTimeout) clearTimeout(inactivityTimeout);
      activityEvents.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    };
  }, []);

  useEffect(() => {
    if (activeSection === 'habilidades') {
      say("Essas são as tecnologias em que sou especialista.");
    } else if (activeSection === 'projetos') {
      say("Confira meus projetos! Cada um foi construído com foco em performance.");
    } else if (activeSection === 'faq') {
      say("Tem alguma dúvida? Preparei uma lista com as perguntas mais comuns aqui.");
    } else if (activeSection === 'contato') {
      say("Precisa de ajuda com um projeto? Me mande uma mensagem!");
    }
  }, [activeSection]);

  useEffect(() => {
    setActiveTab('about');
    setReadmeContent('');
    setReadmeStatus('idle');
  }, [selectedProject]);

  useEffect(() => {
    if (readmeStatus === 'success') {
      Prism.highlightAll();
    }
  }, [readmeContent, readmeStatus]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <div className="min-h-screen relative bg-bg-deep">
            {/* Persistent Robot Buddy */}
            <div className="fixed top-80 right-4 md:right-6 lg:right-12 z-[999] pointer-events-auto scale-[0.65] sm:scale-90 md:scale-100 origin-top-right">
              <motion.div
                initial={{ opacity: 0, scale: 0, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5
                }}
              >
                <Robot visitorCount={visitorCount} />
              </motion.div>
            </div>

        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-0 left-0 w-full z-50 glass px-4 md:px-6 py-3 md:py-4 flex justify-between items-center"
        >
          <div className="text-accent-purple font-mono flex items-center gap-2 text-sm md:text-base">
            <Code2 size={20} className="w-4 h-4 md:w-5 md:h-5" />
            <span className="tracking-tighter font-bold">JS / {">"}</span>
          </div>
          <div className="flex gap-4 md:gap-8 items-center text-[11px] md:text-sm font-medium" role="menubar">
            <a
              href="#inicio"
              role="menuitem"
              aria-current={activeSection === 'inicio' ? 'page' : undefined}
              className={cn(
                "transition-colors",
                activeSection === 'inicio' ? "text-accent-purple" : "text-gray-400 hover:text-accent-purple"
              )}
            >
              Início
            </a>
            <a
              href="#projetos"
              role="menuitem"
              aria-current={activeSection === 'projetos' ? 'page' : undefined}
              className={cn(
                "transition-colors",
                activeSection === 'projetos' ? "text-accent-purple" : "text-gray-400 hover:text-accent-purple"
              )}
            >
              Projetos
            </a>
            <a
              href="#habilidades"
              role="menuitem"
              aria-current={activeSection === 'habilidades' ? 'page' : undefined}
              className={cn(
                "transition-colors",
                activeSection === 'habilidades' ? "text-accent-purple" : "text-gray-400 hover:text-accent-purple"
              )}
            >
              Habilidades
            </a>
            <a
              href="#faq"
              role="menuitem"
              aria-current={activeSection === 'faq' ? 'page' : undefined}
              className={cn(
                "transition-colors",
                activeSection === 'faq' ? "text-accent-purple" : "text-gray-400 hover:text-accent-purple"
              )}
            >
              FAQ
            </a>
            <a
              href="#contato"
              role="menuitem"
              aria-current={activeSection === 'contato' ? 'page' : undefined}
              className={cn(
                "transition-colors",
                activeSection === 'contato' ? "text-accent-purple" : "text-gray-400 hover:text-accent-purple"
              )}
            >
              Contato
            </a>
          </div>
        </motion.nav>

        {/* Scrollable Content Container (Transformed entrance animation) */}
        <motion.div
          key="scrollable-content"
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1
          }}
          className="w-full min-h-screen flex flex-col relative overflow-hidden pb-20"
        >
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-accent-teal/5 blur-[120px] rounded-full" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          {/* Hero Section */}
          <section id="inicio" className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="overflow-hidden"
          >
            <motion.div
              variants={STAGGER_ITEM}
              className="flex items-center gap-2 mb-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-accent-purple uppercase tracking-[0.2em] font-mono text-[10px]"
              >
                Portifolio
              </motion.span>
              <span className="text-gray-600">•</span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-accent-purple uppercase tracking-[0.2em] font-mono text-[10px]"
              >
                Dev Full-Stack
              </motion.span>
            </motion.div>

            <motion.h1
              variants={STAGGER_ITEM}
              className="text-5xl sm:text-6xl md:text-8xl mb-6 md:mb-8 leading-tight overflow-hidden"
            >
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Olá, sou
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-white block"
              >
                Murillo Silva.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={STAGGER_ITEM}
              className="text-gray-200 max-w-xl text-base md:text-xl leading-relaxed mb-8 md:mb-10 font-medium"
            >
              Desenvolvedor full-stack apaixonado por criar experiências digitais elegantes, acessíveis e performáticas.
            </motion.p>

            <motion.div
              variants={STAGGER_ITEM}
              className="flex flex-wrap gap-4"
            >
              <Badge variant="purple">
                <span
                  className="flex items-center gap-2"
                  onMouseEnter={() => say("Estou pronto para novos desafios e colaborações!")}
                >
                  Disponível para projetos
                </span>
              </Badge>
              <Badge variant="purple">
                <span
                  className="flex items-center gap-2"
                  onMouseEnter={() => say("Atuo diretamente de São Paulo, o coração tecnológico do Brasil.")}
                >
                  <MapPin size={12} /> São Paulo, BR
                </span>
              </Badge>
              <Badge variant="purple">
                <span
                  className="flex items-center gap-2"
                  onMouseEnter={() => say("Meio decada transformando café em código de alta performance.")}
                >
                  <History size={12} /> 5+ anos de experiência
                </span>
              </Badge>
              {visitorCount !== null && (
                <Badge variant="purple">
                  <span
                    className="flex items-center gap-2"
                    onMouseEnter={() => say(`Nossa comunidade está crescendo! Já são mais de ${visitorCount} visitas registradas.`)}
                  >
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-teal"></span>
                    </span>
                    <Eye size={12} className="text-accent-purple" />
                    <span>Visitas: <strong className="text-white font-bold">{visitorCount}</strong></span>
                  </span>
                </Badge>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projetos" className="py-16 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
          <FadeInView>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
              <div>
                <SectionLabel tag="Work">Projetos</SectionLabel>
                <div className="flex flex-wrap items-center gap-3 mt-[-10px] md:mt-[-20px]">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">Total</span>
                  <span className="bg-accent-purple/10 text-accent-purple px-2 py-1 rounded text-xs font-bold font-mono">
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
                  </span>
                  {activeTag && (
                    <button
                      onClick={() => setActiveTag(null)}
                      className="text-[10px] font-mono text-accent-teal hover:underline uppercase tracking-widest ml-2"
                    >
                      limpar filtro
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(null)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-tighter transition-all border flex items-center gap-2",
                    !activeTag
                      ? "bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/20"
                      : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20"
                  )}
                >
                  Todos
                  <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full", !activeTag ? "bg-white/20 text-white" : "bg-white/5 text-gray-600")}>
                    {projects.length}
                  </span>
                </motion.button>
                {allTags.map(tag => {
                  const count = projects.filter(p => p.tags.includes(tag)).length;
                  return (
                    <motion.button
                      key={tag}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTag(tag)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-tighter transition-all border flex items-center gap-2",
                        activeTag === tag
                          ? "bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/20"
                          : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20"
                      )}
                    >
                      {tag}
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full", activeTag === tag ? "bg-white/20 text-white" : "bg-white/5 text-gray-600")}>
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </FadeInView>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <TiltCard
                  key={project.id}
                  layout
                  variants={STAGGER_ITEM}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layoutId={`project-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  glowColor="rgba(168, 85, 247, 0.2)"
                  className="group bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:border-accent-purple/30 transition-colors h-full flex flex-col"
                  onMouseEnter={() => say(`Este é o ${project.name}, desenvolvido com ${project.tags.join(', ')}.`)}
                >
                  <motion.div
                    layoutId={`project-image-${project.id}`}
                    className="aspect-video bg-black flex items-center justify-center relative overflow-hidden"
                  >
                    {project.previewUrl ? (
                      <LazyImage
                        src={project.previewUrl}
                        alt={project.name}
                        containerClassName="absolute inset-0 w-full h-full"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-teal/20 flex flex-col items-center justify-center gap-4 text-gray-500">
                        <Layers size={40} className="group-hover/card:text-accent-purple transition-colors" />
                        <span className="text-[10px] font-mono">Sem prévia disponível</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-60 pointer-events-none" />
                  </motion.div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-display group-hover/card:text-accent-purple transition-colors text-white">{project.name}</h3>
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded-md border border-white/10" title="Ver código no GitHub">
                            <Github size={16} />
                          </a>
                        )}
                        <a href={`https://${project.url}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded-md border border-white/10" title="Ver Site">
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>

                    <p className="text-[11px] font-mono text-accent-teal mb-3 lowercase font-bold">{project.url}</p>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-accent-purple text-white text-[10px] font-bold font-mono rounded-full uppercase tracking-tighter shadow-lg shadow-accent-purple/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Skills Section */}
        <SkillsSection />

        {/* Modal is moved to the root sibling wrapper to avoid fixed coordinate ancestor transforms */}

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <section id="contato" className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
          <FadeInView>
            <div className="flex flex-col items-center text-center mb-12">
              <SectionLabel tag="Message">Contato</SectionLabel>
              <p className="text-gray-400 max-w-md">
                Tem um projeto em mente ou quer apenas bater um papo? Deixe sua mensagem abaixo!
              </p>
            </div>

            <div className="max-w-2xl mx-auto w-full">
              <ContactForm />
            </div>
          </FadeInView>
        </section>

        {/* Social Media Section - Final da página, canto direito */}
        <footer className="pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
          <FadeInView direction="right">
            <div className="flex flex-col items-end text-right">
              <SectionLabel tag="Social">Conecte-se</SectionLabel>
              <p className="text-gray-400 mb-6 max-w-sm">
                Estou sempre aberto a novas oportunidades e colaborações.
              </p>

              <motion.div
                variants={STAGGER_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex gap-4"
                role="group"
                aria-label="Links para redes sociais"
              >
                <Tooltip text="GitHub">
                  <motion.a
                    variants={STAGGER_ITEM}
                    href="https://github.com/Murillooh"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Acessar GitHub de Murillo Silva (Abre em nova aba)"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="p-3 bg-card-bg border border-card-border rounded-xl text-gray-400 hover:text-white hover:border-accent-purple/50 transition-colors shadow-xl"
                  >
                    <Github size={20} />
                  </motion.a>
                </Tooltip>

                <Tooltip text="LinkedIn">
                  <motion.a
                    variants={STAGGER_ITEM}
                    href="https://www.linkedin.com/in/murillo-silva-a9672516a/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Acessar LinkedIn de Murillo Silva (Abre em nova aba)"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="p-3 bg-card-bg border border-card-border rounded-xl text-gray-400 hover:text-white hover:border-accent-purple/50 transition-colors shadow-xl"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                </Tooltip>
              </motion.div>
              {visitorCount !== null && (
                <div className="mt-6 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-gray-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider justify-end shadow-lg shadow-black/40 backdrop-blur-md hover:border-accent-purple/50 transition-all hover:scale-105 duration-300 group/visits select-none">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-teal"></span>
                  </span>
                  <Eye size={12} className="text-accent-purple group-hover/visits:text-accent-teal transition-colors" />
                  <span>Visitas: <span className="text-white font-bold tracking-normal">{visitorCount}</span></span>
                </div>
              )}
              <div className="mt-4 text-[10px] sm:text-[11px] font-mono text-gray-500 uppercase tracking-widest">
                © {new Date().getFullYear()} • Munago Desenvolvedora de Software
              </div>
            </div>
          </FadeInView>
        </footer>
      </motion.div>

      {/* Modal is rendered outside the transformed motion.div */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl bg-card-bg border border-card-border rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] md:max-h-[85vh] flex flex-col md:flex-row mt-12 md:mt-0"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 border border-white/10 rounded-full text-white hover:bg-black transition-colors"
              >
                <X size={20} />
              </button>

              <motion.div
                layoutId={`project-image-${selectedProject.id}`}
                className="w-full md:w-1/2 aspect-video md:aspect-auto bg-black relative"
              >
                {selectedProject.previewUrl ? (
                  <LazyImage
                    src={selectedProject.previewUrl}
                    alt={selectedProject.name}
                    containerClassName="absolute inset-0 w-full h-full"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Layers size={80} />
                  </div>
                )}
              </motion.div>

              <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <span className="text-accent-teal uppercase tracking-widest font-mono text-[9px] md:text-[10px] block mb-2">{selectedProject.url}</span>
                  <h2 className="text-2xl md:text-4xl font-display mb-3 md:mb-4">{selectedProject.name}</h2>
                </motion.div>

                {/* Tabs */}
                {selectedProject.githubUrl && (
                  <div className="flex border-b border-white/10 mb-6 gap-6">
                    <button
                      onClick={() => setActiveTab('about')}
                      className={cn(
                        "pb-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-colors border-b-2 font-bold cursor-pointer",
                        activeTab === 'about'
                          ? "text-accent-purple border-accent-purple"
                          : "text-gray-400 border-transparent hover:text-white"
                      )}
                    >
                      Sobre
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('readme');
                        if (readmeStatus === 'idle') {
                          loadReadme(selectedProject.githubUrl!, selectedProject.id);
                        }
                      }}
                      className={cn(
                        "pb-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-colors border-b-2 font-bold cursor-pointer",
                        activeTab === 'readme'
                          ? "text-accent-purple border-accent-purple"
                          : "text-gray-400 border-transparent hover:text-white"
                      )}
                    >
                      README.md
                    </button>
                  </div>
                )}

                {activeTab === 'about' ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6 md:mb-8"
                    >
                      <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                        {selectedProject.description}
                        {selectedProject.description.length < 100 && " Este é um projeto desenvolvido com as melhores práticas de mercado, focado em entregar uma solução robusta e escalável para o usuário final."}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-10"
                    >
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">Tecnologias Utilizadas</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-full font-mono text-xs font-bold uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-10"
                  >
                    {readmeStatus === 'loading' && <ReadmeSkeleton />}
                    {readmeStatus === 'error' && (
                      <div className="flex flex-col items-start gap-3 py-4">
                        <p className="text-red-500 text-xs font-mono">Erro ao carregar o README do GitHub.</p>
                        <button
                          onClick={() => loadReadme(selectedProject.githubUrl!, selectedProject.id)}
                          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Tentar novamente
                        </button>
                      </div>
                    )}
                    {readmeStatus === 'success' && (
                      <div 
                        className="readme-content" 
                        dangerouslySetInnerHTML={{ __html: readmeContent }} 
                      />
                    )}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a
                    href={`https://${selectedProject.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-accent-teal transition-all active:scale-95 group/btn"
                  >
                    Ver Site <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-card-bg border border-white/20 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 group/git"
                    >
                      GitHub <Github size={18} className="group-hover/git:rotate-12 transition-transform" />
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )}
</AnimatePresence>

<BackToTop />
<GlobalSpotlight />
</div>
  );
}
