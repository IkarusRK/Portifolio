import React from 'react';
import { PIPELINE_STEPS } from '../../data/portfolioData';
import { useLanguage } from '../../i18n/LanguageContext';

export const PipelineSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="processo-3d" className="section-spacing" style={{ backgroundColor: 'var(--color-surface-dim)' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-tertiary)',
                boxShadow: '0 0 8px var(--color-tertiary)',
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {t.pipeline.badge}
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
            }}
          >
            {t.pipeline.title}
          </h2>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem', marginTop: '0.5rem' }}>
            {t.pipeline.subtitle}
          </p>
        </div>

        {/* 4 Pipeline Step Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {PIPELINE_STEPS.map((step, idx) => {
            const translatedStep = t.pipeline.steps[idx] || step;

            return (
              <div
                key={step.step}
                className="glass-card"
                style={{
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                {/* Step Number Watermark */}
                <div
                  className="font-display"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.25rem',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: 'rgba(183, 109, 255, 0.08)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {translatedStep.step}
                </div>

                <div>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.75rem',
                      color: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    PHASE {translatedStep.step}
                  </span>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-on-surface)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {translatedStep.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-on-surface-variant)',
                      lineHeight: 1.6,
                    }}
                  >
                    {translatedStep.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    height: '3px',
                    width: '100%',
                    backgroundColor: 'var(--color-surface-container-high)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(idx + 1) * 25}%`,
                      backgroundColor: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
