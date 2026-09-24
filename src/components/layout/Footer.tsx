import React from 'react';
import { ARTIST_INFO } from '../../data/portfolioData';
import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    cosmicAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '4rem',
        paddingBottom: '3rem',
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
                src="/assets/eclipsa-logo.png"
                alt="Eclipsa"
                style={{ height: '32px', width: 'auto', filter: 'drop-shadow(0 0 8px #ddb7ff)' }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                ECLIPSA
              </span>
            </div>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '360px' }}>
              3D Game Artist & Worldbuilder especializada em dark fantasy cósmico, asset pipeline AAA, armaduras rúnicas e mods imersivos para Conan Exiles e Unreal Engine 5.
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
              Telemetria do DevKit
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
              Comunidade &amp; Engines
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
                <span>Servidor Discord Oficial</span>
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

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--color-outline)' }}>
            © {new Date().getFullYear()} Eclipsa 3D Art Studio. Todos os direitos reservados. Feito sob o alinhamento das luas de Hyboria.
          </div>

          <button
            onClick={scrollToTop}
            className="btn-ghost"
            style={{ padding: '0.5rem 0.9rem', gap: '0.4rem' }}
            title="Voltar ao Topo"
          >
            <ArrowUp size={15} />
            <span>Retornar ao Ápice</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
