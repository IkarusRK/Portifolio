import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FaFilePdf, FaEye } from 'react-icons/fa';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import ThemePicker from './ThemePicker';
import { CVDropdown } from '../ui/CVDropdown';
import { CVViewerModal } from '../ui/CVViewerModal';

const LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experiência', href: '#experience' },
  { id: 'applications', label: 'Aplicações', href: '#applications' },
  { id: 'sites', label: 'Sites', href: '#sites' },
  { id: 'contact', label: 'Contato', href: '#contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvModalLang, setCvModalLang] = useState<'pt' | 'en'>('pt');
  const [activeSection, setActiveSection] = useState('home');
  const direction = useScrollDirection();
  const visible = direction !== 'down';

  // Scroll Progress Bar calculation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  // Rastreia a seção visível na tela
  useEffect(() => {
    const observers = LINKS.map((link) => {
      const el = document.getElementById(link.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link.id);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-20% 0px -55% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--glass-border)]"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between relative">
        <a
          href="#home"
          className="font-bold text-lg bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
          }}
        >
          IkarusRK
        </a>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 px-1 select-none ${isActive ? 'text-[var(--accent-from)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent-from)]'
                  }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavLinkUnderline"
                    className="absolute left-0 right-0 bottom-[-2px] h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          <CVDropdown variant="compact" />

          <ThemePicker isOpen={themeOpen} onClose={() => setThemeOpen(false)}>
            <button
              onClick={() => setThemeOpen((o) => !o)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-from)] hover:bg-[var(--glass-bg)] cursor-pointer"
              aria-label="Abrir seletor de tema"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
          </ThemePicker>
        </div>

        {/* Links Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemePicker isOpen={themeOpen} onClose={() => setThemeOpen(false)}>
            <button
              onClick={() => setThemeOpen((o) => !o)}
              className="p-2 rounded-lg text-[var(--text-secondary)]"
              aria-label="Tema"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
          </ThemePicker>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-lg text-[color:var(--text-primary)] cursor-pointer"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  ✕
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  ☰
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--glass-border)] overflow-hidden"
            style={{ background: 'var(--glass-bg)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              {LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-2 font-semibold transition-colors ${isActive ? 'text-[var(--accent-from)]' : 'text-[color:var(--text-primary)]'
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-2 mt-2 border-t border-[var(--glass-border)] flex flex-col gap-2">
                <span className="text-xs font-bold text-[color:var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                  <FaFilePdf className="text-red-500" /> Currículo
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCvModalLang('pt');
                      setCvModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-center border-2 border-[var(--accent-from)] text-[color:var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    🇧🇷 PT-BR
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCvModalLang('en');
                      setCvModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-center border-2 border-[var(--accent-from)] text-[color:var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    🇺🇸 EN-US
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))',
        }}
      />

      {/* In-Site CV Viewer Modal */}
      <CVViewerModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        initialLang={cvModalLang}
      />
    </motion.header>
  );
};

export default Navbar;
