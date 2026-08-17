import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import { EXPERIENCE, EDUCATION } from '../../data/experience';
import TimelineItem from '../ui/TimelineItem';
import { CVViewerModal } from '../ui/CVViewerModal';

const Experience = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLang, setModalLang] = useState<'pt' | 'en'>('pt');

  const handleOpenModal = (lang: 'pt' | 'en') => {
    setModalLang(lang);
    setModalOpen(true);
  };

  return (
    <section id="experience" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center"
        >
          Experiência
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--text-secondary)] text-center mb-12 font-medium"
        >
          Trajetória e formações
        </motion.p>

        <div className="relative mb-16">
          <h3 className="text-lg font-bold text-[var(--accent-from)] mb-6 text-center">Cronologia</h3>
          <div
            className="absolute left-1/2 top-10 bottom-0 w-0.5 -translate-x-1/2 rounded-full hidden md:block"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-[var(--accent-from)] mb-6 text-center">Formações</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5 border border-[var(--glass-border)]"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 30px var(--glow)',
                }}
              >
                <p className="text-xs font-bold text-[var(--accent-from)]">{edu.period}</p>
                <h4 className="text-lg font-bold text-[var(--text-primary)] mt-1">{edu.course}</h4>
                <p className="text-sm font-semibold text-[var(--text-secondary)]">{edu.institution}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CV Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl p-6 md:p-8 border-2 border-[var(--glass-border)] text-center relative overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 35px var(--glow)',
          }}
        >
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-red-500/15 border border-red-500/30 text-red-500 shadow-sm">
              <FaFilePdf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Currículo Completo em PDF
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed font-medium">
              Tenha acesso detalhado ao meu histórico acadêmico, proficiências técnicas e contatos. Você pode abrir direto no site ou fazer o download.
            </p>

            <div className="flex flex-wrap gap-3 justify-center w-full max-w-lg">
              {/* PT-BR Button Group */}
              <div className="flex-1 min-w-[200px] p-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)] flex flex-col gap-2">
                <span className="text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                  <span>🇧🇷</span> Português (PT-BR)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModal('pt')}
                    className="flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border-2 border-[var(--accent-from)] text-[var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    Abrir
                  </button>
                  <a
                    href="/curriculo-pt-br.pdf"
                    download="Curriculo-Daniel-Reis-pt-BR.pdf"
                    className="flex-1 py-2 px-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    }}
                  >
                    <FaDownload className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>

              {/* EN-US Button Group */}
              <div className="flex-1 min-w-[200px] p-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)] flex flex-col gap-2">
                <span className="text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                  <span>🇺🇸</span> English (EN-US)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModal('en')}
                    className="flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border-2 border-[var(--accent-from)] text-[var(--text-primary)] hover:bg-[var(--accent-from)] hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    Open
                  </button>
                  <a
                    href="/curriculum-en-us.pdf"
                    download="Curriculum-Daniel-Reis-en-US.pdf"
                    className="flex-1 py-2 px-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    }}
                  >
                    <FaDownload className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <CVViewerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialLang={modalLang}
      />
    </section>
  );
};

export default Experience;
