import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaLaptop, FaMobileAlt } from 'react-icons/fa';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const PreviewModal = ({ isOpen, onClose, title, url }: PreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full max-w-[92vw] max-h-[88vh] flex flex-col rounded-3xl border border-[var(--glass-border)] overflow-hidden shadow-2xl"
        style={{
          background: 'var(--bg-primary)',
          boxShadow: '0 0 50px var(--glow)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-[var(--glass-border)] shrink-0"
          style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex flex-col gap-0.5">
            <h3 className="font-bold text-lg text-[var(--text-primary)] leading-tight">{title}</h3>
            <span className="text-xs text-[var(--text-secondary)] line-clamp-1 opacity-80">{url}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Viewport Toggles (desktop vs mobile) */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl border border-[var(--glass-border)] bg-black/10">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
                  viewportMode === 'desktop'
                    ? 'bg-[var(--accent-from)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title="Visualização Desktop"
              >
                <FaLaptop className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
                  viewportMode === 'mobile'
                    ? 'bg-[var(--accent-from)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title="Visualização Mobile"
              >
                <FaMobileAlt className="w-3.5 h-3.5" />
                Celular
              </button>
            </div>

            {/* External Link */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors flex items-center justify-center"
              title="Abrir em nova aba"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>

            {/* Prominent red close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
              title="Fechar"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-black/30 relative flex items-center justify-center p-0 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--bg-primary)]">
              <div className="w-10 h-10 border-4 border-[var(--accent-from)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-[var(--text-secondary)] animate-pulse">
                Carregando demonstração interativa...
              </p>
            </div>
          )}

          {/* Iframe wrapper for device mode */}
          <motion.div
            animate={{
              width: viewportMode === 'mobile' ? '375px' : '100%',
              height: viewportMode === 'mobile' ? '667px' : '100%',
              borderRadius: viewportMode === 'mobile' ? '24px' : '0px',
              boxShadow: viewportMode === 'mobile' ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none',
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`relative overflow-hidden bg-white ${
              viewportMode === 'mobile' ? 'border-8 border-neutral-800' : 'h-full w-full'
            }`}
          >
            <iframe
              src={url}
              title={`Demo ${title}`}
              className="w-full h-full border-0 bg-white"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
