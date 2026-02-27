import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export const GlassCard = ({ children, className = '', as = 'div' }: GlassCardProps) => {
  const Comp = motion[as];
  return (
    <Comp
      className={`glass-card rounded-2xl ${className}`}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 30px var(--glow)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {children}
    </Comp>
  );
};
