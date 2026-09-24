import React from 'react';
import { Code2, Sparkles } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';
import { useLanguage } from '../../i18n/LanguageContext';

interface DeveloperBadgeProps {
  onOpenModal: () => void;
}

export const DeveloperBadge: React.FC<DeveloperBadgeProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();

  const handleClick = () => {
    cosmicAudio.playClick();
    onOpenModal();
  };

  return (
    <aside aria-label="Créditos do Desenvolvedor">
      <button
        onClick={handleClick}
        className="dev-floating-badge"
        title="Ver informações do Desenvolvedor (Portfólio & GitHub)"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 40,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(15, 8, 28, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(183, 109, 255, 0.35)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 16px rgba(183, 109, 255, 0.25)',
          color: 'var(--color-on-surface)',
          cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(183, 109, 255, 0.2)',
            color: 'var(--color-primary)',
          }}
        >
          <Code2 size={12} />
        </span>

        <span>
          {t.footer.developedBy.replace('IkarusRK', '')}
          <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>IkarusRK</strong>
        </span>

        <Sparkles size={11} style={{ color: 'var(--color-secondary)', opacity: 0.8 }} />
      </button>

      <style>{`
        .dev-floating-badge:hover {
          transform: translateY(-2px) scale(1.03);
          border-color: rgba(183, 109, 255, 0.7) !important;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(183, 109, 255, 0.45) !important;
        }
        @media (max-width: 640px) {
          .dev-floating-badge {
            bottom: 0.85rem !important;
            right: 0.85rem !important;
            font-size: 0.72rem !important;
            padding: 0.4rem 0.7rem !important;
          }
        }
      `}</style>
    </aside>
  );
};
