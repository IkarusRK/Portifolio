import { motion } from 'framer-motion';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Briefcase, Code2 } from 'lucide-react';

interface PerspectiveToggleProps {
  compact?: boolean;
}

export const PerspectiveToggle = ({ compact = false }: PerspectiveToggleProps) => {
  const { perspective, setPerspective } = usePerspective();
  const { t } = useLanguage();

  return (
    <div
      className="inline-flex items-center p-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-sm relative shrink-0 whitespace-nowrap backdrop-blur-md"
      role="group"
      aria-label="Alternar perspectiva do portfólio"
    >
      {/* Botão Cliente */}
      <button
        type="button"
        onClick={() => setPerspective('client')}
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer select-none whitespace-nowrap ${
          perspective === 'client'
            ? 'text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        title={t.perspective.clientTooltip}
      >
        {perspective === 'client' && (
          <motion.div
            layoutId="activePerspectivePill"
            className="absolute inset-0 rounded-lg -z-10"
            style={{
              background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              boxShadow: '0 0 12px var(--glow)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <Briefcase className="w-3.5 h-3.5 shrink-0" />
        {!compact && <span>{t.perspective.client}</span>}
      </button>

      {/* Botão Dev */}
      <button
        type="button"
        onClick={() => setPerspective('dev')}
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer select-none whitespace-nowrap ${
          perspective === 'dev'
            ? 'text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        title={t.perspective.devTooltip}
      >
        {perspective === 'dev' && (
          <motion.div
            layoutId="activePerspectivePill"
            className="absolute inset-0 rounded-lg -z-10"
            style={{
              background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              boxShadow: '0 0 12px var(--glow)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <Code2 className="w-3.5 h-3.5 shrink-0" />
        {!compact && <span>{t.perspective.dev}</span>}
      </button>
    </div>
  );
};

export default PerspectiveToggle;
