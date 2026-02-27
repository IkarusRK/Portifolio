import { motion } from 'framer-motion';
import { APP_PROJECTS } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => (
  <section id="applications" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center"
      >
        Aplicações Web
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[var(--text-secondary)] text-center mb-12"
      >
        Projetos e ferramentas desenvolvidas
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {APP_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
