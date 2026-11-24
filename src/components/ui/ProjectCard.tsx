import { useState } from 'react';
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
  FaCheckCircle,
  FaGlobe,
  FaBalanceScale,
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
  const css = 'w-6 h-6 text-white opacity-95 drop-shadow-md';
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
    case 'scale':
      return <FaBalanceScale className={css} />;
    default:
      return <FaExternalLinkAlt className={css} />;
  }
};

const formatCleanHost = (url: string): string => {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname && parsed.pathname !== '/' ? parsed.pathname.replace(/\/$/, '') : '';
    return `${parsed.hostname}${path}`;
  } catch {
    return url.replace(/^https?:\/\//, '');
  }
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { perspective } = usePerspective();
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasPreview = Boolean(project.previewUrl);
  const hasImage = Boolean(project.previewImage);
  const cleanHost = formatCleanHost(project.link);

  const displayDescription =
    perspective === 'client' && project.clientDescription
      ? project.clientDescription
      : project.description;

  const displayTags =
    perspective === 'client' && project.clientTags && project.clientTags.length > 0
      ? project.clientTags
      : project.tags;

  const displayHighlights =
    perspective === 'client' && project.clientHighlights && project.clientHighlights.length > 0
      ? project.clientHighlights
      : project.highlights;

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`h-full relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 ${
        project.featured
          ? 'border-[var(--accent-from)]/70 shadow-2xl'
          : 'border-[var(--glass-border)] hover:border-[var(--accent-from)]/50'
      }`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        boxShadow: project.featured ? '0 0 40px var(--glow)' : '0 0 25px var(--glow)',
      }}
    >
      {/* Top Browser Chrome Bar */}
      <div
        onClick={handleCardClick}
        className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[#0b0b12]/95 border-b border-white/10 cursor-pointer select-none shrink-0"
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/85" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/85" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85" />
        </div>

        <div className="flex-1 min-w-0 max-w-[240px] mx-auto px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-mono text-white/75 truncate">
          <FaGlobe className="w-2.5 h-2.5 text-[var(--accent-from)] shrink-0" />
          <span className="truncate">{cleanHost}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {project.featured && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-extrabold uppercase tracking-wider shadow">
              <FaStar className="w-2 h-2" />
              {t.projects.featuredBadge}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>
        </div>
      </div>

      {/* Static High-Res Screenshot Preview (Zero GPU/CPU overhead; live iframe opens in modal) */}
      <div
        onClick={handleCardClick}
        className="relative h-52 sm:h-56 w-full bg-[#09090f] cursor-pointer overflow-hidden group select-none shrink-0 border-b border-[var(--glass-border)]"
      >
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
            hasImage && imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: project.featured
              ? 'radial-gradient(circle at 50% 30%, var(--accent-from), #09090f 75%)'
              : 'radial-gradient(circle at 50% 30%, var(--accent-to), #09090f 75%)',
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-md">
              {getProjectIcon(project.icon)}
            </div>
            <span className="text-xs font-bold text-white/90 tracking-wide">{project.title}</span>
            <span className="text-[10px] font-mono text-white/60 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {hasPreview
                ? isPt
                  ? 'Clique para abrir demo ao vivo'
                  : 'Click to open live demo'
                : isPt
                ? 'Sistema em produção • Abrir portal'
                : 'Live production app • Open portal'}
            </span>
          </div>
        </div>

        {hasImage && (
          <img
            src={project.previewImage}
            alt={`Preview ${project.title}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none flex items-end justify-between px-3.5 pb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/65 border border-white/15 text-[10px] font-semibold text-white/95 backdrop-blur-md shadow">
            {hasPreview ? (
              <>
                <FaPlay className="w-2 h-2 text-emerald-400" />
                {t.projects.interactiveDemoBadge}
              </>
            ) : (
              <>
                <FaExternalLinkAlt className="w-2 h-2 text-emerald-400" />
                {isPt ? 'Acesso Direto ao Portal' : 'Direct Live Portal'}
              </>
            )}
          </span>
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex items-center gap-1.5">
              {project.metrics.slice(0, 2).map((m) => (
                <span
                  key={m.label}
                  className="px-2 py-0.5 rounded-md bg-black/70 border border-white/15 text-[10px] font-mono text-white/90 backdrop-blur-md"
                >
                  <strong className="text-[var(--accent-from)]">{m.value}</strong>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center backdrop-blur-[2px] p-4">
          <span
            className="text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-250"
            style={{
              background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              boxShadow: '0 0 25px var(--glow)',
            }}
          >
            <FaPlay className="w-3 h-3" />
            {hasPreview ? t.projects.openDemo : t.projects.visitSite}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1.5 leading-snug">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3.5 leading-relaxed">
          {displayDescription}
        </p>

        {displayHighlights && displayHighlights.length > 0 && (
          <div className="mb-4 p-3 rounded-xl border border-[var(--glass-border)] bg-black/20 space-y-1.5">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-from)] mb-1">
              {perspective === 'client'
                ? isPt
                  ? '✓ O que este projeto entrega na prática:'
                  : '✓ Practical value delivered:'
                : isPt
                ? '✓ O que foi implementado no código:'
                : '✓ Engineered & implemented:'}
            </p>
            {displayHighlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-snug">
                <FaCheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 shrink-0 pt-3 border-t border-[var(--glass-border)]">
          {hasPreview && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 px-3 py-2.5 rounded-xl text-xs font-bold text-white text-center cursor-pointer transition-transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                boxShadow: '0 0 15px var(--glow)',
              }}
            >
              <FaPlay className="w-2.5 h-2.5" />
              {t.projects.demoBtn}
            </button>
          )}

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2.5 rounded-xl text-xs font-bold text-center border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center gap-1.5"
          >
            {t.projects.visitBtn}
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
              title={t.projects.codeBtn}
            >
              <FaGithub className="w-4 h-4" />
              <span className="hidden sm:inline">{t.projects.codeBtn}</span>
            </a>
          )}

          {project.creditsUrl && (
            <a
              href={project.creditsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl border border-[var(--glass-border)] text-xs font-bold text-center text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-from)] transition-all flex items-center justify-center gap-1 shrink-0"
              title={t.projects.creditsBtn}
            >
              {t.projects.creditsBtn}
            </a>
          )}
        </div>
      </div>

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
