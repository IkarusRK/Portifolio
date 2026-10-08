import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MousePointer, Sliders, Terminal, Briefcase, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface PortfolioGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioGuideModal = ({ isOpen, onClose }: PortfolioGuideModalProps) => {
  const { language } = useLanguage();

  const isPt = language === 'pt';

  const guideItems = [
    {
      icon: MousePointer,
      title: isPt ? 'Física 3D Interativa' : 'Interactive 3D Physics',
      desc: isPt
        ? 'Clique e segure em qualquer espaço vazio do fundo para atrair a nuvem de partículas para o seu cursor. Use os botões no banner para moldar a geometria 3D.'
        : 'Click and hold on any empty background area to pull the particle cloud towards your cursor. Use the hero buttons to morph 3D shapes.',
      highlight: isPt ? 'Segure o clique no fundo' : 'Click & hold background',
    },
    {
      icon: Briefcase,
      title: isPt ? 'Perspectiva Dupla (Recrutador / Dev)' : 'Dual Perspective (Recruiter / Dev)',
      desc: isPt
        ? 'Alterne no topo do site para visualizar as informações sob a ótica de Negócios/Resultados ou Engenharia Técnica/Arquitetura.'
        : 'Toggle at the top to view information tailored for Business/Recruiting or Technical Engineering/Code.',
      highlight: isPt ? 'Botão no topo' : 'Top toggle button',
    },
    {
      icon: Sliders,
      title: isPt ? 'Temas & Modo Claro / Escuro' : 'Themes & Light / Dark Mode',
      desc: isPt
        ? 'Personalize o visual com 5 paletas de cores modernas e alterne entre Modo Claro e Escuro instantaneamente.'
        : 'Customize aesthetics across 5 modern color palettes and switch between Light and Dark mode instantly.',
      highlight: isPt ? 'Ícone de Sol / Lua' : 'Sun / Moon icon',
    },
    {
      icon: Terminal,
      title: isPt ? 'Terminal Interativo [F8]' : 'Developer Terminal [F8]',
      desc: isPt
        ? "Pressione a tecla 'F8' no teclado ou clique no botão no canto inferior para abrir o console interativo com comandos reais."
        : "Press 'F8' on your keyboard or click the bottom button to open the interactive developer console with real commands.",
      highlight: isPt ? "Pressione 'F8'" : "Press 'F8'",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
            style={{
              boxShadow: '0 20px 60px var(--glow)',
            }}
          >
            {/* Background Glow Ornament */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
              style={{ background: 'var(--accent-from)' }}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--accent-from)] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isPt ? 'Guia Rápido do Portfólio' : 'Portfolio Interactive Guide'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {isPt ? 'Como interagir com o portfólio?' : 'How to interact with this portfolio?'}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  {isPt
                    ? 'Este portfólio foi desenvolvido como uma aplicação web interativa e viva. Veja os principais recursos:'
                    : 'This portfolio was built as an interactive, live web experience. Here are the core features:'}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] border border-[var(--glass-border)] cursor-pointer transition-colors shrink-0"
                aria-label="Fechar guia"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {guideItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div
                          className="p-2 rounded-xl text-white shadow-sm shrink-0"
                          style={{
                            background:
                              'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--glass-border)]/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold text-[var(--accent-from)]">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--glass-border)]">
              <span className="text-xs text-[var(--text-secondary)] text-center sm:text-left">
                {isPt
                  ? '💡 Você pode reabrir este guia a qualquer momento no banner principal.'
                  : '💡 You can reopen this guide anytime from the hero section.'}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                }}
              >
                <Check className="w-4 h-4" />
                {isPt ? 'Entendi, vamos lá!' : 'Got it, let’s go!'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioGuideModal;
