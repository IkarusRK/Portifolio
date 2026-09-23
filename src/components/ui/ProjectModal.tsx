import React, { useEffect } from 'react';
import type { Project } from '../../data/portfolioData';
import { X, CheckCircle, Sparkles } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectForCommission?: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectForCommission,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCommissionClick = () => {
    cosmicAudio.playClick();
    if (onSelectForCommission) {
      onSelectForCommission(project.title);
    }
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          border: '1px solid rgba(183, 109, 255, 0.35)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(183, 109, 255, 0.25)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: 'var(--color-on-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title="Fechar (Esc)"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge-pill badge-primary">{project.category}</span>
            <span className="badge-pill badge-secondary">{project.engine}</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
            {project.title}
          </h2>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            {project.shortDesc}
          </p>
        </div>

        {/* Hero Visual Preview */}
        <div
          style={{
            width: '100%',
            height: '380px',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            backgroundColor: '#0c0717',
            marginBottom: '1.5rem',
            position: 'relative',
            border: '1px solid var(--glass-border)',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // Fallback to high-contrast cosmic gradient if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(12, 7, 23, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.35rem 0.8rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono',
              color: 'var(--color-secondary)',
              border: '1px solid rgba(255, 198, 64, 0.3)',
            }}
          >
            VERIFICADO • CONAN DEVKIT READY
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ background: 'var(--color-surface-container-high)', padding: '1rem', borderRadius: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-outline)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', display: 'block' }}>
              Orçamento de Polígonos
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontFamily: 'Space Grotesk' }}>
              {project.polycount}
            </strong>
          </div>

          <div style={{ background: 'var(--color-surface-container-high)', padding: '1rem', borderRadius: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-outline)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', display: 'block' }}>
              Texturas & Materiais
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-tertiary)', fontFamily: 'Space Grotesk' }}>
              {project.textures}
            </strong>
          </div>

          <div style={{ background: 'var(--color-surface-container-high)', padding: '1rem', borderRadius: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-outline)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', display: 'block' }}>
              Compatibilidade de Engine
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-secondary)', fontFamily: 'Space Grotesk' }}>
              {project.engine}
            </strong>
          </div>
        </div>

        {/* Software Stack */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-outline)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '0.5rem' }}>
            Software Utilizado no Pipeline:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.software.map((sw) => (
              <span
                key={sw}
                style={{
                  background: 'var(--color-surface-container-highest)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-on-surface)',
                  fontFamily: 'JetBrains Mono',
                }}
              >
                {sw}
              </span>
            ))}
          </div>
        </div>

        {/* Lore / Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 className="font-display" style={{ fontSize: '1.1rem', color: 'var(--color-on-surface)', marginBottom: '0.5rem' }}>
            História & Especificação Técnica
          </h4>
          <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {project.fullDesc}
          </p>
        </div>

        {/* Key Features List */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 className="font-display" style={{ fontSize: '1.1rem', color: 'var(--color-on-surface)', marginBottom: '0.75rem' }}>
            Destaques de Produção AAA:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {project.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
          <button
            onClick={onClose}
            className="btn-ghost"
          >
            Voltar à Galeria
          </button>

          <button
            onClick={handleCommissionClick}
            className="btn-primary"
          >
            <Sparkles size={16} />
            <span>Encomendar Projeto Sob Medida</span>
          </button>
        </div>
      </div>
    </div>
  );
};
