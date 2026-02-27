import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}

export const GradientText = ({ children, className = '', as = 'span' }: GradientTextProps) => {
  const Comp = motion[as];
  return (
    <Comp
      className={`${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </Comp>
  );
};
