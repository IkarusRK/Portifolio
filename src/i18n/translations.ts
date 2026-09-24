export type Language = 'pt' | 'en' | 'es' | 'zh';

export interface Translations {
  // Navigation
  nav: {
    works: string;
    inspector: string;
    environments: string;
    characters: string;
    pipeline: string;
    commissions: string;
    about: string;
    commissionCta: string;
    themeTooltip: string;
    languageTooltip: string;
    audioActive: string;
    audioMuted: string;
    subrole: string;
  };
  // Hero
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreBtn: string;
    commissionBtn: string;
    watch3dBtn: string;
    stats: {
      exp: string;
      mods: string;
      reach: string;
    };
    orbitHint: string;
  };
  // Metrics
  metrics: {
    mods: string;
    players: string;
    approval: string;
    udim: string;
  };
  // 3D Inspector
  inspector: {
    badge: string;
    title: string;
    subtitle: string;
    viewModes: {
      pbr: string;
      wireframe: string;
      clay: string;
      emission: string;
    };
    controls: {
      autoRotate: string;
      reset: string;
      help: string;
    };
    features: {
      tris: string;
      drawCalls: string;
      fps: string;
    };
  };
  // Gallery
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    tabs: {
      all: string;
      environments: string;
      characters: string;
      weapons: string;
      props: string;
    };
    viewProject: string;
    inspect3d: string;
    polycount: string;
    textures: string;
  };
  // Showcases
  environments: {
    badge: string;
    title: string;
    desc: string;
    exploreBtn: string;
  };
  characters: {
    badge: string;
    title: string;
    desc: string;
    exploreBtn: string;
  };
  // Pipeline
  pipeline: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
  };
  // Commissions
  commissions: {
    badge: string;
    title: string;
    subtitle: string;
    startingFrom: string;
    deliveryTime: string;
    selectTier: string;
    popularTag: string;
    form: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      contactLabel: string;
      contactPlaceholder: string;
      projectTypeLabel: string;
      descLabel: string;
      descPlaceholder: string;
      deadlineLabel: string;
      deadlinePlaceholder: string;
      submitBtn: string;
      successMessage: string;
    };
    directDiscord: string;
  };
  // About
  about: {
    badge: string;
    title: string;
    subtitle: string;
    bio: string;
    bioExtended: string;
    statsTitle: string;
    toolsTitle: string;
    discordBtn: string;
  };
  // Footer
  footer: {
    description: string;
    telemetryTitle: string;
    communityTitle: string;
    rights: string;
    backToTop: string;
    discordServer: string;
    developedBy: string;
  };
  // Developer Modal
  developerModal: {
    badge: string;
    title: string;
    role: string;
    description: string;
    portfolioTitle: string;
    portfolioDesc: string;
    portfolioBtn: string;
    githubTitle: string;
    githubDesc: string;
    githubBtn: string;
    copied: string;
    close: string;
  };
  // Project Modal
  projectModal: {
    engine: string;
    polycount: string;
    textures: string;
    materials: string;
    software: string;
    features: string;
    lore: string;
    orderSimilar: string;
    close: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  pt: {
    nav: {
      works: 'Obras & Modelos',
      inspector: 'Inspetor 3D',
      environments: 'Mapas & Cenários',
      characters: 'Personagens',
      pipeline: 'Processo 3D',
      commissions: 'Comissões',
      about: 'Sobre',
      commissionCta: 'Encomendar',
      themeTooltip: 'Trocar Tema Cósmico',
      languageTooltip: 'Alterar Idioma',
      audioActive: 'Desativar Áudio',
      audioMuted: 'Ativar Áudio Cósmico',
      subrole: '3D Game Artist • UE4 & UE5',
    },
    hero: {
      badge: 'Cosmic Void • Dark Fantasy 3D Artist',
      titleLine1: 'ESCULTURAS DO VÁCUO',
      titleLine2: 'MUNDOS DE HYBORIA',
      subtitle: 'Artista 3D Sênior & Worldbuilder especializada em mundos de fantasia sombria, armas rúnicas astrais e ecossistema Conan Exiles & Unreal Engine 5.',
      exploreBtn: 'Explorar Criações',
      commissionBtn: 'Iniciar Encomenda',
      watch3dBtn: 'Ver Vídeo 3D',
      stats: {
        exp: '5+ Anos de Domínio',
        mods: '60+ Mods e Assets AAA',
        reach: '+1000 Jogadores Impactados',
      },
      orbitHint: 'Arraste o eclipse solar para interagir com o horizonte cósmico',
    },
    metrics: {
      mods: 'Mods & Assets Lançados',
      players: 'Alcance de Jogadores',
      approval: 'Aprovação Comprovada',
      udim: 'Texturas PBR UDIM',
    },
    inspector: {
      badge: 'WebGL 3D Engine • Three.js',
      title: 'Inspetor de Malha & Shaders em Tempo Real',
      subtitle: 'Rotacione em 360°, dê zoom e alterne entre modos PBR, Wireframe, Argila ZBrush e canais de emissão pura.',
      viewModes: {
        pbr: 'PBR Shaded',
        wireframe: 'Wireframe',
        clay: 'Argila ZBrush',
        emission: 'Emissão',
      },
      controls: {
        autoRotate: 'Auto Rotação',
        reset: 'Resetar Câmera',
        help: 'Girar: Botão Esquerdo | Zoom: Scroll | Mover: Botão Direito',
      },
      features: {
        tris: '84.6K Tris',
        drawCalls: '1 DrawCall',
        fps: '60 FPS',
      },
    },
    gallery: {
      badge: 'Acervo Cósmico',
      title: 'Galeria de Relíquias & Biomas',
      subtitle: 'Modelos 3D cinematográficos, props rúnicos e ambientes modulares forjados para games AAA.',
      tabs: {
        all: 'Todos',
        environments: 'Ambientes & Cidadelas',
        characters: 'Guerreiros & Criaturas',
        weapons: 'Armas & Relíquias',
        props: 'Props & DevKit',
      },
      viewProject: 'Ver Detalhes do Projeto',
      inspect3d: 'Ver em 3D',
      polycount: 'Polígonos',
      textures: 'Texturas',
    },
    environments: {
      badge: 'Worldbuilding • Unreal Engine 5',
      title: 'Catedral Astral das Águas & Cidadelas',
      desc: 'Criação de biomas imersivos, ruínas astrais e cidadelas monumentais com iluminação Lumen cinematográfica e Nanite geometry.',
      exploreBtn: 'Inspecionar Ambientes',
    },
    characters: {
      badge: 'Character Forge • Rigging & Physics',
      title: 'Succubus Real & Asas Dracônicas',
      desc: 'Avatares de combate com anatomia expressiva esculpida no ZBrush, simulação física de asas no Chaos Solver e compatibilidade com esqueletos padrão de UE4/UE5.',
      exploreBtn: 'Inspecionar Guerreiros',
    },
    pipeline: {
      badge: 'Workflow Profissional',
      title: 'Pipeline de Produção AAA',
      subtitle: 'Do esboço conceitual ao arquivo compilado pronto para rodar na Unreal Engine e servidores de jogo.',
      steps: [
        {
          step: '01',
          title: 'Conceito & Blocking Volumétrico',
          desc: 'Definição de silhueta, escala humana no Unreal Engine e bloqueio das massas no Blender com foco em ergonomia e gameplay.',
        },
        {
          step: '02',
          title: 'Escultura High-Poly no ZBrush',
          desc: 'Detalhamento anatômico de micro-poros, ornatos rúnicos cinzelados e entalhes de batalha em dezenas de milhões de polígonos.',
        },
        {
          step: '03',
          title: 'Retopologia & Abertura de UVs',
          desc: 'Malha otimizada para deformação limpa, alinhamento de densidade de texels (TD) e UDIMs organizados para máxima resolução.',
        },
        {
          step: '04',
          title: 'Texturização PBR & Shaders UE4/UE5',
          desc: 'Bake com sub-milímetro de precisão no Substance Painter, materiais PBR 4K, dye masks e compilação para mod .pak e .uasset.',
        },
      ],
    },
    commissions: {
      badge: 'Fila Aberta • 2 Vagas',
      title: 'Comissões & Ordens Sob Medida',
      subtitle: 'Traga sua visão para o universo dos jogos com arte 3D de padrão cinematográfico.',
      startingFrom: 'A partir de',
      deliveryTime: 'Prazo médio',
      selectTier: 'Selecionar Pacote',
      popularTag: 'Mais Requisitado',
      form: {
        title: 'Formulário de Briefing Cósmico',
        subtitle: 'Preencha os detalhes e receba um orçamento personalizado com prazo e cronograma de produção.',
        nameLabel: 'Seu Nome / Nickname',
        namePlaceholder: 'Ex: Arthur Pendelton ou Valquíria_Conan',
        contactLabel: 'Discord ou Email para Contato',
        contactPlaceholder: 'Ex: seunick#0000 ou email@exemplo.com',
        projectTypeLabel: 'Tipo de Encomenda',
        descLabel: 'Descrição do Projeto / Referências',
        descPlaceholder: 'Descreva sua ideia, temas, referências visuais, estilo e formato de entrega desejado...',
        deadlineLabel: 'Prazo Desejado',
        deadlinePlaceholder: 'Ex: 15 dias, 1 mês ou flexível',
        submitBtn: 'Transmitir Briefing para Eclipsa',
        successMessage: 'Briefing transmitido com sucesso! Eclipsa entrará em contato em até 24h.',
      },
      directDiscord: 'Ou entre em contato diretamente pelo Discord Oficial',
    },
    about: {
      badge: 'A Artista',
      title: 'A Mente Criativa por Trás da Forja',
      subtitle: 'Eclipsa • 3D Cosmic Modeler & Worldbuilder',
      bio: 'Movida por um fascínio visceral por astrofísica, geometria sagrada e arquitetura monumental, Eclipsa une o místico e o cósmico com a imponência da Era Hiboriana e universos de fantasia sombria. Seu trabalho reimagina ruínas pagãs e catedrais astrais sob céus desconhecidos, forjando armas rúnicas, armaduras e biomas que parecem arrancados do coração de supernovas.',
      bioExtended: 'Com mais de cinco anos atuando ativamente na comunidade de modding e arte 3D para jogos AAA, domina o ciclo completo de produção: desde o concept blocking e escultura em alta frequência até retopologia de precisão, texturização PBR cinematográfica e scripting para o ecossistema Unreal Engine 4, Unreal Engine 5 e Conan DevKit.',
      statsTitle: 'Métricas de Carreira',
      toolsTitle: 'Ferramentas de Domínio',
      discordBtn: 'Servidor Discord Oficial da Eclipsa',
    },
    footer: {
      description: '3D Game Artist & Worldbuilder especializada em dark fantasy cósmico, asset pipeline AAA, armaduras rúnicas e mods imersivos para Conan Exiles e Unreal Engine 5.',
      telemetryTitle: 'Telemetria do DevKit',
      communityTitle: 'Comunidade & Engines',
      rights: '© Todos os direitos reservados. Feito sob o alinhamento das luas de Hyboria.',
      backToTop: 'Retornar ao Ápice',
      discordServer: 'Servidor Discord Oficial',
      developedBy: 'Desenvolvido por IkarusRK',
    },
    developerModal: {
      badge: 'Desenvolvedor Full Stack',
      title: 'IkarusRK',
      role: 'Engenheiro de Software & Criador Web',
      description: 'Responsável pelo desenvolvimento front-end, arquitetura interativa, renderizador Three.js 3D, sintetizador de áudio Web Audio API e experiência imersiva deste portfólio.',
      portfolioTitle: 'Portfólio Oficial',
      portfolioDesc: 'Conheça outros projetos interativos, dashboards, jogos e aplicações web modernas desenvolvidas por IkarusRK.',
      portfolioBtn: 'Visitar Portfólio',
      githubTitle: 'GitHub @IkarusRK',
      githubDesc: 'Explore repositórios open-source, scripts FiveM, utilitários, automações e projetos em andamento.',
      githubBtn: 'Ver Perfil GitHub',
      copied: 'Link copiado com sucesso!',
      close: 'Fechar',
    },
    projectModal: {
      engine: 'Engine / Compatibilidade',
      polycount: 'Contagem de Polígonos',
      textures: 'Resolução de Texturas',
      materials: 'Materiais & Shaders',
      software: 'Softwares Utilizados',
      features: 'Destaques Técnicos',
      lore: 'Lore & Contexto Cósmico',
      orderSimilar: 'Encomendar Obra Semelhante',
      close: 'Fechar Janela',
    },
  },

  en: {
    nav: {
      works: 'Works & Models',
      inspector: '3D Inspector',
      environments: 'Environments',
      characters: 'Characters',
      pipeline: '3D Pipeline',
      commissions: 'Commissions',
      about: 'About',
      commissionCta: 'Commission',
      themeTooltip: 'Switch Cosmic Theme',
      languageTooltip: 'Change Language',
      audioActive: 'Mute Audio',
      audioMuted: 'Enable Cosmic Audio',
      subrole: '3D Game Artist • UE4 & UE5',
    },
    hero: {
      badge: 'Cosmic Void • Dark Fantasy 3D Artist',
      titleLine1: 'VOID SCULPTURES',
      titleLine2: 'REALMS OF HYBORIA',
      subtitle: 'Senior 3D Artist & Worldbuilder specializing in dark fantasy realms, astral runic weapons, and Conan Exiles & Unreal Engine 5 ecosystems.',
      exploreBtn: 'Explore Creations',
      commissionBtn: 'Start Commission',
      watch3dBtn: 'Watch 3D Showcase',
      stats: {
        exp: '5+ Years of Mastery',
        mods: '60+ Mods & AAA Assets',
        reach: '1,000+ Players Impacted',
      },
      orbitHint: 'Drag the solar eclipse to interact with the cosmic horizon',
    },
    metrics: {
      mods: 'Released Mods & Assets',
      players: 'Player Reach',
      approval: 'Proven Rating',
      udim: 'PBR UDIM Textures',
    },
    inspector: {
      badge: 'WebGL 3D Engine • Three.js',
      title: 'Real-Time Mesh & Shader Inspector',
      subtitle: 'Rotate 360°, zoom, and switch between PBR, Wireframe, ZBrush Clay, and Pure Emission modes.',
      viewModes: {
        pbr: 'PBR Shaded',
        wireframe: 'Wireframe',
        clay: 'ZBrush Clay',
        emission: 'Emission',
      },
      controls: {
        autoRotate: 'Auto Rotate',
        reset: 'Reset Camera',
        help: 'Rotate: Left Click | Zoom: Scroll | Pan: Right Click',
      },
      features: {
        tris: '84.6K Tris',
        drawCalls: '1 DrawCall',
        fps: '60 FPS',
      },
    },
    gallery: {
      badge: 'Cosmic Vault',
      title: 'Relics & Biomes Gallery',
      subtitle: 'Cinematic 3D models, runic props, and modular environments forged for AAA games.',
      tabs: {
        all: 'All',
        environments: 'Environments & Citadels',
        characters: 'Warriors & Creatures',
        weapons: 'Weapons & Relics',
        props: 'Props & DevKit',
      },
      viewProject: 'View Project Details',
      inspect3d: 'View in 3D',
      polycount: 'Polycount',
      textures: 'Textures',
    },
    environments: {
      badge: 'Worldbuilding • Unreal Engine 5',
      title: 'Astral Cathedral of Waters & Citadels',
      desc: 'Creation of immersive biomes, astral ruins, and monumental citadels with cinematic Lumen lighting and Nanite geometry.',
      exploreBtn: 'Inspect Environments',
    },
    characters: {
      badge: 'Character Forge • Rigging & Physics',
      title: 'Royal Succubus & Draconic Wings',
      desc: 'Combat avatars sculpted in ZBrush, dynamic wing simulation via Chaos Solver, and full compatibility with UE4/UE5 skeletons.',
      exploreBtn: 'Inspect Warriors',
    },
    pipeline: {
      badge: 'Professional Workflow',
      title: 'AAA Production Pipeline',
      subtitle: 'From initial concept blockout to engine-ready compiled packages for Unreal Engine and multiplayer servers.',
      steps: [
        {
          step: '01',
          title: 'Concept & Volumetric Blockout',
          desc: 'Silhouette definition, human scale validation in Unreal Engine, and mass blocking in Blender focused on ergonomics and gameplay.',
        },
        {
          step: '02',
          title: 'High-Poly Sculpting in ZBrush',
          desc: 'Anatomical detailing of micro-pores, chiseled runic ornaments, and battle wear across tens of millions of polygons.',
        },
        {
          step: '03',
          title: 'Retopology & UV Unwrapping',
          desc: 'Deformation-ready optimized topology, consistent texel density (TD), and organized UDIM layouts for maximum fidelity.',
        },
        {
          step: '04',
          title: 'PBR Texturing & UE4/UE5 Shaders',
          desc: 'Sub-millimeter precision baking in Substance Painter, 4K PBR materials, custom dye masks, and .pak / .uasset compilation.',
        },
      ],
    },
    commissions: {
      badge: 'Queue Open • 2 Slots',
      title: 'Commissions & Custom Orders',
      subtitle: 'Bring your vision to life with cinematic-standard 3D game assets.',
      startingFrom: 'Starting at',
      deliveryTime: 'Avg. turnaround',
      selectTier: 'Select Tier',
      popularTag: 'Most Requested',
      form: {
        title: 'Cosmic Briefing Form',
        subtitle: 'Fill in your project details to receive a custom quote, timeline, and production roadmap.',
        nameLabel: 'Your Name / Handle',
        namePlaceholder: 'e.g. Arthur Pendelton or ConanWarrior',
        contactLabel: 'Discord or Email Contact',
        contactPlaceholder: 'e.g. username#0000 or email@domain.com',
        projectTypeLabel: 'Project Type',
        descLabel: 'Project Details & References',
        descPlaceholder: 'Describe your concept, aesthetic references, desired deliverable formats...',
        deadlineLabel: 'Desired Deadline',
        deadlinePlaceholder: 'e.g. 2 weeks, 1 month, or flexible',
        submitBtn: 'Transmit Briefing to Eclipsa',
        successMessage: 'Briefing received successfully! Eclipsa will get in touch within 24 hours.',
      },
      directDiscord: 'Or get in touch directly via the Official Discord Server',
    },
    about: {
      badge: 'The Artist',
      title: 'The Creative Mind Behind the Forge',
      subtitle: 'Eclipsa • 3D Cosmic Modeler & Worldbuilder',
      bio: 'Driven by a visceral fascination for astrophysics, sacred geometry, and monumental architecture, Eclipsa blends mysticism with the raw majesty of the Hyborian Age and dark fantasy realms. Her work reimagines pagan ruins and astral cathedrals under alien skies, forging runic weapons, armors, and biomes born from supernovae.',
      bioExtended: 'With over five years of active development in AAA game modding and 3D art, she commands the full production cycle: from concept blocking and high-frequency sculpting to precise retopology, cinematic PBR texturing, and engine scripting for UE4, UE5, and Conan DevKit.',
      statsTitle: 'Career Highlights',
      toolsTitle: 'Mastered Tools',
      discordBtn: 'Official Eclipsa Discord Server',
    },
    footer: {
      description: '3D Game Artist & Worldbuilder specializing in cosmic dark fantasy, AAA asset pipelines, runic armors, and immersive mods for Conan Exiles and Unreal Engine 5.',
      telemetryTitle: 'DevKit Telemetry',
      communityTitle: 'Community & Engines',
      rights: '© All rights reserved. Forged beneath the alignment of Hyborian moons.',
      backToTop: 'Return to Apex',
      discordServer: 'Official Discord Server',
      developedBy: 'Developed by IkarusRK',
    },
    developerModal: {
      badge: 'Full Stack Developer',
      title: 'IkarusRK',
      role: 'Software Engineer & Web Creator',
      description: 'Architected and built this immersive web application: Three.js 3D viewport, Web Audio API sound synthesis, cosmic animations, and responsive design system.',
      portfolioTitle: 'Official Portfolio',
      portfolioDesc: 'Discover other interactive web apps, real-time dashboards, games, and modern web solutions crafted by IkarusRK.',
      portfolioBtn: 'Visit Portfolio',
      githubTitle: 'GitHub @IkarusRK',
      githubDesc: 'Explore open-source repositories, FiveM scripts, developer utilities, and active code projects.',
      githubBtn: 'View GitHub Profile',
      copied: 'Link copied to clipboard!',
      close: 'Close',
    },
    projectModal: {
      engine: 'Engine / Compatibility',
      polycount: 'Polygon Count',
      textures: 'Texture Resolution',
      materials: 'Materials & Shaders',
      software: 'Software Stack',
      features: 'Technical Highlights',
      lore: 'Lore & Cosmic Context',
      orderSimilar: 'Commission Similar Project',
      close: 'Close Modal',
    },
  },

  es: {
    nav: {
      works: 'Obras y Modelos',
      inspector: 'Inspector 3D',
      environments: 'Mapas y Entornos',
      characters: 'Personajes',
      pipeline: 'Proceso 3D',
      commissions: 'Comisiones',
      about: 'Sobre mí',
      commissionCta: 'Encargar',
      themeTooltip: 'Cambiar Tema Cósmico',
      languageTooltip: 'Cambiar Idioma',
      audioActive: 'Silenciar Audio',
      audioMuted: 'Activar Audio Cósmico',
      subrole: '3D Game Artist • UE4 & UE5',
    },
    hero: {
      badge: 'Cosmic Void • Artista 3D de Fantasía Oscura',
      titleLine1: 'ESCULTURAS DEL VACÍO',
      titleLine2: 'MUNDOS DE HYBORIA',
      subtitle: 'Artista 3D Sénior y Worldbuilder especializada en mundos de fantasía oscura, armas rúnicas astrales y ecosistema de Conan Exiles y Unreal Engine 5.',
      exploreBtn: 'Explorar Creaciones',
      commissionBtn: 'Iniciar Encargo',
      watch3dBtn: 'Ver Video 3D',
      stats: {
        exp: '5+ Años de Dominio',
        mods: '60+ Mods y Assets AAA',
        reach: '+1000 Jugadores Impactados',
      },
      orbitHint: 'Arrastra el eclipse solar para interactuar con el horizonte cósmico',
    },
    metrics: {
      mods: 'Mods y Assets Publicados',
      players: 'Alcance de Jugadores',
      approval: 'Aprobación Comprobada',
      udim: 'Texturas PBR UDIM',
    },
    inspector: {
      badge: 'WebGL 3D Engine • Three.js',
      title: 'Inspector de Malla y Shaders en Tiempo Real',
      subtitle: 'Gira 360°, haz zoom y alterna entre modos PBR, Wireframe, Arcilla ZBrush y canales de emisión pura.',
      viewModes: {
        pbr: 'PBR Shaded',
        wireframe: 'Wireframe',
        clay: 'Arcilla ZBrush',
        emission: 'Emisión Pura',
      },
      controls: {
        autoRotate: 'Rotación Automática',
        reset: 'Restablecer Cámara',
        help: 'Girar: Clic Izquierdo | Zoom: Rueda | Mover: Clic Derecho',
      },
      features: {
        tris: '84.6K Tris',
        drawCalls: '1 DrawCall',
        fps: '60 FPS',
      },
    },
    gallery: {
      badge: 'Archivo Cósmico',
      title: 'Galería de Reliquias y Biomas',
      subtitle: 'Modelos 3D cinematográficos, props rúnicos y entornos modulares forjados para videojuegos AAA.',
      tabs: {
        all: 'Todos',
        environments: 'Entornos y Ciudadelas',
        characters: 'Guerreros y Criaturas',
        weapons: 'Armas y Reliquias',
        props: 'Props y DevKit',
      },
      viewProject: 'Ver Detalles del Proyecto',
      inspect3d: 'Ver en 3D',
      polycount: 'Polígonos',
      textures: 'Texturas',
    },
    environments: {
      badge: 'Worldbuilding • Unreal Engine 5',
      title: 'Catedral Astral de las Aguas y Ciudadelas',
      desc: 'Creación de biomas inmersivos, ruinas astrales y ciudadelas monumentales con iluminación Lumen cinematográfica y geometría Nanite.',
      exploreBtn: 'Inspeccionar Entornos',
    },
    characters: {
      badge: 'Character Forge • Rigging y Física',
      title: 'Súcubo Real y Alas Dracónicas',
      desc: 'Avatares de combate esculpidos en ZBrush, simulación física de membranas con Chaos Solver y total compatibilidad con esqueletos de UE4/UE5.',
      exploreBtn: 'Inspeccionar Guerreros',
    },
    pipeline: {
      badge: 'Flujo de Trabajo Profesional',
      title: 'Pipeline de Producción AAA',
      subtitle: 'Del boceto conceptual al paquete compilado listo para Unreal Engine y servidores multijugador.',
      steps: [
        {
          step: '01',
          title: 'Concepto y Bloqueo Volumétrico',
          desc: 'Definición de silueta, validación de escala humana en UE y bloqueo en Blender enfocado en ergonomía y jugabilidad.',
        },
        {
          step: '02',
          title: 'Escultura High-Poly en ZBrush',
          desc: 'Detallado anatómico de micro-poros, ornamentos rúnicos cincelados y huellas de batalla en decenas de millones de polígonos.',
        },
        {
          step: '03',
          title: 'Retopología y Mapeo UV',
          desc: 'Malla optimizada para deformación limpia, densidad de texels consistente (TD) y disposición UDIM para máxima fidelidad.',
        },
        {
          step: '04',
          title: 'Texturizado PBR y Shaders UE4/UE5',
          desc: 'Bake de precisión submilimétrica en Substance Painter, materiales PBR 4K, dye masks y compilación para mod .pak y .uasset.',
        },
      ],
    },
    commissions: {
      badge: 'Cola Abierta • 2 Cupos',
      title: 'Comisiones y Encargos a Medida',
      subtitle: 'Haz realidad tu visión en el mundo de los videojuegos con arte 3D cinematográfico.',
      startingFrom: 'Desde',
      deliveryTime: 'Plazo medio',
      selectTier: 'Seleccionar Paquete',
      popularTag: 'Más Solicitado',
      form: {
        title: 'Formulario de Briefing Cósmico',
        subtitle: 'Envía los detalles de tu proyecto y recibe una cotización personalizada con cronograma de entrega.',
        nameLabel: 'Tu Nombre o Alias',
        namePlaceholder: 'Ej: Arturo Pendelton o Valquiria_Conan',
        contactLabel: 'Discord o Correo de Contacto',
        contactPlaceholder: 'Ej: usuario#0000 o email@dominio.com',
        projectTypeLabel: 'Tipo de Encargo',
        descLabel: 'Descripción del Proyecto / Referencias',
        descPlaceholder: 'Describe tu idea, temas, referencias visuales y formato de entrega requerido...',
        deadlineLabel: 'Plazo Estimado',
        deadlinePlaceholder: 'Ej: 2 semanas, 1 mes o flexible',
        submitBtn: 'Enviar Briefing a Eclipsa',
        successMessage: '¡Briefing enviado con éxito! Eclipsa te contactará en menos de 24 horas.',
      },
      directDiscord: 'O ponte en contacto directamente a través del Discord Oficial',
    },
    about: {
      badge: 'La Artista',
      title: 'La Mente Creativa Detrás de la Forja',
      subtitle: 'Eclipsa • 3D Cosmic Modeler & Worldbuilder',
      bio: 'Impulsada por una fascinación visceral por la astrofísica, la geometría sagrada y la arquitectura monumental, Eclipsa une lo místico y lo cósmico con la imponencia de la Era Hiboria y la fantasía oscura. Su obra reinventa ruinas paganas y catedrales astrales bajo cielos alienígenas, forjando armas rúnicas, armaduras y biomas arrancados de supernovas.',
      bioExtended: 'Con más de cinco años activa en la comunidad de modding y arte 3D para juegos AAA, domina el ciclo completo de producción: desde el concept blocking y escultura digital hasta la retopología de precisión, texturizado PBR y scripting para UE4, UE5 y Conan DevKit.',
      statsTitle: 'Métricas Profesionales',
      toolsTitle: 'Herramientas Dominadas',
      discordBtn: 'Servidor Oficial de Discord de Eclipsa',
    },
    footer: {
      description: '3D Game Artist y Worldbuilder especializada en fantasía oscura cósmica, pipeline de assets AAA, armaduras rúnicas y mods inmersivos para Conan Exiles y Unreal Engine 5.',
      telemetryTitle: 'Telemetría del DevKit',
      communityTitle: 'Comunidad y Motores',
      rights: '© Todos los derechos reservados. Forjado bajo la alineación de las lunas de Hiboria.',
      backToTop: 'Volver a la Cima',
      discordServer: 'Servidor Oficial de Discord',
      developedBy: 'Desarrollado por IkarusRK',
    },
    developerModal: {
      badge: 'Desarrollador Full Stack',
      title: 'IkarusRK',
      role: 'Ingeniero de Software y Creador Web',
      description: 'Responsable del desarrollo front-end, arquitectura interactiva, visor 3D Three.js, sintetizador de audio Web Audio API y diseño inmersivo de este portafolio.',
      portfolioTitle: 'Portafolio Oficial',
      portfolioDesc: 'Descubre otros proyectos interactivos, paneles de control, juegos y aplicaciones web modernas creadas por IkarusRK.',
      portfolioBtn: 'Visitar Portafolio',
      githubTitle: 'GitHub @IkarusRK',
      githubDesc: 'Explora repositorios de código abierto, scripts FiveM, utilidades y proyectos de software.',
      githubBtn: 'Ver Perfil en GitHub',
      copied: '¡Enlace copiado al portapapeles!',
      close: 'Cerrar',
    },
    projectModal: {
      engine: 'Motor / Compatibilidad',
      polycount: 'Conteo de Polígonos',
      textures: 'Resolución de Texturas',
      materials: 'Materiales y Shaders',
      software: 'Herramientas Utilizadas',
      features: 'Aspectos Técnicos',
      lore: 'Lore y Contexto Cósmico',
      orderSimilar: 'Encargar Proyecto Similar',
      close: 'Cerrar Ventana',
    },
  },

  zh: {
    nav: {
      works: '作品与模型',
      inspector: '3D 检查器',
      environments: '地图与环境',
      characters: '角色与护甲',
      pipeline: '制作流程',
      commissions: '定制委托',
      about: '关于艺术家',
      commissionCta: '立即委托',
      themeTooltip: '切换宇宙主题',
      languageTooltip: '切换语言',
      audioActive: '静音音频',
      audioMuted: '开启宇宙音效',
      subrole: '3D 游戏美术师 • UE4 & UE5',
    },
    hero: {
      badge: '宇宙虚空 • 暗黑奇幻 3D 游戏美术师',
      titleLine1: '虚空神工雕琢',
      titleLine2: '海波利亚神域',
      subtitle: '资深 3D 游戏艺术家与世界构建师，专注宇宙暗黑奇幻、星界符文武器、Conan Exiles 模组与虚幻引擎 5 开发。',
      exploreBtn: '浏览所有创作',
      commissionBtn: '发起定制委托',
      watch3dBtn: '观看 3D 展示',
      stats: {
        exp: '5+ 年美术积累',
        mods: '60+ 模组与 3A 资产',
        reach: '1000+ 覆盖玩家',
      },
      orbitHint: '拖动日食天体与宇宙地平线产生交互引力',
    },
    metrics: {
      mods: '已发布模组与资产',
      players: '覆盖全球玩家',
      approval: '好评认可率',
      udim: 'PBR UDIM 4K 贴图',
    },
    inspector: {
      badge: 'WebGL 3D 渲染引擎 • Three.js',
      title: '实时网格与着色器检查器',
      subtitle: '360° 全方位旋转缩放，自由切换 PBR 渲染、线框模式、ZBrush 黏土雕刻与纯发光通道。',
      viewModes: {
        pbr: 'PBR 渲染',
        wireframe: '线框模式',
        clay: 'ZBrush 黏土',
        emission: '纯发光通道',
      },
      controls: {
        autoRotate: '自动旋转',
        reset: '重置视角',
        help: '旋转：鼠标左键 | 缩放：滚轮 | 平移：鼠标右键',
      },
      features: {
        tris: '84.6K 三角面',
        drawCalls: '1 DrawCall',
        fps: '60 FPS 流畅',
      },
    },
    gallery: {
      badge: '宇宙藏品阁',
      title: '星穹遗迹与生物群系画廊',
      subtitle: '电影级 3D 资产、符文神器与模块化城堡，专为 3A 游戏与模组打造。',
      tabs: {
        all: '全部作品',
        environments: '环境与城堡',
        characters: '战士与生物',
        weapons: '武器与遗物',
        props: '道具与套件',
      },
      viewProject: '查看项目详情',
      inspect3d: '进入 3D 视图',
      polycount: '面数规格',
      textures: '材质贴图',
    },
    environments: {
      badge: '世界构建 • 虚幻引擎 5',
      title: '水之星界大教堂与模块化城堡',
      desc: '打造沉浸式生物群系、异界废墟与宏伟城堡，搭载电影级 Lumen 实时全局光照与 Nanite 微多边形几何体。',
      exploreBtn: '检查场景环境',
    },
    characters: {
      badge: '角色锻造 • 骨骼绑定与物理',
      title: '皇家魅魔与魔龙之翼',
      desc: 'ZBrush 高精人体战斗化身，集成 Chaos Solver 翼膜布料动力学解算，完美适配虚幻引擎 4 与 5 标准骨骼。',
      exploreBtn: '检查角色模型',
    },
    pipeline: {
      badge: '专业工业级流程',
      title: '3A 级次世代资产制作管线',
      subtitle: '从概念形体规划到直接可导入虚幻引擎与多人游戏服务器的最终编译文件。',
      steps: [
        {
          step: '01',
          title: '概念构思与体量粗模',
          desc: '剪影轮廓定义，基于虚幻引擎标准人体比例在 Blender 中推敲人体工程学与玩法适配。',
        },
        {
          step: '02',
          title: 'ZBrush 千万面高模雕刻',
          desc: '毛孔微结构、古老符文雕饰与战损刻痕，包含数千万多边形的精细数字雕塑。',
        },
        {
          step: '03',
          title: '拓扑优化与 UV 展开',
          desc: '基于动作变形优化的布线结构，严格保证纹理像素密度（TD）及多 UDIM 高清平铺。',
        },
        {
          step: '04',
          title: 'PBR 材质与引擎着色器',
          desc: 'Substance Painter 亚毫米级烘焙，4K PBR 材质、染色遮罩，一键打包为 .pak 及 .uasset。',
        },
      ],
    },
    commissions: {
      badge: '排期待定 • 开放 2 个名额',
      title: '定制委托与专属订单',
      subtitle: '以电影级 3D 艺术水准，将您的幻想世界化为现实。',
      startingFrom: '起步价',
      deliveryTime: '平均周期',
      selectTier: '选择此方案',
      popularTag: '最受欢迎',
      form: {
        title: '宇宙委托需求单',
        subtitle: '填写您的项目详情，即可获取定制报价、时间表与制作路线图。',
        nameLabel: '您的姓名 / 昵称',
        namePlaceholder: '例如：亚瑟 或者 ConanWarrior',
        contactLabel: 'Discord 账号或电子邮箱',
        contactPlaceholder: '例如：username#0000 或 email@domain.com',
        projectTypeLabel: '项目类型',
        descLabel: '项目描述与参考资料',
        descPlaceholder: '请描述您的核心理念、视觉风格参考以及交付格式需求...',
        deadlineLabel: '期望交付时间',
        deadlinePlaceholder: '例如：2 周、1 个月或时间充裕',
        submitBtn: '向 Eclipsa 发送委托需求',
        successMessage: '需求单发送成功！Eclipsa 将在 24 小时内与您联络。',
      },
      directDiscord: '或直接加入官方 Discord 社区与艺术家沟通',
    },
    about: {
      badge: '艺术家简介',
      title: '星穹熔炉背后的创造者',
      subtitle: 'Eclipsa • 3D 宇宙建模师与世界构建师',
      bio: '怀着对天体物理学、神圣几何与纪念碑式建筑的敬畏与迷恋，Eclipsa 将神秘主义与海波利亚时代的野性力量融为一体。她的作品重构了未知星空下的异教废墟与星界大教堂，锻造出宛如从超新星核心淬炼而出的符文武器与神域护甲。',
      bioExtended: '在 3A 游戏模组与 3D 艺术社区深耕逾五年，她精通全制作管线：从初期粗模、高模雕刻到精密拓扑、电影级 PBR 质感刻画，以及针对虚幻 4、虚幻 5 和 Conan DevKit 的底层模组逻辑构建。',
      statsTitle: '生涯关键数据',
      toolsTitle: '掌握的数字工具',
      discordBtn: '进入 Eclipsa 官方 Discord 服务器',
    },
    footer: {
      description: '3D 游戏艺术家与世界构建师，专注宇宙暗黑奇幻、3A 级资产管线、符文护甲以及 Conan Exiles 与虚幻 5 沉浸式模组。',
      telemetryTitle: 'DevKit 遥测状态',
      communityTitle: '社区与引擎支持',
      rights: '© 保留所有权利。锻造于海波利亚星月同辉之穹。',
      backToTop: '返回顶端',
      discordServer: '官方 Discord 社区',
      developedBy: '由 IkarusRK 精心开发',
    },
    developerModal: {
      badge: ' 全栈工程师',
      title: 'IkarusRK',
      role: '软件工程师与 Web 创作者',
      description: '负责本网站的前端架构开发、Three.js 实时 3D 视口、Web Audio API 宇宙音频合成系统以及响应式设计规范。',
      portfolioTitle: '官方作品集主站',
      portfolioDesc: '探索由 IkarusRK 独立开发的更多现代化 Web 应用、交互式仪表盘、在线工具与游戏项目。',
      portfolioBtn: '访问个人作品集',
      githubTitle: 'GitHub @IkarusRK',
      githubDesc: '查看开源代码仓库、FiveM 定制脚本、实用开发工具与持续维护的开源项目。',
      githubBtn: '访问 GitHub 个人主页',
      copied: '链接已复制到剪贴板！',
      close: '关闭窗口',
    },
    projectModal: {
      engine: '游戏引擎 / 兼容平台',
      polycount: '多边形面数',
      textures: '贴图分辨率',
      materials: '材质与着色器',
      software: '制作软件套件',
      features: '技术核心亮点',
      lore: '背景设定与世界观',
      orderSimilar: '定制类似作品',
      close: '关闭详情',
    },
  },
};
