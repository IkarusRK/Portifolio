import { useState, useEffect } from 'react';

type Direction = 'up' | 'down' | null;

export const useScrollDirection = (threshold = 50): Direction => {
  const [direction, setDirection] = useState<Direction>(null);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < threshold) {
        setDirection(null);
      } else if (y > lastY) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY, threshold]);

  return direction;
};
