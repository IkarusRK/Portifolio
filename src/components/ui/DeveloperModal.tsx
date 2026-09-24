import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Code2, Sparkles, Check, Copy } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';
import { useLanguage } from '../../i18n/LanguageContext';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    cosmicAudio.playClick();
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleLinkClick = () => {
    cosmicAudio.playClick();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem 2rem',
          position: 'relative',
          borderRadius: '1.25rem',
          border: '1px solid rgba(183, 109, 255, 0.4)',
          background: 'linear-gradient(135deg, rgba(20, 12, 38, 0.95) 0%, rgba(10, 5, 20, 0.98) 100%)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(183, 109, 255, 0.25)',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            cosmicAudio.playClick();
            onClose();
          }}
          className="btn-ghost"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-border)',
            color: 'var(--color-on-surface-variant)',
          }}
          title={t.developerModal.close}
        >
          <X size={18} />
        </button>

        {/* Header with Developer Profile */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {/* Avatar / Monogram */}
          <div
            style={{
              width: '84px',
              height: '84px',
              margin: '0 auto 1.25rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
              padding: '3px',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 8, 30, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Code2 size={32} style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <span className="badge-pill badge-primary">
              <Sparkles size={12} />
              {t.developerModal.badge}
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
              fontWeight: 800,
              color: 'var(--color-on-surface)',
              letterSpacing: '0.04em',
              marginBottom: '0.35rem',
            }}
          >
            {t.developerModal.title}
          </h2>

          <div
            className="font-mono"
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-secondary)',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            {t.developerModal.role}
          </div>

          <p
            style={{
              color: 'var(--color-on-surface-variant)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            {t.developerModal.description}
          </p>
        </div>

        {/* Action Cards: [ Portfólio | GitHub ] */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Card 1: Portfólio Principal */}
          <div
            style={{
              backgroundColor: 'rgba(25, 14, 48, 0.7)',
              border: '1px solid rgba(183, 109, 255, 0.25)',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="dev-card-hover"
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(183, 109, 255, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(183, 109, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(183, 109, 255, 0.3)',
                  }}
                >
                  <Sparkles size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-primary)',
                    backgroundColor: 'rgba(183, 109, 255, 0.1)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(183, 109, 255, 0.2)',
                  }}
                >
                  Live Web App
                </span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '0.4rem',
                }}
              >
                {t.developerModal.portfolioTitle}
              </h3>

              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {t.developerModal.portfolioDesc}
              </p>

              <div
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-secondary)',
                  opacity: 0.9,
                  wordBreak: 'break-all',
                }}
              >
                portifolio-sylver.vercel.app
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <a
                href="https://portifolio-sylver.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="btn-primary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                <span>{t.developerModal.portfolioBtn}</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => handleCopy('https://portifolio-sylver.vercel.app/', 'portfolio')}
                className="btn-ghost"
                style={{
                  padding: '0.65rem',
                  borderRadius: '0.5rem',
                }}
                title="Copiar URL"
              >
                {copiedLink === 'portfolio' ? (
                  <Check size={16} style={{ color: '#22c55e' }} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Card 2: GitHub Profile */}
          <div
            style={{
              backgroundColor: 'rgba(25, 14, 48, 0.7)',
              border: '1px solid rgba(56, 239, 125, 0.25)',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="dev-card-hover"
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(56, 239, 125, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(56, 239, 125, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(56, 239, 125, 0.3)',
                  }}
                >
                  {/* Crisp GitHub SVG */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#38ef7d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-secondary)',
                    backgroundColor: 'rgba(56, 239, 125, 0.1)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(56, 239, 125, 0.2)',
                  }}
                >
                  Open Source
                </span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '0.4rem',
                }}
              >
                {t.developerModal.githubTitle}
              </h3>

              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {t.developerModal.githubDesc}
              </p>

              <div
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-secondary)',
                  opacity: 0.9,
                  wordBreak: 'break-all',
                }}
              >
                github.com/IkarusRK
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <a
                href="https://github.com/IkarusRK"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="btn-secondary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                <span>{t.developerModal.githubBtn}</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => handleCopy('https://github.com/IkarusRK', 'github')}
                className="btn-ghost"
                style={{
                  padding: '0.65rem',
                  borderRadius: '0.5rem',
                }}
                title="Copiar URL"
              >
                {copiedLink === 'github' ? (
                  <Check size={16} style={{ color: '#22c55e' }} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Copy confirmation feedback toast */}
        {copiedLink && (
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.8rem',
              color: '#22c55e',
              fontFamily: 'JetBrains Mono',
              marginBottom: '1rem',
            }}
          >
            ✓ {t.developerModal.copied}
          </div>
        )}

        {/* Modal Footer info */}
        <div
          style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            color: 'var(--color-outline)',
            textAlign: 'center',
          }}
        >
          <span>Desenvolvido com React 19, TypeScript, Three.js &amp; Vite</span>
        </div>
      </div>
    </div>
  );
};
