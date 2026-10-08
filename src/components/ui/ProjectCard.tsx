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
  FaPlay,
  FaCube,
  FaServer,
  FaCode,
  FaStar,
} from 'react-icons/fa';
import type { Project } from '../../types';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { PreviewModal } from './PreviewModal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const getProjectIcon = (type?: string) => {
  const css = 'w-7 h-7 text-white opacity-95 drop-shadow-md';
  switch (type) {
    case 'cube':
      return <FaCube className={css} />;
    case 'clock':
      return <FaClock className={css} />;
    case 'terminal':
      return <FaTerminal className={css} />;
    case 'calculator':
      return <FaCalculator className={css} />;
    case 'lock':
      return <FaLock className={css} />;
    case 'users':
      return <FaUsers className={css} />;
    case 'gamepad':
      return <FaGamepad className={css} />;
    case 'shield':
      return <FaShieldAlt className={css} />;
    case 'chart':
      return <FaChartLine className={css} />;
    case 'book':
      return <FaBook className={css} />;
    case 'server':
      return <FaServer className={css} />;
    case 'code':
      return <FaCode className={css} />;
    default:
      return <FaExternalLinkAlt className={css} />;
  }
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { perspective } = usePerspective();
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPreview = Boolean(project.previewUrl);

  const displayDescription =
    perspective === 'client' && project.clientDescription
      ? project.clientDescription
      : project.description;

  const displayTags =
    perspective === 'client' && project.clientTags && project.clientTags.length > 0
      ? project.clientTags
      : project.tags;

  const tooltipText = project.madeWith ?? `${displayTags.join(', ')}.`;

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
      className={`h-full relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] ${
        project.featured
          ? 'border-[var(--accent-from)]/60 shadow-xl'
          : 'border-[var(--glass-border)]'
      }`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        boxShadow: project.featured ? '0 0 35px var(--glow)' : '0 0 25px var(--glow)',
      }}
    >
      {/* Featured Ribbon / Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
          <FaStar className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{t.projects.featuredBadge}</span>
        </div>
      )}

      {/* Top Cover Visual */}
      <div
        onClick={handleCardClick}
        className="relative h-40 flex flex-col items-center justify-center cursor-pointer overflow-hidden group select-none shrink-0"
        style={{
          background: project.featured
            ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to), #d97706)'
            : 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
        }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
            {getProjectIcon(project.icon)}
          </div>
          {hasPreview && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/15 text-[10px] font-semibold text-white/95 shadow group-hover:opacity-0 transition-opacity duration-300">
              <FaPlay className="w-2 h-2 text-emerald-400" />
              {t.projects.interactiveDemoBadge}
            </div>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-white text-xs font-bold px-4 py-2 border border-white/20 rounded-xl bg-white/15 backdrop-blur-md shadow-lg flex items-center gap-1.5 animate-pulse">
            {hasPreview ? t.projects.openDemo : t.projects.visitSite}
          </span>
        </div>

        <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-black/50 text-white select-none border border-white/10 backdrop-blur-sm">
          {project.status}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1.5 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-1 leading-relaxed">
          {displayDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 shrink-0 pt-3 border-t border-[var(--glass-border)]">
          {hasPreview && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-white text-center cursor-pointer transition-transform hover:scale-[1.02] shadow-sm"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                boxShadow: '0 0 15px var(--glow)',
              }}
            >
              {t.projects.demoBtn}
            </button>
          )}

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-center border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center gap-1.5"
          >
            {t.projects.visitBtn}
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center"
              title={t.projects.codeBtn}
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
              title={t.projects.creditsBtn}
            >
              {t.projects.creditsBtn}
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
            className="absolute left-1/2 -translate-x-1/2 bottom-full z-30 pointer-events-none mb-2"
          >
            <div
              className="max-w-[280px] px-3.5 py-2 rounded-xl text-xs text-center border shadow-lg relative leading-snug"
              style={{
                background: 'var(--bg-primary)',
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
                  background: 'var(--bg-primary)',
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
