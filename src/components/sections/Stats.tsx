import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Zap, Clock, FolderGit2, Sparkles, type LucideIcon } from 'lucide-react';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  description: string;
}

const AnimatedCounter = ({
  value,
  prefix,
  suffix,
  isVisible,
}: {
  value: number;
  prefix: string;
  suffix: string;
  isVisible: boolean;
}) => {
  const [display, setDisplay] = useState(0);
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1600;
    const steps = 50;
    const stepTime = duration / steps;
    let current = 0;
    const increment = value / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatted = isDecimal ? display.toFixed(2) : Math.floor(display).toString();

  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const { perspective } = usePerspective();
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });

  const clientStats: StatItem[] = [
    {
      icon: Sparkles,
      value: 50,
      suffix: '+',
      prefix: '',
      label: t.stats.client.stat1Label,
      description: t.stats.client.stat1Desc,
    },
    {
      icon: Zap,
      value: 100,
      suffix: '%',
      prefix: '',
      label: t.stats.client.stat2Label,
      description: t.stats.client.stat2Desc,
    },
    {
      icon: Clock,
      value: 4,
      suffix: '+',
      prefix: '',
      label: t.stats.client.stat3Label,
      description: t.stats.client.stat3Desc,
    },
    {
      icon: FolderGit2,
      value: 10,
      suffix: '+',
      prefix: '',
      label: t.stats.client.stat4Label,
      description: t.stats.client.stat4Desc,
    },
  ];

  const devStats: StatItem[] = [
    {
      icon: Code2,
      value: 50,
      suffix: '+',
      prefix: '',
      label: t.stats.dev.stat1Label,
      description: t.stats.dev.stat1Desc,
    },
    {
      icon: Zap,
      value: 0.01,
      suffix: 'ms',
      prefix: '',
      label: t.stats.dev.stat2Label,
      description: t.stats.dev.stat2Desc,
    },
    {
      icon: Clock,
      value: 4,
      suffix: '+',
      prefix: '',
      label: t.stats.dev.stat3Label,
      description: t.stats.dev.stat3Desc,
    },
    {
      icon: FolderGit2,
      value: 10,
      suffix: '+',
      prefix: '',
      label: t.stats.dev.stat4Label,
      description: t.stats.dev.stat4Desc,
    },
  ];

  const stats = perspective === 'client' ? clientStats : devStats;

  return (
    <section className="py-14 px-4 relative z-10" style={{ background: 'var(--bg-primary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label + i}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center gap-2 rounded-2xl p-5 border border-[var(--glass-border)] overflow-hidden"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 30px var(--glow)',
              }}
            >
              {/* Glow ambient blob */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{ background: 'var(--accent-from)' }}
              />

              <div
                className="p-2.5 rounded-xl text-white shadow-md"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                  boxShadow: '0 0 16px var(--glow)',
                }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              <p className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </p>

              <p className="text-sm font-bold text-[var(--text-primary)]">{stat.label}</p>
              <p className="text-[11px] leading-tight text-[var(--text-secondary)]">
                {stat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
