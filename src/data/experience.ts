import type { ExperienceItem, EducationItem } from '../types';

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-2026',
    period: '2026',
    role: 'Foco atual',
    company: 'Stack e estudos',
    description: 'React, Vite, Vercel, Machine Learning e aprofundamento em front-end moderno.',
    tags: ['React', 'Vite', 'Vercel', 'Machine Learning'],
    side: 'left',
  },
  {
    id: 'exp-2025',
    period: '2025',
    role: 'Web e ferramentas',
    company: 'Desenvolvimento pessoal',
    description: 'HTML/CSS/JS, Supabase, Netlify, Python e início em React.',
    tags: ['HTML/CSS/JS', 'Supabase', 'Netlify', 'Python', 'React'],
    side: 'right',
  },
  {
    id: 'exp-2023-2024',
    period: '2023 – 2024',
    role: 'Base em programação',
    company: 'Estudos iniciais',
    description: 'C++, Java, banco de dados (SQL) e início do Python.',
    tags: ['C++', 'Java', 'SQL', 'Python'],
    side: 'left',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-senai',
    course: 'Desenvolvimento de Sistemas',
    institution: 'SENAI',
    period: '2024 – 2026',
    description: '4° Semestre [Andamento]',
  },
  {
    id: 'edu-ifba',
    course: 'Computação',
    institution: 'IFBA',
    period: '2025 – 2029',
    description: '2° Semestre [Andamento]',
  },
];
