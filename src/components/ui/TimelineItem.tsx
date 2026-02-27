import { motion } from 'framer-motion';
import type { ExperienceItem as ExpItem } from '../../types';

interface TimelineItemProps {
  item: ExpItem;
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const isLeft = item.side === 'left';
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-5 border border-[var(--glass-border)] md:max-w-sm ${
          isLeft ? 'md:mr-auto md:mr-8' : 'md:ml-auto md:ml-8'
        }`}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 0 30px var(--glow)',
        }}
      >
        <p className="text-xs font-semibold text-[var(--accent-from)] mb-1">{item.period}</p>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.role}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-2">{item.company}</p>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border border-[var(--glass-border)]"
              style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
