import type { Language } from '../types';

export interface TranslationDictionary {
  nav: {
    home: string;
    skills: string;
    experience: string;
    applications: string;
    sites: string;
    contact: string;
    cv: string;
    viewCvPt: string;
    viewCvEn: string;
  };
  perspective: {
    client: string;
    dev: string;
    clientTooltip: string;
    devTooltip: string;
    modalTitle: string;
    modalSubtitle: string;
    clientCardTitle: string;
    clientCardDesc: string;
    clientCardBullets: string[];
    clientCardBtn: string;
    devCardTitle: string;
    devCardDesc: string;
    devCardBullets: string[];
    devCardBtn: string;
    recommendedBadge: string;
    technicalBadge: string;
    modalFooterNote: string;
    skip: string;
  };
  hero: {
    statusBadge: string;
    name: string;
    roleClient: string;
    roleDev: string;
    descClient: string;
    descDev: string;
    btnProjectsClient: string;
    btnProjectsDev: string;
    btnContactClient: string;
    btnContactDev: string;
    particleHintClient: string;
    particleHintDev: string;
    shapes: {
      react: string;
      lua: string;
      cube: string;
      code: string;
      java: string;
    };
  };
  stats: {
    client: {
      stat1Label: string;
      stat1Desc: string;
      stat2Label: string;
      stat2Desc: string;
      stat3Label: string;
      stat3Desc: string;
      stat4Label: string;
      stat4Desc: string;
    };
    dev: {
      stat1Label: string;
      stat1Desc: string;
      stat2Label: string;
      stat2Desc: string;
      stat3Label: string;
      stat3Desc: string;
      stat4Label: string;
      stat4Desc: string;
    };
  };
  showcase3d: {
    badgeClient: string;
    badgeDev: string;
    title: string;
    descClient: string;
    descDev: string;
    btnBenchmark: string;
    benchmarkingText: string;
    fpsLabel: string;
    tickLabel: string;
    scoreLabel: string;
    modelSelector: string;
    wireframe: string;
    models: {
      core: string;
      gem: string;
      torus: string;
      cube: string;
    };
    tableHeader: {
      resource: string;
      type: string;
      time: string;
      memory: string;
      status: string;
    };
  };
  projects: {
    appTitle: string;
    appDescClient: string;
    appDescDev: string;
    sitesTitle: string;
    sitesDescClient: string;
    sitesDescDev: string;
    featuredBadge: string;
    demoBtn: string;
    visitBtn: string;
    codeBtn: string;
    creditsBtn: string;
    interactiveDemoBadge: string;
    openDemo: string;
    visitSite: string;
  };
  skills: {
    title: string;
    descClient: string;
    descDev: string;
    allCategories: string;
    categories: {
      gta: string;
      nui: string;
      '3d': string;
      backend: string;
      frontend: string;
      tools: string;
    };
  };
  experience: {
    title: string;
    descClient: string;
    descDev: string;
    educationTitle: string;
    educationSubtitle: string;
  };
  contact: {
    title: string;
    descClient: string;
    descDev: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successMsg: string;
    quickChat: string;
    discordUser: string;
    copiedToast: string;
  };
  clock: {
    brtTime: string;
    localTime: string;
    statusOnline: string;
  };
  console: {
    buttonLabel: string;
    title: string;
    inputPlaceholder: string;
    welcomeMsg: string;
    connectedMsg: string;
    helpTip: string;
  };
  footer: {
    rights: string;
    tagline: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  pt: {
    nav: {
      home: 'Início',
      skills: 'Habilidades',
      experience: 'Experiência',
      applications: 'Aplicações',
      sites: 'Destaques & Sites',
      contact: 'Contato',
      cv: 'Currículo',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: 'Negócios / Recrutador',
      dev: 'Engenharia / Dev',
      clientTooltip: 'Visão de Negócios: Foco em resultados práticos, valor entregue e soluções completas',
      devTooltip: 'Visão Técnica: Arquitetura de software, stack tecnológica, código limpo e métricas',
      modalTitle: 'Como deseja visualizar este portfólio?',
      modalSubtitle: 'Escolha a experiência ideal para sua visita. Adaptamos os termos e detalhes para atender o que você busca:',
      clientCardTitle: 'Recrutador / Gestor de Projetos',
      clientCardDesc: 'Linguagem voltada a produtos, valor de negócio, interfaces de alta usabilidade e estabilidade de sistemas.',
      clientCardBullets: [
        'Aplicações web modernas, velozes e responsivas',
        'Foco em experiência do usuário e entrega de valor',
        'Arquitetura sólida, confiável e bem estruturada',
        'Comunicação clara, pontualidade e dedicação',
      ],
      clientCardBtn: 'Explorar como Recrutador →',
      devCardTitle: 'Desenvolvedor / Tech Lead',
      devCardDesc: 'Métricas de performance, stack completa (Java, React, TypeScript, Lua, 3D) e padrões de projeto.',
      devCardBullets: [
        'Backend robusto em Java & Spring Boot / Node.js',
        'Frontend reativo com React 19, TypeScript & Tailwind',
        'Computação gráfica & WebGL 3D (Three.js / Unreal 5)',
        'Versatilidade técnica: também domino Lua & otimizações',
      ],
      devCardBtn: 'Explorar como Dev →',
      recommendedBadge: 'Recrutadores',
      technicalBadge: 'Técnico',
      modalFooterNote: '💡 Você pode alternar os modos a qualquer momento no topo do site.',
      skip: 'Pular e continuar',
    },
    hero: {
      statusBadge: 'Disponível para oportunidades e projetos',
      name: 'Daniel Reis',
      roleClient: 'Desenvolvedor Full Stack | Soluções Web Modernas & Engenharia de Software',
      roleDev: 'Desenvolvedor Full Stack | Java, React, TypeScript, Web & 3D',
      descClient: 'Construindo aplicações web e experiências digitais com foco em código limpo, interfaces intuitivas e alta confiabilidade para produtos reais.',
      descDev: 'Desenvolvimento de software de ponta a ponta: backend em Java/Spring, frontend moderno em React & TypeScript, além de vivência em Lua, computação gráfica 3D e alta performance.',
      btnProjectsClient: 'Ver Projetos & Soluções',
      btnProjectsDev: 'Ver Projetos & Código',
      btnContactClient: 'Entrar em Contato',
      btnContactDev: 'Falar Comigo',
      particleHintClient: 'Segure o clique para atrair partículas ou explore as competências:',
      particleHintDev: 'Segure o clique para atrair partículas ou altere a forma 3D:',
      shapes: {
        react: 'Telas Interativas (React)',
        lua: 'Lua & Performance',
        cube: 'Modelos & 3D WebGL',
        code: 'Sistemas & Código Limpo',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Aplicações Entregues',
        stat1Desc: 'Projetos e soluções em produção',
        stat2Label: 'Foco em Desempenho',
        stat2Desc: 'Aplicações ágeis e sem lentidão',
        stat3Label: 'Anos de Prática',
        stat3Desc: 'Evolução contínua em engenharia',
        stat4Label: 'Projetos Concluídos',
        stat4Desc: 'Web, Backend e Arte 3D',
      },
      dev: {
        stat1Label: 'Módulos & Aplicações',
        stat1Desc: 'Full Stack, APIs e Web Apps',
        stat2Label: 'Otimização Contínua',
        stat2Desc: 'Foco em baixa latência e 60-144 FPS',
        stat3Label: 'Anos de Código',
        stat3Desc: 'Estudos em computação e software',
        stat4Label: 'Repositórios & Entregas',
        stat4Desc: 'Código aberto e projetos reais',
      },
    },
    showcase3d: {
      badgeClient: 'Tecnologia Interativa & Performance',
      badgeDev: 'Engenharia de Performance & WebGL 3D',
      title: 'Showcase 3D & Simulação de Desempenho',
      descClient: 'Veja em tempo real como aplicações modernas utilizam renderização gráfica tridimensional fluida e sem comprometer a estabilidade do usuário.',
      descDev: 'Inspeção de shaders interativos Three.js (Cubo 3D animado com física de rotação, Gem e Torus) e métricas de frame rate em tempo real.',
      btnBenchmark: 'Executar Benchmark em Tempo Real',
      benchmarkingText: 'Calculando estabilidade...',
      fpsLabel: 'FPS Estável',
      tickLabel: 'Taxa de Atualização',
      scoreLabel: 'Índice de Estabilidade',
      modelSelector: 'Modelo 3D:',
      wireframe: 'Wireframe',
      models: {
        core: 'Núcleo',
        gem: 'Diamante',
        torus: 'Anel Cósmico',
        cube: 'Cubo 3D',
      },
      tableHeader: {
        resource: 'Módulo / Sistema',
        type: 'Tipo de Recurso',
        time: 'Tempo (ms)',
        memory: 'Memória',
        status: 'Status',
      },
    },
    projects: {
      appTitle: 'Aplicações Web & Ferramentas',
      appDescClient: 'Aplicações interativas criadas para resolver necessidades reais com facilidade e elegância.',
      appDescDev: 'Aplicações web completas, ferramentas interativas, CLIs e utilitários modernos.',
      sitesTitle: 'Destaques & Sites Completos',
      sitesDescClient: 'Portfólios de alta fidelidade, vitrines 3D interativas e plataformas web completas.',
      sitesDescDev: 'Worldbuilding 3D em Unreal Engine 5 (Eclipsário), landing pages e painéis de controle.',
      featuredBadge: 'Destaque Especial',
      demoBtn: 'Demo Live',
      visitBtn: 'Visitar',
      codeBtn: 'Código',
      creditsBtn: 'Créditos',
      interactiveDemoBadge: 'Demo Interativa',
      openDemo: 'Abrir Demonstração 💻',
      visitSite: 'Visitar Site 🚀',
    },
    skills: {
      title: 'Habilidades & Tecnologias',
      descClient: 'Competências completas para construir sua aplicação do design até a infraestrutura.',
      descDev: 'Stack abrangente: Java/Spring, React 19, TypeScript, Lua, Shaders WebGL e Modelagem 3D.',
      allCategories: 'Todas',
      categories: {
        gta: 'Lua & Performance',
        nui: 'Frontend Reativo',
        '3d': '3D & Computação Gráfica',
        backend: 'Backend & Bancos',
        frontend: 'Web & Interfaces',
        tools: 'Ferramentas & DevOps',
      },
    },
    experience: {
      title: 'Trajetória & Experiência',
      descClient: 'Histórico contínuo de projetos, dedicação e compromisso com qualidade técnica.',
      descDev: 'Linha do tempo técnica: evolução em linguagens, frameworks, segurança e computação.',
      educationTitle: 'Formação Acadêmica',
      educationSubtitle: 'Bases sólidas em Desenvolvimento de Sistemas, Engenharia de Software e Computação.',
    },
    contact: {
      title: 'Vamos Conversar?',
      descClient: 'Tem uma oportunidade de trabalho, projeto ou desafio técnico? Envie uma mensagem e vamos conversar!',
      descDev: 'Aberto a oportunidades profissionais de Full Stack, Backend Java, Frontend React ou projetos 3D.',
      formTitle: 'Enviar Mensagem',
      nameLabel: 'Seu Nome / Empresa',
      namePlaceholder: 'Como posso te chamar?',
      emailLabel: 'Seu E-mail de Contato',
      emailPlaceholder: 'contato@empresa.com',
      messageLabel: 'Mensagem ou Proposta',
      messagePlaceholder: 'Descreva sua oportunidade ou projeto...',
      sendBtn: 'Enviar Mensagem',
      sendingBtn: 'Enviando...',
      successMsg: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      quickChat: 'Contato Direto',
      discordUser: 'Daniel Reis',
      copiedToast: 'Copiado para a área de transferência!',
    },
    clock: {
      brtTime: 'Horário de Brasília (BRT UTC-3)',
      localTime: 'Horário Local',
      statusOnline: 'Online • Disponível para Oportunidades',
    },
    console: {
      buttonLabel: 'Terminal [F8]',
      title: 'Console de Desenvolvedor [F8]',
      inputPlaceholder: "Digite um comando (ex: 'help', 'theme', 'stats')...",
      welcomeMsg: 'Console interativo inicializado.',
      connectedMsg: 'Conectado ao ambiente de desenvolvimento de Daniel Reis.',
      helpTip: "Pressione F8 ou 'exit' para fechar.",
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      tagline: 'Desenvolvido com foco em código limpo, arquitetura sólida e alto desempenho.',
    },
  },

  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      experience: 'Experience',
      applications: 'Applications',
      sites: 'Featured & Sites',
      contact: 'Contact',
      cv: 'Resume',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: 'Business / Recruiter',
      dev: 'Engineering / Dev',
      clientTooltip: 'Business View: Focused on deliverables, clean UI, reliability, and business impact',
      devTooltip: 'Engineering View: Software architecture, code quality, Java, React, performance',
      modalTitle: 'How would you like to explore this portfolio?',
      modalSubtitle: 'Select the ideal mode for your visit. We tailor terminology and details to match your focus:',
      clientCardTitle: 'Recruiter / Hiring Manager',
      clientCardDesc: 'Product-oriented perspective: user experience, robust systems, and dependable execution.',
      clientCardBullets: [
        'Fast, accessible, and responsive web applications',
        'Strong focus on user experience and business value',
        'Dependable architecture and clean software engineering',
        'Clear communication, ownership, and timely delivery',
      ],
      clientCardBtn: 'Explore as Recruiter →',
      devCardTitle: 'Software Engineer / Tech Lead',
      devCardDesc: 'Technical deep dive: Java/Spring, React 19, TypeScript, Lua proficiency, 3D WebGL, and benchmarks.',
      devCardBullets: [
        'Solid backend engineering in Java & Spring Boot / Node.js',
        'Modern reactive frontend with React 19 & TypeScript',
        'Computer Graphics & WebGL 3D (Three.js / Unreal Engine 5)',
        'Technical breadth: also skilled in Lua & low-latency design',
      ],
      devCardBtn: 'Explore as Engineer →',
      recommendedBadge: 'Recruiters',
      technicalBadge: 'Technical',
      modalFooterNote: '💡 You can switch modes at any time from the top navigation bar.',
      skip: 'Skip and continue',
    },
    hero: {
      statusBadge: 'Open for opportunities & new projects',
      name: 'Daniel Reis',
      roleClient: 'Full Stack Developer | Modern Web Applications & Software Engineering',
      roleDev: 'Full Stack Developer | Java, React, TypeScript, Web & 3D',
      descClient: 'Building dependable web applications and digital experiences with clean code, modern architecture, and thoughtful user design.',
      descDev: 'End-to-end software development: Java & Spring Boot backend, modern React/TypeScript frontend, plus versatile skills in Lua, 3D computer graphics, and performance optimization.',
      btnProjectsClient: 'Explore Solutions',
      btnProjectsDev: 'View Projects & Code',
      btnContactClient: 'Get in Touch',
      btnContactDev: 'Contact Me',
      particleHintClient: 'Click & hold to attract particles or explore competencies:',
      particleHintDev: 'Click & hold to attract particles or toggle 3D morphing shape:',
      shapes: {
        react: 'Interactive UIs (React)',
        lua: 'Lua & Performance',
        cube: '3D WebGL Models',
        code: 'Clean Architecture',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Applications Delivered',
        stat1Desc: 'Production solutions & systems',
        stat2Label: 'High Performance',
        stat2Desc: 'Responsive, zero-lag software',
        stat3Label: 'Years of Practice',
        stat3Desc: 'Continuous learning & delivery',
        stat4Label: 'Completed Projects',
        stat4Desc: 'Web, Backend & 3D Graphics',
      },
      dev: {
        stat1Label: 'Modules & Apps',
        stat1Desc: 'Full Stack, APIs & Web',
        stat2Label: 'Performance Focus',
        stat2Desc: 'Targeting 60-144 FPS & low latency',
        stat3Label: 'Years Coding',
        stat3Desc: 'Computer Science & Software',
        stat4Label: 'Repositories',
        stat4Desc: 'Open Source & Real-world code',
      },
    },
    showcase3d: {
      badgeClient: 'Interactive Technology & Smoothness',
      badgeDev: 'High-Performance 3D WebGL Engineering',
      title: 'Interactive 3D Showcase & Performance Benchmark',
      descClient: 'Experience how modern software leverages real-time 3D graphics smoothly without sacrificing user responsiveness.',
      descDev: 'Inspect real-time interactive Three.js shaders (animated Rubik’s cube, dynamic physical gem, cosmic torus) and live frame rate metrics.',
      btnBenchmark: 'Run Real-Time Benchmark',
      benchmarkingText: 'Running stress calculations...',
      fpsLabel: 'Stable FPS',
      tickLabel: 'Tick Rate',
      scoreLabel: 'Stability Score',
      modelSelector: '3D Model:',
      wireframe: 'Wireframe',
      models: {
        core: 'Core',
        gem: 'Gem',
        torus: 'Cosmic Ring',
        cube: '3D Cube',
      },
      tableHeader: {
        resource: 'Module / System',
        type: 'Resource Type',
        time: 'Latency (ms)',
        memory: 'Memory',
        status: 'Status',
      },
    },
    projects: {
      appTitle: 'Web Applications & Tools',
      appDescClient: 'Interactive digital applications designed to solve real problems with speed and precision.',
      appDescDev: 'Modern web applications, developer CLIs, security dashboards, and interactive tools.',
      sitesTitle: 'Featured Highlights & Websites',
      sitesDescClient: 'High-fidelity portfolios, interactive 3D platforms, and full-featured websites.',
      sitesDescDev: 'Unreal Engine 5 cosmic worldbuilding (Eclipsário), administrative panels, and web platforms.',
      featuredBadge: 'Featured Highlight',
      demoBtn: 'Live Demo',
      visitBtn: 'Visit',
      codeBtn: 'Code',
      creditsBtn: 'Credits',
      interactiveDemoBadge: 'Interactive Demo',
      openDemo: 'Open Interactive Demo 💻',
      visitSite: 'Visit Website 🚀',
    },
    skills: {
      title: 'Skills & Tech Stack',
      descClient: 'A well-rounded skill set covering product design, backend architecture, and frontend excellence.',
      descDev: 'Comprehensive stack: Java/Spring, React 19, TypeScript, Lua, WebGL shaders, and 3D Modeling.',
      allCategories: 'All',
      categories: {
        gta: 'Lua & Performance',
        nui: 'Reactive Frontend',
        '3d': '3D & Graphics',
        backend: 'Backend & DB',
        frontend: 'Web & UI',
        tools: 'Tools & DevOps',
      },
    },
    experience: {
      title: 'Career & Experience',
      descClient: 'A track record of continuous delivery, dedication to craft, and software engineering.',
      descDev: 'Chronological progression: evolution across languages, backend frameworks, security, and computing.',
      educationTitle: 'Education & Academics',
      educationSubtitle: 'Solid foundations in Systems Development, Software Engineering, and Computer Science.',
    },
    contact: {
      title: "Let's Connect",
      descClient: 'Looking for a skilled developer for your team or project? Send a message and let’s talk!',
      descDev: 'Open to Full Stack, Java Backend, React Frontend, or 3D development opportunities.',
      formTitle: 'Send a Direct Message',
      nameLabel: 'Your Name / Company',
      namePlaceholder: 'What should I call you?',
      emailLabel: 'Your Contact Email',
      emailPlaceholder: 'contact@company.com',
      messageLabel: 'Message or Opportunity',
      messagePlaceholder: 'Tell me about the role or project...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successMsg: 'Message sent successfully! I will get back to you shortly.',
      quickChat: 'Direct Channels',
      discordUser: 'Daniel Reis',
      copiedToast: 'Copied to clipboard!',
    },
    clock: {
      brtTime: 'Brasília Time (BRT UTC-3)',
      localTime: 'Local Time',
      statusOnline: 'Online • Open to Opportunities',
    },
    console: {
      buttonLabel: 'Terminal [F8]',
      title: 'Developer Terminal [F8]',
      inputPlaceholder: "Type a command (e.g., 'help', 'theme', 'stats')...",
      welcomeMsg: 'Interactive developer console initialized.',
      connectedMsg: 'Connected to Daniel Reis environment.',
      helpTip: "Press F8 or type 'exit' to close.",
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Built with clean code, solid architecture, and high performance.',
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      skills: 'Habilidades',
      experience: 'Experiencia',
      applications: 'Aplicaciones',
      sites: 'Destacados & Sitios',
      contact: 'Contacto',
      cv: 'Currículum',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: 'Negocios / Reclutador',
      dev: 'Ingeniería / Dev',
      clientTooltip: 'Visión de Negocios: Enfoque en entregas, interfaces claras y valor para la empresa',
      devTooltip: 'Visión Técnica: Arquitectura de software, Java, React, código limpio y métricas',
      modalTitle: '¿Cómo deseas explorar este portafolio?',
      modalSubtitle: 'Elige la experiencia ideal para tu visita según tu objetivo profesional:',
      clientCardTitle: 'Reclutador / Gestor de Proyectos',
      clientCardDesc: 'Enfoque en productos de software, experiencia de usuario y fiabilidad.',
      clientCardBullets: [
        'Aplicaciones web rápidas, modernas y accesibles',
        'Foco en valor de negocio y experiencia de usuario',
        'Arquitectura de software limpia y mantenible',
        'Comunicación clara, compromiso y puntualidad',
      ],
      clientCardBtn: 'Explorar como Reclutador →',
      devCardTitle: 'Desarrollador / Tech Lead',
      devCardDesc: 'Detalles técnicos: Java/Spring, React 19, TypeScript, Lua, WebGL 3D y rendimiento.',
      devCardBullets: [
        'Backend sólido con Java & Spring Boot / Node.js',
        'Frontend reactivo con React 19 & TypeScript',
        'Computación gráfica y WebGL 3D (Three.js / Unreal 5)',
        'Versatilidad técnica: también domino Lua y optimización',
      ],
      devCardBtn: 'Explorar como Dev →',
      recommendedBadge: 'Reclutadores',
      technicalBadge: 'Técnico',
      modalFooterNote: '💡 Puedes cambiar de modo en cualquier momento en la barra superior.',
      skip: 'Omitir y continuar',
    },
    hero: {
      statusBadge: 'Disponible para oportunidades y proyectos',
      name: 'Daniel Reis',
      roleClient: 'Desarrollador Full Stack | Soluciones Web & Ingeniería de Software',
      roleDev: 'Desarrollador Full Stack | Java, React, TypeScript, Web & 3D',
      descClient: 'Construyendo aplicaciones web y experiencias digitales centradas en código limpio, arquitectura sólida y fiabilidad.',
      descDev: 'Desarrollo de software completo: backend en Java/Spring, frontend moderno en React & TypeScript, además de experiencia sólida en Lua, computación 3D y optimización.',
      btnProjectsClient: 'Ver Soluciones',
      btnProjectsDev: 'Ver Proyectos & Código',
      btnContactClient: 'Contactar',
      btnContactDev: 'Hablar Conmigo',
      particleHintClient: 'Mantén presionado para atraer partículas o explora competencias:',
      particleHintDev: 'Mantén presionado para atraer partículas o cambia la forma 3D:',
      shapes: {
        react: 'Interfaces (React)',
        lua: 'Lua & Rendimiento',
        cube: 'Modelos & 3D WebGL',
        code: 'Código Limpio',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Aplicaciones Entregadas',
        stat1Desc: 'Proyectos activos en producción',
        stat2Label: 'Alto Rendimiento',
        stat2Desc: 'Software ágil y sin lentitud',
        stat3Label: 'Años de Práctica',
        stat3Desc: 'Evolución continua en ingeniería',
        stat4Label: 'Proyectos Concluidos',
        stat4Desc: 'Web, Backend y Arte 3D',
      },
      dev: {
        stat1Label: 'Módulos & Apps',
        stat1Desc: 'Full Stack, APIs y Web',
        stat2Label: 'Optimización',
        stat2Desc: 'Baja latencia y 60-144 FPS',
        stat3Label: 'Años Programando',
        stat3Desc: 'Computación y software',
        stat4Label: 'Repositorios',
        stat4Desc: 'Código abierto y proyectos reales',
      },
    },
    showcase3d: {
      badgeClient: 'Tecnología Interactiva & Fluidez',
      badgeDev: 'Ingeniería 3D WebGL de Alto Rendimiento',
      title: 'Showcase 3D & Simulación de Rendimiento',
      descClient: 'Observa en tiempo real cómo las aplicaciones modernas utilizan gráficos tridimensionales de forma ágil y fluida.',
      descDev: 'Inspecciona shaders interactivos en Three.js (Cubo 3D animado, gema física, anillo cósmico) y métricas de frame rate.',
      btnBenchmark: 'Ejecutar Benchmark en Vivo',
      benchmarkingText: 'Calculando estabilidad...',
      fpsLabel: 'FPS Estable',
      tickLabel: 'Frecuencia de Actualización',
      scoreLabel: 'Índice de Estabilidad',
      modelSelector: 'Modelo 3D:',
      wireframe: 'Wireframe',
      models: {
        core: 'Núcleo',
        gem: 'Diamante',
        torus: 'Anillo Cósmico',
        cube: 'Cubo 3D',
      },
      tableHeader: {
        resource: 'Módulo / Sistema',
        type: 'Tipo de Recurso',
        time: 'Latencia (ms)',
        memory: 'Memoria',
        status: 'Estado',
      },
    },
    projects: {
      appTitle: 'Aplicaciones Web & Herramientas',
      appDescClient: 'Aplicaciones interactivas creadas para resolver necesidades concretas con agilidad.',
      appDescDev: 'Aplicaciones web modernas, CLIs interactivas, seguridad de datos y utilidades.',
      sitesTitle: 'Destacados & Sitios Web',
      sitesDescClient: 'Portafolios de alta fidelidad, plataformas 3D y sitios web institucionales.',
      sitesDescDev: 'Worldbuilding 3D en Unreal Engine 5 (Eclipsário), paneles de control y landing pages.',
      featuredBadge: 'Destacado Especial',
      demoBtn: 'Demo en Vivo',
      visitBtn: 'Visitar',
      codeBtn: 'Código',
      creditsBtn: 'Créditos',
      interactiveDemoBadge: 'Demo Interactiva',
      openDemo: 'Abrir Demo Interactiva 💻',
      visitSite: 'Visitar Sitio 🚀',
    },
    skills: {
      title: 'Habilidades & Tecnologías',
      descClient: 'Dominio integral para construir tu aplicación desde el diseño hasta la producción.',
      descDev: 'Stack tecnológico completo: Java/Spring, React 19, TypeScript, Lua, Shaders y 3D.',
      allCategories: 'Todas',
      categories: {
        gta: 'Lua & Rendimiento',
        nui: 'Frontend Reactivo',
        '3d': '3D & Computación Gráfica',
        backend: 'Backend & BD',
        frontend: 'Web & UI',
        tools: 'Herramientas & DevOps',
      },
    },
    experience: {
      title: 'Trayectoria & Experiencia',
      descClient: 'Historial continuo de proyectos, compromiso y evolución en ingeniería de software.',
      descDev: 'Línea de tiempo técnica: avance en lenguajes, frameworks, seguridad y computación.',
      educationTitle: 'Formación Académica',
      educationSubtitle: 'Bases sólidas en Desarrollo de Sistemas, Ingeniería de Software y Computación.',
    },
    contact: {
      title: '¿Conversamos?',
      descClient: '¿Tienes una vacante o proyecto? Envíame un mensaje y conversemos.',
      descDev: 'Abierto a oportunidades de Full Stack, Backend Java, Frontend React o proyectos 3D.',
      formTitle: 'Enviar Mensaje',
      nameLabel: 'Tu Nombre / Empresa',
      namePlaceholder: '¿Cómo puedo llamarte?',
      emailLabel: 'Correo de Contacto',
      emailPlaceholder: 'contacto@empresa.com',
      messageLabel: 'Mensaje o Propuesta',
      messagePlaceholder: 'Cuéntame sobre la oportunidad o proyecto...',
      sendBtn: 'Enviar Mensaje',
      sendingBtn: 'Enviando...',
      successMsg: '¡Mensaje enviado con éxito! Me pondré en contacto pronto.',
      quickChat: 'Contacto Directo',
      discordUser: 'Daniel Reis',
      copiedToast: '¡Copiado al portapapeles!',
    },
    clock: {
      brtTime: 'Hora de Brasilia (BRT UTC-3)',
      localTime: 'Hora Local',
      statusOnline: 'En Línea • Abierto a Oportunidades',
    },
    console: {
      buttonLabel: 'Terminal [F8]',
      title: 'Consola de Desarrollador [F8]',
      inputPlaceholder: "Escribe un comando (ej: 'help', 'theme', 'stats')...",
      welcomeMsg: 'Consola interactiva inicializada.',
      connectedMsg: 'Conectado al entorno de Daniel Reis.',
      helpTip: "Presiona F8 o 'exit' para cerrar.",
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      tagline: 'Construido con código limpio, arquitectura sólida y alto rendimiento.',
    },
  },

  ja: {
    nav: {
      home: 'ホーム',
      skills: 'スキル',
      experience: '経歴',
      applications: 'アプリ',
      sites: '特選・サイト',
      contact: 'お問い合わせ',
      cv: '履歴書',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: 'ビジネス / 採用視点',
      dev: 'エンジニア視点',
      clientTooltip: '採用担当者向け：ビジネス価値、成果物、UIの完成度と信頼性を重視',
      devTooltip: 'エンジニア向け：Java、React、クリーンアーキテクチャ、Lua、3D仕様',
      modalTitle: 'ポートフォリオの表示モードを選択してください',
      modalSubtitle: '目的に合わせて最適な体験を提供します。説明や技術指標が切り替わります：',
      clientCardTitle: '採用担当者・マネージャー様',
      clientCardDesc: 'プロダクトの品質、UXの良さ、安定稼働と保守性に焦点を当てた説明です。',
      clientCardBullets: [
        '高速でモダン、レスポンシブなWebアプリケーション',
        'ユーザー体験とビジネス価値を最大化する設計',
        'クリーンで堅牢なソフトウェアアーキテクチャ',
        '明確なコミュニケーションと納期遵守の徹底',
      ],
      clientCardBtn: '採用視点で見る →',
      devCardTitle: 'エンジニア・技術責任者様',
      devCardDesc: 'Java/Spring、React 19、TypeScript、Luaの知見、3D WebGLなどの詳細。',
      devCardBullets: [
        'Java & Spring Boot / Node.jsによる堅牢なバックエンド',
        'React 19 & TypeScriptによるモダンフロントエンド',
        'Three.js / Unreal Engine 5による3Dグラフィックス',
        '幅広い技術対応力：Luaや低遅延設計にも精通',
      ],
      devCardBtn: 'エンジニア視点で見る →',
      recommendedBadge: '採用向け',
      technicalBadge: '技術仕様',
      modalFooterNote: '💡 画面上部の切り替えボタンからいつでもモードを変更できます。',
      skip: 'スキップして進む',
    },
    hero: {
      statusBadge: '就業機会・案件相談受付中',
      name: 'Daniel Reis',
      roleClient: 'フルスタックエンジニア | モダンWebアプリケーション & ソフトウェア工学',
      roleDev: 'フルスタックエンジニア | Java, React, TypeScript, Web & 3D',
      descClient: 'クリーンコード、堅牢なアーキテクチャ、優れたユーザー体験を追求し、実用性の高いWebアプリケーションを開発しています。',
      descDev: 'Java/Springによる堅牢なバックエンドからReact/TypeScriptフロントエンドまで対応。Luaでの高速処理や3Dグラフィックスの知見も保有。',
      btnProjectsClient: 'ソリューションを見る',
      btnProjectsDev: 'プロジェクト＆コードを見る',
      btnContactClient: '連絡を取る',
      btnContactDev: 'お問い合わせ',
      particleHintClient: '長押しで粒子を引き寄せるか、技術領域を選択：',
      particleHintDev: '長押しで粒子を引き寄せるか、3D形状を切り替え：',
      shapes: {
        react: 'モダンUI設計 (React)',
        lua: 'Lua & 高速処理',
        cube: '3D WebGLモデル',
        code: 'クリーンコード',
        java: 'Javaバックエンド',
      },
    },
    stats: {
      client: {
        stat1Label: '納品アプリケーション',
        stat1Desc: '安定稼働する本番ソリューション',
        stat2Label: '高パフォーマンス',
        stat2Desc: '遅延のない高速レスポンス',
        stat3Label: '開発年数',
        stat3Desc: 'ソフトウェア工学の継続学習',
        stat4Label: '完成プロジェクト',
        stat4Desc: 'Webアプリ・バックエンド・3D',
      },
      dev: {
        stat1Label: 'モジュール＆アプリ',
        stat1Desc: 'Full Stack, API & Web',
        stat2Label: '最適化志向',
        stat2Desc: '低レイテンシと60-144 FPS対応',
        stat3Label: '開発年数',
        stat3Desc: '計算機科学とソフトウェア',
        stat4Label: 'リポジトリ数',
        stat4Desc: 'OSSおよびプロダクションコード',
      },
    },
    showcase3d: {
      badgeClient: 'インタラクティブ技術と快適性',
      badgeDev: 'ハイパフォーマンス 3D WebGL エンジニアリング',
      title: '3D ショーケース ＆ パフォーマンス診断',
      descClient: '最新のWebアプリケーションがいかにスムーズかつ軽量に3D描画を実行できるかをリアルタイムで体感できます。',
      descDev: 'Three.jsシェーダー（回転する3Dルービックキューブ、物理マテリアル、トーラス）とフレームレート計測。',
      btnBenchmark: 'リアルタイム ベンチマーク実行',
      benchmarkingText: '負荷計算中...',
      fpsLabel: '安定FPS',
      tickLabel: '更新レート',
      scoreLabel: '安定性スコア',
      modelSelector: '3Dモデル選択：',
      wireframe: 'ワイヤーフレーム',
      models: {
        core: 'コア',
        gem: 'ダイヤモンド',
        torus: 'コズミックリング',
        cube: '3Dキューブ',
      },
      tableHeader: {
        resource: 'モジュール / リソース',
        type: '種類',
        time: '処理時間 (ms)',
        memory: 'メモリ',
        status: 'ステータス',
      },
    },
    projects: {
      appTitle: 'Webアプリケーション＆ツール',
      appDescClient: '実用的な課題を素早く解決するために開発されたインタラクティブアプリ群。',
      appDescDev: 'モダンWebアプリケーション、CLIツール、セキュリティ基盤、ユーティリティ。',
      sitesTitle: '特選プロジェクト＆Webサイト',
      sitesDescClient: '高品質な3Dショールーム、洗練されたWebプラットフォーム。',
      sitesDescDev: 'Unreal Engine 5による3Dスタジオ（Eclipsário）、管理ポータル。',
      featuredBadge: '注目のハイライト',
      demoBtn: 'ライブデモ',
      visitBtn: 'サイト訪問',
      codeBtn: 'ソースコード',
      creditsBtn: 'クレジット',
      interactiveDemoBadge: 'インタラクティブ デモ',
      openDemo: 'デモを開く 💻',
      visitSite: 'サイトを開く 🚀',
    },
    skills: {
      title: 'スキルと使用技術',
      descClient: '設計からバックエンド、モダンフロントエンドまで一貫して対応できる総合力。',
      descDev: 'Java/Spring、React 19、TypeScript、Lua、WebGLシェーダー、3Dモデリング。',
      allCategories: 'すべて',
      categories: {
        gta: 'Lua & 高速化',
        nui: 'モダンフロントエンド',
        '3d': '3D・CG',
        backend: 'バックエンド・DB',
        frontend: 'Web & UI',
        tools: 'ツール・DevOps',
      },
    },
    experience: {
      title: '経歴と実績',
      descClient: '継続的なプロジェクト納品と技術品質向上への絶え間ない取り組み。',
      descDev: '技術の歩み：言語習得、セキュリティ、アーキテクチャ設計、コンピュータ工学。',
      educationTitle: '学歴・教育課程',
      educationSubtitle: 'システム開発、ソフトウェア工学、計算機科学の確かな基礎。',
    },
    contact: {
      title: 'お気軽にご連絡ください',
      descClient: '採用情報や開発のご相談がございましたら、ぜひお気軽にお問い合わせください！',
      descDev: 'フルスタック、Javaバックエンド、Reactフロントエンド、3D案件も歓迎します。',
      formTitle: 'メッセージ送信',
      nameLabel: 'お名前 / 企業名',
      namePlaceholder: 'お名前を入力してください',
      emailLabel: '連絡先メールアドレス',
      emailPlaceholder: 'contact@company.com',
      messageLabel: 'ご用件 / メッセージ',
      messagePlaceholder: '案件概要やメッセージをご記入ください...',
      sendBtn: 'メッセージを送信',
      sendingBtn: '送信中...',
      successMsg: '送信が完了しました！折り返しご連絡いたします。',
      quickChat: '直接連絡先',
      discordUser: 'Daniel Reis',
      copiedToast: 'クリップボードにコピーしました！',
    },
    clock: {
      brtTime: 'ブラジリア標準時 (BRT UTC-3)',
      localTime: '現地時刻',
      statusOnline: 'オンライン • 就業機会受付中',
    },
    console: {
      buttonLabel: 'ターミナル [F8]',
      title: '開発者ターミナル [F8]',
      inputPlaceholder: "コマンドを入力 (例: 'help', 'theme', 'stats')...",
      welcomeMsg: 'インタラクティブ開発コンソールが起動しました。',
      connectedMsg: 'Daniel Reis 開発環境に接続中。',
      helpTip: "F8キーまたは 'exit' で閉じます。",
    },
    footer: {
      rights: '無断転載を禁じます。',
      tagline: 'クリーンコード、堅牢なアーキテクチャ、高パフォーマンスを追求。',
    },
  },

  zh: {
    nav: {
      home: '首页',
      skills: '技术栈',
      experience: '个人经历',
      applications: '应用项目',
      sites: '精选与网站',
      contact: '联系我',
      cv: '简历',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: '业务 / 招聘视角',
      dev: '工程 / 开发者视角',
      clientTooltip: '招聘者视角：注重业务价值、交付质量、现代UI与系统稳定性',
      devTooltip: '技术视角：关注 Java、React、清晰架构、Lua 实战与性能表现',
      modalTitle: '请选择您的浏览模式',
      modalSubtitle: '我们为您定制专属的浏览体验，呈现您最关心的内容：',
      clientCardTitle: '招聘者 / 团队负责人',
      clientCardDesc: '注重产品思维、用户交互体验、系统可靠性与高效交付。',
      clientCardBullets: [
        '极速、现代且响应灵敏的 Web 应用程序',
        '以用户体验和实际业务价值为核心',
        '结构清晰、易维护且稳固的软件工程架构',
        '良好的沟通协调能力与准时交付意识',
      ],
      clientCardBtn: '以招聘视角探索 →',
      devCardTitle: '软件工程师 / 技术专家',
      devCardDesc: '硬核技术栈：Java/Spring Boot、React 19、TypeScript、Lua 与 3D 渲染。',
      devCardBullets: [
        '基于 Java & Spring Boot / Node.js 的稳健后端架构',
        '基于 React 19 & TypeScript 的现代响应式前端',
        '计算机图形学与 WebGL 3D 渲染 (Three.js / UE5)',
        '广阔技术视野：熟练掌握 Lua 及低延迟性能优化',
      ],
      devCardBtn: '以工程师视角探索 →',
      recommendedBadge: '招聘首选',
      technicalBadge: '技术硬核',
      modalFooterNote: '💡 您可以随时在网站顶部导航栏切换浏览视角。',
      skip: '跳过并继续',
    },
    hero: {
      statusBadge: '开放求职与技术项目合作',
      name: 'Daniel Reis',
      roleClient: '全栈开发工程师 | 现代 Web 应用与软件工程',
      roleDev: '全栈开发工程师 | Java, React, TypeScript, Web & 3D',
      descClient: '专注于构建高可靠性的 Web 应用与数字交互体验，追求整洁代码、良好架构与出色的产品体验。',
      descDev: '全链路软件工程能力：Java/Spring Boot 后端架构，现代 React/TypeScript 前端，并兼备 Lua 脚本、3D 计算机图形与高并发性能优化经验。',
      btnProjectsClient: '查看项目方案',
      btnProjectsDev: '查看项目与代码',
      btnContactClient: '取得联系',
      btnContactDev: '与我沟通',
      particleHintClient: '按住鼠标吸引粒子，或选择技术专长：',
      particleHintDev: '按住鼠标吸引粒子，或切换 3D 粒子形态：',
      shapes: {
        react: '交互界面设计 (React)',
        lua: 'Lua & 高性能',
        cube: '3D WebGL 模型',
        code: '整洁架构代码',
        java: 'Java 后端架构',
      },
    },
    stats: {
      client: {
        stat1Label: '已交付应用',
        stat1Desc: '线上稳定运行的成熟方案',
        stat2Label: '极速响应',
        stat2Desc: '丝滑流畅，绝无卡顿',
        stat3Label: '工程经验',
        stat3Desc: '持续深耕软件工程实践',
        stat4Label: '落地项目',
        stat4Desc: 'Web、后端系统与 3D 资产',
      },
      dev: {
        stat1Label: '模块与应用数',
        stat1Desc: 'Full Stack, API & Web',
        stat2Label: '性能优化',
        stat2Desc: '追求低延迟与 60-144 FPS',
        stat3Label: '代码编写年限',
        stat3Desc: '计算机科学与软件工程',
        stat4Label: '代码仓库数',
        stat4Desc: '开源项目与实战代码',
      },
    },
    showcase3d: {
      badgeClient: '交互科技与流畅体验',
      badgeDev: '高性能 3D WebGL 图形工程',
      title: '3D 互动展示与性能实时监测',
      descClient: '实时查看现代应用如何流畅运行三维图形，带来卓越视觉的同时绝不影响设备性能。',
      descDev: '实时检验 Three.js 着色器（动态机械魔方、物理宝石折射、星环）与帧率实时监控。',
      btnBenchmark: '启动实时基准测试',
      benchmarkingText: '正在计算系统压力...',
      fpsLabel: '稳定帧率 (FPS)',
      tickLabel: '更新频率',
      scoreLabel: '稳定性评分',
      modelSelector: '3D 模型选择：',
      wireframe: '线框模式',
      models: {
        core: '核心光球',
        gem: '物理钻石',
        torus: '星环',
        cube: '3D 魔方',
      },
      tableHeader: {
        resource: '资源 / 系统模块',
        type: '资源类型',
        time: '延迟时间 (ms)',
        memory: '内存占用',
        status: '运行状态',
      },
    },
    projects: {
      appTitle: 'Web 应用与开发工具',
      appDescClient: '为解决现实需求而打造的高效数字工具与交互系统。',
      appDescDev: '功能完备的现代化 Web 应用、开发者 CLI、安全防护与实用工具。',
      sitesTitle: '精选重磅项目与完整网站',
      sitesDescClient: '高保真 3D 展厅、沉浸式官方门户与完整 Web 平台。',
      sitesDescDev: '虚幻引擎 5 宇宙 3D 工作室（Eclipsário）与现代门户管理平台。',
      featuredBadge: '重磅精选',
      demoBtn: '在线演示',
      visitBtn: '访问网站',
      codeBtn: '查看源码',
      creditsBtn: '鸣谢',
      interactiveDemoBadge: '实时交互演示',
      openDemo: '在浏览器中打开演示 💻',
      visitSite: '访问官方站点 🚀',
    },
    skills: {
      title: '专业技能与技术栈',
      descClient: '全链路专业技能，覆盖产品设计、后端架构与前端交付。',
      descDev: 'Java/Spring、React 19、TypeScript、Lua、WebGL 着色器与 3D 建模。',
      allCategories: '全部技术',
      categories: {
        gta: 'Lua & 高性能',
        nui: '响应式前端',
        '3d': '3D 与计算机图形',
        backend: '后端与数据库',
        frontend: 'Web 与交互',
        tools: '开发工具与运维',
      },
    },
    experience: {
      title: '成长足迹与实战经历',
      descClient: '持续交付高质量项目，精益求精的技术积累。',
      descDev: '技术演进路线：编程语言深造、系统安全性、架构设计与计算机科学。',
      educationTitle: '教育背景',
      educationSubtitle: '系统开发、软件工程与计算机科学的扎实学术根基。',
    },
    contact: {
      title: '期待与您合作',
      descClient: '无论您有全职职位机会还是软件项目需求，欢迎随时留言洽谈！',
      descDev: '欢迎探讨全栈工程师、Java 后端、React 前端或 3D 开发合作。',
      formTitle: '发送即时消息',
      nameLabel: '您的称呼 / 企业名称',
      namePlaceholder: '请问如何称呼您？',
      emailLabel: '联系邮箱',
      emailPlaceholder: 'contact@company.com',
      messageLabel: '工作机会或需求描述',
      messagePlaceholder: '请详细描述您的职位要求或项目需求...',
      sendBtn: '立即发送消息',
      sendingBtn: '正在发送...',
      successMsg: '消息发送成功！我会尽快与您取得联系。',
      quickChat: '快速联系',
      discordUser: 'Daniel Reis',
      copiedToast: '已复制到剪贴板！',
    },
    clock: {
      brtTime: '巴西利亚时间 (BRT UTC-3)',
      localTime: '本地时间',
      statusOnline: '在线 • 开放求职机会',
    },
    console: {
      buttonLabel: '终端 [F8]',
      title: '开发者终端控制台 [F8]',
      inputPlaceholder: "输入命令（如 'help', 'theme', 'stats'）...",
      welcomeMsg: '交互式控制台已成功启动。',
      connectedMsg: '已连接至 Daniel Reis 开发者沙盒。',
      helpTip: "按 F8 或输入 'exit' 关闭控制台。",
    },
    footer: {
      rights: '保留所有权利。',
      tagline: '倾注匠心与工程追求，专注于整洁代码与高性能细节。',
    },
  },

  ko: {
    nav: {
      home: '홈',
      skills: '기술 스택',
      experience: '경력',
      applications: '애플리케이션',
      sites: '주요 사이트',
      contact: '문의하기',
      cv: '이력서',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: '비즈니스 / 채용 관점',
      dev: '엔지니어링 관점',
      clientTooltip: '채용 담당자 관점: 비즈니스 가치, UI 완성도, 안정성 및 실용성에 집중',
      devTooltip: '엔지니어 관점: Java, React, 클린 아키텍처, Lua 활용 및 성능',
      modalTitle: '포트폴리오 탐색 모드를 선택해주세요',
      modalSubtitle: '방문 목적에 맞는 최적의 경험을 제공합니다:',
      clientCardTitle: '채용 담당자 / 프로젝트 매니저',
      clientCardDesc: '제품 완성도, 사용자 경험, 높은 시스템 신뢰성에 집중한 설명입니다.',
      clientCardBullets: [
        '빠르고 현대적이며 반응성이 뛰어난 웹 애플리케이션',
        '사용자 경험과 비즈니스 가치를 극대화하는 설계',
        '견고하고 유지보수가 용이한 클린 소프트웨어 아키텍처',
        '원활한 커뮤니케이션과 일정 준수 마인드',
      ],
      clientCardBtn: '채용 관점으로 탐색 →',
      devCardTitle: '소프트웨어 엔지니어 / 테크 리드',
      devCardDesc: '기술 스택 상세: Java/Spring, React 19, TypeScript, Lua, 3D WebGL.',
      devCardBullets: [
        'Java & Spring Boot / Node.js 기반의 안정적인 백엔드',
        'React 19 & TypeScript 기반의 모던 리액티브 프론트엔드',
        '컴퓨터 그래픽스 및 WebGL 3D (Three.js / Unreal Engine 5)',
        '폭넓은 기술 적응력: Lua 및 저지연 최적화 역량 보유',
      ],
      devCardBtn: '엔지니어 관점으로 탐색 →',
      recommendedBadge: '채용 담당자 추천',
      technicalBadge: '기술 사양',
      modalFooterNote: '💡 화면 상단의 토글 스위치로 언제든지 모드를 변경할 수 있습니다.',
      skip: '건너뛰고 계속하기',
    },
    hero: {
      statusBadge: '채용 기회 및 프로젝트 협업 가능',
      name: 'Daniel Reis',
      roleClient: '풀스택 개발자 | 모던 웹 애플리케이션 & 소프트웨어 엔지니어링',
      roleDev: '풀스택 개발자 | Java, React, TypeScript, Web & 3D',
      descClient: '클린 코드, 탄탄한 아키텍처, 직관적인 사용자 경험을 기반으로 실용적이고 완성도 높은 웹 애플리케이션을 개발합니다.',
      descDev: '엔드투엔드 소프트웨어 개발: Java/Spring 백엔드, 모던 React/TypeScript 프론트엔드, Lua 고성능 스크립팅 및 3D 컴퓨터 그래픽스 역량 보유.',
      btnProjectsClient: '프로젝트 보기',
      btnProjectsDev: '프로젝트 & 코드 보기',
      btnContactClient: '연락하기',
      btnContactDev: '문의하기',
      particleHintClient: '클릭한 채로 파티클을 모으거나 전문 역량을 선택하세요:',
      particleHintDev: '클릭한 채로 파티클을 모으거나 3D 형태를 변경하세요:',
      shapes: {
        react: '인터랙티브 UI (React)',
        lua: 'Lua & 고성능',
        cube: '3D WebGL 모델',
        code: '클린 아키텍처',
        java: 'Java 백엔드',
      },
    },
    stats: {
      client: {
        stat1Label: '납품 애플리케이션',
        stat1Desc: '안정적으로 운영 중인 솔루션',
        stat2Label: '고성능 최적화',
        stat2Desc: '렉 없이 매끄러운 반응 속도',
        stat3Label: '개발 경력',
        stat3Desc: '소프트웨어 엔지니어링 지속 학습',
        stat4Label: '완료된 프로젝트',
        stat4Desc: '웹 앱, 백엔드 & 3D 그래픽스',
      },
      dev: {
        stat1Label: '모듈 및 앱',
        stat1Desc: 'Full Stack, API & Web',
        stat2Label: '성능 최적화',
        stat2Desc: '저지연 및 60-144 FPS 지향',
        stat3Label: '코딩 경력',
        stat3Desc: '컴퓨터 공학 및 소프트웨어',
        stat4Label: '리포지토리 수',
        stat4Desc: '오픈 소스 및 프로덕션 빌드',
      },
    },
    showcase3d: {
      badgeClient: '인터랙티브 기술 & 부드러운 구동',
      badgeDev: '고성능 3D WebGL 그래픽스 엔지니어링',
      title: '3D 쇼케이스 & 실시간 성능 진단',
      descClient: '현대적인 웹 애플리케이션이 사용자 기기 부하 없이 3D 그래픽을 매끄럽게 렌더링하는 과정을 직접 확인해보세요.',
      descDev: 'Three.js 셰이더(회전하는 3D 루빅스 큐브, 물리 젬, 토러스) 및 실시간 프레임 레이트를 검사합니다.',
      btnBenchmark: '실시간 벤치마크 실행',
      benchmarkingText: '부하 테스트 계산 중...',
      fpsLabel: '안정적인 FPS',
      tickLabel: '갱신 빈도',
      scoreLabel: '안정성 점수',
      modelSelector: '3D 모델 선택:',
      wireframe: '와이어프레임',
      models: {
        core: '코어 구체',
        gem: '다이아몬드',
        torus: '코스믹 링',
        cube: '3D 큐브',
      },
      tableHeader: {
        resource: '모듈 / 리소스',
        type: '리소스 유형',
        time: '응답 속도 (ms)',
        memory: '메모리',
        status: '상태',
      },
    },
    projects: {
      appTitle: '웹 애플리케이션 및 도구',
      appDescClient: '실제 문제를 효율적으로 해결하기 위해 제작된 직관적인 애플리케이션 모음입니다.',
      appDescDev: '모던 웹 애플리케이션, 개발자 CLI, 보안 대시보드 및 유용한 도구.',
      sitesTitle: '주요 프로젝트 & 웹사이트',
      sitesDescClient: '고품질 3D 쇼룸, 포트폴리오 및 풀스택 웹 플랫폼.',
      sitesDescDev: '언리얼 엔진 5 기반 3D 스튜디오(Eclipsário) 및 관리 플랫폼.',
      featuredBadge: '주요 추천작',
      demoBtn: '라이브 데모',
      visitBtn: '방문하기',
      codeBtn: '소스 코드',
      creditsBtn: '크레딧',
      interactiveDemoBadge: '인터랙티브 데모',
      openDemo: '브라우저에서 데모 실행 💻',
      visitSite: '웹사이트 방문 🚀',
    },
    skills: {
      title: '기술 스택 및 전문 역량',
      descClient: '기획, 디자인부터 백엔드 및 인프라 구축까지 아우르는 종합적인 실행력.',
      descDev: 'Java/Spring, React 19, TypeScript, Lua, WebGL 셰이더 및 3D 모델링.',
      allCategories: '전체 기술',
      categories: {
        gta: 'Lua & 고성능',
        nui: '리액티브 프론트엔드',
        '3d': '3D & 그래픽스',
        backend: '백엔드 & DB',
        frontend: '웹 & UI',
        tools: '도구 & DevOps',
      },
    },
    experience: {
      title: '경력 및 성장 과정',
      descClient: '꾸준한 프로젝트 성공 납품과 기술 완성도를 향한 헌신.',
      descDev: '기술 로드맵: 프로그래밍 언어, 백엔드 프레임워크, 아키텍처 및 컴퓨터 공학.',
      educationTitle: '학력 사항',
      educationSubtitle: '시스템 개발, 소프트웨어 공학 및 컴퓨터 공학의 탄탄한 학문적 기반.',
    },
    contact: {
      title: '함께 일해볼까요?',
      descClient: '채용 기회나 협업 프로젝트가 있으신가요? 편하게 메시지를 남겨주세요!',
      descDev: '풀스택, Java 백엔드, React 프론트엔드 또는 3D 개발 기회 환영합니다.',
      formTitle: '다이렉트 메시지 보내기',
      nameLabel: '성함 / 회사명',
      namePlaceholder: '성함을 입력해주세요',
      emailLabel: '연락처 이메일',
      emailPlaceholder: 'contact@company.com',
      messageLabel: '채용 포지션 또는 제안 내용',
      messagePlaceholder: '담당 직무나 프로젝트 내용을 작성해주세요...',
      sendBtn: '메시지 전송',
      sendingBtn: '전송 중...',
      successMsg: '메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.',
      quickChat: '직접 연락처',
      discordUser: 'Daniel Reis',
      copiedToast: '클립보드에 복사되었습니다!',
    },
    clock: {
      brtTime: '브라질리아 표준시 (BRT UTC-3)',
      localTime: '현재 현지 시각',
      statusOnline: '온라인 • 채용 기회 열림',
    },
    console: {
      buttonLabel: '터미널 [F8]',
      title: '개발자 터미널 [F8]',
      inputPlaceholder: "명령어를 입력하세요 (예: 'help', 'theme', 'stats')...",
      welcomeMsg: '인터랙티브 콘솔이 성공적으로 초기화되었습니다.',
      connectedMsg: 'Daniel Reis 개발 환경에 연결되었습니다.',
      helpTip: "F8 키 또는 'exit'을 입력해 닫으세요.",
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: '클린 코드, 견고한 아키텍처 및 고성능을 지향하여 제작되었습니다.',
    },
  },

  ru: {
    nav: {
      home: 'Главная',
      skills: 'Навыки',
      experience: 'Опыт',
      applications: 'Приложения',
      sites: 'Проекты & Сайты',
      contact: 'Контакты',
      cv: 'Резюме',
      viewCvPt: '🇧🇷 PT-BR',
      viewCvEn: '🇺🇸 EN-US',
    },
    perspective: {
      client: 'Бизнес / Рекрутер',
      dev: 'Инженерия / Dev',
      clientTooltip: 'Взгляд для рекрутера: Практический результат, надежность, чистый UI и надежность',
      devTooltip: 'Взгляд инженера: Архитектура ПО, Java, React, чистый код, Lua и метрики',
      modalTitle: 'Как вы хотите просматривать это портфолио?',
      modalSubtitle: 'Выберите подходящий формат в зависимости от вашей цели:',
      clientCardTitle: 'Рекрутер / Руководитель проекта',
      clientCardDesc: 'Фокус на продуктовом подходе, пользовательском опыте и надежности ПО.',
      clientCardBullets: [
        'Быстрые, современные и адаптивные веб-приложения',
        'Фокус на бизнес-ценности и качестве интерфейсов',
        'Чистая, масштабируемая и надежная архитектура',
        'Четкая коммуникация, ответственность и соблюдение сроков',
      ],
      clientCardBtn: 'Смотреть как Рекрутер →',
      devCardTitle: 'Разработчик / Техлид',
      devCardDesc: 'Технический стек: Java/Spring, React 19, TypeScript, знание Lua и 3D WebGL.',
      devCardBullets: [
        'Надежный бэкенд на Java & Spring Boot / Node.js',
        'Современный фронтенд на React 19 & TypeScript',
        'Компьютерная графика и WebGL 3D (Three.js / Unreal 5)',
        'Широкий кругозор: владею Lua и оптимизацией задержек',
      ],
      devCardBtn: 'Смотреть как Инженер →',
      recommendedBadge: 'Для Рекрутеров',
      technicalBadge: 'Технический',
      modalFooterNote: '💡 Вы можете переключить режим в любое время в верхнем меню сайта.',
      skip: 'Пропустить и продолжить',
    },
    hero: {
      statusBadge: 'Открыт к предложениям и проектам',
      name: 'Daniel Reis',
      roleClient: 'Full Stack Разработчик | Современные Веб-Приложения & Инженерия ПО',
      roleDev: 'Full Stack Разработчик | Java, React, TypeScript, Web & 3D',
      descClient: 'Создаю надежные веб-приложения и цифровые решения с упором на чистый код, надежную архитектуру и удобный интерфейс.',
      descDev: 'Разработка ПО полного цикла: Java/Spring бэкенд, современный React/TypeScript фронтенд, а также опыт в Lua, 3D компьютерной графике и оптимизации.',
      btnProjectsClient: 'Смотреть Решения',
      btnProjectsDev: 'Смотреть Проекты & Код',
      btnContactClient: 'Связаться',
      btnContactDev: 'Написать Мне',
      particleHintClient: 'Удерживайте клик, чтобы притянуть частицы, или выберите навык:',
      particleHintDev: 'Удерживайте клик, чтобы притянуть частицы, или измените форму 3D:',
      shapes: {
        react: 'Интерфейсы (React)',
        lua: 'Lua & Производительность',
        cube: '3D WebGL Модели',
        code: 'Чистая Архитектура',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Готовых приложений',
        stat1Desc: 'Решения в коммерческом продакшене',
        stat2Label: 'Высокая скорость',
        stat2Desc: 'Быстрый отклик без задержек',
        stat3Label: 'Лет практики',
        stat3Desc: 'Непрерывное развитие в разработке',
        stat4Label: 'Завершенных проектов',
        stat4Desc: 'Веб, Бэкенд и 3D графика',
      },
      dev: {
        stat1Label: 'Модулей и приложений',
        stat1Desc: 'Full Stack, API & Web',
        stat2Label: 'Оптимизация',
        stat2Desc: 'Фокус на низкой задержке и 60-144 FPS',
        stat3Label: 'Лет в коде',
        stat3Desc: 'Компьютерные науки и ПО',
        stat4Label: 'Репозиториев',
        stat4Desc: 'Open Source и реальные проекты',
      },
    },
    showcase3d: {
      badgeClient: 'Интерактивные технологии & Скорость',
      badgeDev: 'Инженерия 3D WebGL и производительность',
      title: '3D Интерактивный показ & Тест производительности',
      descClient: 'Убедитесь в реальном времени, как современные приложения используют трехмерную графику плавно и без нагрузки на устройство.',
      descDev: 'Инспекция шейдеров Three.js (анимированный кубик Рубика, физический алмаз, кольцо) и мониторинг кадровой частоты.',
      btnBenchmark: 'Запустить Тест Производительности',
      benchmarkingText: 'Вычисление стабильности...',
      fpsLabel: 'Стабильный FPS',
      tickLabel: 'Частота обновления',
      scoreLabel: 'Индекс стабильности',
      modelSelector: '3D Модель:',
      wireframe: 'Сетка (Wireframe)',
      models: {
        core: 'Ядро',
        gem: 'Алмаз',
        torus: 'Космическое кольцо',
        cube: '3D Куб',
      },
      tableHeader: {
        resource: 'Модуль / Ресурс',
        type: 'Тип',
        time: 'Задержка (ms)',
        memory: 'Память',
        status: 'Статус',
      },
    },
    projects: {
      appTitle: 'Веб-приложения и инструменты',
      appDescClient: 'Интерактивные цифровые решения, созданные для удобного решения практических задач.',
      appDescDev: 'Современные веб-приложения, CLI утилиты, дашборды безопасности и инструменты.',
      sitesTitle: 'Главные проекты & Сайты',
      sitesDescClient: 'Высокодетализированные 3D витрины, платформы и официальные сайты.',
      sitesDescDev: 'Ворлдбилдинг в Unreal Engine 5 (Eclipsário) и веб-платформы.',
      featuredBadge: 'Главный проект',
      demoBtn: 'Демо онлайн',
      visitBtn: 'Открыть сайт',
      codeBtn: 'Исходный код',
      creditsBtn: 'Благодарности',
      interactiveDemoBadge: 'Интерактивное Демо',
      openDemo: 'Запустить демо 💻',
      visitSite: 'Перейти на сайт 🚀',
    },
    skills: {
      title: 'Навыки и технологии',
      descClient: 'Полный комплекс компетенций: от продуктового дизайна до бэкенда.',
      descDev: 'Широкий стек: Java/Spring, React 19, TypeScript, Lua, шейдеры и 3D моделирование.',
      allCategories: 'Все технологии',
      categories: {
        gta: 'Lua & Оптимизация',
        nui: 'Реактивный фронтенд',
        '3d': '3D & Графика',
        backend: 'Бэкенд & БД',
        frontend: 'Веб & UI',
        tools: 'Инструменты & DevOps',
      },
    },
    experience: {
      title: 'Путь и опыт работы',
      descClient: 'Постоянное развитие, успешные сдачи проектов и фокус на высоком качестве.',
      descDev: 'Хронология: развитие в языках, бэкенд-фреймворках, архитектуре и компьютерных науках.',
      educationTitle: 'Образование',
      educationSubtitle: 'Фундаментальная подготовка в области разработки ПО и компьютерной инженерии.',
    },
    contact: {
      title: 'Давайте обсудим сотрудничество',
      descClient: 'Ищете надежного разработчика в команду или на проект? Напишите мне, и мы все обсудим!',
      descDev: 'Открыт к предложениям Full Stack, Java Backend, React Frontend или 3D разработке.',
      formTitle: 'Отправить сообщение',
      nameLabel: 'Ваше имя / Компания',
      namePlaceholder: 'Как к вам обращаться?',
      emailLabel: 'Контактный Email',
      emailPlaceholder: 'contact@company.com',
      messageLabel: 'Вакансия или описание проекта',
      messagePlaceholder: 'Опишите ваши задачи и пожелания...',
      sendBtn: 'Отправить сообщение',
      sendingBtn: 'Отправка...',
      successMsg: 'Сообщение успешно отправлено! Я скоро свяжусь с вами.',
      quickChat: 'Прямые контакты',
      discordUser: 'Daniel Reis',
      copiedToast: 'Скопировано в буфер обмена!',
    },
    clock: {
      brtTime: 'Время Бразилиа (BRT UTC-3)',
      localTime: 'Местное время',
      statusOnline: 'В сети • Открыт к предложениям',
    },
    console: {
      buttonLabel: 'Терминал [F8]',
      title: 'Консоль разработчика [F8]',
      inputPlaceholder: "Введите команду (напр. 'help', 'theme', 'stats')...",
      welcomeMsg: 'Интерактивная консоль инициализирована.',
      connectedMsg: 'Подключено к среде Daniel Reis.',
      helpTip: "Нажмите F8 или введите 'exit', чтобы закрыть.",
    },
    footer: {
      rights: 'Все права защищены.',
      tagline: 'Создано с акцентом на чистый код, надежную архитектуру и высокую скорость.',
    },
  },
};

export const LANGUAGE_OPTIONS: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'en', label: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', label: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'zh', label: '中文 (普通话)', flag: '🇨🇳', nativeName: '简体中文' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
];
