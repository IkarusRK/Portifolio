import React from 'react';
import { cosmicAudio } from '../../utils/audioSynth';
import { Sparkles, CheckCircle, Eye } from 'lucide-react';

export const CharactersShowcase: React.FC = () => {
  return (
    <section id="personagens" className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
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
              Eclipsa Character Forge • Hyborian Astral Registry
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  letterSpacing: '-0.02em',
                }}
              >
                Guerreiros do Vazio <span style={{ color: 'var(--color-primary)', fontWeight: 300 }}>&amp; Trajes Estelares</span>
              </h2>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem', maxWidth: '600px', marginTop: '0.5rem' }}>
                Modelagem anatômica hiper-detalhada, high-to-low poly baking minucioso, texturização PBR 4K e simulação física de tecidos para Conan Exiles e Unreal Engine.
              </p>
            </div>

            {/* Metrics Bar */}
            <div
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0.75rem 1.25rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-outline)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', display: 'block' }}>
                  Budget Médio
                </span>
                <span className="font-display" style={{ fontSize: '1.15rem', color: 'var(--color-tertiary)', fontWeight: 700 }}>
                  55k - 70k
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', display: 'block' }}>
                  Triângulos / Char
                </span>
              </div>

              <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-outline-variant)' }} />

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-outline)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', display: 'block' }}>
                  Bake Match
                </span>
                <span className="font-display" style={{ fontSize: '1.15rem', color: 'var(--color-secondary)', fontWeight: 700 }}>
                  Sub-milímetro
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', display: 'block' }}>
                  Cage &amp; Skewing Zero
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Feature Card */}
        <div
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            padding: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Visual Showcase Side */}
          <div
            style={{
              position: 'relative',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              height: '380px',
              backgroundColor: '#0c0717',
              border: '1px solid var(--glass-border)',
            }}
          >
            <img
              src="/assets/succubus-asas.png"
              alt="Succubus Real & Asas Dracônicas - Eclipsa"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(12, 7, 23, 0.85) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span className="badge-pill badge-secondary">LOD 0 • READY P/ DEVKIT</span>
              <a
                href="#viewport-3d-section"
                onClick={() => cosmicAudio.playClick()}
                className="btn-ghost"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                <Eye size={14} />
                <span>Girar 360° no Viewport</span>
              </a>
            </div>
          </div>

          {/* Details & Technical Breakdown */}
          <div>
            <div className="badge-pill badge-primary" style={{ marginBottom: '1rem' }}>
              Rigging Avançado • UE4 / UE5 / Conan Skeleton
            </div>
            <h3
              className="font-display"
              style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.75rem' }}
            >
              Succubus Real &amp; Asas Dracônicas
            </h3>
            <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Modelagem anatômica refinada com bodysuit em couro e látex escuro, combinada a asas demoníacas de couro violeta de grande envergadura com física e ossatura articulada para Unreal Engine e Conan DevKit.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface)' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-secondary)' }} />
                <span style={{ fontSize: '0.9rem' }}>Física dinâmica de asas e membranas (Chaos Physics Solver)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface)' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-secondary)' }} />
                <span style={{ fontSize: '0.9rem' }}>Dye System com suporte a 5 canais de tingimento in-game</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface)' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-secondary)' }} />
                <span style={{ fontSize: '0.9rem' }}>Shaders com nós emissivos violeta e dourado pulsando com o combate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface)' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-secondary)' }} />
                <span style={{ fontSize: '0.9rem' }}>Ajuste milimétrico sem interseção (clipping) nas animações de ataque</span>
              </div>
            </div>

            <a
              href="#comissoes"
              onClick={() => cosmicAudio.playClick()}
              className="btn-primary"
            >
              <Sparkles size={16} />
              <span>Solicitar Set de Armadura Customizado</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
