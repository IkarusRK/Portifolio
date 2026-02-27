export type ParticleShape = 'react' | 'python' | 'senai';

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
  {
    id: 2,
    shape: 'python',
    title: 'Python',
    description: 'Clique e segure nas partículas para formarem o símbolo do Python (duas serpentes entrelaçadas).',
  },
  {
    id: 3,
    shape: 'senai',
    title: 'SENAI',
    description: 'Clique e segure nas partículas para formarem a escrita SENAI.',
  },
];
