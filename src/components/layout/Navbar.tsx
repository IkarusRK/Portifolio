import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FaFilePdf, FaEye } from 'react-icons/fa';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemePicker from './ThemePicker';
import { CVDropdown } from '../ui/CVDropdown';
import { CVViewerModal } from '../ui/CVViewerModal';
import { PerspectiveToggle } from '../ui/PerspectiveToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export const Navbar = () => {
  const { t } = useLanguage();
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

  const navLinks = [
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'skills', label: t.nav.skills, href: '#skills' },
    { id: 'experience', label: t.nav.experience, href: '#experience' },
    { id: 'applications', label: t.nav.applications, href: '#applications' },
    { id: 'sites', label: t.nav.sites, href: '#sites' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  // Track active section on scroll
  useEffect(() => {
    const observers = navLinks.map((link) => {
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
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
        <a
          href="#home"
          className="font-extrabold text-lg sm:text-xl bg-clip-text text-transparent shrink-0 tracking-tight"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
          }}
        >
          Ikarus Sylver
        </a>

        {/* Links Desktop */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-xs xl:text-sm font-semibold transition-colors relative py-1 px-1 select-none whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--accent-from)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--accent-from)]'
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
        </div>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-2.5">
          <PerspectiveToggle compact />
          <LanguageSelector compact />
          <CVDropdown variant="compact" />

          <ThemePicker isOpen={themeOpen} onClose={() => setThemeOpen(false)}>
            <button
              type="button"
              onClick={() => setThemeOpen((o) => !o)}
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-from)] hover:bg-[var(--glass-bg)] border border-[var(--glass-border)] cursor-pointer transition-all"
              aria-label="Abrir seletor de tema"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
          </ThemePicker>
        </div>

        {/* Mobile controls (Compact) */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector compact />
          <PerspectiveToggle compact />
          <ThemePicker isOpen={themeOpen} onClose={() => setThemeOpen(false)}>
            <button
              type="button"
              onClick={() => setThemeOpen((o) => !o)}
              className="p-2 rounded-xl text-[var(--text-secondary)] border border-[var(--glass-border)] bg-[var(--glass-bg)]"
              aria-label="Tema"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
          </ThemePicker>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-xl text-[var(--text-primary)] border border-[var(--glass-border)] bg-[var(--glass-bg)] cursor-pointer"
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
            style={{ background: 'var(--bg-primary)' }}
          >
            <div className="px-5 py-4 flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-[var(--accent-from)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-[var(--glass-border)] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <FaFilePdf className="text-red-500" /> {t.nav.cv}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCvModalLang('pt');
                      setCvModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-center border-2 border-[var(--accent-from)] text-[var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    {t.nav.viewCvPt}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCvModalLang('en');
                      setCvModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-center border-2 border-[var(--accent-from)] text-[var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    {t.nav.viewCvEn}
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
