import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { THEME_PALETTES, THEME_IDS } from '../../data/themes';
import type { ThemeId } from '../../types';

interface ThemePickerProps {
  compact?: boolean;
}

export const ThemePicker = ({ compact = false }: ThemePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, mode, setTheme, toggleMode } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentPalette = THEME_PALETTES[theme] ?? THEME_PALETTES.purple;

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 ${compact ? 'p-1.5' : 'p-2'} rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-from)] hover:bg-[var(--glass-bg)] border border-[var(--glass-border)] bg-[var(--glass-bg)] cursor-pointer transition-all select-none backdrop-blur-md`}
        aria-label="Abrir seletor de tema e modo"
        aria-expanded={isOpen}
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm shrink-0"
          style={{
            background: `linear-gradient(135deg, ${currentPalette.from}, ${currentPalette.to})`,
          }}
        />
        {mode === 'dark' ? (
          <Moon className="w-4 h-4 text-[var(--text-primary)]" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute right-0 top-full mt-2 py-3.5 px-4 rounded-2xl border border-[var(--glass-border)] z-50 min-w-[240px] shadow-2xl backdrop-blur-2xl"
            style={{
              background: 'var(--bg-primary)',
              boxShadow: '0 12px 40px var(--glow)',
            }}
          >
            {/* Paletas de Cor */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1.5 uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-[var(--accent-from)]" />
                Cores do Tema
              </span>
              <span className="text-[10px] font-mono text-[var(--accent-from)] font-bold">
                {currentPalette.name}
              </span>
            </div>

            <div className="flex gap-2.5 mb-4 justify-between items-center py-1">
              {THEME_IDS.map((id) => {
                const p = THEME_PALETTES[id];
                const selected = theme === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTheme(id as ThemeId);
                    }}
                    className="relative w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 focus:outline-none cursor-pointer flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                      borderColor: selected ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)',
                      boxShadow: selected ? `0 0 12px ${p.from}` : 'none',
                    }}
                    title={p.name}
                    aria-label={`Tema ${p.name}`}
                  >
                    {selected && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Alternador de Modo Claro / Escuro */}
            <div className="pt-2 border-t border-[var(--glass-border)]">
              <div className="text-[11px] font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                Aparência
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMode();
                }}
                className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl border border-[var(--glass-border)] hover:border-[var(--accent-from)] transition-all cursor-pointer select-none group"
                style={{
                  background: 'var(--glass-bg)',
                }}
              >
                <div className="flex items-center gap-2">
                  {mode === 'dark' ? (
                    <>
                      <Moon className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        Modo Escuro
                      </span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        Modo Claro
                      </span>
                    </>
                  )}
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--accent-from)] text-white shadow-sm">
                  {mode === 'dark' ? 'Mudar p/ Claro' : 'Mudar p/ Escuro'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;
