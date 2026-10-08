import type { ExperienceItem, EducationItem } from '../types';

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-2026',
    period: '2026',
    role: 'Modelagem 3D & Eclipsário Worldbuilding',
    company: 'Eclipsário & Arte 3D',
    description: 'Criação do universo e website interativo Eclipsário, com conceitos de worldbuilding, ambientações e exploração de assets 3D.',
    tags: ['Eclipsário', 'Worldbuilding', 'Blender', 'Unreal Engine', 'Dark Fantasy'],
    side: 'left',
    category: '3d',
  },
  {
    id: 'exp-2025',
    period: '2025',
    role: 'Segurança & Otimizações de Servidores',
    company: 'Archeus Security & Infra',
    description: 'Auditoria de segurança, criação de tokens de autenticação server-side, rate limiter contra injeções, proteção contra cheats e otimização de performance.',
    tags: ['Segurança', 'Otimização de Servidores', 'Token Auth', 'Rate Limiter', 'Discord API', 'MySQL'],
    side: 'right',
    category: 'anticheat',
  },
  {
    id: 'exp-2024',
    period: '2024',
    role: 'Scripts Lua & FiveM Core Engine',
    company: 'Sistemas & Scripts de Baixa Latência',
    description: 'Engenharia de scripts client/server em Lua com CFX Natives e frameworks vRP/ESX/QBCore. Foco em otimização de resmon (0.01ms).',
    tags: ['Lua', 'FiveM CFX', 'vRP', 'QBCore', 'Resmon 0.01ms'],
    side: 'left',
    category: 'lua',
  },
  {
    id: 'exp-2023',
    period: '2023',
    role: 'Full Stack & Aplicações Web',
    company: 'Desenvolvimento e Deploy',
    description: 'Desenvolvimento de interfaces modernas, integração com bancos relacionais e APIs, animações avançadas com Framer Motion e deploy contínuo em Netlify e Vercel.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Netlify'],
    side: 'right',
    category: 'react',
  },
  {
    id: 'exp-2022',
    period: '2022',
    role: 'Base em Programação & Fundamentos',
    company: 'Primeiros Passos & Algoritmos',
    description: 'Início da trajetória como desenvolvedor: lógica de programação, estruturas de dados, algoritmos e primeiros projetos em C++, Java e Python.',
    tags: ['Lógica de Programação', 'C++', 'Java', 'Python', 'SQL'],
    side: 'left',
    category: 'ml',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-senai',
    course: 'Desenvolvimento de Sistemas',
    institution: 'SENAI',
    period: '2024 – 2026',
    description: 'Formação técnica avançada em desenvolvimento de software e arquitetura de banco de dados.',
  },
  {
    id: 'edu-ufba',
    course: 'Engenharia de Software',
    institution: 'UFBA',
    period: '2025 – 2029',
    description: 'Graduação com foco em engenharia de requisitos, qualidade e sistemas distribuídos.',
  },
  {
    id: 'edu-ifba',
    course: 'Computação',
    institution: 'IFBA',
    period: '2025 – 2029',
    description: 'Formação superior com ênfase em fundamentos de computação e algoritmos.',
  },
];
