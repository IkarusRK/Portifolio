import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ikarusrk', icon: 'github' },
  { label: 'Email', href: 'mailto:Danielreismax@gmail.com', icon: 'mail' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-reis-6ba189317/', icon: 'linkedin' },
];

const Contact = () => (
  <section id="contact" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto text-center rounded-3xl p-8 md:p-12 border border-[var(--glass-border)]"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 0 40px var(--glow)',
      }}
    >
      <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Vamos Trabalhar Juntos?</h2>
      <p className="text-[var(--text-secondary)] mb-8">
        Estou disponível para novos projetos e colaborações. Entre em contato e vamos criar algo incrível!
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {LINKS.map((link) => {
          const Icon = link.icon === 'github' ? FaGithub : link.icon === 'linkedin' ? FaLinkedin : FaEnvelope;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === 'Email' ? undefined : '_blank'}
              rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-from)] transition-colors"
              style={{ background: 'var(--glass-bg)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {link.label}
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  </section>
);

export default Contact;
