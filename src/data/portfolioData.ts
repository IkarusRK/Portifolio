export interface Project {
  id: string;
  title: string;
  category: 'Ambientes & Cidadelas' | 'Guerreiros & Criaturas' | 'Armas & Relíquias' | 'Props & DevKit';
  shortDesc: string;
  fullDesc: string;
  image: string;
  polycount: string;
  textures: string;
  engine: string;
  software: string[];
  features: string[];
  type3D: 'character' | 'temple' | 'astrolabe' | 'crystal';
  featured?: boolean;
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
    id: 'rainha-barbara-estrelas',
    title: 'Rainha Bárbara Forjada em Estrelas',
    category: 'Guerreiros & Criaturas',
    shortDesc: 'Conjunto de armadura completa rigged para Conan Exiles e UE5 com simulação física Chaos Cloth.',
    fullDesc: 'Armadura cerimonial forjada em ferro estelar e basalto polido com runas celestes escavadas à mão no ZBrush. Projetada especificamente para suportar os sliders corporais do Conan Exiles, dinâmica de capa de pele e dye system de 5 canais. Topologia 100% quads nas articulações.',
    image: '/assets/personagens-armaduras.png',
    polycount: '68.400 Tris (LOD0)',
    textures: '4K PBR UDIMs (Albedo, Normal, Roughness, Metalness, Emissive)',
    engine: 'Conan Exiles DevKit / UE 5.4',
    software: ['ZBrush', 'Blender 4.2', 'Substance 3D Painter', 'Marvelous Designer'],
    features: [
      'Rigging avançado compatível com esqueleto humano Conan/UE5',
      'Simulação de capa dinâmica com Chaos Cloth Solver',
      'Mapas de normais bakeados a partir de escultura de 45 milhões de polígonos',
      'Shader com nós emissivos violeta e dourado ajustáveis'
    ],
    type3D: 'character',
    featured: true
  },
  {
    id: 'templo-lua-gemea',
    title: 'Templo da Lua Gêmea & Cidadela Astral',
    category: 'Ambientes & Cidadelas',
    shortDesc: 'Ambiente monumental megalítico com iluminação de nébula em tempo real e malhas Nanite.',
    fullDesc: 'Complexo de fortaleza ancestral erguido à beira de abismos cósmicos, alinhado à conjunção astronômica das luas gêmeas de Hyboria. Desenvolvido com kit modular de 48 peças de pedra esculpida, portas rúnicas cinemáticas, altare de conjuração estelar e volumetria Lumen.',
    image: '/assets/mapas-cenarios.png',
    polycount: '1.25M Tris (Kit Completo)',
    textures: '4K Tileable & Decals UDIM',
    engine: 'Unreal Engine 5.4 (Nanite & Lumen)',
    software: ['Unreal Engine 5', 'Blender 4.2', 'ZBrush', 'Substance 3D Designer', 'Houdini'],
    features: [
      'Otimização avançada com Nanite Geometry sem perda de silhueta',
      'Iluminação global em tempo real com Lumen e suporte a noite estelar',
      'NavMesh perfeitamente calibrado para IA e bosses do Conan Exiles',
      'Pack modular com encaixes de 512cm grid-snap testados'
    ],
    type3D: 'temple',
    featured: true
  },
  {
    id: 'machado-crepusculo-celestial',
    title: 'Machado do Crepúsculo Celestial',
    category: 'Armas & Relíquias',
    shortDesc: 'Arma pesada forjada de meteorito com gravação rúnica emissiva e sockets de combate.',
    fullDesc: 'Machado de batalha de duas mãos esculpido a partir de fragmentos de bólido estelar. A lâmina possui entalhes de runas ancestrais que irradiam luz cósmica pulsante ao golpear. Sockets de empunhadura e efeitos de rastro (weapon trail) prontos para gameplay dinâmico.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDup-MBAfzeP7drhfORIJ9Q4Yt5N8oQpPfOJA6gu50VW6yQD5hbgTVxZtEHflSKItI6nT2EeC8TjNNVc8E02Txh5jFgCYsF2P3Hy0oUuQaRJkzagCxwSeToKRZN3Zx3CJIOhjPFdcYW8H8eED98RkcygCnJZafCGc4-K5cGbu0LDkP3j_ikjZQxwKEjvh7OQhlkQlBCYcBA9Hyd5NraPL52SKTZEacm8Zl5Sm6hnJjB-m6wo3N_poj8',
    polycount: '24.200 Tris',
    textures: '4K PBR (1 UDIM)',
    engine: 'Conan DevKit / UE5',
    software: ['ZBrush', 'Substance 3D Painter', 'Blender'],
    features: [
      'Glow emissivo personalizável no Unreal Engine Material Editor',
      'Física de cabo com tiras de couro e amuletos móveis',
      'Ícone 256x256 UI desenhado sob medida para inventário',
      'Bake de curvatura e ambient occlusion de alta resolução'
    ],
    type3D: 'crystal',
    featured: true
  },
  {
    id: 'astrolabio-do-vazio',
    title: 'Astrolábio do Vazio Cósmico',
    category: 'Props & DevKit',
    shortDesc: 'Prop cinemático interativo com 3 anéis astronômicos concêntricos animados.',
    fullDesc: 'Aparelho astrológico milenar usado pelas bruxas do vácuo para canalizar o poder das supernovas. Inclui animações contínuas de rotação em eixos múltiplos com hierarquia de ossos limpa e emissão de poeira cósmica via Niagara Particle System.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtD-h971B8DBnHNRQMccb4pE5HFknjxWxcywK0pgH7_x9V1oq25nG_-YxM7Cjg8WjAC93GD6rFco-PhtXAiEpt7xJ9gvuP0nk-ePDahVbbkBSU2t4g_tPOHxNORZdUeEKpoPVxXPxM61ZAsxr-1DqyC0XXszvD_p7ggEEdVtRzVZXLpjtqGRZgE54kwlMETEY-Pd83nbPyl6KD6cx55N5f_g9mCQjt5zjJa0vEJOdwTtI-M7z4Xov5',
    polycount: '38.600 Tris',
    textures: '4K PBR Metal/Roughness',
    engine: 'Unreal Engine 5.4',
    software: ['Blender 4.2', 'Substance 3D Painter', 'Niagara VFX'],
    features: [
      'Anéis astronômicos interativos com blueprint de rotação suave',
      'Partículas estelares integradas no centro do giroscópio',
      'Colisão física personalizada de baixa latência',
      'Materiais com reflexão de ouro envelhecido e bronze lunar'
    ],
    type3D: 'astrolabe',
    featured: false
  },
  {
    id: 'elmo-chifres-astrais',
    title: 'Elmo de Batalha com Chifres Astrais',
    category: 'Armas & Relíquias',
    shortDesc: 'Elmo bárbaro com chifres cósmicos lapidados em cristal do éter e visor rúnico.',
    fullDesc: 'Item de vestimenta lendária inspirado no mito de Ymir e dos deuses das estrelas. A armação em ferro bruto sustenta dois chifres curvados translúcidos com refração de luz estelar e interior incandescente.',
    image: '/assets/obras-modelos.png',
    polycount: '18.900 Tris',
    textures: '4K PBR + Refraction Map',
    engine: 'Conan Exiles ModKit',
    software: ['ZBrush', 'Blender', 'Substance 3D Painter'],
    features: [
      'Material de refração de cristal com dispersão cromática sutil',
      'Suporte a personalização de cores de olhos e runas',
      'Peso de vértices (skinning) ajustado à cabeça e pescoço',
      '0% de interferência com cortes de cabelo do jogo'
    ],
    type3D: 'character',
    featured: false
  },
  {
    id: 'masmorra-cripta-nebular',
    title: 'Masmorra da Cripta Nebular',
    category: 'Ambientes & Cidadelas',
    shortDesc: 'Dungeon subterrânea modular com sarcófagos astrais e quebra-cabeças rúnicos.',
    fullDesc: 'Nível jogável completo ambientado nas catacumbas secretas de uma ordem extinta de astrônomos bárbaros. Inclui corredores de pedra esculpida, armadilhas de estacas de luz cósmica e uma câmara de boss com teto vazado para uma galáxia espiral.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-RsVPmoemSf7QNLHq3TeLEQJQienuQHjkgNJ4X_yW9qzx3akGye9Dt273fAx2MUKWXy-Lh_ZFrZr-j3Y2CJrrj_IMl0I-WcLPmlZBHnN5lBzk8z3LKD2BkFXzE3pKzIxqdLCXiPIddZ6TWDzduG3zLmm32l1zjdmgCWIeZde75wm5VIJdXV_Et1WyxXbzRv4M8XfnVbLuolrk3jReZncH4Q0W_GDsScbE-HyNaUY9tVrSfGzr6KR9',
    polycount: '820.000 Tris',
    textures: '4K PBR Modular Trim Sheets',
    engine: 'Conan Exiles / UE 5.4',
    software: ['Unreal Engine 5', 'Blender', 'Substance 3D Designer'],
    features: [
      'Trim sheets eficientes economizando memória de vídeo em servidores',
      'Gatilhos de spawn e zonas de colisão para bosses customizados',
      'Áudio ambiente posicional e iluminação dinâmica de tochas',
      'Design testado em servidores multiplayer com 50+ jogadores'
    ],
    type3D: 'temple',
    featured: false
  }
];

export const COMMISSION_TIERS: CommissionTier[] = [
  {
    id: 'tier-props',
    tierNumber: 'Tier I',
    title: 'Armas & Props Cósmicos',
    tag: 'Entrada • Rápido Deploy',
    basePrice: 380,
    priceFormatted: 'R$ 380',
    deliveryTime: '5 a 7 dias úteis',
    budgetPolycount: '15k - 40k tris',
    materialsSpec: '4K PBR / 1 UDIM',
    description: 'Espadas rúnicas, machados bárbaros, amuletos estelares, tochas ou baús místicos prontos para uso em combate ou ambientação.',
    features: [
      'Shader com nós emissivos ajustáveis (Glow violeta/ouro)',
      'Sockets de empunhadura e ataque configurados para Conan/UE5',
      'Ícone customizado de inventário 256x256 UI',
      'Compatível com sistemas de combate customizados'
    ]
  },
  {
    id: 'tier-armaduras',
    tierNumber: 'Tier II',
    title: 'Armaduras & Sets Completos',
    tag: 'Mais Solicitado • AAA Rigged',
    basePrice: 1250,
    priceFormatted: 'R$ 1.250',
    deliveryTime: '14 a 20 dias úteis',
    budgetPolycount: '60k - 95k tris',
    materialsSpec: '4K PBR UDIMs + Physics Rig',
    description: 'Conjuntos de vestimenta completos (5 peças: elmo, peitoral, luvas, calças, botas) com suporte a sliders e tecidos simulados.',
    features: [
      'Totalmente rigged no esqueleto padrão Conan Exiles / UE5',
      'Física dinâmica de tecidos (Chaos Cloth) em capas e faixas',
      'Modelos masculino e feminino com ajuste anatômico',
      'Canais de tingimento (Dye System) integrados nos materiais',
      'Garantia de zero distorção (0% skewing) no bake'
    ],
    recommended: true
  },
  {
    id: 'tier-mapas',
    tierNumber: 'Tier III',
    title: 'Mapas & Cidadelas Modulares',
    tag: 'Produção Monumental',
    basePrice: 2800,
    priceFormatted: 'R$ 2.800',
    deliveryTime: '25 a 35 dias úteis',
    budgetPolycount: '800k - 2M tris',
    materialsSpec: 'Nanite Meshes + Lumen Lighting',
    description: 'Fortalezas completas, templos astrais e biomas cósmicos modulares prontos para spawn em servidores ou levels de Unreal Engine 5.',
    features: [
      'Kit modular completo de peças (paredes, torres, portões)',
      'Iluminação Lumen cinematográfica e skybox cósmico exclusivo',
      'NavMesh e malhas de colisão de alta performance',
      'Empacotamento direto em mod .pak com instruções de deploy',
      'Suporte técnico de 30 dias após a entrega'
    ]
  }
];

export const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Concept & Blockout Primário',
    desc: 'Alinhamento da silhueta no Blender, estudo anatômico, proporções de combate e verificação de escala métrica para a engine.'
  },
  {
    step: '02',
    title: 'Escultura High-Poly no ZBrush',
    desc: 'Modelagem de micro-detalhes, runas esculpidas em pedra, desgaste de aço bárbaro, costuras de tecido e ornamentos astrais em até 50M de polígonos.'
  },
  {
    step: '03',
    title: 'Retopologia Limpa & UVs UDIM',
    desc: 'Geração de malha de baixo polígono otimizada com fluxo de loops perfeito nas juntas de deformação e abertura de UVs sem sobreposição.'
  },
  {
    step: '04',
    title: 'Texturização PBR & Shaders UE5',
    desc: 'Bake com sub-milímetro de precisão no Substance 3D Painter, criação de materiais PBR 4K, dye masks e compilação para mod .pak de Conan Exiles.'
  }
];

export const ARTIST_INFO = {
  name: 'Eclipsa',
  role: '3D Cosmic Modeler & Worldbuilder',
  subrole: 'Senior AAA Game Artist • Conan Exiles Modder',
  location: 'Brasil / Comunidade Internacional',
  bio: 'Movida por um fascínio visceral por astrofísica, buracos negros e nebulosas estelares, Eclipsa une o místico e o cósmico com a crueza impiedosa da Era Hiboriana de Robert E. Howard e Conan Exiles. Seu trabalho reimagina ruínas pagãs sob constelações desconhecidas e forja armaduras rúnicas que parecem arrancadas do coração de supernovas.',
  bioExtended: 'Com mais de cinco anos atuando ativamente na comunidade de modding e arte 3D para jogos AAA, domina o ciclo completo de produção: desde o concept blocking e escultura em alta frequência até retopologia de precisão, texturização PBR cinematográfica e scripting para o ecossistema Unreal Engine e Conan DevKit.',
  experienceYears: '5+ Anos',
  stats: [
    { label: 'Mods & Assets Lançados', value: '60+', accent: 'secondary' },
    { label: 'Alcance de Jogadores', value: '+250k', accent: 'primary' },
    { label: 'Aprovação Comprovada', value: '99.8%', accent: 'tertiary' },
    { label: 'Texturas PBR UDIM', value: '100% 4K', accent: 'secondary' }
  ],
  tools: [
    { name: 'ZBrush', skill: 'Escultura Digital High-Poly', level: 'Especialista' },
    { name: 'Blender 4.2', skill: 'Modelagem, Rigging & Retopo', level: 'Avançado' },
    { name: 'Substance 3D Painter', skill: 'Texturas PBR 4K & UDIMs', level: 'Especialista' },
    { name: 'Unreal Engine 5.4', skill: 'Nanite, Lumen & Niagara', level: 'Avançado' },
    { name: 'Conan Exiles DevKit', skill: 'Pipelines de Mods .pak', level: 'Mestre' },
    { name: 'Marvelous Designer', skill: 'Simulação de Tecidos & Capas', level: 'Avançado' }
  ],
  socials: {
    discord: 'eclipsa_3d',
    artstation: 'https://artstation.com',
    steam: 'https://steamcommunity.com',
    sketchfab: 'https://sketchfab.com',
    email: 'contato.eclipsa3d@gmail.com'
  }
};
