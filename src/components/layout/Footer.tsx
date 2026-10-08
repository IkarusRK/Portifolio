import { useLanguage } from '../../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      className="py-12 border-t border-[var(--glass-border)] text-center text-[var(--text-secondary)] text-xs sm:text-sm px-4"
      style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        <p className="font-bold text-sm text-[var(--text-primary)]">
          © {new Date().getFullYear()} Daniel Reis (IkarusRK). {t.footer.rights}
        </p>
        <p className="text-xs text-[var(--text-secondary)] max-w-md leading-relaxed">
          {t.footer.tagline}
        </p>
        <div className="flex gap-4 pt-2 text-xs font-mono text-[var(--accent-from)]">
          <a
            href="https://github.com/ikarusrk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://eclipsario.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Eclipsário 3D
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/daniel-reis-6ba189317/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
