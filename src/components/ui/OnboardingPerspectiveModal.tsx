import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code2, CheckCircle2, X } from 'lucide-react';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const OnboardingPerspectiveModal = () => {
  const { isOnboardingOpen, closeOnboarding, setPerspective } = usePerspective();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnboarding}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-3xl border border-[var(--glass-border)] p-6 sm:p-8 z-10 overflow-hidden shadow-2xl my-auto"
            style={{
              background: 'var(--bg-primary)',
              boxShadow: '0 0 50px var(--glow)',
            }}
          >
            {/* Background ambient glow blob */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
              style={{ background: 'var(--accent-from)' }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'var(--accent-to)' }}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={closeOnboarding}
              className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] border border-transparent hover:border-[var(--glass-border)] transition-all cursor-pointer z-10"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 pr-6 pl-6">
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
                style={{ color: 'var(--accent-from)' }}
              >
                Daniel Reis • Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
                {t.perspective.modalTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                {t.perspective.modalSubtitle}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Option 1: Cliente / Dono de Servidor / Empresa */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPerspective('client')}
                className="relative text-left p-5 sm:p-6 rounded-2xl border border-[var(--glass-border)] transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
                style={{
                  background: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, var(--glow), transparent 70%)',
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-2xl text-white shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                        boxShadow: '0 0 20px var(--glow)',
                      }}
                    >
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t.perspective.recommendedBadge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-from)] transition-colors">
                    {t.perspective.clientCardTitle}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {t.perspective.clientCardDesc}
                  </p>

                  <ul className="space-y-2 mb-5 text-[11px] text-[var(--text-secondary)]">
                    {t.perspective.clientCardBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white transition-shadow group-hover:shadow-lg mt-auto"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    boxShadow: '0 0 15px var(--glow)',
                  }}
                >
                  {t.perspective.clientCardBtn}
                </div>
              </motion.button>

              {/* Option 2: Dev / Recrutador Tech */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPerspective('dev')}
                className="relative text-left p-5 sm:p-6 rounded-2xl border border-[var(--glass-border)] transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
                style={{
                  background: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, var(--glow), transparent 70%)',
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-2xl border border-[var(--glass-border)] text-[var(--text-primary)]"
                      style={{
                        background: 'var(--glass-bg)',
                      }}
                    >
                      <Code2 className="w-6 h-6 text-[var(--accent-from)]" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {t.perspective.technicalBadge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-from)] transition-colors">
                    {t.perspective.devCardTitle}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {t.perspective.devCardDesc}
                  </p>

                  <ul className="space-y-2 mb-5 text-[11px] text-[var(--text-secondary)]">
                    {t.perspective.devCardBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-[var(--text-primary)] border border-[var(--glass-border)] bg-[var(--glass-bg)] group-hover:border-[var(--accent-from)] transition-colors mt-auto">
                  {t.perspective.devCardBtn}
                </div>
              </motion.button>
            </div>

            {/* Footer note */}
            <div className="mt-6 text-center flex flex-col items-center gap-2">
              <p className="text-[11px] text-[var(--text-secondary)]">
                {t.perspective.modalFooterNote}
              </p>
              <button
                type="button"
                onClick={closeOnboarding}
                className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
              >
                {t.perspective.skip}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingPerspectiveModal;
