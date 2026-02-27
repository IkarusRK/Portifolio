import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION } from '../../data/experience';
import TimelineItem from '../ui/TimelineItem';

const Experience = () => (
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
        className="text-[var(--text-secondary)] text-center mb-12"
      >
        Trajetória e formações
      </motion.p>

      <div className="relative mb-16">
        <h3 className="text-lg font-semibold text-[var(--accent-from)] mb-6 text-center">Cronologia</h3>
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
        <h3 className="text-lg font-semibold text-[var(--accent-from)] mb-6 text-center">Formações</h3>
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
              <p className="text-xs font-semibold text-[var(--accent-from)]">{edu.period}</p>
              <h4 className="text-lg font-bold text-[var(--text-primary)] mt-1">{edu.course}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{edu.institution}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Experience;
