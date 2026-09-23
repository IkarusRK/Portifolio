import React from 'react';
import { ARTIST_INFO } from '../../data/portfolioData';
import { cosmicAudio } from '../../utils/audioSynth';
import { Sparkles, MessageSquare } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-a-artista" className="section-spacing" style={{ backgroundColor: 'var(--color-surface-dim)' }}>
      <div className="container-custom">
        <div
          className="glass-panel"
          style={{
            padding: '3rem 2rem',
            border: '1px solid rgba(183, 109, 255, 0.25)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* Left: Portrait / Studio Seal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '360px',
                  aspectRatio: '1/1',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '2px solid rgba(183, 109, 255, 0.35)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px var(--primary-glow)',
                  backgroundColor: '#0c0717',
                }}
              >
                <img
                  src="/assets/obras-modelos.png"
                  alt="Eclipsa Studio"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(12, 7, 23, 0.9) 0%, transparent 60%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                      Eclipsa
                    </h3>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                      Senior 3D Artist &amp; Modder
                    </span>
                  </div>
                  <span className="badge-pill badge-secondary">5+ Anos Exp.</span>
                </div>
              </div>
            </div>

            {/* Right: Bio & Software Stack */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    boxShadow: '0 0 8px var(--color-primary)',
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  Perfil da Artista • Craftsmanship
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Moldando Nebulosas e Sangue Bárbaro
              </h2>

              <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
                {ARTIST_INFO.bio}
              </p>

              <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                {ARTIST_INFO.bioExtended}
              </p>

              {/* Arsenal de Ferramentas */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-outline)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '0.75rem',
                  }}
                >
                  Domínio de Software &amp; Ferramentas:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {ARTIST_INFO.tools.map((tool) => (
                    <div
                      key={tool.name}
                      style={{
                        background: 'var(--color-surface-container-high)',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-primary)',
                        }}
                      />
                      <strong style={{ color: 'var(--color-on-surface)' }}>{tool.name}</strong>
                      <span style={{ color: 'var(--color-outline)', fontSize: '0.75rem' }}>({tool.skill})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Connect Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a
                  href="#comissoes"
                  onClick={() => cosmicAudio.playClick()}
                  className="btn-primary"
                >
                  <MessageSquare size={16} />
                  <span>Conectar via Discord ({ARTIST_INFO.socials.discord})</span>
                </a>

                <a
                  href="#galeria-3d"
                  onClick={() => cosmicAudio.playClick()}
                  className="btn-secondary"
                >
                  <Sparkles size={16} />
                  <span>Ver Todos os Projetos</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
