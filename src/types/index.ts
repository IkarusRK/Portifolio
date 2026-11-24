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
  /** Destaques técnicos / entregáveis reais comprovados no projeto */
  highlights?: string[];
  /** Destaques voltados a recrutadores / visão de produto */
  clientHighlights?: string[];
  /** Métricas rápidas de engenharia do projeto */
  metrics?: { label: string; value: string }[];
  tags: string[];
  clientTags?: string[];
  link: string;
  status: 'Live' | 'GitHub' | 'FiveM' | 'NUI' | 'Open Source';
  previewUrl?: string;
  previewImage?: string;
  githubUrl?: string;
  creditsUrl?: string;
  icon?: 'clock' | 'terminal' | 'calculator' | 'lock' | 'users' | 'gamepad' | 'shield' | 'chart' | 'book' | 'code' | 'server' | 'car' | 'sparkles' | 'cube' | 'scale';
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
