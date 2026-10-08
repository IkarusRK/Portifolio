export type ThemeId = 'purple' | 'cyberpunk' | 'ocean' | 'sunset' | 'rosegold';
export type Mode = 'dark' | 'light';
export type Perspective = 'client' | 'dev';
export type Language = 'pt' | 'en' | 'es' | 'ja' | 'zh' | 'ko' | 'ru';

export interface Project {
  id: string;
  title: string;
  description: string;
  clientDescription?: string;
  /** Frase curta para tooltip: "Feito com X, Y e Z" */
  madeWith?: string;
  tags: string[];
  clientTags?: string[];
  link: string;
  status: 'Live' | 'GitHub' | 'FiveM' | 'NUI' | 'Open Source';
  previewUrl?: string;
  githubUrl?: string;
  creditsUrl?: string;
  icon?: 'clock' | 'terminal' | 'calculator' | 'lock' | 'users' | 'gamepad' | 'shield' | 'chart' | 'book' | 'code' | 'server' | 'car' | 'sparkles' | 'cube';
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  clientName?: string;
  category: 'backend' | 'frontend' | 'tools' | 'gta' | 'nui' | '3d';
  icon: string;
  level?: 'core' | 'basic';
  levelBadge?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  side: 'left' | 'right';
  category?: '3d' | 'lua' | 'nui' | 'anticheat' | 'backend' | 'react' | 'ml' | 'web';
}

export interface EducationItem {
  id: string;
  course: string;
  institution: string;
  period: string;
  description: string;
}

export interface ThemePalette {
  id: ThemeId;
  name: string;
  from: string;
  to: string;
}
