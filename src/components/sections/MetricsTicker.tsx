import React from 'react';
import { ARTIST_INFO } from '../../data/portfolioData';
import { Box, Users, Star, Award } from 'lucide-react';

export const MetricsTicker: React.FC = () => {
  const icons = [
    <Box size={28} style={{ color: 'var(--color-primary)' }} />,
    <Users size={28} style={{ color: 'var(--color-secondary)' }} />,
    <Star size={28} style={{ color: 'var(--color-tertiary)' }} />,
    <Award size={28} style={{ color: 'var(--color-secondary)' }} />,
  ];

  return (
    <section style={{ position: 'relative', zIndex: 10, paddingBottom: '3rem' }}>
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {ARTIST_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: 'var(--color-on-surface)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                  {stat.label}
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--glass-border)',
                }}
              >
                {icons[idx % icons.length]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
