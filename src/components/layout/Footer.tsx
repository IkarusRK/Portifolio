import React from 'react';
import { ARTIST_INFO } from '../../data/portfolioData';
import { ArrowUp, MessageSquare, Sparkles, Code2, ExternalLink } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';
import { useLanguage } from '../../i18n/LanguageContext';

interface FooterProps {
  onOpenDevModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDevModal }) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    cosmicAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDevClick = () => {
    cosmicAudio.playClick();
    if (onOpenDevModal) {
      onOpenDevModal();
    }
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '4rem',
        paddingBottom: '3.5rem',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Col 1: Brand & Lore */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="./assets/eclipsa-logo.png"
                alt="Eclipsa"
                style={{ height: '32px', width: 'auto', filter: 'drop-shadow(0 0 8px #ddb7ff)' }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                ECLIPSA
              </span>
            </div>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '360px' }}>
              {t.footer.description}
            </p>
          </div>

          {/* Col 2: Telemetry & DevKit Status */}
          <div>
            <h4
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              {t.footer.telemetryTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Pipeline Engine</span>
                <span className="font-mono" style={{ color: 'var(--color-secondary)' }}>UE 5.4 Nanite/Lumen</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Mod Kit Target</span>
                <span className="font-mono" style={{ color: 'var(--color-primary)' }}>Conan Exiles .pak</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Fila de Comissões</span>
                <span className="font-mono" style={{ color: 'var(--color-tertiary)' }}>2 Vagas Abertas</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Bake Quality</span>
                <span className="font-mono" style={{ color: '#ffffff' }}>4K UDIMs / 0% Skew</span>
              </div>
            </div>
          </div>

          {/* Col 3: Community & Engines */}
          <div>
            <h4
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              {t.footer.communityTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href={ARTIST_INFO.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ justifyContent: 'flex-start', padding: '0.55rem 0.85rem' }}
                onClick={() => cosmicAudio.playClick()}
              >
                <MessageSquare size={16} style={{ color: 'var(--color-primary)' }} />
                <span>{t.footer.discordServer}</span>
              </a>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--color-surface-container-high)',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.8rem',
                  fontFamily: 'JetBrains Mono',
                  color: 'var(--color-on-surface)',
                }}
              >
                <Sparkles size={15} style={{ color: 'var(--color-secondary)' }} />
                <span>Unreal Engine 5 • Nanite &amp; Lumen</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--color-surface-container-high)',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.8rem',
                  fontFamily: 'JetBrains Mono',
                  color: 'var(--color-on-surface)',
                }}
              >
                <Sparkles size={15} style={{ color: 'var(--color-tertiary)' }} />
                <span>Unreal Engine 4 • Conan DevKit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Developer Credit & Back to Top */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--color-outline)', maxWidth: '420px', lineHeight: 1.5 }}>
            {t.footer.rights}
          </div>

          {/* Centered / Highlighted Developer Badge in Footer */}
          <button
            onClick={handleDevClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(183, 109, 255, 0.08)',
              border: '1px solid rgba(183, 109, 255, 0.25)',
              color: 'var(--color-on-surface)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif',
              transition: 'all 0.2s ease',
            }}
            className="footer-dev-btn"
            title="Conheça o Desenvolvedor deste site"
          >
            <Code2 size={14} style={{ color: 'var(--color-primary)' }} />
            <span>
              {t.footer.developedBy.replace('IkarusRK', '')}
              <strong style={{ color: 'var(--color-primary)' }}>IkarusRK</strong>
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                backgroundColor: 'rgba(183, 109, 255, 0.15)',
                color: 'var(--color-secondary)',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                fontFamily: 'JetBrains Mono',
              }}
            >
              [Portfólio | GitHub]
            </span>
            <ExternalLink size={12} style={{ opacity: 0.7 }} />
          </button>

          <button
            onClick={scrollToTop}
            className="btn-ghost"
            style={{ padding: '0.5rem 0.9rem', gap: '0.4rem' }}
            title={t.footer.backToTop}
          >
            <ArrowUp size={15} />
            <span>{t.footer.backToTop}</span>
          </button>
        </div>
      </div>

      <style>{`
        .footer-dev-btn:hover {
          background-color: rgba(183, 109, 255, 0.18) !important;
          border-color: rgba(183, 109, 255, 0.5) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </footer>
  );
};
