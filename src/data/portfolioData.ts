export interface Project {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Ambientes & Cidadelas' | 'Guerreiros & Criaturas' | 'Armas & Relíquias' | 'Props & DevKit';
  image: string;
  thumbnail: string;
  engine: string;
  polycount: string;
  textures: string;
  materials?: string;
  software: string[];
  features: string[];
  description: string;
  loreExcerpt: string;
  tags: string[];
  type3D?: 'crimson_astrolabe' | 'gyroscope_render';
  featured: boolean;
}

export interface CommissionTier {
  id: string;
  tierNumber: string;
  title: string;
  tag: string;
  basePrice: number;
  priceFormatted: string;
  deliveryTime: string;
  budgetPolycount: string;
  materialsSpec: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'proj-catedral-astral',
    title: 'Catedral Astral das Águas',
    subtitle: 'Palácio Sagrado com Vitrais Estelares & Cristais Esmeralda',
    shortDesc: 'Palácio monumental gótico sobre águas reflexivas, vitrais e cristais esmeralda.',
    fullDesc: 'Catedral monumental assentada sobre águas astrais reflexivas. Apresenta torres pontiagudas douradas com agulhas celestes, cúpulas imperiais em latão polido, vitrais ricamente facetados em arabescos luminosos e formações cristalinas de esmeralda viva.',
    category: 'Ambientes & Cidadelas',
    image: '/assets/catedral-astral.jpg',
    thumbnail: '/assets/catedral-astral.jpg',
    engine: 'Unreal Engine 5.4',
    polycount: '1.45M Tris Nanite',
    textures: '8 UDIMs 4K PBR',
    materials: '8 UDIMs 4K PBR',
    software: ['Unreal Engine 5.4', 'ZBrush', 'Blender', 'Substance 3D Painter'],
    features: [
      'Iluminação Lumen cinematográfica com reflexos nas águas astrais',
      'Geometria Nanite de alta resolução sem pop-in de LODs',
      'Vitrais com emissão ajustável por blueprint de servidor',
      'Kit modular completo de arcos, torres e escadarias imperiais'
    ],
    description: 'Catedral monumental assentada sobre águas astrais reflexivas. Apresenta torres pontiagudas douradas com agulhas celestes, cúpulas imperiais em latão polido, vitrais ricamente facetados em arabescos luminosos e formações cristalinas de esmeralda viva.',
    loreExcerpt: 'Erigida na confluência de duas luas esquecidas, suas águas sussurram os hinos de civilizações que dobraram a própria gravidade estelar.',
    tags: ['UE5 Nanite', 'Lumen Lighting', 'Kit Modular', '4K PBR', 'Vitrais Emissivos'],
    featured: true
  },
  {
    id: 'proj-succubus-asas',
    title: 'Succubus Real & Asas Dracônicas',
    subtitle: 'Avatar Bárbaro-Demoníaco com Rigging & Física de Asas',
    shortDesc: 'Avatar bárbaro estilizado com bodysuit em couro/látex e asas de dragão violeta.',
    fullDesc: 'Personagem esculpida com proporções de combate e curvas expressivas. Bodysuit estruturado em couro e látex escuro com detalhes rúnicos no peitoral, chifres e envergadura de asas demoníacas de couro violeta com microtextura de membranas translúcidas e articulações rigged.',
    category: 'Guerreiros & Criaturas',
    image: '/assets/succubus-asas.png',
    thumbnail: '/assets/succubus-asas.png',
    engine: 'Unreal Engine 4 & 5',
    polycount: '78.500 Tris',
    textures: '4K PBR + Chaos Physics',
    materials: '4K PBR + Chaos Physics',
    software: ['ZBrush', 'Blender 4.2', 'Substance 3D', 'Marvelous Designer', 'UE4/UE5'],
    features: [
      'Totalmente rigged para esqueleto padrão Conan Exiles e UE4/UE5',
      'Física dinâmica de asas e membranas com Chaos Solver',
      'Suporte completo a 5 canais de tintura (Dye System)',
      'Bake limpo sub-milímetro sem artefatos ou skewing'
    ],
    description: 'Personagem esculpida com proporções de combate e curvas expressivas. Bodysuit estruturado em couro e látex escuro com detalhes rúnicos no peitoral, chifres e envergadura de asas demoníacas de couro violeta com microtextura de membranas translúcidas e articulações rigged.',
    loreExcerpt: 'Nascida sob os eclipses do abismo cósmico, suas asas cortam o ar como relâmpagos violeta entre os salões bárbaros de Hyboria.',
    tags: ['Rigged UE4/UE5', 'Chaos Cloth', 'Conan DevKit', 'Dye Ready', 'Anatomia ZBrush'],
    featured: true
  },
  {
    id: 'proj-orbe-carmesim',
    title: 'Astrolábio Carmesim & Orbe Rúnico',
    subtitle: 'Relíquia Imperial em Mármore Vermelho, Ouro & Pingentes de Rubi',
    shortDesc: 'Relíquia cerimonial de mármore carmesim, giroscópio de ouro e pingentes de rubi.',
    fullDesc: 'Giroscópio ancestral rúnico composto por uma esfera central de mármore vermelho com veios dourados e vórtice esculpido em relevo, moldura de rubi lapidado com quatro brasões de diamante em ouro e três pingentes de rubi suspensos oscilando em levitação.',
    category: 'Armas & Relíquias',
    image: '/assets/orbe-carmesim.png',
    thumbnail: '/assets/orbe-carmesim.png',
    engine: 'Unreal Engine 5.4',
    polycount: '84.600 Tris',
    textures: '4K PBR / 1 UDIM',
    materials: '4K PBR / 1 UDIM',
    software: ['ZBrush', 'Blender', 'Substance 3D Painter', 'Unreal Engine 5.4'],
    features: [
      'Giroscópio funcional com rotação independente nos eixos X, Y e Z',
      '3 pingentes de rubi suspensos com oscilação harmônica',
      'Shader emissivo estelar para runas e veios de mármore',
      'Disponível para inspeção 3D interativa em tempo real no viewport'
    ],
    description: 'Giroscópio ancestral rúnico composto por uma esfera central de mármore vermelho com veios dourados e vórtice esculpido em relevo, moldura de rubi lapidado com quatro brasões de diamante em ouro e três pingentes de rubi suspensos oscilando em levitação.',
    loreExcerpt: 'Forjado no coração de uma estrela anã vermelha, o astrolábio orientava os sacerdotes estelares antes da queda das grandes dinastias.',
    tags: ['ZBrush Sculpt', 'Substance 3D', 'Emissive Shaders', 'Conan Pak', 'UE4/UE5'],
    type3D: 'crimson_astrolabe',
    featured: true
  },
  {
    id: 'proj-madrovitale-fachada',
    title: 'Cidadela Imperial Madrovitale',
    subtitle: 'Arquitetura Monumental Art Deco em Mármore e Bosques Nevados',
    shortDesc: 'Complexo arquitetônico monumental de mármore branco em floresta de pinheiros.',
    fullDesc: 'Complexo arquitetônico monumental integrando a imponência da Art Deco com a crueza fantástica hiboriana. Fachada simétrica em mármore branco entalhado, colunatas verticais, vidraças esmeralda e escadarias imperiais rodeadas por floresta perene e picos nevados.',
    category: 'Ambientes & Cidadelas',
    image: '/assets/madrovitale-fachada.jpg',
    thumbnail: '/assets/madrovitale-fachada.jpg',
    engine: 'Unreal Engine 5.4',
    polycount: '1.85M Tris Nanite',
    textures: '12 UDIMs 4K PBR',
    materials: '12 UDIMs 4K PBR',
    software: ['Blender', 'ZBrush', 'Substance 3D Designer', 'Unreal Engine 5.4'],
    features: [
      'Nanite geometry com zero perda de performance em mapas imensos',
      'Lumen Global Illumination com reflexos em mármore e neve',
      'Colisões complexas simplificadas para combate multiplayer fluido',
      'Módulos empacotados em mod .pak com spawn pronto'
    ],
    description: 'Complexo arquitetônico monumental integrando a imponência da Art Deco com a crueza fantástica hiboriana. Fachada simétrica em mármore branco entalhado, colunatas verticais, vidraças esmeralda e escadarias imperiais rodeadas por floresta perene e picos nevados.',
    loreExcerpt: 'Madrovitale ergue-se incólume contra o rigor do inverno estelar, marco do poder eterno das dinastias imperiais.',
    tags: ['Nanite Meshes', 'Lumen GI', 'Modular Biome', 'LOD0 AAA', 'Unreal Engine 5'],
    featured: true
  },
  {
    id: 'proj-madrovitale-detalhes',
    title: 'Pórtico & Balustradas Madrovitale',
    subtitle: 'Kit Modular de Mármore, Vidraças e Frisos Geométricos',
    shortDesc: 'Módulos detalhados de varandas, balustradas e relevos geométricos.',
    fullDesc: 'Módulos de alta densidade geométrica incluindo parapeitos em mármore cinzelado, balustradas com balaústres esculpidos, relevos geométricos em frisos contínuos e esquadrias de bronze e esmeralda perfeitamente compatíveis com Conan DevKit e UE5.',
    category: 'Props & DevKit',
    image: '/assets/madrovitale-detalhes.jpg',
    thumbnail: '/assets/madrovitale-detalhes.jpg',
    engine: 'Unreal Engine 4 & 5',
    polycount: '36.400 Tris',
    textures: '4K PBR Tileable',
    materials: '4K PBR Tileable',
    software: ['Blender 4.2', 'Substance 3D Painter', 'Conan DevKit', 'UE4/UE5'],
    features: [
      'Trim sheets modulares de 4K com baixo consumo de memória',
      'Encaixes tipo snap perfeitos em grid de 256cm e 512cm',
      'Compatibilidade total com shaders do Conan Exiles',
      'Textura PBR de mármore com reflexos sutis de intempéries'
    ],
    description: 'Módulos de alta densidade geométrica incluindo parapeitos em mármore cinzelado, balustradas com balaústres esculpidos, relevos geométricos em frisos contínuos e esquadrias de bronze e esmeralda perfeitamente compatíveis com Conan DevKit e UE5.',
    loreExcerpt: 'Cada parapeito e coluna foi esculpido em blocos maciços transportados dos cânions mais profundos sob orientação estelar.',
    tags: ['Kit Modular', 'Conan DevKit', 'Collision Meshes', 'UE4 & UE5', 'PBR 4K'],
    featured: false
  },
  {
    id: 'proj-giroscopio-orbital',
    title: 'Giroscópio Planetário & Manequim',
    subtitle: 'Render 3D de Órbita Planetária com Luas e Anéis Rúnicos',
    shortDesc: 'Mecanismo planetário com órbitas animadas e luas celestes ao redor do manequim.',
    fullDesc: 'Recriação interativa do mecanismo orbital com núcleo planetário violeta e azul, anel dourado segmentado e luas orbitais circundando o manequim de rig. Desenvolvido para props dinâmicos, cinturões astrais e sockets de personagem.',
    category: 'Armas & Relíquias',
    image: '/assets/orbe-carmesim.png',
    thumbnail: '/assets/orbe-carmesim.png',
    engine: 'Unreal Engine 4 & 5',
    polycount: '62.400 Tris',
    textures: '4K PBR Metalness',
    materials: '4K PBR Metalness',
    software: ['Blender', 'Three.js WebGL', 'Substance 3D', 'UE4 & UE5'],
    features: [
      'Animação de revolução orbital em tempo real',
      'Satélites e luas azuis com trilhas de luz estelar',
      'Manequim com marcadores de armação e rig do Blender',
      'Compatível com slots de armadura e sockets de acessório'
    ],
    description: 'Recriação interativa do mecanismo orbital com núcleo planetário violeta e azul, anel dourado segmentado e luas orbitais circundando o manequim de rig. Desenvolvido para props dinâmicos, cinturões astrais e sockets de personagem.',
    loreExcerpt: 'Uma miniatura do cosmos presa ao campo eletromagnético da armadura do guerreiro.',
    tags: ['Rigging & Animação', 'Shaders PBR', 'Blender', 'UE4 & UE5'],
    type3D: 'gyroscope_render',
    featured: false
  }
];

export const COMMISSION_TIERS: CommissionTier[] = [
  {
    id: 'tier-props',
    tierNumber: 'Tier I',
    title: 'Armas, Relíquias & Props Cósmicos',
    tag: 'Entrada • Rápido Deploy',
    basePrice: 380,
    priceFormatted: 'R$ 380',
    deliveryTime: '5 a 7 dias úteis',
    budgetPolycount: '15k - 40k tris',
    materialsSpec: '4K PBR / 1 UDIM',
    description: 'Espadas rúnicas, astrolábios, orbes astrais, machados bárbaros, amuletos estelares ou baús místicos prontos para uso em combate ou ambientação.',
    features: [
      'Shader com nós emissivos ajustáveis (Glow violeta/ouro/rubi)',
      'Sockets de empunhadura e ataque configurados para Conan DevKit / UE4 / UE5',
      'Ícone customizado de inventário 256x256 UI',
      'Compatível com Unreal Engine 4 e Unreal Engine 5'
    ]
  },
  {
    id: 'tier-armaduras',
    tierNumber: 'Tier II',
    title: 'Armaduras, Asas & Sets Completos',
    tag: 'Mais Solicitado • AAA Rigged',
    basePrice: 1250,
    priceFormatted: 'R$ 1.250',
    deliveryTime: '14 a 20 dias úteis',
    budgetPolycount: '60k - 95k tris',
    materialsSpec: '4K PBR UDIMs + Physics Rig',
    description: 'Conjuntos completos de vestimenta, asas demoníacas ou armaduras completas com suporte a sliders e tecidos simulados.',
    features: [
      'Totalmente rigged no esqueleto padrão Conan Exiles / UE4 / UE5',
      'Física dinâmica de tecidos e asas (Chaos Cloth & Rig)',
      'Modelos masculino e feminino com ajuste anatômico de precisão',
      'Canais de tingimento (Dye System) integrados nos materiais',
      'Garantia de zero distorção (0% skewing) no bake 4K'
    ],
    recommended: true
  },
  {
    id: 'tier-mapas',
    tierNumber: 'Tier III',
    title: 'Cidadelas, Templos & Biomas Modulares',
    tag: 'Produção Monumental',
    basePrice: 2800,
    priceFormatted: 'R$ 2.800',
    deliveryTime: '25 a 35 dias úteis',
    budgetPolycount: '800k - 2M tris',
    materialsSpec: 'Nanite Meshes + Lumen Lighting',
    description: 'Fortalezas completas, catedrais astrais nas águas e complexos monumentais como Madrovitale, modulares e prontos para spawn em servidores ou levels de Unreal Engine.',
    features: [
      'Kit modular completo de peças (paredes, torres, pórticos, vitrais e escadas)',
      'Iluminação Lumen cinematográfica e skybox cósmico exclusivo',
      'NavMesh e malhas de colisão de alta performance para UE4 e UE5',
      'Empacotamento direto em mod .pak com instruções completas de deploy',
      'Suporte técnico de 30 dias após a entrega'
    ]
  }
];

export const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Concept & Blockout Primário',
    desc: 'Alinhamento da silhueta no Blender, estudo anatômico, proporções de combate e verificação de escala métrica para Unreal Engine 4 e 5.'
  },
  {
    step: '02',
    title: 'Escultura High-Poly no ZBrush',
    desc: 'Modelagem de micro-detalhes, runas esculpidas em pedra, desgaste de aço bárbaro, nervuras de asas e ornamentos astrais em até 50M de polígonos.'
  },
  {
    step: '03',
    title: 'Retopologia Limpa & UVs UDIM',
    desc: 'Geração de malha de baixo polígono otimizada com fluxo de loops perfeito nas juntas de deformação e abertura de UVs sem sobreposição.'
  },
  {
    step: '04',
    title: 'Texturização PBR & Shaders UE4/UE5',
    desc: 'Bake com sub-milímetro de precisão no Substance 3D Painter, criação de materiais PBR 4K, dye masks e compilação para mod .pak de Conan Exiles e .uasset.'
  }
];

export const ARTIST_INFO = {
  name: 'Eclipsa',
  role: '3D Cosmic Modeler & Worldbuilder',
  subrole: 'Senior AAA Game Artist • Unreal Engine 4 & 5 Specialist',
  location: 'Brasil / Comunidade Internacional',
  bio: 'Movida por um fascínio visceral por astrofísica, geometria sagrada e arquitetura monumental, Eclipsa une o místico e o cósmico com a imponência da Era Hiboriana e universos de fantasia sombria. Seu trabalho reimagina ruínas pagãs e catedrais astrais sob céus desconhecidos, forjando armas rúnicas, armaduras e biomas que parecem arrancados do coração de supernovas.',
  bioExtended: 'Com mais de cinco anos atuando ativamente na comunidade de modding e arte 3D para jogos AAA, domina o ciclo completo de produção: desde o concept blocking e escultura em alta frequência até retopologia de precisão, texturização PBR cinematográfica e scripting para o ecossistema Unreal Engine 4, Unreal Engine 5 e Conan DevKit.',
  experienceYears: '5+ Anos',
  stats: [
    { label: 'Mods & Assets Lançados', value: '60+', accent: 'secondary' },
    { label: 'Alcance de Jogadores', value: '+1000', accent: 'primary' },
    { label: 'Aprovação Comprovada', value: '99.8%', accent: 'tertiary' },
    { label: 'Texturas PBR UDIM', value: '100% 4K', accent: 'secondary' }
  ],
  tools: [
    { name: 'Unreal Engine 5.4', skill: 'Nanite, Lumen & Shaders PBR', level: 'Especialista' },
    { name: 'Unreal Engine 4.27', skill: 'Conan DevKit, Blueprints & Shaders', level: 'Especialista' },
    { name: 'ZBrush', skill: 'Escultura Digital High-Poly', level: 'Especialista' },
    { name: 'Blender 4.2', skill: 'Modelagem, Rigging & Retopo', level: 'Avançado' },
    { name: 'Substance 3D Painter', skill: 'Texturas PBR 4K & UDIMs', level: 'Especialista' },
    { name: 'Conan Exiles DevKit', skill: 'Pipelines de Mods .pak', level: 'Mestre' },
    { name: 'Marvelous Designer', skill: 'Simulação de Tecidos & Asas', level: 'Avançado' }
  ],
  socials: {
    discord: 'https://discord.com/invite/umH3GxEDT6',
    discordServer: 'https://discord.com/invite/umH3GxEDT6',
    discordTag: 'eclipsa_3d',
    email: 'contato.eclipsa3d@gmail.com'
  }
};
