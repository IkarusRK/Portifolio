import type { ExperienceItem, EducationItem } from '../types';

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-2026',
    period: '2026',
    role: 'Full Stack & Machine Learning',
    company: 'Foco Atual & Projetos',
    description: 'Consolidação de ecossistema moderno (React 19, Vite, TypeScript, Tailwind) e estudos em automação inteligente e Machine Learning.',
    tags: ['React', 'TypeScript', 'Vite', 'Machine Learning', 'Next.js'],
    side: 'left',
    category: 'ml',
  },
  {
    id: 'exp-2025',
    period: '2025',
    role: 'NUI Reativo & Aplicações Modernas',
    company: 'Desenvolvimento e Deploy',
    description: 'Desenvolvimento de interfaces modernas integradas com backend, animações avançadas com Framer Motion e deploy contínuo em Netlify e Vercel.',
    tags: ['React NUI', 'Framer Motion', 'Supabase', 'Tailwind', 'Netlify'],
    side: 'right',
    category: 'react',
  },
  {
    id: 'exp-2024',
    period: '2024',
    role: 'Segurança & Anti-Cheat de Servidores',
    company: 'Archeus Security & Infra',
    description: 'Criação de tokens de autenticação server-side, rate limiter contra injeções, proteção contra cheats e integração com webhooks do Discord.',
    tags: ['Anti-Cheat', 'Token Auth', 'Rate Limiter', 'Discord API', 'MySQL'],
    side: 'left',
    category: 'anticheat',
  },
  {
    id: 'exp-2023',
    period: '2023',
    role: 'Scripts Lua & FiveM Core Engine',
    company: 'Sistemas GTA RP',
    description: 'Engenharia de scripts client/server em Lua com CFX Natives e frameworks vRP/ESX/QBCore. Foco em otimização de resmon (0.01ms).',
    tags: ['Lua', 'FiveM CFX', 'vRP', 'QBCore', 'Resmon 0.01ms'],
    side: 'right',
    category: 'lua',
  },
  {
    id: 'exp-2022',
    period: '2022',
    role: 'Modelagem 3D & Eclipsário Worldbuilding',
    company: 'Arte 3D & Cenografia',
    description: 'Início na modelagem 3D com Blender e Unreal Engine, desenvolvendo props, armaduras rúnicas, ambientações cósmicas e fluxo PBR.',
    tags: ['Unreal Engine', 'Blender', 'PBR Workflow', '3D Modeling', 'Dark Fantasy'],
    side: 'left',
    category: '3d',
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
