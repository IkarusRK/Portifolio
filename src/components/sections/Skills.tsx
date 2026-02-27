import { motion } from 'framer-motion';
import { SKILLS } from '../../data/skills';
import { TechBadge } from '../ui/TechBadge';

const CATEGORIES = [
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tools', label: 'Ferramentas' },
] as const;

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--text-secondary)] text-center mb-12"
        >
          Tecnologias com as quais trabalho
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
          className="space-y-12"
        >
          {CATEGORIES.map((cat) => {
            const items = SKILLS.filter((s) => s.category === cat.id);
            return (
              <div key={cat.id}>
                <h3 className="text-lg font-semibold text-[var(--accent-from)] mb-4">{cat.label}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, i) => (
                    <TechBadge key={skill.id} name={skill.name} icon={skill.icon} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
