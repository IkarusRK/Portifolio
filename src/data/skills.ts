import type { Skill } from '../types';

export const SKILLS: Skill[] = [
  // GTA RP / FiveM Core
  {
    id: 'lua-fivem',
    name: 'Lua (FiveM Client/Server)',
    clientName: 'Sistemas & Scripts Exclusivos',
    category: 'gta',
    icon: 'SiLua',
  },
  {
    id: 'fivem-api',
    name: 'FiveM Native API & CFX',
    clientName: 'Mecânicas Nativas & Ações no Jogo',
    category: 'gta',
    icon: 'FaGamepad',
  },
  {
    id: 'resmon-opt',
    name: 'Otimização de Resmon (0.01ms)',
    clientName: 'Zero Lag & Sem Queda de FPS',
    category: 'gta',
    icon: 'FaCode',
  },
  {
    id: 'anticheat',
    name: 'Anti-Cheat & Proteção de Eventos',
    clientName: 'Proteção Anti-Invasão & Economia Segura',
    category: 'gta',
    icon: 'FaShieldAlt',
  },
  {
    id: 'discord-bot',
    name: 'Integração Discord & Webhooks',
    clientName: 'Logs & Automação com Discord',
    category: 'gta',
    icon: 'SiDiscord',
  },

  // 3D & Eclipsário Worldbuilding
  {
    id: 'unreal-engine',
    name: 'Unreal Engine 5 (Nanite & Lumen)',
    clientName: 'Worldbuilding & Ambientes Épicos',
    category: '3d',
    icon: 'SiUnrealengine',
  },
  {
    id: 'blender',
    name: 'Blender 3D (Props & Weapons)',
    clientName: 'Modelagem 3D (Armas, Roupas e Itens)',
    category: '3d',
    icon: 'SiBlender',
  },
  {
    id: 'pbr-workflow',
    name: 'PBR Workflow & Texturas Realistas',
    clientName: 'Texturas Realistas em Alta Resolução',
    category: '3d',
    icon: 'FaCube',
  },

  // NUI & Frontend
  {
    id: 'react-nui',
    name: 'React 19 & TypeScript',
    clientName: 'Telas & Menus Modernos (React NUI)',
    category: 'nui',
    icon: 'SiReact',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    clientName: 'Design Elegante & Responsivo',
    category: 'nui',
    icon: 'SiTailwindcss',
  },
  {
    id: 'javascript',
    name: 'JavaScript ES6+',
    clientName: 'Interações Ágeis e Rápidas',
    category: 'frontend',
    icon: 'SiJavascript',
  },
  {
    id: 'html5',
    name: 'HTML5 & CSS3 Animations',
    clientName: 'Animações Suaves e Efeitos Visuais',
    category: 'frontend',
    icon: 'SiHtml5',
  },

  // Backend & Banco de Dados
  {
    id: 'java',
    name: 'Java & Spring Boot',
    clientName: 'Arquitetura Backend Confiável',
    category: 'backend',
    icon: 'SiJava',
  },
  {
    id: 'cplusplus',
    name: 'C++',
    clientName: 'Performance de Baixo Nível',
    category: 'backend',
    icon: 'SiCplusplus',
  },
  {
    id: 'python',
    name: 'Python',
    clientName: 'Automações & Scripts Inteligentes',
    category: 'backend',
    icon: 'SiPython',
  },
  {
    id: 'mysql',
    name: 'MySQL & oxmysql',
    clientName: 'Banco de Dados Rápido & Seguro',
    category: 'backend',
    icon: 'SiMysql',
  },
  {
    id: 'supabase',
    name: 'Supabase / PostgreSQL',
    clientName: 'Sincronização em Tempo Real',
    category: 'backend',
    icon: 'SiSupabase',
  },

  // Ferramentas & Infra
  {
    id: 'git',
    name: 'Git & GitHub',
    clientName: 'Controle de Versão & Backup Seguro',
    category: 'tools',
    icon: 'SiGit',
  },
  {
    id: 'linux',
    name: 'Linux / VPS Dedicado',
    clientName: 'Configuração & Estabilidade de Servidor',
    category: 'tools',
    icon: 'SiUbuntu',
  },
];
