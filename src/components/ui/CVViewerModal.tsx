import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaDownload, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

interface CVViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLang?: 'pt' | 'en';
}

export const CVViewerModal = ({ isOpen, onClose, initialLang = 'pt' }: CVViewerModalProps) => {
  const [lang, setLang] = useState<'pt' | 'en'>(initialLang);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLang(initialLang);
      setIsLoading(true);
    }
  }, [isOpen, initialLang]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentPdfUrl = lang === 'pt' ? '/curriculo-pt-br.pdf' : '/curriculum-en-us.pdf';
  const downloadFileName = lang === 'pt' ? 'Curriculo-Daniel-Reis-pt-BR.pdf' : 'Curriculum-Daniel-Reis-en-US.pdf';
  const title = lang === 'pt' ? 'Currículo de Daniel Reis (PT-BR)' : 'Daniel Reis Resume (EN-US)';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-[var(--glass-border)] overflow-hidden shadow-2xl"
            style={{
              background: 'var(--bg-primary)',
              boxShadow: '0 0 50px var(--glow)',
            }}
          >
            {/* Header with High Contrast and Controls */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[var(--glass-border)] shrink-0"
              style={{
                background: 'var(--bg-primary)',
              }}
            >
              {/* Title Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 shadow-sm shrink-0">
                  <FaFilePdf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)] leading-tight">
                    Daniel Mata Reis
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    Desenvolvedor de Sistemas | Full Stack
                  </p>
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center p-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    setLang('pt');
                    setIsLoading(true);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${lang === 'pt'
                      ? 'text-white shadow-md'
                      : 'text-[var(--text-primary)] hover:text-[var(--accent-from)]'
                    }`}
                  style={{
                    background: lang === 'pt' ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' : 'transparent',
                  }}
                >
                  <span>🇧🇷</span>
                  <span>Português</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang('en');
                    setIsLoading(true);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${lang === 'en'
                      ? 'text-white shadow-md'
                      : 'text-[var(--text-primary)] hover:text-[var(--accent-from)]'
                    }`}
                  style={{
                    background: lang === 'en' ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' : 'transparent',
                  }}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5">
                <a
                  href={currentPdfUrl}
                  download={downloadFileName}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                  }}
                  title="Baixar arquivo PDF"
                >
                  <FaDownload className="w-3 h-3" />
                  <span className="hidden sm:inline">Baixar PDF</span>
                </a>

                <a
                  href={currentPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] hover:text-[var(--accent-from)] hover:bg-[var(--glass-bg)] transition-colors flex items-center justify-center"
                  title="Abrir em aba separada"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-transform hover:scale-105 flex items-center justify-center cursor-pointer shadow-md"
                  title="Fechar (Esc)"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Viewer Area */}
            <div className="flex-1 w-full bg-neutral-900 relative flex items-center justify-center overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--bg-primary)]">
                  <div className="w-10 h-10 border-4 border-[var(--accent-from)] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-[var(--text-primary)] animate-pulse">
                    Carregando currículo...
                  </p>
                </div>
              )}

              <iframe
                key={currentPdfUrl}
                src={`${currentPdfUrl}#view=FitH`}
                title={title}
                className="w-full h-full border-0 bg-neutral-100 dark:bg-neutral-900"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
