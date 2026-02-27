import type { ThemePalette, ThemeId } from '../types';

export const THEME_PALETTES: Record<ThemeId, ThemePalette> = {
  purple: { id: 'purple', name: 'Purple', from: '#7c3aed', to: '#2563eb' },
  cyberpunk: { id: 'cyberpunk', name: 'Cyberpunk', from: '#00ff41', to: '#ffff00' },
  ocean: { id: 'ocean', name: 'Ocean', from: '#0ea5e9', to: '#06b6d4' },
  sunset: { id: 'sunset', name: 'Sunset', from: '#f97316', to: '#ec4899' },
  rosegold: { id: 'rosegold', name: 'Rose', from: '#ec4899', to: '#f9a8d4' },
};

export const THEME_IDS: ThemeId[] = ['purple', 'cyberpunk', 'ocean', 'sunset', 'rosegold'];
