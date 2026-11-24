import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(() =>
    typeof window !== 'undefined' ? !window.matchMedia('(pointer: coarse)').matches : false
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 28, stiffness: 360, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 28, stiffness: 360, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = () => setMounted(!mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMove = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest('a, button, [role="button"]')) {
        setHover(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest('a, button, [role="button"]')) {
        setHover(false);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [mounted, cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
      animate={{ scale: hover ? 1.8 : 1 }}
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
