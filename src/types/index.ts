export type ThemeId = 'purple' | 'cyberpunk' | 'ocean' | 'sunset' | 'rosegold';
export type Mode = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Frase curta para tooltip: "Feito com X, Y e Z" */
  madeWith?: string;
  tags: string[];
  link: string;
  status: 'Live' | 'GitHub';
  previewUrl?: string;
  icon?: 'clock' | 'terminal' | 'calculator' | 'lock' | 'users' | 'gamepad' | 'shield' | 'chart' | 'book';
}

export interface Skill {
  id: string;
  name: string;
  category: 'backend' | 'frontend' | 'tools';
  icon: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  side: 'left' | 'right';
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
