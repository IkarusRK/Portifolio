import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderGit2, Clock, Globe, Code2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  description: string;
  tag: string;
  link?: string;
  isVisible: boolean;
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

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1200;
    const steps = 30;
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

  return (
    <span className="tabular-nums font-mono font-extrabold tracking-tight">
      {prefix}
      {Math.floor(display)}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const { perspective } = usePerspective();
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });

  const isPt = language === 'pt';

  const [githubData, setGithubData] = useState<{
    repos: number;
    years: number;
    liveProjects: number;
    avatarUrl: string;
    loaded: boolean;
  }>({
    repos: 34,
    years: 4,
    liveProjects: 10,
    avatarUrl: 'https://avatars.githubusercontent.com/u/119014909?v=4',
    loaded: false,
  });

  // Fetch live stats from GitHub API with graceful fallback
  useEffect(() => {
    fetch('https://api.github.com/users/IkarusRK')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API rate limited or offline');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.public_repos === 'number') {
          const createdYear = data.created_at ? new Date(data.created_at).getFullYear() : 2022;
          const currentYear = new Date().getFullYear();
          const years = Math.max(1, currentYear - createdYear + 1);
          setGithubData({
            repos: data.public_repos,
            years,
            liveProjects: 10,
            avatarUrl: data.avatar_url || 'https://avatars.githubusercontent.com/u/119014909?v=4',
            loaded: true,
          });
        }
      })
      .catch(() => {
        // Fallback default stats if GitHub API limit is reached
      });
  }, []);

  const statCards: StatCardProps[] = [
    {
      icon: FolderGit2,
      value: githubData.repos,
      prefix: '',
      suffix: '+',
      label: isPt ? 'Repositórios no GitHub' : 'GitHub Repositories',
      description: isPt
        ? 'Projetos públicos, sistemas e utilitários em @IkarusRK'
        : 'Open-source tools, systems and repositories at @IkarusRK',
      tag: 'GitHub Open Source',
      link: 'https://github.com/IkarusRK?tab=repositories',
      isVisible,
    },
    {
      icon: Clock,
      value: githubData.years,
      prefix: '',
      suffix: isPt ? '+ Anos' : '+ Yrs',
      label: isPt ? 'Histórico no GitHub' : 'Active on GitHub',
      description: isPt
        ? 'Contribuições ativas e engenharia contínua desde 2022'
        : 'Continuous engineering and commits since 2022',
      tag: isPt ? 'Desde 2022' : 'Since 2022',
      link: 'https://github.com/IkarusRK',
      isVisible,
    },
    {
      icon: Globe,
      value: githubData.liveProjects,
      prefix: '',
      suffix: isPt ? '+ Live' : '+ Live',
      label: isPt ? 'Aplicações em Produção' : 'Live Applications',
      description: isPt
        ? 'Projetos deployed com usuários reais (Netlify & Vercel)'
        : 'Live deployed systems with real users (Netlify & Vercel)',
      tag: 'Production Deploys',
      link: '#sites',
      isVisible,
    },
    {
      icon: Code2,
      value: 5,
      prefix: '',
      suffix: isPt ? ' Stacks' : ' Stacks',
      label: isPt ? 'Linguagens & Stacks' : 'Core Tech Stacks',
      description: isPt
        ? 'Java (Spring), React/TS, Python, C# e Lua'
        : 'Java (Spring), React/TS, Python, C# & Lua',
      tag: 'Multi-Stack Tech',
      link: '#skills',
      isVisible,
    },
  ];

  return (
    <section id="stats" className="py-14 px-4 relative z-10" style={{ background: 'transparent' }}>
      <div ref={ref} className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* GitHub Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-lg"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={githubData.avatarUrl}
                alt="Avatar GitHub IkarusRK"
                className="w-12 h-12 rounded-full border-2 border-[var(--accent-from)] shadow-md object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Daniel Reis
                </h3>
                <span className="text-xs font-mono text-[var(--accent-from)] font-semibold">
                  @IkarusRK
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  {isPt ? 'Métricas Oficiais' : 'Verified GitHub Metrics'}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {perspective === 'client'
                  ? isPt
                    ? 'Dados públicos de engenharia e histórico de desenvolvimento transparente.'
                    : 'Public engineering data and transparent software development track record.'
                  : isPt
                    ? 'Métricas de repositórios, versionamento e commits sincronizados via GitHub API.'
                    : 'Repository metrics, versioning and commit history via GitHub API.'}
              </p>
            </div>
          </div>

          <a
            href="https://github.com/IkarusRK"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold border border-[var(--glass-border)] hover:border-[var(--accent-from)] bg-[var(--glass-bg)] hover:bg-[var(--accent-from)] hover:text-white text-[var(--text-primary)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group shrink-0"
          >
            <FaGithub className="w-4 h-4 text-[var(--accent-from)] group-hover:text-white transition-colors" />
            <span>{isPt ? 'Explorar no GitHub' : 'View on GitHub'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            const CardElement = card.link?.startsWith('#') ? 'a' : card.link ? 'a' : 'div';
            const linkProps = card.link
              ? card.link.startsWith('#')
                ? { href: card.link }
                : { href: card.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <motion.div
                key={card.label + i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-lg p-5 flex flex-col justify-between overflow-hidden group transition-all"
                style={{
                  boxShadow: '0 8px 30px var(--glow)',
                }}
              >
                {/* Background glow decoration */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-15 group-hover:opacity-30 transition-opacity blur-2xl pointer-events-none"
                  style={{ background: 'var(--accent-from)' }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="p-2.5 rounded-xl text-white shadow-md"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                        boxShadow: '0 0 15px var(--glow)',
                      }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-[var(--glass-border)] bg-[var(--bg-primary)]/80 text-[var(--accent-from)]">
                      {card.tag}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-1">
                    <AnimatedCounter
                      value={card.value}
                      prefix={card.prefix}
                      suffix={card.suffix}
                      isVisible={isVisible}
                    />
                  </div>

                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-from)] transition-colors">
                    {card.label}
                  </h4>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {card.link && (
                  <CardElement
                    {...linkProps}
                    className="mt-4 pt-2.5 border-t border-[var(--glass-border)]/60 flex items-center justify-between text-[11px] font-semibold text-[var(--accent-from)] group-hover:underline cursor-pointer"
                  >
                    <span>{isPt ? 'Ver detalhes' : 'View details'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </CardElement>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Real Technologies verified on profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs select-none"
        >
          <span className="text-xs font-semibold text-[var(--text-secondary)] mr-1">
            {isPt ? 'Tecnologias comprovadas:' : 'Verified technologies:'}
          </span>
          {[
            '☕ Java / Spring Boot',
            '⚛️ React & TypeScript',
            '🐍 Python',
            '🎮 Lua High-Performance',
            '🔷 C# / .NET',
            '🧊 Three.js & WebGL 3D',
          ].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] text-[11px] font-medium shadow-xs"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
