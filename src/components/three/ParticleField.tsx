import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type ParticleShapeType = 'react' | 'java' | 'code';

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

function getJavaTarget(
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  let x = 0;
  let y = 0;

  if (i < COUNT * 0.25) {
    // Corpo superior / borda
    const t = (i / (COUNT * 0.25)) * Math.PI * 2;
    x = 2.4 * Math.cos(t);
    y = 1.0 + 0.4 * Math.sin(t);
  } else if (i < COUNT * 0.4) {
    // Base da xícara
    const idx = i - COUNT * 0.25;
    const t = idx / (COUNT * 0.15);
    x = -1.6 + 3.2 * t;
    y = -2.0;
  } else if (i < COUNT * 0.55) {
    // Lateral esquerda
    const idx = i - COUNT * 0.4;
    const t = idx / (COUNT * 0.15);
    x = -2.4 + 0.8 * t;
    y = 1.0 - 3.0 * t;
  } else if (i < COUNT * 0.7) {
    // Lateral direita
    const idx = i - COUNT * 0.55;
    const t = idx / (COUNT * 0.15);
    x = 2.4 - 0.8 * t;
    y = 1.0 - 3.0 * t;
  } else if (i < COUNT * 0.82) {
    // Asa/Alça (lado direito)
    const idx = i - COUNT * 0.7;
    const t = idx / (COUNT * 0.12);
    const theta = -Math.PI / 2 + t * Math.PI;
    x = 2.2 + 1.2 * Math.cos(theta);
    y = -0.5 + 1.1 * Math.sin(theta);
    const phi = -0.25; // ângulo em radianos,
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);

    const rx = 1.2 * Math.cos(theta);
    const ry = 1.1 * Math.sin(theta);

    x = 2.02 + rx * cosPhi - ry * sinPhi;
    y = -0.5 + rx * sinPhi + ry * cosPhi;


  } else {
    // Fumaça subindo (3 ondas)
    const idx = i - COUNT * 0.82;
    const t = idx / (COUNT * 0.18);
    const path = i % 3;
    y = 1.6 + 2.5 * t;
    const wave = 0.3 * Math.sin(t * Math.PI * 4 + (path === 1 ? Math.PI : 0));
    if (path === 0) x = -1.0 + wave;
    else if (path === 1) x = 0.0 + wave;
    else x = 1.0 + wave;
  }

  return { x: ax + x, y: ay + y, z: 0 };
}

function getCodeTarget(
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  let x = 0;
  let y = 0;

  if (i < COUNT * 0.35) {
    // Tag esquerda <
    const idx = i;
    const mid = COUNT * 0.175;
    if (idx < mid) {
      const t = idx / mid;
      x = -1.2 - 1.8 * t;
      y = 1.8 - 1.8 * t;
    } else {
      const t = (idx - mid) / mid;
      x = -3.0 + 1.8 * t;
      y = -1.8 * t;
    }
  } else if (i < COUNT * 0.7) {
    // Tag direita >
    const idx = i - COUNT * 0.35;
    const mid = COUNT * 0.175;
    if (idx < mid) {
      const t = idx / mid;
      x = 1.2 + 1.8 * t;
      y = 1.8 - 1.8 * t;
    } else {
      const t = (idx - mid) / mid;
      x = 3.0 - 1.8 * t;
      y = -1.8 * t;
    }
  } else {
    // Barra inclinada /
    const idx = i - COUNT * 0.7;
    const t = idx / (COUNT * 0.3);
    x = 0.6 - 1.2 * t;
    y = 2.4 - 4.8 * t;
  }

  return { x: ax + x, y: ay + y, z: 0 };
}

function getShapeTarget(
  shape: ParticleShapeType,
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  if (shape === 'java') return getJavaTarget(i, ax, ay);
  if (shape === 'code') return getCodeTarget(i, ax, ay);
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
  const opacityRef = useRef(0);

  const { geometry, speeds, initialPositions } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const initPos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const rx = (Math.random() - 0.5) * 40;
      const ry = (Math.random() - 0.5) * 40;
      const rz = (Math.random() - 0.5) * 40;
      pos[i * 3] = rx;
      pos[i * 3 + 1] = ry;
      pos[i * 3 + 2] = rz;
      initPos[i * 3] = rx;
      initPos[i * 3 + 1] = ry;
      initPos[i * 3 + 2] = rz;
      spd[i * 3] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, speeds: spd, initialPositions: initPos };
  }, []);

  useEffect(() => setMounted(true), []);

  useFrame((state) => {
    if (!ref.current) return;

    // Rotação suave baseada na rolagem da página (paralaxe 3D)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    ref.current.rotation.y = scrollY * 0.0003;
    ref.current.rotation.x = scrollY * 0.00015;

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
        const ipx = initialPositions[i3];
        const ipy = initialPositions[i3 + 1];
        const ipz = initialPositions[i3 + 2];
        const sx = speeds[i3];
        const sy = speeds[i3 + 1];

        // Efeito de flutuação contínua e ondulada em 3D para nunca ficarem estáticas
        const floatX = Math.sin(t * 1.5 + i * 0.05) * 3.0 + sx * 100;
        const floatY = Math.cos(t * 1.2 + i * 0.05) * 3.0 + sy * 100;
        const floatZ = Math.sin(t * 0.8 + i * 0.08) * 3.0;

        // Paralaxe sutil com a posição do mouse na tela
        const parallaxX = target.current.x * 1.5;
        const parallaxY = target.current.y * 1.5;

        // Retorno suave (lerp) para a posição original combinada ao movimento contínuo
        px += (ipx + floatX + parallaxX - px) * 0.03;
        py += (ipy + floatY + parallaxY - py) * 0.03;
        pz += (ipz + floatZ - pz) * 0.03;
      }

      pos[i3] = px;
      pos[i3 + 1] = py;
      pos[i3 + 2] = pz;
    }
    if (opacityRef.current < 0.6) {
      opacityRef.current += 0.015;
    }
    if (ref.current && ref.current.material) {
      (ref.current.material as THREE.PointsMaterial).opacity = opacityRef.current;
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
        opacity={0}
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
