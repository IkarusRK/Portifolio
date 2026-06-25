import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ikarusrk', icon: 'github' },
  { label: 'Email', href: 'mailto:Danielreismax@gmail.com', icon: 'mail' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-reis-6ba189317/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:Danielreismax@gmail.com', icon: 'mail' },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // Simulate API request (e.g. Web3Forms or email API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMessage('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Info and Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                Vamos Trabalhar Juntos?
              </h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-8 leading-relaxed">
                Estou disponível para novos projetos, propostas de emprego ou colaborações interessantes. 
                Envie uma mensagem ao lado ou entre em contato diretamente pelas redes sociais.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                Canais de Contato
              </span>
              {LINKS.map((link) => {
                const Icon = link.icon === 'github' ? FaGithub : link.icon === 'linkedin' ? FaLinkedin : FaEnvelope;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label === 'Email' ? undefined : '_blank'}
                    rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-from)] transition-all bg-[var(--glass-bg)] hover:shadow-lg hover:shadow-[var(--glow)]"
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 text-[var(--accent-from)] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--text-secondary)] font-medium leading-none mb-0.5">{link.label}</span>
                      <span className="text-sm font-semibold leading-tight">
                        {link.label === 'Email' ? 'Danielreismax@gmail.com' : link.label === 'GitHub' ? '@ikarusrk' : 'Daniel Reis'}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Glassmorphic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl p-6 md:p-8 border border-[var(--glass-border)] relative flex flex-col justify-center overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 40px var(--glow)',
            }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <FaCheckCircle className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Mensagem Enviada!</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-sm">
                    Obrigado pelo contato! Responderei sua mensagem o mais rápido possível no email fornecido.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white border-0 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                      boxShadow: '0 0 15px var(--glow)',
                    }}
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Envie um Email</h3>
                  
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                      Seu Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João Silva"
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-black/20 text-[var(--text-primary)] placeholder-slate-500 focus:outline-none focus:border-[var(--accent-from)] focus:ring-1 focus:ring-[var(--accent-from)] transition-all text-sm disabled:opacity-50"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                      Seu E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: joao@exemplo.com"
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-black/20 text-[var(--text-primary)] placeholder-slate-500 focus:outline-none focus:border-[var(--accent-from)] focus:ring-1 focus:ring-[var(--accent-from)] transition-all text-sm disabled:opacity-50"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escreva sua mensagem aqui..."
                      rows={4}
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-black/20 text-[var(--text-primary)] placeholder-slate-500 focus:outline-none focus:border-[var(--accent-from)] focus:ring-1 focus:ring-[var(--accent-from)] transition-all text-sm resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Error display */}
                  {status === 'error' && (
                    <div className="text-red-400 text-xs font-semibold bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                      {errorMessage || 'Erro ao enviar o formulário.'}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm border-0 flex items-center justify-center gap-2 cursor-pointer transition-all select-none disabled:opacity-75"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                      boxShadow: '0 0 20px var(--glow)',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-3.5 h-3.5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
