import { motion } from 'framer-motion';
import { SITE_PROJECTS } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const Sites = () => (
  <section id="sites" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center"
      >
        Sites Completos | Landing Pages
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[var(--text-secondary)] text-center mb-12"
      >
        Landing pages e sites institucionais
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITE_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Sites;
