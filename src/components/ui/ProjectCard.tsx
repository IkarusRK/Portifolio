import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaClock,
  FaTerminal,
  FaCalculator,
  FaLock,
  FaUsers,
  FaGamepad,
  FaShieldAlt,
  FaChartLine,
  FaBook,
  FaGithub,
  FaExternalLinkAlt,
  FaPlay
} from 'react-icons/fa';
import type { Project } from '../../types';
import { PreviewModal } from './PreviewModal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const getProjectIcon = (type?: string) => {
  const css = "w-7 h-7 text-white opacity-90 drop-shadow";
  switch (type) {
    case 'clock': return <FaClock className={css} />;
    case 'terminal': return <FaTerminal className={css} />;
    case 'calculator': return <FaCalculator className={css} />;
    case 'lock': return <FaLock className={css} />;
    case 'users': return <FaUsers className={css} />;
    case 'gamepad': return <FaGamepad className={css} />;
    case 'shield': return <FaShieldAlt className={css} />;
    case 'chart': return <FaChartLine className={css} />;
    case 'book': return <FaBook className={css} />;
    default: return <FaExternalLinkAlt className={css} />;
  }
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPreview = Boolean(project.previewUrl);
  const tooltipText = project.madeWith ?? `Feito com ${project.tags.join(', ')}.`;

  const handleCardClick = () => {
    if (hasPreview) {
      setIsModalOpen(true);
    } else {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="h-full relative flex flex-col rounded-2xl overflow-hidden border border-[var(--glass-border)] transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 0 30px var(--glow)',
      }}
    >
      {/* Top Cover Visual */}
      <div
        onClick={handleCardClick}
        className="relative h-36 flex flex-col items-center justify-center cursor-pointer overflow-hidden group select-none shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
        }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-white/10 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
            {getProjectIcon(project.icon)}
          </div>
          {hasPreview && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] font-semibold text-white/90 shadow group-hover:opacity-0 transition-opacity duration-300">
              <FaPlay className="w-2 h-2 text-green-400" />
              Demo Interativa
            </div>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xs font-semibold px-4 py-2 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm shadow flex items-center gap-1.5 animate-pulse">
            {hasPreview ? 'Abrir Demonstração 💻' : 'Visitar Site 🚀'}
          </span>
        </div>

        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/40 text-white select-none">
          {project.status}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1.5 leading-snug">{project.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-1">{project.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 shrink-0 pt-2 border-t border-[var(--glass-border)]">
          {hasPreview && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-white text-center cursor-pointer transition-shadow"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                boxShadow: '0 0 15px var(--glow)',
              }}
            >
              Demo Live
            </button>
          )}
          
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-center border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors flex items-center justify-center gap-1"
          >
            {!hasPreview ? 'Visitar' : 'Visitar'}
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center"
              title="Ver código no GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}

          {project.creditsUrl && (
            <a
              href={project.creditsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border border-[var(--glass-border)] text-xs font-bold text-center text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center gap-1 shrink-0"
              title="Créditos do projeto"
            >
              Créditos
            </a>
          )}
        </div>
      </div>

      {/* Tooltip on Hover */}
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

      {/* Interactive Iframe Preview Modal */}
      {hasPreview && (
        <PreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={project.title}
          url={project.previewUrl!}
        />
      )}
    </motion.div>
  );
};

export default ProjectCard;
