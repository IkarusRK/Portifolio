import { motion } from 'framer-motion';
import { SITE_PROJECTS } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePerspective } from '../../contexts/PerspectiveContext';

const Sites = () => {
  const { t } = useLanguage();
  const { perspective } = usePerspective();

  return (
    <section id="sites" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
            style={{ color: 'var(--accent-from)' }}
          >
            {t.projects.featuredBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t.projects.sitesTitle}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {perspective === 'client' ? t.projects.sitesDescClient : t.projects.sitesDescDev}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sites;
