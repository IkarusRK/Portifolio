import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaCopy,
  FaCheck,
} from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';

const DISCORD_USER = '_kuronami.';
const EMAIL_ADDRESS = 'Danielreismax@gmail.com';

export const Contact = () => {
  const { perspective } = usePerspective();
  const { t } = useLanguage();

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  const contactCards = [
    {
      id: 'discord',
      label: 'Discord',
      value: DISCORD_USER,
      icon: SiDiscord,
      action: () => copyToClipboard(DISCORD_USER, 'discord'),
      actionLabel: copiedType === 'discord' ? 'Copiado!' : 'Copiar Tag',
    },
    {
      id: 'email',
      label: 'Email',
      value: EMAIL_ADDRESS,
      icon: FaEnvelope,
      action: () => copyToClipboard(EMAIL_ADDRESS, 'email'),
      actionLabel: copiedType === 'email' ? 'Copiado!' : 'Copiar Email',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/ikarusrk',
      icon: FaGithub,
      link: 'https://github.com/ikarusrk',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/daniel-reis-6ba189317',
      icon: FaLinkedin,
      link: 'https://www.linkedin.com/in/daniel-reis-6ba189317/',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: '+55 (71) 98111-3728',
      icon: FaWhatsapp,
      link: 'https://wa.me/5571981113728',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
            style={{ color: 'var(--accent-from)' }}
          >
            {t.contact.quickChat}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {perspective === 'client' ? t.contact.descClient : t.contact.descDev}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Channels Cards (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-3.5"
          >
            {contactCards.map((card) => {
              const Icon = card.icon;
              const isCopied = copiedType === card.id;

              return (
                <div
                  key={card.id}
                  className="p-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md flex items-center justify-between gap-3 transition-transform hover:scale-[1.01]"
                  style={{ boxShadow: '0 0 20px var(--glow)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="p-2.5 rounded-xl text-white shadow-sm shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[var(--text-primary)]">{card.label}</p>
                      <p className="text-xs text-[var(--text-secondary)] font-mono truncate">
                        {card.value}
                      </p>
                    </div>
                  </div>

                  {card.action ? (
                    <button
                      type="button"
                      onClick={card.action}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-from)] hover:bg-[var(--glass-bg)] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <FaCheck className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className="w-3 h-3 text-[var(--accent-from)]" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-from)] hover:bg-[var(--glass-bg)] transition-all flex items-center gap-1.5 shrink-0"
                    >
                      Acessar →
                    </a>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Direct Message Form (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-2xl relative overflow-hidden"
            style={{ boxShadow: '0 0 35px var(--glow)' }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-[var(--accent-from)]" />
              {t.contact.formTitle}
            </h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <FaCheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  {t.contact.successMsg}
                </h4>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-from)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-from)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-from)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    boxShadow: '0 0 25px var(--glow)',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      {t.contact.sendingBtn}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      {t.contact.sendBtn}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
