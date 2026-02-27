import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const useCursorPosition = (smooth = 0.15) => {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [smoothed, setSmoothed] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let raf: number;
    const update = () => {
      setSmoothed((prev) => ({
        x: lerp(prev.x, pos.x, smooth),
        y: lerp(prev.y, pos.y, smooth),
      }));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [pos, smooth]);

  return smoothed;
};
