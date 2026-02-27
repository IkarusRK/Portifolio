import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPreview = Boolean(project.previewUrl);
  const tooltipText = project.madeWith ?? `Feito com ${project.tags.join(', ')}.`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="h-full relative"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-2xl overflow-hidden border border-[var(--glass-border)] transition-transform duration-300 hover:scale-[1.02]"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 0 30px var(--glow)',
        }}
      >
        {hasPreview && (
          <div className="relative h-40 overflow-hidden">
            <iframe
              src={project.previewUrl}
              title={`Preview ${project.title}`}
              className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none"
              sandbox="allow-scripts"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--glass-bg)] via-transparent to-transparent opacity-80" />
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium bg-black/40 text-white pointer-events-none">
              {project.status}
            </div>
            {project.id === 'relogio-ikarus' && (
              <div className="absolute bottom-2 left-2 right-2 text-center text-xs text-[var(--text-secondary)] pointer-events-none">
                Clique no card para abrir — o relógio atualiza em tempo real no site
              </div>
            )}
          </div>
        )}
        {!hasPreview && (
          <div
            className="h-28 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
              opacity: 0.9,
            }}
          >
            <span className="text-white/90 font-semibold">{project.status}</span>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">{project.title}</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full border border-[var(--glass-border)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-[var(--accent-from)] inline-flex items-center gap-1">
            Ver projeto
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </a>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full z-20 pointer-events-none mb-2"
          >
            <div
              className="max-w-[280px] px-3 py-2 rounded-xl text-xs text-center border shadow-lg relative"
              style={{
                background: 'var(--glass-bg)',
                borderColor: 'var(--glass-border)',
                color: 'var(--text-primary)',
                boxShadow: '0 0 24px var(--glow)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {tooltipText}
              <span
                className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45 border-r border-b -mt-1"
                style={{
                  background: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
