import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LANGUAGE_OPTIONS } from '../../data/translations';

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector = ({ compact = false }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) ?? LANGUAGE_OPTIONS[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--accent-from)]/60 text-[var(--text-primary)] text-xs font-semibold shadow-sm transition-all cursor-pointer backdrop-blur-md select-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Selecionar idioma"
      >
        <span className="text-base leading-none">{currentOption.flag}</span>
        <Globe className="w-3.5 h-3.5 text-[var(--accent-from)]" />
        <span className="uppercase tracking-wider font-mono text-[11px]">
          {compact ? currentOption.code : currentOption.code.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-48 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50 overflow-hidden"
            style={{
              boxShadow: '0 10px 35px var(--glow)',
            }}
          >
            <div className="px-2.5 py-1.5 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider border-b border-[var(--glass-border)] mb-1">
              Idioma / Language
            </div>
            <div className="flex flex-col gap-0.5">
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = opt.code === language;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--accent-from)] text-white shadow-sm'
                        : 'text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:text-[var(--accent-from)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none">{opt.flag}</span>
                      <span className="font-semibold">{opt.nativeName}</span>
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-white/80' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        ({opt.code.toUpperCase()})
                      </span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
