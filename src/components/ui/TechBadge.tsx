import { motion } from 'framer-motion';
import * as Si from 'react-icons/si';
import { FaJava, FaCube, FaGamepad, FaServer, FaCode, FaShieldAlt } from 'react-icons/fa';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  SiJava: FaJava,
  SiCplusplus: Si.SiCplusplus,
  SiPython: Si.SiPython,
  SiSpring: Si.SiSpring,
  SiMysql: Si.SiMysql,
  SiCsharp: Si.SiSharp ?? FaCode,
  SiJavascript: Si.SiJavascript,
  SiTypescript: Si.SiTypescript,
  SiReact: Si.SiReact,
  SiHtml5: Si.SiHtml5,
  SiCss3: Si.SiCss3,
  SiTailwindcss: Si.SiTailwindcss,
  SiGit: Si.SiGit,
  SiUbuntu: Si.SiUbuntu,
  SiSupabase: Si.SiSupabase,
  SiLua: Si.SiLua,
  SiBlender: Si.SiBlender,
  SiUnity: Si.SiUnity,
  SiUnrealengine: Si.SiUnrealengine,
  SiVuedotjs: Si.SiVuedotjs,
  SiDiscord: Si.SiDiscord,
  SiNodedotjs: Si.SiNodedotjs,
  FaCube,
  FaGamepad,
  FaServer,
  FaCode,
  FaShieldAlt,
};

interface TechBadgeProps {
  name: string;
  icon: string;
  index?: number;
  level?: 'core' | 'basic';
  levelBadge?: string;
}

export const TechBadge = ({
  name,
  icon,
  index = 0,
  level = 'core',
  levelBadge,
}: TechBadgeProps) => {
  const IconComponent = ICON_MAP[icon] ?? Si.SiReact;
  const isBasic = level === 'basic';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 border transition-all hover:scale-105 select-none ${
        isBasic
          ? 'border-[var(--glass-border)]/50 bg-[var(--glass-bg)]/40 opacity-75 hover:opacity-100'
          : 'border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-xs'
      }`}
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <IconComponent
          className={`w-5 h-5 shrink-0 ${
            isBasic ? 'text-[var(--text-secondary)] opacity-80' : 'text-[var(--accent-from)]'
          }`}
        />
        <span
          className={`font-semibold text-xs sm:text-sm truncate ${
            isBasic ? 'text-[var(--text-secondary)] font-medium' : 'text-[var(--text-primary)]'
          }`}
        >
          {name}
        </span>
      </div>

      {isBasic && (
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--glass-border)]/60 bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] shrink-0 ml-1.5">
          {levelBadge || 'Noções'}
        </span>
      )}
    </motion.div>
  );
};

export default TechBadge;
