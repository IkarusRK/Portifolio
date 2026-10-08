import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ParticleShape } from '../../data/floatingCards';

const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 1000 : 2000;
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

function getLuaFiveMTarget(
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  const mainR = 2.4;
  const moonAngle = Math.PI * 0.3;
  const orbitR = 3.2;

  const holeDist = mainR * 0.58;
  const holeCx = holeDist * Math.cos(moonAngle);
  const holeCy = holeDist * Math.sin(moonAngle);
  const holeR = 0.65;

  const moonCx = orbitR * Math.cos(moonAngle);
  const moonCy = orbitR * Math.sin(moonAngle);
  const moonR = 0.6;

  const nMainPerimeter = Math.floor(COUNT * 0.2);
  const nHolePerimeter = Math.floor(COUNT * 0.12);
  const nMoonPerimeter = Math.floor(COUNT * 0.12);
  const nOrbit = Math.floor(COUNT * 0.25);
  const nMainFill = COUNT - (nMainPerimeter + nHolePerimeter + nMoonPerimeter + nOrbit);

  if (i < nMainPerimeter) {
    const t = (i / nMainPerimeter) * Math.PI * 2;
    return { x: ax + mainR * Math.cos(t), y: ay + mainR * Math.sin(t), z: (Math.random() - 0.5) * 0.1 };
  }
  const cut1 = nMainPerimeter + nHolePerimeter;
  if (i < cut1) {
    const idx = i - nMainPerimeter;
    const t = (idx / nHolePerimeter) * Math.PI * 2;
    return { x: ax + holeCx + holeR * Math.cos(t), y: ay + holeCy + holeR * Math.sin(t), z: 0 };
  }
  const cut2 = cut1 + nMoonPerimeter;
  if (i < cut2) {
    const idx = i - cut1;
    const t = (idx / nMoonPerimeter) * Math.PI * 2;
    return { x: ax + moonCx + moonR * Math.cos(t), y: ay + moonCy + moonR * Math.sin(t), z: 0 };
  }
  const cut3 = cut2 + nOrbit;
  if (i < cut3) {
    const idx = i - cut2;
    const t = (idx / nOrbit) * Math.PI * 2;
    return { x: ax + orbitR * Math.cos(t), y: ay + orbitR * Math.sin(t), z: 0 };
  }
  const idx = i - cut3;
  const phi = 1.61803398875;
  const r = Math.sqrt((idx + 0.5) / nMainFill) * (mainR * 0.95);
  const theta = 2 * Math.PI * idx * phi;
  let x = r * Math.cos(theta);
  let y = r * Math.sin(theta);
  return { x: ax + x, y: ay + y, z: (Math.random() - 0.5) * 0.15 };
}

function getCube3DTarget(
  i: number,
  ax: number,
  ay: number,
  time: number
): { x: number; y: number; z: number } {
  const k = i % 27;
  const gx = (k % 3) - 1;
  const gy = Math.floor(k / 3) % 3 - 1;
  const gz = Math.floor(k / 9) - 1;
  const spacing = 1.1;

  let x = gx * spacing;
  let y = gy * spacing;
  let z = gz * spacing;

  // Slow rotation
  const rx = time * 0.4;
  const ry = time * 0.5;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cy = Math.cos(ry), sy = Math.sin(ry);

  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  const x2 = x * cy + z1 * sy;
  const z2 = -x * sy + z1 * cy;

  return { x: ax + x2, y: ay + y1, z: z2 };
}

function getCodeTarget(
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  let x = 0;
  let y = 0;

  if (i < COUNT * 0.35) {
    const idx = i;
    const mid = COUNT * 0.175;
    if (idx < mid) {
      const t = idx / mid;
      x = -1.2 - 2.2 * t;
      y = 2.2 - 2.2 * t;
    } else {
      const t = (idx - mid) / mid;
      x = -3.4 + 2.2 * t;
      y = -2.2 * t;
    }
  } else if (i < COUNT * 0.7) {
    const idx = i - COUNT * 0.35;
    const mid = COUNT * 0.175;
    if (idx < mid) {
      const t = idx / mid;
      x = 1.2 + 2.2 * t;
      y = 2.2 - 2.2 * t;
    } else {
      const t = (idx - mid) / mid;
      x = 3.4 - 2.2 * t;
      y = -2.2 * t;
    }
  } else {
    const idx = i - COUNT * 0.7;
    const t = idx / (COUNT * 0.3);
    x = 0.8 - 1.6 * t;
    y = 2.8 - 5.6 * t;
  }

  return { x: ax + x, y: ay + y, z: 0 };
}

function getJavaTarget(
  i: number,
  ax: number,
  ay: number
): { x: number; y: number; z: number } {
  let x = 0;
  let y = 0;

  if (i < COUNT * 0.25) {
    const t = (i / (COUNT * 0.25)) * Math.PI * 2;
    x = 2.4 * Math.cos(t);
    y = 1.0 + 0.4 * Math.sin(t);
  } else if (i < COUNT * 0.4) {
    const idx = i - COUNT * 0.25;
    const t = idx / (COUNT * 0.15);
    x = 2.4 - 0.6 * t;
    y = 1.0 - 2.4 * t;
  } else if (i < COUNT * 0.55) {
    const idx = i - COUNT * 0.4;
    const t = idx / (COUNT * 0.15);
    x = -2.4 + 0.6 * t;
    y = 1.0 - 2.4 * t;
  } else if (i < COUNT * 0.7) {
    const idx = i - COUNT * 0.55;
    const t = (idx / (COUNT * 0.15)) * Math.PI * 2;
    x = 1.8 * Math.cos(t);
    y = -1.4 + 0.3 * Math.sin(t);
  } else {
    const idx = i - COUNT * 0.7;
    const col = idx % 3;
    const t = Math.floor(idx / 3) / ((COUNT * 0.3) / 3);
    const baseX = (col - 1) * 1.0;
    x = baseX + 0.35 * Math.sin(t * Math.PI * 3);
    y = 1.4 + 2.2 * t;
  }

  return { x: ax + x, y: ay + y, z: 0 };
}

interface ParticleSceneProps {
  accentColor: string;
  isAttracting: boolean;
  mouseNdc: { x: number; y: number };
  shape: ParticleShape;
  mode?: 'dark' | 'light';
}

const ParticleScene = ({
  accentColor,
  isAttracting,
  mouseNdc,
  shape,
  mode = 'dark',
}: ParticleSceneProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const glowPointsRef = useRef<THREE.Points>(null);
  const colorRef = useRef(new THREE.Color(accentColor));
  const glowColorRef = useRef(new THREE.Color(accentColor));

  const [positions, homePositions, opacities] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const home = new Float32Array(COUNT * 3);
    const op = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 4;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      home[i3] = x;
      home[i3 + 1] = y;
      home[i3 + 2] = z;

      op[i] = Math.random() * 0.7 + 0.3;
    }
    return [pos, home, op];
  }, []);

  const attractor = useMemo(() => {
    return {
      x: mouseNdc.x * MOUSE_SCALE,
      y: mouseNdc.y * (MOUSE_SCALE * 0.65),
      z: 0,
    };
  }, [mouseNdc.x, mouseNdc.y]);

  useEffect(() => {
    colorRef.current.set(accentColor);
    glowColorRef.current.set(accentColor);
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      if (mat) {
        mat.color.set(accentColor);
        mat.needsUpdate = true;
      }
    }
    if (glowPointsRef.current) {
      const mat = glowPointsRef.current.material as THREE.PointsMaterial;
      if (mat) {
        mat.color.set(accentColor);
        mat.needsUpdate = true;
      }
    }
  }, [accentColor]);

  useFrame((state) => {
    const geom = pointsRef.current?.geometry;
    const glowGeom = glowPointsRef.current?.geometry;
    if (!geom || !geom.attributes.position) return;

    const posAttr = geom.attributes.position;
    const pos = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    const ax = attractor.x;
    const ay = attractor.y;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      let target: { x: number; y: number; z: number };

      if (shape === 'react') {
        target = getReactAtomTarget(i, ax, ay);
      } else if (shape === 'lua') {
        target = getLuaFiveMTarget(i, ax, ay);
      } else if (shape === 'cube') {
        target = getCube3DTarget(i, ax, ay, time);
      } else if (shape === 'code') {
        target = getCodeTarget(i, ax, ay);
      } else {
        target = getJavaTarget(i, ax, ay);
      }

      if (isAttracting) {
        pos[i3] += (target.x - pos[i3]) * LERP_TO_SHAPE;
        pos[i3 + 1] += (target.y - pos[i3 + 1]) * LERP_TO_SHAPE;
        pos[i3 + 2] += (target.z - pos[i3 + 2]) * LERP_TO_SHAPE;
      } else {
        const dx = ax - pos[i3];
        const dy = ay - pos[i3 + 1];
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < 4.0) {
          const force = ((4.0 - dist) / 4.0) * PULL_STRENGTH * 0.3;
          pos[i3] += (dx / dist) * force;
          pos[i3 + 1] += (dy / dist) * force;
        }

        // Return to home drift
        pos[i3] += (homePositions[i3] - pos[i3]) * 0.02 + Math.sin(time + i) * 0.003;
        pos[i3 + 1] += (homePositions[i3 + 1] - pos[i3 + 1]) * 0.02 + Math.cos(time + i) * 0.003;
        pos[i3 + 2] += (homePositions[i3 + 2] - pos[i3 + 2]) * 0.02;
      }
    }

    posAttr.needsUpdate = true;
    if (glowGeom && glowGeom.attributes.position) {
      const glowPosAttr = glowGeom.attributes.position;
      (glowPosAttr.array as Float32Array).set(pos);
      glowPosAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-opacity"
            args={[opacities, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={mode === 'light' ? 0.045 : 0.06}
          color={accentColor}
          transparent
          opacity={mode === 'light' ? 0.35 : 0.8}
          blending={mode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={glowPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(positions), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={mode === 'light' ? 0.09 : 0.16}
          color={accentColor}
          transparent
          opacity={mode === 'light' ? 0.1 : 0.25}
          blending={mode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

export const ParticleField = ({
  accentColor,
  isAttracting,
  mouseNdc,
  shape,
  mode = 'dark',
}: ParticleSceneProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleScene
          accentColor={accentColor}
          isAttracting={isAttracting}
          mouseNdc={mouseNdc}
          shape={shape}
          mode={mode}
        />
      </Canvas>
    </div>
  );
};

export default ParticleField;
