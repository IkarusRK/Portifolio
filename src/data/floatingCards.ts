export type ParticleShape = 'react';

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
    description: 'Clique e segure nas partículas para formarem o símbolo do React (átomo com três órbitas).',
  },
];
