export type ParticleShape = 'react' | 'lua' | 'cube' | 'code' | 'java';

export interface FloatingCardInfo {
  id: number;
  shape: ParticleShape;
  title: string;
  description: string;
  clientTitle?: string;
  clientDescription?: string;
}

export const FLOATING_CARDS: FloatingCardInfo[] = [
  {
    id: 1,
    shape: 'react',
    title: 'React / Web & NUI',
    description: 'Interfaces interativas e reativas construídas com React, TypeScript e Vite.',
    clientTitle: 'Telas & Menus Modernos',
    clientDescription: 'Interfaces fluidas, intuitivas e com visual profissional para seus usuários.',
  },
  {
    id: 2,
    shape: 'lua',
    title: 'FiveM / Lua Engine',
    description: 'Sistemas complexos com resmon 0.01ms, sincronização de rede e segurança.',
    clientTitle: 'Zero Queda de FPS',
    clientDescription: 'Sistemas leves e sem travamentos que rodam com alta estabilidade.',
  },
  {
    id: 3,
    shape: 'cube',
    title: '3D Art & Unreal Engine',
    description: 'Modelagem 3D, MLOs, worldbuilding cósmico (Eclipsário) e shaders WebGL.',
    clientTitle: 'Mundo & Modelos 3D',
    clientDescription: 'Cenários imersivos, armas, vestimentas e ambientações 3D cinematográficas.',
  },
];
