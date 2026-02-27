import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursorPosition } from '../../hooks/useCursorPosition';

const CursorFollower = () => {
  const pos = useCursorPosition(0.12);
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onOver = () => setHover(true);
    const onOut = () => setHover(false);
    const targets = document.querySelectorAll('a, button, [role="button"]');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onOver);
      el.addEventListener('mouseleave', onOut);
    });
    return () => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onOver);
        el.removeEventListener('mouseleave', onOut);
      });
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: 'transform' }}
      animate={{
        x: pos.x,
        y: pos.y,
        scale: hover ? 1.8 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div
        className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          borderColor: 'var(--accent-from)',
          background: 'transparent',
        }}
      />
    </motion.div>
  );
};

export default CursorFollower;
