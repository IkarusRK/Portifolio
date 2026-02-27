import { useEffect, type RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return;
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [ref, handler, enabled]);
};
