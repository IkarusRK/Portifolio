import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../../data/skills';
import { TechBadge } from '../ui/TechBadge';

const TAB_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tools', label: 'Ferramentas' },
] as const;

const SKILL_CATEGORIES = [
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tools', label: 'Ferramentas' },
] as const;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = SKILL_CATEGORIES.filter(
    (cat) => activeCategory === 'all' || cat.id === activeCategory
  );

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
          className="text-[var(--text-secondary)] text-center mb-8"
        >
          Tecnologias com as quais trabalho
        </motion.p>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center flex-wrap gap-2 mb-12 max-w-md mx-auto p-1 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md"
        >
          {TAB_CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-xl -z-10"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                      boxShadow: '0 0 15px var(--glow)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="space-y-12 min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const items = SKILLS.filter((s) => s.category === cat.id);
              if (items.length === 0) return null;
              
              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-[var(--accent-from)] mb-4">{cat.label}</h3>
                  <motion.div 
                    layout
                    className="flex flex-wrap gap-3"
                  >
                    {items.map((skill, i) => (
                      <TechBadge key={skill.id} name={skill.name} icon={skill.icon} index={i} />
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
