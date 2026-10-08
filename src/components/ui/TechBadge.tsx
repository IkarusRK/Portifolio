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
}

export const TechBadge = ({ name, icon, index = 0 }: TechBadgeProps) => {
  const IconComponent = ICON_MAP[icon] ?? Si.SiReact;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[var(--text-secondary)] border border-[var(--glass-border)] transition-transform hover:scale-105 select-none"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <IconComponent className="w-5 h-5 text-[var(--accent-from)] shrink-0" />
      <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">{name}</span>
    </motion.div>
  );
};

export default TechBadge;
