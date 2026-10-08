import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../../data/skills';
import { TechBadge } from '../ui/TechBadge';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePerspective } from '../../contexts/PerspectiveContext';

export const Skills = () => {
  const { t } = useLanguage();
  const { perspective } = usePerspective();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const tabCategories = [
    { id: 'all', label: t.skills.allCategories },
    { id: 'gta', label: t.skills.categories.gta },
    { id: '3d', label: t.skills.categories['3d'] },
    { id: 'nui', label: t.skills.categories.nui },
    { id: 'backend', label: t.skills.categories.backend },
    { id: 'frontend', label: t.skills.categories.frontend },
    { id: 'tools', label: t.skills.categories.tools },
  ];

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
            style={{ color: 'var(--accent-from)' }}
          >
            Stack & Ferramentas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t.skills.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {perspective === 'client' ? t.skills.descClient : t.skills.descDev}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center flex-wrap gap-2 mb-12 max-w-2xl mx-auto p-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md"
        >
          {tabCategories.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer select-none transition-colors duration-200 ${
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + perspective}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5"
          >
            {filteredSkills.map((skill, index) => {
              const displayName =
                perspective === 'client' && skill.clientName ? skill.clientName : skill.name;
              return (
                <TechBadge
                  key={skill.id}
                  name={displayName}
                  icon={skill.icon}
                  index={index}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
