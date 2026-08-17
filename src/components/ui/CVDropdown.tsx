import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaDownload, FaEye, FaChevronDown } from 'react-icons/fa';
import { CVViewerModal } from './CVViewerModal';

interface CVDropdownProps {
  variant?: 'primary' | 'outline' | 'compact';
  className?: string;
}

export const CVDropdown = ({ variant = 'outline', className = '' }: CVDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLang, setModalLang] = useState<'pt' | 'en'>('pt');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenViewer = (lang: 'pt' | 'en') => {
    setModalLang(lang);
    setModalOpen(true);
    setIsOpen(false);
  };

  const baseButtonStyles = variant === 'primary'
    ? 'px-6 py-3 rounded-xl font-bold text-white border-0 cursor-pointer flex items-center gap-2 select-none shadow-lg'
    : variant === 'compact'
      ? 'px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer flex items-center gap-1.5 select-none transition-all'
      : 'px-6 py-3 rounded-xl font-bold border-2 cursor-pointer flex items-center gap-2 select-none transition-all';

  const buttonStyle = variant === 'primary'
    ? {
        background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
        boxShadow: '0 0 25px var(--glow)',
      }
    : variant === 'compact'
    ? {
        background: 'var(--glass-bg)',
        color: 'var(--accent-from)',
        borderColor: 'var(--accent-from)',
      }
    : {
        background: 'var(--glass-bg)',
        color: 'var(--accent-from)',
        borderColor: 'var(--accent-from)',
      };

  return (
    <>
      <div ref={dropdownRef} className={`relative inline-block ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`${baseButtonStyles} hover:scale-[1.02] active:scale-[0.98] transition-transform`}
          style={buttonStyle}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaFilePdf className="w-4 h-4 text-red-500 shrink-0" />
          <span>{variant === 'compact' ? 'Currículo' : 'Currículo / CV'}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-0.5"
          >
            <FaChevronDown className="w-3 h-3 opacity-80" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-80 rounded-2xl border-2 p-3.5 z-50 shadow-2xl"
              style={{
                background: 'var(--bg-primary)',
                borderColor: 'var(--glass-border)',
                boxShadow: '0 12px 45px var(--glow)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between pb-2.5 mb-2.5 border-b"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <FaFilePdf className="text-red-500" /> Currículo
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 font-bold border border-red-500/30">
                  PDF Interativo
                </span>
              </div>

              {/* Option 1: Português (PT-BR) */}
              <div
                className="p-2.5 rounded-xl border mb-2.5"
                style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-sm font-bold flex items-center gap-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span className="text-base">🇧🇷</span> Português (PT-BR)
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenViewer('pt')}
                    className="flex-1 py-2 px-2.5 rounded-lg text-xs font-bold border-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:text-white"
                    style={{
                      borderColor: 'var(--accent-from)',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-from)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                    }}
                    title="Visualizar currículo no site"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    Abrir no Site
                  </button>
                  <a
                    href="/curriculo-pt-br.pdf"
                    download="Curriculo-Daniel-Reis-pt-BR.pdf"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2 px-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-md hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    }}
                    title="Baixar arquivo PDF"
                  >
                    <FaDownload className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>

              {/* Option 2: English (EN-US) */}
              <div
                className="p-2.5 rounded-xl border"
                style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-sm font-bold flex items-center gap-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span className="text-base">🇺🇸</span> English (EN-US)
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenViewer('en')}
                    className="flex-1 py-2 px-2.5 rounded-lg text-xs font-bold border-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    style={{
                      borderColor: 'var(--accent-from)',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-from)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                    }}
                    title="Open resume in website modal"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    Abrir no Site
                  </button>
                  <a
                    href="/curriculum-en-us.pdf"
                    download="Curriculum-Daniel-Reis-en-US.pdf"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2 px-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-md hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    }}
                    title="Download PDF file"
                  >
                    <FaDownload className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Embedded In-site CV Viewer Modal */}
      <CVViewerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialLang={modalLang}
      />
    </>
  );
};
