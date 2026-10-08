import type { Language } from '../types';

export interface TranslationDictionary {
  // Navigation
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
  // Perspective System
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
  // Hero
  hero: {
    statusBadge: string;
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
      code: string;
      cube: string;
      java: string;
    };
  };
  // Stats
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
  // 3D Showcase
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
  // Projects & Sites
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
  // Skills
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
  // Experience
  experience: {
    title: string;
    descClient: string;
    descDev: string;
    educationTitle: string;
    educationSubtitle: string;
  };
  // Contact
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
  // Clock & Console & Footer
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
      client: 'Cliente',
      dev: 'Dev',
      clientTooltip: 'Modo Cliente: Linguagem clara, soluções para servidores e foco em resultados',
      devTooltip: 'Modo Desenvolvedor: Métricas de resmon, código e termos técnicos',
      modalTitle: 'Como deseja visualizar este portfólio?',
      modalSubtitle: 'Escolha a experiência ideal para sua visita. Ajustamos os termos, projetos e métricas para o que mais importa:',
      clientCardTitle: 'Quero Contratar / Dono de Projeto',
      clientCardDesc: 'Linguagem clara, foco em soluções para seu servidor/empresa, visual profissional e estabilidade.',
      clientCardBullets: [
        'Servidores e sites fluidos sem lag',
        'Interfaces modernas para usuários',
        'Proteção ativa e estabilidade',
        'Orçamentos e prazos rápidos',
      ],
      clientCardBtn: 'Explorar como Cliente →',
      devCardTitle: 'Sou Desenvolvedor / Recrutador Tech',
      devCardDesc: 'Métricas de resmon (0.01ms), trechos de código em produção, arquitetura client/server e stack.',
      devCardBullets: [
        'Benchmark de resmon ultrabaixo (0.01ms)',
        'React, TypeScript, Lua, Vite & Three.js',
        'Modelagem 3D, Shaders & Unreal Engine 5',
        'Código limpo, seguro e performático',
      ],
      devCardBtn: 'Explorar como Dev →',
      recommendedBadge: 'Recomendado',
      technicalBadge: 'Técnico',
      modalFooterNote: '💡 Você pode alternar os modos a qualquer momento no topo do site.',
      skip: 'Pular e continuar',
    },
    hero: {
      statusBadge: 'Disponível para novos projetos',
      roleClient: 'Criação de Sistemas & Experiências Digitais de Alta Performance',
      roleDev: 'Desenvolvedor Full Stack & FiveM | React, Lua, Three.js & 3D',
      descClient: 'Transformo ideias em soluções digitais completas: sites velozes, interfaces intuitivas, sistemas FiveM sem travamentos (zero lag) e experiências 3D de alta fidelidade.',
      descDev: 'Construção de aplicações web modernas, sistemas complexos FiveM com resmon ultrabaixo (0.01ms), modelagem 3D cósmica com Unreal Engine 5 e arquitetura de código limpo.',
      btnProjectsClient: 'Ver Destaques & Soluções',
      btnProjectsDev: 'Ver Projetos & Código',
      btnContactClient: 'Solicitar Orçamento',
      btnContactDev: 'Falar no Discord / Email',
      particleHintClient: 'Segure o clique para atrair partículas ou explore as especialidades:',
      particleHintDev: 'Segure o clique para atrair partículas ou altere a forma 3D:',
      shapes: {
        react: 'Telas Interativas',
        lua: 'Zero Queda de FPS',
        code: 'Sistemas Exclusivos',
        cube: 'Itens & Modelos 3D',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Sistemas Entregues',
        stat1Desc: 'Projetos e soluções em produção',
        stat2Label: 'Foco em Fluidez',
        stat2Desc: 'Desempenho ágil e sem lentidão',
        stat3Label: 'Anos de Experiência',
        stat3Desc: 'Constante evolução e entregas',
        stat4Label: 'Projetos Concluídos',
        stat4Desc: 'Web, FiveM e Arte 3D',
      },
      dev: {
        stat1Label: 'Módulos & Scripts',
        stat1Desc: 'Client, Server & Web Apps',
        stat2Label: 'Resmon Alvo',
        stat2Desc: 'Performance ultra-otimizada (0.01ms)',
        stat3Label: 'Anos de Código',
        stat3Desc: 'Desenvolvimento e arquitetura',
        stat4Label: 'Repositórios & Entregas',
        stat4Desc: 'Código aberto e produção',
      },
    },
    showcase3d: {
      badgeClient: 'Garantia de Estabilidade & Fluidez',
      badgeDev: 'Engenharia de Performance & 3D WebGL',
      title: 'Showcase 3D & Simulação de Desempenho',
      descClient: 'Veja em tempo real como nossos sistemas e modelos 3D são construídos com foco em fluidez total e zero lag para seus usuários.',
      descDev: 'Inspeção de shaders interativos Three.js (Cubo mágico 3D animado, Gem física, Torus) e monitoramento de resmon/tick rate.',
      btnBenchmark: 'Executar Benchmark em Tempo Real',
      benchmarkingText: 'Calculando estresse...',
      fpsLabel: 'FPS Estável',
      tickLabel: 'Tick Rate',
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
      appDescClient: 'Sistemas interativos e ferramentas web criadas para resolver problemas reais com facilidade.',
      appDescDev: 'Aplicações web completas, ferramentas interativas, CLIs e utilitários modernos.',
      sitesTitle: 'Destaques & Sites Completos',
      sitesDescClient: 'Portfólios de alta fidelidade, vitrines 3D monumentais e plataformas web imersivas.',
      sitesDescDev: 'Sites de grande porte, worldbuilding 3D (Eclipsário), landing pages e painéis de controle.',
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
      descClient: 'Um conjunto completo de competências para entregar seu projeto do design à infraestrutura.',
      descDev: 'Stack tecnológico abrangente: Frontend, Backend, FiveM Native, Shaders e Modelagem 3D.',
      allCategories: 'Todas',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI & Frontend',
        '3d': '3D & Modelagem',
        backend: 'Backend & Banco',
        frontend: 'Frontend Web',
        tools: 'Ferramentas & DevOps',
      },
    },
    experience: {
      title: 'Trajetória & Experiência',
      descClient: 'Histórico contínuo de projetos, aprimoramento e compromisso com a qualidade técnica.',
      descDev: 'Linha do tempo técnica: evolução em linguagens, frameworks, segurança e computação.',
      educationTitle: 'Formação Acadêmica',
      educationSubtitle: 'Bases sólidas em desenvolvimento de sistemas e engenharia de computação.',
    },
    contact: {
      title: 'Vamos Trabalhar Juntos?',
      descClient: 'Conte sobre sua ideia, projeto ou servidor. Envie uma mensagem para planejarmos uma solução sob medida!',
      descDev: 'Aberto a colaborações em projetos de software, FiveM, web moderna ou modelagem 3D.',
      formTitle: 'Enviar Mensagem Direta',
      nameLabel: 'Seu Nome ou Servidor',
      namePlaceholder: 'Como posso te chamar?',
      emailLabel: 'Seu E-mail ou Discord',
      emailPlaceholder: 'contato@seuservidor.com ou usuario#0000',
      messageLabel: 'Detalhes do Projeto',
      messagePlaceholder: 'Descreva o que você precisa...',
      sendBtn: 'Enviar Mensagem',
      sendingBtn: 'Enviando...',
      successMsg: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      quickChat: 'Contato Rápido',
      discordUser: 'Ikarus Sylver',
      copiedToast: 'Copiado para a área de transferência!',
    },
    clock: {
      brtTime: 'Horário de Brasília (BRT UTC-3)',
      localTime: 'Horário Local',
      statusOnline: 'Online • Aberto para Projetos',
    },
    console: {
      buttonLabel: 'Terminal F8',
      title: 'Console de Desenvolvedor [F8]',
      inputPlaceholder: "Digite um comando (ex: 'help', 'theme', 'stats')...",
      welcomeMsg: 'Console interativo inicializado com sucesso.',
      connectedMsg: 'Conectado ao ambiente Ikarus Sylver.',
      helpTip: "Pressione F8 ou 'exit' para fechar.",
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      tagline: 'Criado com alta performance, paixão e atenção a cada detalhe.',
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
      client: 'Client',
      dev: 'Dev',
      clientTooltip: 'Client Mode: Clear language, server solutions, and focus on business results',
      devTooltip: 'Developer Mode: Resmon metrics, production code snippets, and technical terms',
      modalTitle: 'How would you like to explore this portfolio?',
      modalSubtitle: 'Select the ideal mode for your visit. We tailor terminology, project details, and performance metrics to what matters most:',
      clientCardTitle: 'I Want to Hire / Project Owner',
      clientCardDesc: 'Clear communication, focused on server stability, user experience, and tangible results.',
      clientCardBullets: [
        'Smooth servers and websites with zero lag',
        'Modern, intuitive user interfaces',
        'Active security and protection against exploits',
        'Fast turnaround times and direct communication',
      ],
      clientCardBtn: 'Explore as Client →',
      devCardTitle: 'I am a Developer / Tech Recruiter',
      devCardDesc: 'Deep dive into 0.01ms resmon benchmarks, production code, client/server architecture, and tech stack.',
      devCardBullets: [
        'Ultra-low resmon performance benchmarks (0.01ms)',
        'React, TypeScript, Lua, Vite & Three.js',
        '3D Modeling, Shaders & Unreal Engine 5',
        'Clean, modular, and battle-tested code architecture',
      ],
      devCardBtn: 'Explore as Dev →',
      recommendedBadge: 'Recommended',
      technicalBadge: 'Technical',
      modalFooterNote: '💡 You can switch modes at any time from the top navigation bar.',
      skip: 'Skip and continue',
    },
    hero: {
      statusBadge: 'Available for new projects',
      roleClient: 'Crafting High-Performance Systems & Digital Experiences',
      roleDev: 'Full Stack & FiveM Developer | React, Lua, Three.js & 3D Art',
      descClient: 'Transforming ideas into polished digital solutions: ultra-fast websites, intuitive interfaces, zero-lag FiveM server mechanics, and high-fidelity 3D environments.',
      descDev: 'Building modern web applications, low-latency FiveM frameworks (0.01ms resmon), cosmic dark fantasy 3D worldbuilding in Unreal Engine 5, and clean code architecture.',
      btnProjectsClient: 'View Featured Solutions',
      btnProjectsDev: 'View Projects & Code',
      btnContactClient: 'Request a Quote',
      btnContactDev: 'Reach out via Discord / Email',
      particleHintClient: 'Click & hold to attract particles or explore core specializations:',
      particleHintDev: 'Click & hold to attract particles or switch 3D shape morphing:',
      shapes: {
        react: 'Interactive UIs',
        lua: 'Zero FPS Drops',
        code: 'Custom Systems',
        cube: '3D Assets & Models',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Systems Delivered',
        stat1Desc: 'Battle-tested production solutions',
        stat2Label: 'Fluidity & Zero Lag',
        stat2Desc: 'Ultra-smooth user experience',
        stat3Label: 'Years of Experience',
        stat3Desc: 'Continuous development since 2022',
        stat4Label: 'Completed Projects',
        stat4Desc: 'Web apps, FiveM & 3D art',
      },
      dev: {
        stat1Label: 'Modules & Scripts',
        stat1Desc: 'Client, Server & Web Apps',
        stat2Label: 'Target Resmon',
        stat2Desc: 'Ultra-low overhead (0.01ms)',
        stat3Label: 'Years Coding',
        stat3Desc: 'Software architecture & dev',
        stat4Label: 'Repositories & Builds',
        stat4Desc: 'Open source and private systems',
      },
    },
    showcase3d: {
      badgeClient: 'Stability & Performance Guarantee',
      badgeDev: 'High-Performance 3D WebGL Engineering',
      title: 'Interactive 3D Showcase & Benchmark',
      descClient: 'Experience in real-time how our 3D systems and models are engineered for silky smoothness and zero lag on every device.',
      descDev: 'Inspect real-time interactive Three.js shaders (animated Rubik’s cube, dynamic physical gem, cosmic torus) and live resmon diagnostics.',
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
      appDescClient: 'Interactive digital tools and systems crafted to solve real-world problems with ease.',
      appDescDev: 'Modern web applications, developer CLIs, security shields, and interactive tools.',
      sitesTitle: 'Featured Highlights & Websites',
      sitesDescClient: 'High-fidelity portfolios, monumental 3D worldbuilding, and immersive digital platforms.',
      sitesDescDev: 'Full-scale web portals, Unreal Engine 5 cosmic worldbuilding (Eclipsário), and admin CAD/MDT systems.',
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
      descClient: 'A comprehensive skill set covering design, frontend, backend logic, and server infrastructure.',
      descDev: 'Modern, high-performance tech stack: Frontend, Backend, Native CFX, WebGL shaders, and 3D Art.',
      allCategories: 'All',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI & Frontend',
        '3d': '3D & Modeling',
        backend: 'Backend & DB',
        frontend: 'Web Frontend',
        tools: 'Tools & DevOps',
      },
    },
    experience: {
      title: 'Career & Experience',
      descClient: 'A proven track record of continuous delivery, technical excellence, and dedication to results.',
      descDev: 'Chronological roadmap: progression across languages, systems architecture, security, and computing.',
      educationTitle: 'Education & Academics',
      educationSubtitle: 'Solid foundations in Systems Development and Computer Engineering.',
    },
    contact: {
      title: "Let's Build Something Great",
      descClient: 'Share your vision, server idea, or business need. Reach out today for a tailored quote and consultation!',
      descDev: 'Open to collaborations on software projects, FiveM architecture, web development, or 3D modeling.',
      formTitle: 'Send a Direct Message',
      nameLabel: 'Your Name or Community',
      namePlaceholder: 'What should I call you?',
      emailLabel: 'Email or Discord Handle',
      emailPlaceholder: 'contact@example.com or user#0000',
      messageLabel: 'Project Details',
      messagePlaceholder: 'Tell me about your project requirements...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successMsg: 'Message sent successfully! I will get back to you shortly.',
      quickChat: 'Quick Contact',
      discordUser: 'Ikarus Sylver',
      copiedToast: 'Copied to clipboard!',
    },
    clock: {
      brtTime: 'Brasília Time (BRT UTC-3)',
      localTime: 'Local Time',
      statusOnline: 'Online • Open for Projects',
    },
    console: {
      buttonLabel: 'F8 Terminal',
      title: 'Developer Console [F8]',
      inputPlaceholder: "Type a command (e.g., 'help', 'theme', 'stats')...",
      welcomeMsg: 'Interactive FiveM/Web console initialized.',
      connectedMsg: 'Connected to Ikarus Sylver developer environment.',
      helpTip: "Press F8 or type 'exit' to close.",
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Crafted with high performance, precision, and dedication to excellence.',
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
      client: 'Cliente',
      dev: 'Dev',
      clientTooltip: 'Modo Cliente: Lenguaje claro, soluciones para servidores y enfoque en resultados',
      devTooltip: 'Modo Desarrollador: Métricas de resmon, código y términos técnicos',
      modalTitle: '¿Cómo deseas explorar este portafolio?',
      modalSubtitle: 'Elige la experiencia ideal para tu visita. Adaptamos términos, proyectos y métricas a lo que más importa:',
      clientCardTitle: 'Quiero Contratar / Dueño de Proyecto',
      clientCardDesc: 'Comunicación clara, enfoque en estabilidad para tu servidor o empresa y visual profesional.',
      clientCardBullets: [
        'Servidores y sitios web fluidos sin lag',
        'Interfaces modernas para tus usuarios',
        'Protección activa y máxima estabilidad',
        'Presupuestos y plazos rápidos',
      ],
      clientCardBtn: 'Explorar como Cliente →',
      devCardTitle: 'Soy Desarrollador / Reclutador Tech',
      devCardDesc: 'Métricas de resmon (0.01ms), código de producción, arquitectura cliente/servidor y stack.',
      devCardBullets: [
        'Benchmark de resmon ultrabajo (0.01ms)',
        'React, TypeScript, Lua, Vite & Three.js',
        'Modelado 3D, Shaders & Unreal Engine 5',
        'Código limpio, modular y de alto rendimiento',
      ],
      devCardBtn: 'Explorar como Dev →',
      recommendedBadge: 'Recomendado',
      technicalBadge: 'Técnico',
      modalFooterNote: '💡 Puedes cambiar de modo en cualquier momento en la barra superior.',
      skip: 'Omitir y continuar',
    },
    hero: {
      statusBadge: 'Disponible para nuevos proyectos',
      roleClient: 'Creación de Sistemas y Experiencias Digitales de Alto Rendimiento',
      roleDev: 'Desarrollador Full Stack & FiveM | React, Lua, Three.js & 3D',
      descClient: 'Transformo ideas en soluciones completas: sitios veloces, interfaces intuitivas, sistemas FiveM sin caídas de FPS (cero lag) y experiencias 3D inmersivas.',
      descDev: 'Desarrollo de aplicaciones web modernas, frameworks FiveM con resmon de 0.01ms, worldbuilding 3D en Unreal Engine 5 y código de alta calidad.',
      btnProjectsClient: 'Ver Soluciones Destacadas',
      btnProjectsDev: 'Ver Proyectos & Código',
      btnContactClient: 'Solicitar Presupuesto',
      btnContactDev: 'Hablar por Discord / Email',
      particleHintClient: 'Mantén presionado para atraer partículas o explora especialidades:',
      particleHintDev: 'Mantén presionado para atraer partículas o cambia la forma 3D:',
      shapes: {
        react: 'Pantallas NUI',
        lua: 'Cero Lag / FPS',
        code: 'Sistemas Exclusivos',
        cube: 'Modelos & Props 3D',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Sistemas Entregados',
        stat1Desc: 'Soluciones activas en producción',
        stat2Label: 'Fluidez Garantizada',
        stat2Desc: 'Experiencia sin tirones ni caídas',
        stat3Label: 'Años de Experiencia',
        stat3Desc: 'Desarrollo continuo desde 2022',
        stat4Label: 'Proyectos Concluidos',
        stat4Desc: 'Web, FiveM y Arte 3D',
      },
      dev: {
        stat1Label: 'Módulos & Scripts',
        stat1Desc: 'Cliente, Servidor y Web Apps',
        stat2Label: 'Resmon Objetivo',
        stat2Desc: 'Ultra-optimizado (0.01ms)',
        stat3Label: 'Años Programando',
        stat3Desc: 'Arquitectura y desarrollo',
        stat4Label: 'Repositorios & Entregas',
        stat4Desc: 'Código abierto y sistemas privados',
      },
    },
    showcase3d: {
      badgeClient: 'Garantía de Estabilidad & Fluidez',
      badgeDev: 'Ingeniería 3D WebGL de Alto Rendimiento',
      title: 'Showcase 3D & Simulación de Rendimiento',
      descClient: 'Observa en tiempo real cómo nuestros sistemas y modelos 3D están diseñados para una fluidez absoluta sin sobrecargar equipos.',
      descDev: 'Inspecciona shaders interactivos en Three.js (Cubo Rubik 3D animado, gema física, anillo cósmico) y métricas de resmon en vivo.',
      btnBenchmark: 'Ejecutar Benchmark en Vivo',
      benchmarkingText: 'Calculando estrés...',
      fpsLabel: 'FPS Estable',
      tickLabel: 'Tick Rate',
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
      appDescClient: 'Sistemas interactivos y herramientas web creadas para resolver necesidades concretas.',
      appDescDev: 'Aplicaciones web modernas, CLIs interactivas, seguridad de eventos y utilidades.',
      sitesTitle: 'Destacados & Sitios Web',
      sitesDescClient: 'Portafolios de alta fidelidad, escenarios 3D monumentales y plataformas inmersivas.',
      sitesDescDev: 'Grandes portales web, worldbuilding cósmico en Unreal Engine 5 (Eclipsário) y paneles CAD/MDT.',
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
      descClient: 'Dominio integral para llevar tu proyecto desde el diseño hasta el despliegue.',
      descDev: 'Stack tecnológico completo: Frontend, Backend, CFX Native, Shaders y Modelado 3D.',
      allCategories: 'Todas',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI & Frontend',
        '3d': '3D & Modelado',
        backend: 'Backend & DB',
        frontend: 'Frontend Web',
        tools: 'Herramientas & DevOps',
      },
    },
    experience: {
      title: 'Trayectoria & Experiencia',
      descClient: 'Historial comprobado de entregas, evolución continua y compromiso con la excelencia.',
      descDev: 'Línea de tiempo técnica: avance en lenguajes, frameworks, seguridad y ciencias de la computación.',
      educationTitle: 'Formación Académica',
      educationSubtitle: 'Bases sólidas en Desarrollo de Sistemas e Ingeniería.',
    },
    contact: {
      title: '¿Trabajamos Juntos?',
      descClient: 'Cuéntame sobre tu proyecto o servidor. ¡Ponte en contacto para crear una solución a tu medida!',
      descDev: 'Abierto a colaboraciones en software, FiveM, desarrollo web y proyectos 3D.',
      formTitle: 'Enviar Mensaje Directo',
      nameLabel: 'Tu Nombre o Servidor',
      namePlaceholder: '¿Cómo puedo llamarte?',
      emailLabel: 'Correo o Usuario de Discord',
      emailPlaceholder: 'contacto@ejemplo.com o usuario#0000',
      messageLabel: 'Detalles del Proyecto',
      messagePlaceholder: 'Cuéntame lo que necesitas...',
      sendBtn: 'Enviar Mensaje',
      sendingBtn: 'Enviando...',
      successMsg: '¡Mensaje enviado con éxito! Me pondré en contacto pronto.',
      quickChat: 'Contacto Rápido',
      discordUser: 'Ikarus Sylver',
      copiedToast: '¡Copiado al portapapeles!',
    },
    clock: {
      brtTime: 'Hora de Brasilia (BRT UTC-3)',
      localTime: 'Hora Local',
      statusOnline: 'En Línea • Disponible para Proyectos',
    },
    console: {
      buttonLabel: 'Terminal F8',
      title: 'Consola de Desarrollador [F8]',
      inputPlaceholder: "Escribe un comando (ej: 'help', 'theme', 'stats')...",
      welcomeMsg: 'Consola interactiva inicializada con éxito.',
      connectedMsg: 'Conectado al entorno de desarrollo Ikarus Sylver.',
      helpTip: "Presiona F8 o 'exit' para cerrar.",
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      tagline: 'Creado con alto rendimiento, pasión y atención a cada detalle.',
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
      client: 'クライアント',
      dev: 'エンジニア',
      clientTooltip: 'クライアント視点：わかりやすい言葉で、安定性と成果に特化した説明',
      devTooltip: 'エンジニア視点：Resmon負荷、コード構造、技術仕様の詳細',
      modalTitle: 'ポートフォリオの表示モードを選択してください',
      modalSubtitle: '目的に合わせて最適な体験を提供します。プロジェクト説明やパフォーマンス指標が切り替わります：',
      clientCardTitle: '案件相談・プロジェクトオーナー様',
      clientCardDesc: '専門用語を控えめに、サーバーの安定性、UIの使いやすさ、成果に焦点を当てます。',
      clientCardBullets: [
        'ラグやフレーム落ちのない快適な動作環境',
        'プレイヤーが直感的に使えるモダンなUI',
        'チート・不正侵入から守る堅牢なセキュリティ',
        '迅速なお見積もりと柔軟なスケジュール対応',
      ],
      clientCardBtn: 'クライアントとして見る →',
      devCardTitle: 'エンジニア・採用担当者様',
      devCardDesc: 'Resmon 0.01msの超低負荷設計、Lua/Reactコード、Three.js、3Dワールドビルドの詳細。',
      devCardBullets: [
        'Resmon 0.01msのベンチマーク計測',
        'React, TypeScript, Lua, Vite & Three.js',
        'Unreal Engine 5によるAAA級3Dモデリング',
        'クリーンで保守性の高いモジュール設計',
      ],
      devCardBtn: 'エンジニアとして見る →',
      recommendedBadge: 'おすすめ',
      technicalBadge: '技術仕様',
      modalFooterNote: '💡 画面上部の切り替えボタンからいつでもモードを変更できます。',
      skip: 'スキップして進む',
    },
    hero: {
      statusBadge: '新規プロジェクト相談受付中',
      roleClient: '高品質システム設計 ＆ デジタルエクスペリエンス開発',
      roleDev: 'フルスタック ＆ FiveM エンジニア | React, Lua, Three.js & 3D Art',
      descClient: 'アイデアを洗練されたデジタル成果物へ。超高速ウェブサイト、直感的なUI、ラグのないFiveMサーバーシステム、そして高精細な3D空間を構築します。',
      descDev: 'モダンなWebアプリ開発、FiveM超低レイテンシ設計（Resmon 0.01ms）、Unreal Engine 5によるダークファンタジー3D制作、堅牢なアーキテクチャ。',
      btnProjectsClient: '実績・ソリューションを見る',
      btnProjectsDev: 'プロジェクト＆コードを見る',
      btnContactClient: 'お見積もり・ご相談',
      btnContactDev: 'Discord / メールで連絡',
      particleHintClient: '長押しで粒子を引き寄せるか、専門分野を選択：',
      particleHintDev: '長押しで粒子を引き寄せるか、3D形状を切り替え：',
      shapes: {
        react: 'モダンUI設計',
        lua: 'FPS低下ゼロ',
        code: '独自システム',
        cube: '3Dモデリング',
        java: 'Javaバックエンド',
      },
    },
    stats: {
      client: {
        stat1Label: '納品システム数',
        stat1Desc: '実運用中の安定したソリューション',
        stat2Label: '動作快適性',
        stat2Desc: 'ラグ・遅延のないスムーズな動作',
        stat3Label: '開発年数',
        stat3Desc: '2022年からの継続的な開発実績',
        stat4Label: '完成プロジェクト',
        stat4Desc: 'Webアプリ・FiveM・3Dモデル',
      },
      dev: {
        stat1Label: 'モジュール＆スクリプト',
        stat1Desc: 'Client, Server & Web Apps',
        stat2Label: '目標 Resmon',
        stat2Desc: '極限の最適化（0.01ms）',
        stat3Label: 'コーディング歴',
        stat3Desc: 'システム設計と実装',
        stat4Label: 'リポジトリ数',
        stat4Desc: 'OSSおよびプロダクションコード',
      },
    },
    showcase3d: {
      badgeClient: '圧倒的な安定性と快適性の保証',
      badgeDev: 'ハイパフォーマンス 3D WebGL エンジニアリング',
      title: 'インタラクティブ 3D ＆ パフォーマンス診断',
      descClient: '制作した3Dモデルとシステムが、あらゆる端末でいかにスムーズかつ軽量に動作するかをリアルタイムで体感できます。',
      descDev: 'Three.jsシェーダー（ルービックキューブ3D回転、宝石マテリアル、トーラスリング）とResmonベンチマークのリアルタイム計測。',
      btnBenchmark: 'リアルタイム ベンチマーク実行',
      benchmarkingText: '負荷テスト計算中...',
      fpsLabel: '安定FPS',
      tickLabel: 'Tickレート',
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
      appDescClient: '日々の課題をスマートに解決するために開発されたインタラクティブツール群。',
      appDescDev: 'モダンなWebアプリケーション、CLIツール、セキュリティガード、実用ツール。',
      sitesTitle: '特選プロジェクト＆Webサイト',
      sitesDescClient: '圧倒的なクオリティを誇る3Dワールドビルド、洗練されたポートフォリオサイト。',
      sitesDescDev: '大規模Webポータル、Unreal Engine 5による3Dスタジオ（Eclipsário）、管理CAD/MDT。',
      featuredBadge: '注目のハイライト',
      demoBtn: 'ライブデモ',
      visitBtn: 'サイト訪問',
      codeBtn: 'ソースコード',
      creditsBtn: 'クレジット',
      interactiveDemoBadge: 'インタラクティブ デモ',
      openDemo: 'デモをブラウザで開く 💻',
      visitSite: 'サイトを開く 🚀',
    },
    skills: {
      title: 'スキルと使用技術',
      descClient: 'デザインからフロントエンド、サーバー構築まで一貫して対応できる総合力。',
      descDev: 'フロントエンド、バックエンド、ネイティブCFX API、シェーダー、3Dモデリング。',
      allCategories: 'すべて',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI & フロントエンド',
        '3d': '3D・モデリング',
        backend: 'バックエンド・DB',
        frontend: 'Webフロントエンド',
        tools: 'ツール・インフラ',
      },
    },
    experience: {
      title: '経歴と実績',
      descClient: '継続的なプロジェクト納品と、技術品質向上への絶え間ない取り組み。',
      descDev: '技術の歩み：言語習得、セキュリティ対策、アーキテクチャ設計、コンピュータ工学。',
      educationTitle: '学歴・教育課程',
      educationSubtitle: 'システム開発およびコンピュータ工学の確かな基礎。',
    },
    contact: {
      title: 'お気軽にご相談ください',
      descClient: 'サーバー制作やWeb開発のご要望をお聞かせください。最適なソリューションをご提案します！',
      descDev: 'ソフトウェア開発、FiveM、Web制作、3Dモデリングの共同開発もお待ちしています。',
      formTitle: 'ダイレクトメッセージ送信',
      nameLabel: 'お名前またはサーバー名',
      namePlaceholder: 'お名前を入力してください',
      emailLabel: 'メールアドレスまたはDiscord',
      emailPlaceholder: 'contact@example.com または user#0000',
      messageLabel: 'プロジェクトのご要望',
      messagePlaceholder: 'ご相談内容をご記入ください...',
      sendBtn: 'メッセージを送信',
      sendingBtn: '送信中...',
      successMsg: '送信が完了しました！折り返しご連絡いたします。',
      quickChat: 'クイック連絡先',
      discordUser: 'Ikarus Sylver',
      copiedToast: 'クリップボードにコピーしました！',
    },
    clock: {
      brtTime: 'ブラジリア標準時 (BRT UTC-3)',
      localTime: '現地時刻',
      statusOnline: 'オンライン • 案件受付中',
    },
    console: {
      buttonLabel: 'F8ターミナル',
      title: '開発者コンソール [F8]',
      inputPlaceholder: "コマンドを入力してください (例: 'help', 'theme', 'stats')...",
      welcomeMsg: 'インタラクティブ開発コンソールが起動しました。',
      connectedMsg: 'Ikarus Sylver 開発環境に接続中。',
      helpTip: "F8キーまたは 'exit' で閉じます。",
    },
    footer: {
      rights: '無断転載を禁じます。',
      tagline: '妥協なきパフォーマンスと情熱を込めて制作。',
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
      client: '客户视角',
      dev: '开发者视角',
      clientTooltip: '客户模式：通俗清晰的语言，注重服务器解决方案与实际商业价值',
      devTooltip: '开发者模式：Resmon 性能指标、生产代码与技术深度',
      modalTitle: '请选择您的浏览模式',
      modalSubtitle: '我们为您定制专属的浏览体验，项目介绍与性能指标将根据您的身份自动适配：',
      clientCardTitle: '项目合作 / 社区服主',
      clientCardDesc: '通俗易懂的沟通，专注于服务器稳定性、极致流畅度与商业成效。',
      clientCardBullets: [
        '服务器与网站超流畅运行，零掉帧与零卡顿',
        '符合现代审美的直观用户交互界面',
        '完善的防作弊保护与经济数据安全',
        '透明快速的报价与按期交付保障',
      ],
      clientCardBtn: '以客户身份探索 →',
      devCardTitle: '技术开发者 / 招聘主管',
      devCardDesc: '深入了解 Resmon 0.01ms 超低延迟、Lua/React 架构、Three.js 着色器与 3D 资产。',
      devCardBullets: [
        'Resmon 0.01ms 极低负载基准性能',
        'React, TypeScript, Lua, Vite & Three.js',
        '虚幻引擎 5 (UE5) 与 3D 资产建模',
        '干净整洁、高度模块化的代码架构',
      ],
      devCardBtn: '以开发者身份探索 →',
      recommendedBadge: '推荐体验',
      technicalBadge: '技术硬核',
      modalFooterNote: '💡 您可以随时在网站顶部导航栏切换浏览视角。',
      skip: '跳过并继续',
    },
    hero: {
      statusBadge: '现已开放承接新项目',
      roleClient: '打造高性能数字系统与沉浸式交互体验',
      roleDev: '全栈与 FiveM 开发者 | React, Lua, Three.js & 3D 艺术',
      descClient: '将您的奇思妙想转化为成熟方案：极速加载网站、现代化界面、绝无卡顿的 FiveM 玩法系统以及 AAA 级 3D 虚拟场景。',
      descDev: '专注于现代化 Web 应用开发、FiveM 框架超低延迟设计（Resmon 0.01ms）、虚幻引擎 5 暗黑宇宙 3D 世界构建以及严谨的代码架构。',
      btnProjectsClient: '查看精选方案',
      btnProjectsDev: '查看代码与项目',
      btnContactClient: '获取定制报价',
      btnContactDev: 'Discord / 邮件联系',
      particleHintClient: '按住鼠标吸引粒子，或选择专注领域：',
      particleHintDev: '按住鼠标吸引粒子，或切换 3D 粒子形态：',
      shapes: {
        react: '交互界面设计',
        lua: '零掉帧极速运行',
        code: '独家玩法系统',
        cube: '3D 模型与场景',
        java: 'Java 后端架构',
      },
    },
    stats: {
      client: {
        stat1Label: '已交付系统',
        stat1Desc: '线上稳定运行的商业方案',
        stat2Label: '丝滑流畅度',
        stat2Desc: '极致优化，拒绝卡顿与掉帧',
        stat3Label: '行业经验',
        stat3Desc: '自2022年起持续深耕与交付',
        stat4Label: '落地项目',
        stat4Desc: 'Web应用、FiveM 插件与 3D 资产',
      },
      dev: {
        stat1Label: '模块与脚本数',
        stat1Desc: '客户端、服务端与 Web 应用',
        stat2Label: '目标 Resmon',
        stat2Desc: '极限性能优化（0.01ms）',
        stat3Label: '代码编写年限',
        stat3Desc: '软件工程与系统架构',
        stat4Label: '项目仓库数',
        stat4Desc: '开源工具与商业生产代码',
      },
    },
    showcase3d: {
      badgeClient: '稳定无忧与极致流畅保证',
      badgeDev: '高性能 3D WebGL 图形工程',
      title: '3D 互动展示与性能实时监测',
      descClient: '实时查看我们的 3D 场景与系统如何在各类设备上保持极致流畅，绝不拖慢电脑速度。',
      descDev: '实时检验 Three.js 着色器（动态魔方机械转动、物理宝石折射、星环）与 Resmon 延迟监控。',
      btnBenchmark: '启动实时压力基准测试',
      benchmarkingText: '正在计算系统压力...',
      fpsLabel: '稳定帧率 (FPS)',
      tickLabel: 'Tick 频率',
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
      sitesDescClient: '高保真 3D 虚拟展厅、史诗级场景世界观与沉浸式官方门户。',
      sitesDescDev: '全功能 Web 门户、虚幻引擎 5 宇宙 3D 工作室（Eclipsário）与警务 CAD/MDT 系统。',
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
      descClient: '全链路专业技能，覆盖视觉设计、系统开发到服务器部署。',
      descDev: '涵盖前端、后端、CFX 原生接口、WebGL 着色器与 3D 建模。',
      allCategories: '全部技术',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI 与现代前端',
        '3d': '3D 建模与材质',
        backend: '后端与数据库',
        frontend: 'Web 前端',
        tools: '开发工具与运维',
      },
    },
    experience: {
      title: '成长足迹与实战经历',
      descClient: '持续交付高质量项目，精益求精的技术积累。',
      descDev: '技术演进路线：编程语言深造、系统安全性、架构设计与计算机科学。',
      educationTitle: '教育背景',
      educationSubtitle: '系统开发与计算机工程领域的扎实学术根基。',
    },
    contact: {
      title: '开启合作，共创精彩',
      descClient: '无论您有新的服务器玩法规划还是商业网站需求，欢迎随时留言洽谈！',
      descDev: '欢迎探讨开源项目、FiveM 架构、现代 Web 技术与 3D 图形学合作。',
      formTitle: '发送即时消息',
      nameLabel: '您的称呼或服务器名称',
      namePlaceholder: '请问如何称呼您？',
      emailLabel: '联系邮箱或 Discord 账号',
      emailPlaceholder: 'contact@example.com 或 user#0000',
      messageLabel: '项目需求描述',
      messagePlaceholder: '请详细描述您的开发需求...',
      sendBtn: '立即发送消息',
      sendingBtn: '正在发送...',
      successMsg: '消息发送成功！我会尽快与您取得联系。',
      quickChat: '快速联系',
      discordUser: 'Ikarus Sylver',
      copiedToast: '已复制到剪贴板！',
    },
    clock: {
      brtTime: '巴西利亚时间 (BRT UTC-3)',
      localTime: '本地时间',
      statusOnline: '在线 • 接受项目咨询',
    },
    console: {
      buttonLabel: 'F8 终端',
      title: '开发者终端控制台 [F8]',
      inputPlaceholder: "输入命令（如 'help', 'theme', 'stats'）...",
      welcomeMsg: '交互式控制台已成功启动。',
      connectedMsg: '已连接至 Ikarus Sylver 开发者沙盒。',
      helpTip: "按 F8 或输入 'exit' 关闭控制台。",
    },
    footer: {
      rights: '保留所有权利。',
      tagline: '倾注匠心与热情，专注每一处极速性能细节。',
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
      client: '클라이언트',
      dev: '개발자',
      clientTooltip: '클라이언트 모드: 직관적인 언어로 서버 안정성과 비즈니스 가치에 집중',
      devTooltip: '개발자 모드: Resmon 부하, 프로덕션 코드 및 기술적 세부사항',
      modalTitle: '포트폴리오 탐색 모드를 선택해주세요',
      modalSubtitle: '방문 목적에 맞는 최적의 경험을 제공합니다. 용어와 성능 지표가 맞춤 설정됩니다:',
      clientCardTitle: '프로젝트 의뢰 / 서버 오너',
      clientCardDesc: '전문 용어 대신 안정성, 직관적인 UI, 끊김 없는 환경과 성과에 집중합니다.',
      clientCardBullets: [
        '렉과 프레임 드랍이 없는 쾌적한 서버 및 웹 환경',
        '플레이어를 위한 모던하고 직관적인 인터페이스',
        '치트 및 불법 조작을 원천 차단하는 보안 시스템',
        '신속한 견적 산출과 일정 준수 보장',
      ],
      clientCardBtn: '클라이언트 모드로 탐색 →',
      devCardTitle: '개발자 / 기술 채용 담당자',
      devCardDesc: 'Resmon 0.01ms 초저지연 성능, Lua/React 아키텍처, 3D 셰이더 및 소스 코드 상세.',
      devCardBullets: [
        'Resmon 0.01ms 초저부하 벤치마크',
        'React, TypeScript, Lua, Vite & Three.js',
        '언리얼 엔진 5 기반 AAA급 3D 월드빌딩',
        '깔끔하고 모듈화된 클린 코드 아키텍처',
      ],
      devCardBtn: '개발자 모드로 탐색 →',
      recommendedBadge: '추천 모드',
      technicalBadge: '기술 사양',
      modalFooterNote: '💡 화면 상단의 토글 스위치로 언제든지 모드를 변경할 수 있습니다.',
      skip: '건너뛰고 계속하기',
    },
    hero: {
      statusBadge: '신규 프로젝트 의뢰 가능',
      roleClient: '고성능 시스템 구축 및 디지털 인터랙티브 경험 설계',
      roleDev: '풀스택 & FiveM 개발자 | React, Lua, Three.js & 3D 아트',
      descClient: '아이디어를 완성도 높은 현실로 구현합니다. 초고속 웹사이트, 직관적인 UI, 렉 없는 FiveM 서버 시스템, 고품질 3D 환경을 제공합니다.',
      descDev: '모던 웹 애플리케이션 개발, FiveM 초저지연 프레임워크(Resmon 0.01ms), 언리얼 엔진 5 3D 아트 및 견고한 아키텍처.',
      btnProjectsClient: '주요 솔루션 보기',
      btnProjectsDev: '프로젝트 & 코드 보기',
      btnContactClient: '견적 문의하기',
      btnContactDev: 'Discord / 이메일 연락',
      particleHintClient: '클릭한 채로 파티클을 모으거나 전문 분야를 선택하세요:',
      particleHintDev: '클릭한 채로 파티클을 모으거나 3D 파티클 형태를 변경하세요:',
      shapes: {
        react: '인터랙티브 UI',
        lua: 'FPS 저하 제로',
        code: '커스텀 시스템',
        cube: '3D 모델링',
        java: 'Java 백엔드',
      },
    },
    stats: {
      client: {
        stat1Label: '납품 시스템 수',
        stat1Desc: '안정적으로 운영 중인 솔루션',
        stat2Label: '완벽한 최적화',
        stat2Desc: '렉 없이 매끄러운 사용자 경험',
        stat3Label: '개발 경력',
        stat3Desc: '2022년부터 이어진 지속적인 성과',
        stat4Label: '완료된 프로젝트',
        stat4Desc: '웹 앱, FiveM 시스템 & 3D 아트',
      },
      dev: {
        stat1Label: '모듈 및 스크립트',
        stat1Desc: '클라이언트, 서버 및 웹 앱',
        stat2Label: '목표 Resmon',
        stat2Desc: '초저부하 최적화 (0.01ms)',
        stat3Label: '코딩 경력',
        stat3Desc: '시스템 아키텍처 및 개발',
        stat4Label: '리포지토리 수',
        stat4Desc: '오픈 소스 및 프로덕션 빌드',
      },
    },
    showcase3d: {
      badgeClient: '안정성 및 부드러운 구동 보장',
      badgeDev: '고성능 3D WebGL 그래픽스 엔지니어링',
      title: '3D 쇼케이스 & 실시간 성능 진단',
      descClient: '제작된 3D 모델과 시스템이 모든 기기에서 프레임 드랍 없이 부드럽게 작동하는 모습을 직접 확인해보세요.',
      descDev: 'Three.js 셰이더(회전하는 3D 루빅스 큐브, 물리 젬, 토러스) 및 Resmon 지연 시간을 실시간으로 검사합니다.',
      btnBenchmark: '실시간 벤치마크 실행',
      benchmarkingText: '부하 테스트 계산 중...',
      fpsLabel: '안정적인 FPS',
      tickLabel: 'Tick 레이트',
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
      appDescClient: '실제 문제를 손쉽게 해결하기 위해 제작된 직관적인 인터랙티브 도구 모음입니다.',
      appDescDev: '모던 웹 애플리케이션, 개발자 CLI, 보안 가드 및 유용한 유틸리티.',
      sitesTitle: '주요 프로젝트 & 웹사이트',
      sitesDescClient: '압도적인 퀄리티의 3D 월드빌딩, 포트폴리오 및 몰입형 웹 플랫폼.',
      sitesDescDev: '대규모 웹 포털, 언리얼 엔진 5 기반 3D 스튜디오(Eclipsário), 경찰 CAD/MDT 시스템.',
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
      descDev: '프론트엔드, 백엔드, FiveM 네이티브 CFX, WebGL 셰이더 및 3D 모델링.',
      allCategories: '전체 기술',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI & 프론트엔드',
        '3d': '3D & 모델링',
        backend: '백엔드 & DB',
        frontend: '웹 프론트엔드',
        tools: '도구 & DevOps',
      },
    },
    experience: {
      title: '경력 및 성장 과정',
      descClient: '꾸준한 프로젝트 성공 납품과 기술 완성도를 향한 헌신.',
      descDev: '기술 로드맵: 프로그래밍 언어, 시스템 보안, 아키텍처 및 컴퓨터 공학.',
      educationTitle: '학력 사항',
      educationSubtitle: '시스템 개발 및 컴퓨터 공학의 탄탄한 학문적 기반.',
    },
    contact: {
      title: '함께 멋진 프로젝트를 만들어볼까요?',
      descClient: '구상 중인 서버 시스템이나 웹 프로젝트에 대해 편하게 말씀해주세요. 최적의 맞춤형 솔루션을 제안해 드립니다!',
      descDev: '소프트웨어 개발, FiveM 아키텍처, 웹 제작 및 3D 모델링 협업 환영합니다.',
      formTitle: '다이렉트 메시지 보내기',
      nameLabel: '성함 또는 서버 이름',
      namePlaceholder: '성함을 입력해주세요',
      emailLabel: '이메일 또는 Discord 아이디',
      emailPlaceholder: 'contact@example.com 또는 user#0000',
      messageLabel: '프로젝트 내용',
      messagePlaceholder: '필요한 요구사항을 작성해주세요...',
      sendBtn: '메시지 전송',
      sendingBtn: '전송 중...',
      successMsg: '메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.',
      quickChat: '빠른 연락처',
      discordUser: 'Ikarus Sylver',
      copiedToast: '클립보드에 복사되었습니다!',
    },
    clock: {
      brtTime: '브라질리아 표준시 (BRT UTC-3)',
      localTime: '현재 현지 시각',
      statusOnline: '온라인 • 프로젝트 의뢰 가능',
    },
    console: {
      buttonLabel: 'F8 콘솔',
      title: '개발자 콘솔 [F8]',
      inputPlaceholder: "명령어를 입력하세요 (예: 'help', 'theme', 'stats')...",
      welcomeMsg: '인터랙티브 콘솔이 성공적으로 초기화되었습니다.',
      connectedMsg: 'Ikarus Sylver 개발 환경에 연결되었습니다.',
      helpTip: "F8 키 또는 'exit'을 입력해 콘솔을 닫으세요.",
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: '압도적인 성능과 열정, 모든 디테일에 진심을 담아 제작되었습니다.',
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
      client: 'Клиент',
      dev: 'Разработчик',
      clientTooltip: 'Режим Клиента: Понятный язык, фокус на стабильности серверов и бизнес-результатах',
      devTooltip: 'Режим Разработчика: Метрики resmon, рабочий код и глубокие технические термины',
      modalTitle: 'Как вы хотите просматривать это портфолио?',
      modalSubtitle: 'Выберите подходящий формат. Мы настроим терминологию, описание проектов и метрики под ваши цели:',
      clientCardTitle: 'Ищу исполнителя / Владелец проекта',
      clientCardDesc: 'Понятное общение, упор на стабильность вашего сервера, красивый визуал и отсутствие лагов.',
      clientCardBullets: [
        'Серверы и сайты без просадок FPS и лагов',
        'Современные и понятные интерфейсы для игроков',
        'Надежная защита от читеров и взломов',
        'Быстрая оценка стоимости и соблюдение сроков',
      ],
      clientCardBtn: 'Смотреть как Клиент →',
      devCardTitle: 'Я Разработчик / Техлид',
      devCardDesc: 'Resmon 0.01ms, продакшен код Lua/React, архитектура клиент-сервер и стек технологий.',
      devCardBullets: [
        'Ультранизкий Resmon в бенчмарках (0.01ms)',
        'React, TypeScript, Lua, Vite & Three.js',
        '3D моделирование, шейдеры & Unreal Engine 5',
        'Чистая, модульная и безопасная архитектура',
      ],
      devCardBtn: 'Смотреть как Разработчик →',
      recommendedBadge: 'Рекомендуется',
      technicalBadge: 'Технический',
      modalFooterNote: '💡 Вы можете переключить режим в любое время в верхнем меню сайта.',
      skip: 'Пропустить и продолжить',
    },
    hero: {
      statusBadge: 'Открыт для новых проектов',
      roleClient: 'Создание Высокопроизводительных Систем и Цифровых Решений',
      roleDev: 'Full Stack & FiveM Разработчик | React, Lua, Three.js & 3D Art',
      descClient: 'Воплощаю идеи в надежные цифровые решения: быстрые веб-сайты, удобные интерфейсы, FiveM системы без просадок FPS (ноль лагов) и эпичные 3D миры.',
      descDev: 'Разработка современных веб-приложений, FiveM фреймворков с resmon 0.01ms, 3D worldbuilding в Unreal Engine 5 и чистый код.',
      btnProjectsClient: 'Смотреть Решения',
      btnProjectsDev: 'Смотреть Проекты & Код',
      btnContactClient: 'Запросить расчет',
      btnContactDev: 'Связаться в Discord / Email',
      particleHintClient: 'Удерживайте клик, чтобы притянуть частицы, или выберите направление:',
      particleHintDev: 'Удерживайте клик, чтобы притянуть частицы, или измените 3D форму:',
      shapes: {
        react: 'Интерактивные UI',
        lua: 'Ноль просадок FPS',
        code: 'Уникальные системы',
        cube: '3D Модели & Карты',
        java: 'Java Backend',
      },
    },
    stats: {
      client: {
        stat1Label: 'Готовых систем',
        stat1Desc: 'Проверенные решения в продакшене',
        stat2Label: 'Плавность 100%',
        stat2Desc: 'Комфортная игра без задержек',
        stat3Label: 'Лет опыта',
        stat3Desc: 'Непрерывная разработка с 2022 года',
        stat4Label: 'Завершенных проектов',
        stat4Desc: 'Веб-приложения, FiveM и 3D арт',
      },
      dev: {
        stat1Label: 'Модулей и скриптов',
        stat1Desc: 'Client, Server & Web Apps',
        stat2Label: 'Целевой Resmon',
        stat2Desc: 'Экстремальная оптимизация (0.01ms)',
        stat3Label: 'Лет в коде',
        stat3Desc: 'Архитектура и разработка',
        stat4Label: 'Репозиториев',
        stat4Desc: 'Open Source и коммерческие проекты',
      },
    },
    showcase3d: {
      badgeClient: 'Гарантия стабильности и высокой скорости',
      badgeDev: 'Инженерия 3D WebGL и экстремальная производительность',
      title: '3D Интерактивный показ & Тест производительности',
      descClient: 'Убедитесь в реальном времени, как наши 3D объекты и системы работают максимально плавно и без нагрузки на компьютер.',
      descDev: 'Инспекция шейдеров Three.js (анимированный кубик Рубика, физический алмаз, кольцо) и мониторинг Resmon в реальном времени.',
      btnBenchmark: 'Запустить Стресс-Тест',
      benchmarkingText: 'Вычисление нагрузки...',
      fpsLabel: 'Стабильный FPS',
      tickLabel: 'Tick Rate',
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
      appDescClient: 'Интерактивные веб-инструменты, созданные для удобного решения реальных задач.',
      appDescDev: 'Современные веб-приложения, CLI утилиты, модули безопасности и инструменты.',
      sitesTitle: 'Главные проекты & Сайты',
      sitesDescClient: 'Высокодетализированные 3D витрины, монументальные миры и официальные порталы.',
      sitesDescDev: 'Масштабные веб-порталы, 3D ворлдбилдинг в Unreal Engine 5 (Eclipsário) и системы CAD/MDT.',
      featuredBadge: 'Главный проект',
      demoBtn: 'Демо онлайн',
      visitBtn: 'Открыть сайт',
      codeBtn: 'Исходный код',
      creditsBtn: 'Благодарности',
      interactiveDemoBadge: 'Интерактивное Демо',
      openDemo: 'Запустить демонстрацию 💻',
      visitSite: 'Перейти на сайт 🚀',
    },
    skills: {
      title: 'Навыки и технологии',
      descClient: 'Полный комплекс компетенций: от дизайна и верстки до серверной логики.',
      descDev: 'Широкий стек: Frontend, Backend, CFX Native API, шейдеры и 3D моделирование.',
      allCategories: 'Все технологии',
      categories: {
        gta: 'GTA RP & FiveM',
        nui: 'NUI & Фронтенд',
        '3d': '3D & Моделирование',
        backend: 'Бэкенд & БД',
        frontend: 'Веб-фронтенд',
        tools: 'Инструменты & DevOps',
      },
    },
    experience: {
      title: 'Путь и опыт работы',
      descClient: 'Постоянное развитие, успешные сдачи проектов и фокус на высоком качестве.',
      descDev: 'Хронология развития: языки, системы безопасности, архитектура и компьютерные науки.',
      educationTitle: 'Образование',
      educationSubtitle: 'Фундаментальная подготовка в области разработки ПО и компьютерной инженерии.',
    },
    contact: {
      title: 'Давайте создадим что-то крутое',
      descClient: 'Расскажите о вашей идее или сервере. Напишите, и мы подберем идеальное решение под ваш бюджет!',
      descDev: 'Открыт к совместной работе над софтом, FiveM архитектурой, веб-разработкой и 3D.',
      formTitle: 'Отправить сообщение',
      nameLabel: 'Ваше имя или название проекта',
      namePlaceholder: 'Как к вам обращаться?',
      emailLabel: 'Email или ник в Discord',
      emailPlaceholder: 'contact@example.com или user#0000',
      messageLabel: 'Детали проекта',
      messagePlaceholder: 'Опишите ваши задачи и пожелания...',
      sendBtn: 'Отправить сообщение',
      sendingBtn: 'Отправка...',
      successMsg: 'Сообщение успешно отправлено! Я скоро свяжусь с вами.',
      quickChat: 'Быстрая связь',
      discordUser: 'Ikarus Sylver',
      copiedToast: 'Скопировано в буфер обмена!',
    },
    clock: {
      brtTime: 'Время Бразилиа (BRT UTC-3)',
      localTime: 'Местное время',
      statusOnline: 'В сети • Доступен для проектов',
    },
    console: {
      buttonLabel: 'Терминал F8',
      title: 'Консоль разработчика [F8]',
      inputPlaceholder: "Введите команду (напр. 'help', 'theme', 'stats')...",
      welcomeMsg: 'Интерактивная консоль успешно инициализирована.',
      connectedMsg: 'Подключено к среде разработки Ikarus Sylver.',
      helpTip: "Нажмите F8 или введите 'exit', чтобы закрыть.",
    },
    footer: {
      rights: 'Все права защищены.',
      tagline: 'Создано с акцентом на максимальную производительность, страсть и внимание к деталям.',
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
