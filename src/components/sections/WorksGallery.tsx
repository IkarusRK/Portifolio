import { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';
import { cosmicAudio } from '../../utils/audioSynth';
import { Eye } from 'lucide-react';

interface WorksGalleryProps {
  onSelectProject: (project: Project) => void;
}

export const WorksGallery: React.FC<WorksGalleryProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = [
    'Todos',
    'Ambientes & Cidadelas',
    'Guerreiros & Criaturas',
    'Armas & Relíquias',
    'Props & DevKit',
  ];

  const filteredProjects =
    selectedCategory === 'Todos'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    cosmicAudio.playClick();
    setSelectedCategory(cat);
  };

  return (
    <section id="galeria-3d" className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
              Portfólio Interativo • 3D Assets
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
                Obras &amp; Modelos 3D
              </h2>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem', maxWidth: '580px', marginTop: '0.5rem' }}>
                Explore ativos de alta resolução com topologia validada vértice a vértice, UVs UDIM limpas e compatibilidade nativa para Conan Exiles e Unreal Engine 5.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div
              className="glass-panel"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                padding: '0.35rem',
                borderRadius: '0.75rem',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: selectedCategory === cat ? 'var(--color-primary-container)' : 'transparent',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--color-on-surface-variant)',
                    fontSize: '0.8rem',
                    fontFamily: 'JetBrains Mono',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedCategory === cat ? '0 0 12px var(--primary-glow)' : 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => {
                cosmicAudio.playClick();
                onSelectProject(project);
              }}
            >
              {/* Image Preview Box */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  backgroundColor: '#0c0717',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />

                {/* Overlaid Badges */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    gap: '0.4rem',
                  }}
                >
                  <span className="badge-pill badge-primary" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                    {project.category}
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0.75rem',
                    background: 'rgba(12, 7, 23, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '0.4rem',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.7rem',
                    color: 'var(--color-secondary)',
                    border: '1px solid rgba(255, 198, 64, 0.3)',
                  }}
                >
                  {project.polycount}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--color-on-surface)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-on-surface-variant)',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {project.shortDesc}
                  </p>
                </div>

                {/* Footer with Software & Action */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.35rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {(project.tags || (project as any).software || [])?.map((sw: string) => (
                      <span
                        key={sw}
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'JetBrains Mono',
                          color: 'var(--color-outline)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '0.25rem',
                        }}
                      >
                        {sw}
                      </span>
                    ))}
                  </div>

                  <button
                    className="btn-ghost"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.8rem',
                    }}
                  >
                    <Eye size={15} style={{ color: 'var(--color-primary)' }} />
                    <span>Inspecionar Folha de Assets</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
