import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type ParticleShapeType = 'react';

const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 2000;
const PULL_STRENGTH = 0.18;
const LERP_TO_SHAPE = 0.1;
const MOUSE_SCALE = 14;
const ELLIPSE_A = 5.5;
const ELLIPSE_B = 1.6;
const ORBIT_ANGLES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

function getReactAtomTarget(
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  const role = i % 7;
  if (role === 0) return { x: ax, y: ay, z: 0 };
  const t = (i / COUNT) * Math.PI * 2;
  if (role === 1) {
    const x = ELLIPSE_A * Math.cos(t);
    const y = ELLIPSE_B * Math.sin(t);
    const o = ORBIT_ANGLES[0];
    return {
      x: ax + x * Math.cos(o) - y * Math.sin(o),
      y: ay + x * Math.sin(o) + y * Math.cos(o),
      z: 0,
    };
  }
  if (role === 2) {
    const x = ELLIPSE_A * Math.cos(t);
    const y = ELLIPSE_B * Math.sin(t);
    const o = ORBIT_ANGLES[1];
    return {
      x: ax + x * Math.cos(o) - y * Math.sin(o),
      y: ay + x * Math.sin(o) + y * Math.cos(o),
      z: 0,
    };
  }
  if (role === 3) {
    const x = ELLIPSE_A * Math.cos(t);
    const y = ELLIPSE_B * Math.sin(t);
    const o = ORBIT_ANGLES[2];
    return {
      x: ax + x * Math.cos(o) - y * Math.sin(o),
      y: ay + x * Math.sin(o) + y * Math.cos(o),
      z: 0,
    };
  }
  const eT = 0;
  const ex = ELLIPSE_A * Math.cos(eT);
  const ey = ELLIPSE_B * Math.sin(eT);
  const o = ORBIT_ANGLES[role - 4];
  return {
    x: ax + ex * Math.cos(o) - ey * Math.sin(o),
    y: ay + ex * Math.sin(o) + ey * Math.cos(o),
    z: 0,
  };
}

function getShapeTarget(
  _shape: ParticleShapeType,
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  return getReactAtomTarget(i, ax, ay);
}

interface ParticlesProps {
  color: string;
  isAttracting: boolean;
  mouseNdc: { x: number; y: number };
  shape: ParticleShapeType;
}

const Particles = ({ color, isAttracting, mouseNdc, shape }: ParticlesProps) => {
  const ref = useRef<THREE.Points>(null);
  const [mounted, setMounted] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  const { geometry, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      spd[i * 3] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, speeds: spd };
  }, []);

  useEffect(() => setMounted(true), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.2;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;

    const ax = mouseNdc.x * MOUSE_SCALE;
    const ay = mouseNdc.y * MOUSE_SCALE;
    const az = 0;

    const pullRadius = ELLIPSE_A * 2.5;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      let px = pos[i3];
      let py = pos[i3 + 1];
      let pz = pos[i3 + 2];

      if (isAttracting) {
        const dx = ax - px;
        const dy = ay - py;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

        if (dist < pullRadius) {
          const targetPos = getShapeTarget(shape, i, ax, ay);
          px += (targetPos.x - px) * LERP_TO_SHAPE;
          py += (targetPos.y - py) * LERP_TO_SHAPE;
          pz += (targetPos.z - pz) * LERP_TO_SHAPE;
        } else {
          px += dx * PULL_STRENGTH;
          py += dy * PULL_STRENGTH;
          pz += (az - pz) * PULL_STRENGTH * 0.3;
        }
      } else {
        const sx = speeds[i3];
        const sy = speeds[i3 + 1];
        const sz = speeds[i3 + 2];
        px += Math.sin(t + i * 0.01) * 0.02 + sx + target.current.x * 0.0002;
        py += Math.cos(t * 0.7 + i * 0.01) * 0.02 + sy + target.current.y * 0.0002;
        pz += sz;
      }

      pos[i3] = px;
      pos[i3 + 1] = py;
      pos[i3 + 2] = pz;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!mounted) return null;

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        transparent
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        color={color}
        opacity={0.6}
      />
    </points>
  );
};

interface ParticleFieldProps {
  accentColor: string;
  isAttracting?: boolean;
  mouseNdc?: { x: number; y: number };
  shape?: ParticleShapeType;
}

export const ParticleField = ({
  accentColor,
  isAttracting = false,
  mouseNdc = { x: 0, y: 0 },
  shape = 'react',
}: ParticleFieldProps) => (
  <div className="absolute inset-0 w-full h-full">
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <color attach="background" args={['transparent']} />
      <Particles color={accentColor} isAttracting={isAttracting} mouseNdc={mouseNdc} shape={shape} />
    </Canvas>
  </div>
);
