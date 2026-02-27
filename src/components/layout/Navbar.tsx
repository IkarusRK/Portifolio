import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import ThemePicker from './ThemePicker';

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
  const direction = useScrollDirection();
  const visible = direction !== 'down';

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
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href="#home"
          className="font-bold text-lg bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
          }}
        >
          IkarusRK
        </a>

        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative after:absolute after:left-0 after:bottom-[-2px] after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-[var(--accent-from)] after:to-[var(--accent-to)] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
          <ThemePicker isOpen={themeOpen} onClose={() => setThemeOpen(false)}>
            <button
              onClick={() => setThemeOpen((o) => !o)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"
              aria-label="Abrir seletor de tema"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
          </ThemePicker>
        </div>

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
            className="p-2 rounded-lg text-[var(--text-primary)]"
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
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-[var(--text-primary)] font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
