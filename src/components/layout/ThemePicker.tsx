import { useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useClickOutside } from '../../hooks/useClickOutside';
import { THEME_PALETTES, THEME_IDS } from '../../data/themes';
import type { ThemeId } from '../../types';

interface ThemePickerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ThemePicker = ({ isOpen, onClose, children }: ThemePickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, mode, setTheme, toggleMode } = useTheme();
  useClickOutside(ref, onClose, isOpen);

  return (
    <div className="relative" ref={ref}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 py-3 px-4 rounded-2xl border border-[var(--glass-border)] z-50 min-w-[200px]"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 30px var(--glow)',
            }}
          >
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Paleta</p>
            <div className="flex gap-2 mb-3">
              {THEME_IDS.map((id) => {
                const p = THEME_PALETTES[id];
                const selected = theme === id;
                return (
                  <button
                    key={id}
                    onClick={() => setTheme(id as ThemeId)}
                    className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-from)]"
                    style={{
                      background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                      borderColor: selected ? 'var(--text-primary)' : 'transparent',
                    }}
                    title={p.name}
                    aria-label={`Tema ${p.name}`}
                  />
                );
              })}
            </div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Modo</p>
            <motion.button
              onClick={toggleMode}
              className="flex items-center gap-2 w-full py-2 px-3 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)]"
              style={{ background: 'var(--glass-bg)' }}
              whileTap={{ scale: 0.98 }}
            >
              {mode === 'dark' ? (
                <>
                  <motion.span animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                    🌙
                  </motion.span>
                  Escuro
                </>
              ) : (
                <>
                  <motion.span animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    ☀️
                  </motion.span>
                  Claro
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;
