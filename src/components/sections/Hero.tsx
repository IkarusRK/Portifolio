import React from 'react';
import { InteractiveEclipse } from '../ui/InteractiveEclipse';
import { cosmicAudio } from '../../utils/audioSynth';
import { View, Sparkles, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '94vh',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow - Seamless Full Width */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'var(--hero-glow)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3rem',
          }}
        >
          {/* Left Column: Headlines & Actions */}
          <div style={{ maxWidth: '640px' }}>
            {/* Top Telemetry Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <span className="badge-pill badge-primary">
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    boxShadow: '0 0 6px var(--color-primary)',
                  }}
                />
                Unreal Engine 4 &amp; 5 • Conan DevKit
              </span>
              <span className="badge-pill badge-secondary">
                <Sparkles size={12} />
                Pipeline AAA 4K UDIM
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--color-on-surface)',
                marginBottom: '1.25rem',
              }}
            >
              ECLiPSA <span style={{ color: 'var(--color-primary)', fontWeight: 300 }}>//</span> <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-tertiary) 50%, var(--color-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                3D Cosmic Modeler
              </span>{' '}
              <br />
              &amp; Worldbuilder
            </h1>

            {/* Subtitle Lore */}
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--color-on-surface-variant)',
                lineHeight: 1.65,
                fontWeight: 400,
                marginBottom: '2rem',
              }}
            >
              Moldando lendas bárbaras sob céus astrais no universo de Conan Exiles. Ambientes monumentais, avatares épicos, armaduras forjadas em estrelas e props otimizados para produções AAA e comunidades apaixonadas.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="#viewport-3d-section"
                onClick={() => cosmicAudio.playClick()}
                className="btn-primary"
              >
                <View size={18} />
                <span>Explorar Inspetor 3D</span>
              </a>

              <a
                href="#comissoes"
                onClick={() => cosmicAudio.playClick()}
                className="btn-secondary"
              >
                <Sparkles size={18} />
                <span>Solicitar Orçamento / Mod</span>
              </a>

              <a
                href="#galeria-3d"
                onClick={() => cosmicAudio.playClick()}
                className="btn-ghost"
              >
                <Layers size={16} style={{ color: 'var(--color-tertiary)' }} />
                <span>Ver Catálogo</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Eclipse Centerpiece & Studio Telemetry Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* The Celestial Interactive Eclipse */}
            <div style={{ marginBottom: '2rem' }}>
              <InteractiveEclipse />
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-outline)',
                  fontFamily: 'JetBrains Mono',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                ✦ Toque no Eclipse para pulsar energia ✦
              </div>
            </div>

            {/* Studio Live Telemetry Card */}
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '1.25rem',
                border: '1px solid rgba(183, 109, 255, 0.25)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  color: 'var(--color-outline)',
                }}
              >
                <span>Studio Node #ECL-01</span>
                <span style={{ color: 'var(--color-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-tertiary)',
                    }}
                  />
                  Live Pipeline
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>Conan Mod Kit</span>
                  <span className="font-mono" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                    Verified v4.8
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>Game Engines</span>
                  <span className="font-mono" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    UE4 &amp; UE5 Ready
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>Bioma Ativo</span>
                  <span className="font-mono" style={{ color: 'var(--color-on-surface)' }}>
                    Hyborian Astral Plains
                  </span>
                </div>
              </div>

              {/* Glowing Pulse Bar */}
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: 'var(--color-surface-container-high)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  marginTop: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '80%',
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-tertiary), var(--color-secondary))',
                    animation: 'pulseGlow 2.5s infinite alternate ease-in-out',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
