import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import { EXPERIENCE, EDUCATION } from '../../data/experience';
import TimelineItem from '../ui/TimelineItem';
import { CVViewerModal } from '../ui/CVViewerModal';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePerspective } from '../../contexts/PerspectiveContext';

export const Experience = () => {
  const { t } = useLanguage();
  const { perspective } = usePerspective();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLang, setModalLang] = useState<'pt' | 'en'>('pt');

  const handleOpenModal = (lang: 'pt' | 'en') => {
    setModalLang(lang);
    setModalOpen(true);
  };

  return (
    <section id="experience" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
            style={{ color: 'var(--accent-from)' }}
          >
            Carreira & Evolução
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t.experience.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {perspective === 'client' ? t.experience.descClient : t.experience.descDev}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div
            className="absolute left-1/2 top-4 bottom-0 w-0.5 -translate-x-1/2 rounded-full hidden md:block"
            style={{
              background: 'linear-gradient(180deg, var(--accent-from), var(--accent-to))',
              boxShadow: '0 0 20px var(--glow)',
            }}
          />
          <div className="space-y-8 pt-0">
            {EXPERIENCE.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">
            {t.experience.educationTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] text-center mb-6">
            {t.experience.educationSubtitle}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-5 border border-[var(--glass-border)] flex flex-col justify-between"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 25px var(--glow)',
                }}
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--accent-from)]">
                    {edu.period}
                  </span>
                  <h4 className="font-bold text-base text-[var(--text-primary)] mt-1 mb-0.5">
                    {edu.course}
                  </h4>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">
                    {edu.institution}
                  </p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CV Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          style={{ boxShadow: '0 0 35px var(--glow)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-3.5 rounded-2xl text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              }}
            >
              <FaFilePdf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[var(--text-primary)]">
                {t.nav.cv} Completo em PDF
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Disponível em Português e Inglês para visualização imediata.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-end w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleOpenModal('pt')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--accent-from)] text-[var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FaEye className="w-3.5 h-3.5" />
              {t.nav.viewCvPt}
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal('en')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--accent-from)] text-[var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FaEye className="w-3.5 h-3.5" />
              {t.nav.viewCvEn}
            </button>
            <a
              href="/curriculo-pt-br.pdf"
              download="Curriculo-Daniel-Reis-PT.pdf"
              className="p-2.5 rounded-xl border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors"
              title="Download Direto (PT)"
            >
              <FaDownload className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Modal */}
        <CVViewerModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialLang={modalLang}
        />
      </div>
    </section>
  );
};

export default Experience;
