import type { Project } from '../types';

export const SITE_PROJECTS: Project[] = [
  {
    id: 'eclipsario',
    title: 'Eclipsário • 3D Cosmic Art Studio',
    description:
      'Portfólio 3D de alta fidelidade e worldbuilding de dark fantasy cósmica, Conan Exiles Modding e Unreal Engine 5. Modelos 3D AAA, armaduras rúnicas e cenários astrais monumentais.',
    clientDescription:
      'Estúdio e vitrine de modelagem 3D cósmica e cenografia imersiva para jogos AAA e mods, com visuais cinematográficos e otimização de alta performance.',
    madeWith: 'Feito com Unreal Engine 5, Blender, Substance 3D Painter, ZBrush e Vite/React.',
    highlights: [
      'Pipeline completo PBR (Blender, ZBrush & Substance Painter) integrado à Unreal Engine 5',
      'Vitrine interativa com galerias 3D, filtros dinâmicos e carregamento otimizado de assets',
      'Otimização de topologia, LODs e colisões para performance estável em tempo real',
    ],
    clientHighlights: [
      'Direção de arte AAA e cenografia interativa pronta para produção',
      'Interface web responsiva e fluida para apresentação de portfólio 3D',
      'Modelos otimizados que aliam fidelidade visual e alto desempenho',
    ],
    metrics: [
      { label: 'Engine', value: 'UE5 & Web' },
      { label: 'Workflow', value: 'PBR AAA' },
      { label: 'Performance', value: '60+ FPS' },
    ],
    tags: ['Unreal Engine 5', 'Blender', '3D Modeling', 'React & Vite', 'Substance Painter'],
    clientTags: ['Modelagem 3D AAA', 'Cenários Épicos', 'Dark Fantasy', 'Game Art'],
    link: 'https://eclipsario.netlify.app/',
    status: 'Live',
    previewUrl: 'https://eclipsario.netlify.app/',
    githubUrl: '',
    icon: 'cube',
    featured: true,
  },
  {
    id: 'aura-rpg',
    title: 'Aura RPG • Portal Modular & Lore',
    description:
      'Plataforma web modular desenvolvida para catalogação dinâmica de lores, árvores de classes, raças e sistemas interativos de RPG.',
    clientDescription:
      'Portal completo com histórias, regras e ambientação interativa, entregando navegação rápida e visual imersivo para comunidades.',
    madeWith: 'Feito com React, TypeScript, Supabase, HTML5 e CSS3 modular.',
    highlights: [
      'Arquitetura de componentes modulares para navegação instantânea entre classes e raças',
      'Design responsivo com micro-interações e tipografia temática de alta legibilidade',
      'Estrutura escalável preparada para integração com banco de dados em nuvem (Supabase)',
    ],
    clientHighlights: [
      'Organização clara de grande volume de conteúdo e regras',
      'Experiência de leitura imersiva tanto no desktop quanto no celular',
      'Carregamento instantâneo e navegação intuitiva para usuários',
    ],
    metrics: [
      { label: 'Arquitetura', value: 'Modular' },
      { label: 'UI/UX', value: 'Responsivo' },
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'UI/UX Design'],
    clientTags: ['Portal Modular', 'Design Responsivo', 'Conteúdo Dinâmico'],
    link: 'https://aurarpg.netlify.app/',
    status: 'Live',
    previewUrl: 'https://aurarpg.netlify.app/',
    githubUrl: 'https://github.com/ikarusrk/aurarpg',
    icon: 'book',
  },
  {
    id: 'pje-rua2',
    title: 'PJe Rua 2 • Sistema Jurídico Digital',
    description:
      'Portal jurídico full-stack com motor Canvas 2D para emissão de 18 modelos oficiais (1414x2000px), Diário Oficial público/sigiloso isolado por RLS, controle de alvarás e Edge Functions Supabase.',
    clientDescription:
      'Sistema completo do Poder Judiciário e Ministério Público para emissão instantânea de documentos oficiais em alta resolução, Diário Oficial digital, controle de alvarás e auditoria.',
    madeWith: 'Feito com React 19, TypeScript, Vite, Supabase (PostgreSQL + RLS + Edge Functions) e Canvas 2D.',
    highlights: [
      'Motor Canvas 2D (1414x2000px) com 18 modelos oficiais, assinatura digital ajustável e exportação PNG/WebP',
      'Supabase Auth (OAuth Discord + E-mail), políticas RLS e 3 Edge Functions Deno (Diário, Usuários e Google Sheets)',
      'Matriz de competência por cargo em 3 camadas (Frontend, Edge Function e PostgreSQL) + trilha de auditoria e sigilo',
    ],
    clientHighlights: [
      'Emissão de documentos oficiais e certidões em alta resolução com timbre e assinatura integrados',
      'Diário Oficial público e Diário Sigiloso com controle de acesso hierárquico e integração Discord',
      'Gestão de alvarás comerciais com detecção de duplicidade, cálculo de multa diária e sincronização em planilha',
    ],
    metrics: [
      { label: 'Modelos', value: '18 Oficiais' },
      { label: 'Backend', value: 'Supabase RLS' },
    ],
    tags: ['React 19', 'TypeScript', 'Supabase RLS', 'Edge Functions', 'Canvas 2D'],
    clientTags: ['Sistema Jurídico', 'Emissor Oficial', 'Diário & Alvarás'],
    link: 'https://juridicor2.netlify.app/',
    status: 'Live',
    githubUrl: '',
    icon: 'scale',
  },
];

export const APP_PROJECTS: Project[] = [
  {
    id: 'archeus',
    title: 'Archeus Security & Event Guard',
    description:
      'Guardião de dados e servidores com dashboard interativo e arquitetura voltada à validação de tokens, rate-limiting e prevenção de injeções.',
    clientDescription:
      'Painel de cibersegurança profissional com proteção ativa de dados, integridade de sessão e monitoramento de eventos em tempo real.',
    madeWith: 'Desenvolvido com React, TypeScript, CSS moderno e lógica de validação server-side.',
    highlights: [
      'Visualização interativa em tempo real de telemetria e status de proteção',
      'Arquitetura baseada em tokens dinâmicos com TTL e bloqueio automático por Rate-Limit',
      'Interface futurista de alto impacto visual com animações fluidas a 60fps',
    ],
    clientHighlights: [
      'Monitoramento visual claro de segurança e integridade do sistema',
      'Prevenção proativa contra acessos não autorizados e abusos de API',
      'Dashboard moderno que transmite confiança e autoridade técnica',
    ],
    metrics: [
      { label: 'Latência', value: '< 0.01ms' },
      { label: 'Proteção', value: 'Token + Rate' },
    ],
    tags: ['React', 'TypeScript', 'Security', 'Python', 'Lua Sync'],
    clientTags: ['Segurança de Dados', 'Dashboard Reativo', 'Alta Confiabilidade'],
    link: 'https://archeus-orb.netlify.app/',
    status: 'Live',
    previewUrl: 'https://archeus-orb.netlify.app/',
    githubUrl: '',
    creditsUrl: 'https://codepen.io/aleksa-rakocevic/pen/pvbboZx',
    icon: 'lock',
    featured: true,
  },
  {
    id: 'terminal-rasetsu',
    title: 'Terminal Rasetsu (Unix Web CLI)',
    description:
      'Emulador de terminal interativo no navegador inspirado em sistemas Unix, com parser de comandos próprio, histórico de sessão e scripts automatizados.',
    clientDescription:
      'Ambiente interativo de linha de comando direto no navegador para execução rápida de rotinas, testes e demonstração técnica.',
    madeWith: 'Feito com JavaScript puro (Vanilla ES6+), manipulação de DOM otimizada e parser CLI.',
    highlights: [
      'Interpretador de comandos próprio com suporte a argumentos, flags e autocompletar',
      'Gerenciamento de histórico de comandos e respostas assíncronas simuladas',
      'Zero dependências externas: código enxuto, rápido e 100% auditável no GitHub',
    ],
    clientHighlights: [
      'Demonstra domínio sólido de lógica de programação pura sem muletas de frameworks',
      'Execução instantânea no navegador com feedback visual imediato',
      'Código-fonte aberto e organizado para avaliação técnica',
    ],
    metrics: [
      { label: 'Engine', value: 'Vanilla JS' },
      { label: 'Deps', value: '0 Libs' },
    ],
    tags: ['JavaScript ES6+', 'Terminal CLI', 'Command Parser', 'Web App'],
    clientTags: ['Ferramenta Web', 'Simulador Unix', 'Engenharia Pura'],
    link: 'https://ikarusrk.github.io/Terminal-Rasetsu/',
    status: 'Live',
    previewUrl: 'https://ikarusrk.github.io/Terminal-Rasetsu/',
    githubUrl: 'https://github.com/ikarusrk/Terminal-Rasetsu',
    icon: 'terminal',
  },
  {
    id: 'relogio-ikarus',
    title: 'Relógio Digital Ikarus (Glass HUD)',
    description:
      'Widget de relógio digital e telemetria de tempo com estética Glassmorphism, sincronização precisa e layout adaptável para web ou NUI.',
    clientDescription:
      'Componente visual elegante em vidro fosco com sincronização contínua de horário e data, ideal para dashboards e interfaces modernas.',
    madeWith: 'Feito com JavaScript ES6+, CSS3 Glassmorphism e HTML5 semântico.',
    highlights: [
      'Estilização avançada em Glassmorphism (backdrop-filter, bordas translúcidas e glow)',
      'Loop de atualização leve sincronizado com o relógio do sistema sem memory leaks',
      'Pronto para embutir como widget standalone ou HUD de aplicação',
    ],
    clientHighlights: [
      'Acabamento visual refinado com atenção aos mínimos detalhes de UI',
      'Leveza extrema: roda em qualquer dispositivo sem consumir bateria/CPU',
      'Código limpo e disponível no GitHub',
    ],
    metrics: [
      { label: 'UI Style', value: 'Glass HUD' },
      { label: 'Consumo', value: '~0% CPU' },
    ],
    tags: ['JavaScript', 'CSS Glassmorphism', 'HTML5', 'UI Widget'],
    clientTags: ['Interface Moderna', 'Leve & Fluido', 'Design Minimalista'],
    link: 'https://relogio-ikarus.netlify.app/',
    status: 'Live',
    previewUrl: 'https://relogio-ikarus.netlify.app/',
    githubUrl: 'https://github.com/ikarusrk/Relogio-Ikarus',
    icon: 'clock',
  },
  {
    id: 'policia-rua-norte',
    title: 'Painel Corporativo & MDT',
    description:
      'Sistema web de gerenciamento operacional com autenticação de login, controle de mandados, registros e níveis de permissão.',
    clientDescription:
      'Painel administrativo completo com controle de acesso, formulários de gestão, busca de registros e relatórios operacionais.',
    madeWith: 'Feito com HTML5, CSS3 e JavaScript ES6+ com fluxo de autenticação e dashboard.',
    highlights: [
      'Fluxo completo de autenticação e validação de sessão no front-end',
      'Dashboard administrativo com tabelas dinâmicas, filtros de busca e modais de ação',
      'Interface limpa voltada a produtividade e tomada rápida de decisão',
    ],
    clientHighlights: [
      'Sistema de login e controle de acesso estruturado',
      'Painel centralizado para gestão de equipes e registros',
      'Interface intuitiva que reduz o tempo de operação',
    ],
    metrics: [
      { label: 'Módulos', value: 'Auth + CRUD' },
      { label: 'Interface', value: 'Dashboard' },
    ],
    tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Dashboard UI'],
    clientTags: ['Painel de Controle', 'Gestão & Acesso', 'Sistema Web'],
    link: 'https://policia-norte-rua2.netlify.app/html/login.html',
    status: 'Live',
    previewUrl: 'https://policia-norte-rua2.netlify.app/html/login.html',
    githubUrl: 'https://github.com/ikarusrk/policia-norte-rua2',
    icon: 'shield',
  },
  {
    id: 'registro-arasaka',
    title: 'Black Noir • Interactive Character & Lore',
    description:
      'Aplicação web imersiva para apresentação de dossiês, biografias interativas e linha narrativa de personagens e facções.',
    clientDescription:
      'Experiência digital interativa com transições suaves e layout editorial para apresentação de universos criativos.',
    madeWith: 'Feito com HTML5, CSS3 Animations e JavaScript.',
    highlights: [
      'Transições de estado e animações CSS/JS sincronizadas com a navegação do usuário',
      'Tipografia e contraste planejados para leitura imersiva em tema escuro',
    ],
    clientHighlights: [
      'Apresentação visual impactante que prende a atenção do visitante',
      'Código-fonte aberto no GitHub demonstrando organização front-end',
    ],
    tags: ['JavaScript', 'CSS Animations', 'HTML5', 'Interactive Storytelling'],
    clientTags: ['Visual Imersivo', 'Web Design', 'Narrativa Digital'],
    link: 'https://blacknoirj.netlify.app/',
    status: 'Live',
    previewUrl: 'https://blacknoirj.netlify.app/',
    githubUrl: 'https://github.com/ikarusrk/blacknoirj',
    icon: 'users',
  },
  {
    id: 'jogo-memoria',
    title: 'Voror • Dark Fantasy Web Experience',
    description:
      'Portal temático com direção de arte dark fantasy, efeitos atmosféricos e apresentação interativa para mundos virtuais.',
    clientDescription:
      'Website temático com ambientação artística exclusiva, ideal para apresentação de campanhas, jogos e projetos criativos.',
    madeWith: 'Feito com HTML5, CSS3 e JavaScript.',
    highlights: [
      'Composição visual atmosférica com camadas de profundidade e efeitos de luz',
      'Estrutura leve com carregamento rápido de mídia e responsividade completa',
    ],
    clientHighlights: [
      'Identidade visual forte e memorável para produtos de entretenimento',
      'Performance fluida em navegadores desktop e mobile',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Dark Fantasy UI'],
    clientTags: ['Dark Fantasy', 'Atmosfera Imersiva', 'Design Temático'],
    link: 'https://voror.netlify.app/',
    status: 'Live',
    previewUrl: 'https://voror.netlify.app/',
    githubUrl: 'https://github.com/ikarusrk/voror',
    icon: 'gamepad',
  },
];
