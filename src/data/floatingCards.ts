export type ParticleShape = 'react' | 'java' | 'code';

export interface FloatingCardInfo {
  id: number;
  shape: ParticleShape;
  title: string;
  description: string;
}

export const FLOATING_CARDS: FloatingCardInfo[] = [
  {
    id: 1,
    shape: 'react',
    title: 'React',
    description: 'Clique e segure nas partículas para formar o átomo do React.',
  },
  {
    id: 2,
    shape: 'java',
    title: 'Java',
    description: 'Clique e segure para formar a xícara de café do Java.',
  },
  {
    id: 3,
    shape: 'code',
    title: 'Código',
    description: 'Clique e segure para desenhar o símbolo de tags </> interativas.',
  },
];
