import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';
import { THEME_PALETTES } from '../../data/themes';
import { useLanguage } from '../../contexts/LanguageContext';

interface SceneProps {
  color: string;
  secondaryColor: string;
  wireframe: boolean;
  modelType: 'core' | 'torus' | 'gem' | 'cube';
}

const RubiksCube3D = ({
  color,
  secondaryColor,
  wireframe,
}: {
  color: string;
  secondaryColor: string;
  wireframe: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const subCubeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // 27 sub-cubes: positions gx, gy, gz in {-1, 0, 1}
  const subCubes = useMemo(() => {
    const list: { id: number; gx: number; gy: number; gz: number }[] = [];
    let id = 0;
    for (let gz = -1; gz <= 1; gz++) {
      for (let gy = -1; gy <= 1; gy++) {
        for (let gx = -1; gx <= 1; gx++) {
          list.push({ id: id++, gx, gy, gz });
        }
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycle = (time * 0.95) % 12;
    const stage = Math.floor(cycle / 3);
    const stageProgress = (cycle % 3) / 3;
    const easeTurn =
      stageProgress < 0.7
        ? 0.5 - 0.5 * Math.cos((stageProgress / 0.7) * Math.PI)
        : 1.0;
    const turnAngle = easeTurn * (Math.PI / 2);
    const spacing = 0.76;

    subCubes.forEach((cube) => {
      const mesh = subCubeRefs.current[cube.id];
      if (!mesh) return;

      let px = cube.gx * spacing;
      let py = cube.gy * spacing;
      let pz = cube.gz * spacing;
      let rx = 0;
      let ry = 0;
      let rz = 0;

      if (stage === 0 && cube.gy === 1) {
        // Top layer rotation around Y
        const ca = Math.cos(turnAngle);
        const sa = Math.sin(turnAngle);
        const nx = px * ca + pz * sa;
        const nz = -px * sa + pz * ca;
        px = nx;
        pz = nz;
        ry = turnAngle;
      } else if (stage === 1 && cube.gx === 1) {
        // Right layer rotation around X
        const ca = Math.cos(turnAngle);
        const sa = Math.sin(turnAngle);
        const ny = py * ca - pz * sa;
        const nz = py * sa + pz * ca;
        py = ny;
        pz = nz;
        rx = turnAngle;
      } else if (stage === 2 && cube.gz === 1) {
        // Front layer rotation around Z
        const ca = Math.cos(turnAngle);
        const sa = Math.sin(turnAngle);
        const nx = px * ca - py * sa;
        const ny = px * sa + py * ca;
        px = nx;
        py = ny;
        rz = turnAngle;
      } else if (stage === 3) {
        // Assembly & explosion pulse
        const assembleWave = Math.sin(stageProgress * Math.PI);
        const explode = 1.0 + assembleWave * 0.38;
        px *= explode;
        py *= explode;
        pz *= explode;

        if (cube.gy === -1) {
          const revAngle = (1.0 - easeTurn) * (Math.PI / 2);
          const ca = Math.cos(revAngle);
          const sa = Math.sin(revAngle);
          const nx = px * ca + pz * sa;
          const nz = -px * sa + pz * ca;
          px = nx;
          pz = nz;
          ry = -revAngle;
        }
      }

      mesh.position.set(px, py, pz);
      mesh.rotation.set(rx, ry, rz);
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.35;
      groupRef.current.rotation.x = 0.3 + Math.sin(time * 0.25) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {subCubes.map((cube) => (
        <Box
          key={cube.id}
          ref={(el) => {
            subCubeRefs.current[cube.id] = el;
          }}
          args={[0.56, 0.56, 0.56]}
        >
          <meshStandardMaterial
            color={(cube.gx + cube.gy + cube.gz) % 2 === 0 ? color : secondaryColor}
            emissive={color}
            emissiveIntensity={wireframe ? 0.2 : 0.45}
            wireframe={wireframe}
            metalness={0.85}
            roughness={0.15}
          />
        </Box>
      ))}
    </group>
  );
};

const HologramModel = ({ color, secondaryColor, wireframe, modelType }: SceneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.6;
      ringRef.current.rotation.x = t * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.8;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <group>
        {/* Main Central Model */}
        {modelType === 'core' && (
          <Sphere ref={meshRef} args={[1.5, 64, 64]}>
            <MeshDistortMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
              wireframe={wireframe}
              distort={0.45}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        )}

        {modelType === 'torus' && (
          <Torus ref={meshRef} args={[1.6, 0.45, 32, 100]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              wireframe={wireframe}
              metalness={0.9}
              roughness={0.1}
            />
          </Torus>
        )}

        {modelType === 'gem' && (
          <Octahedron ref={meshRef} args={[1.8, 0]}>
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={wireframe ? 0.2 : 1.2}
              wireframe={wireframe}
              metalness={0.0}
              roughness={0.0}
              transmission={wireframe ? 0 : 0.85}
              thickness={1.5}
              ior={2.4}
              reflectivity={1}
              iridescence={1}
              iridescenceIOR={1.6}
              clearcoat={1}
              clearcoatRoughness={0}
            />
          </Octahedron>
        )}

        {modelType === 'cube' && (
          <RubiksCube3D
            color={color}
            secondaryColor={secondaryColor}
            wireframe={wireframe}
          />
        )}

        {/* Orbiting Tech Rings */}
        <group ref={ringRef}>
          <Torus args={[2.5, 0.03, 16, 100]}>
            <meshBasicMaterial color={color} transparent opacity={0.6} wireframe />
          </Torus>
          <Torus args={[2.9, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
            <meshBasicMaterial color={secondaryColor} transparent opacity={0.4} />
          </Torus>
        </group>

        {/* Inner Glowing Core */}
        <Sphere ref={coreRef} args={[0.5, 16, 16]}>
          <meshBasicMaterial color="#ffffff" wireframe={wireframe} />
        </Sphere>
      </group>
    </Float>
  );
};

export const Interactive3DShowcase = () => {
  const [modelType, setModelType] = useState<'core' | 'gem' | 'torus' | 'cube'>('cube');
  const [wireframe, setWireframe] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  const palette = THEME_PALETTES[theme] ?? THEME_PALETTES.purple;
  const accentColor = palette.from;
  const secondaryColor = palette.to;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-2xl flex flex-col">
      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={2} color={accentColor} />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color={secondaryColor} />
          <pointLight position={[0, 5, 5]} intensity={1.5} color="#ffffff" />
          <HologramModel
            color={accentColor}
            secondaryColor={secondaryColor}
            wireframe={wireframe}
            modelType={modelType}
          />
        </Canvas>

        {/* Hologram Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

        {/* HUD Top Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--glass-border)] bg-black/60 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-white tracking-wider uppercase">
            3D WebGL Hologram Engine
          </span>
        </div>
      </div>

      {/* Control Panel at Bottom */}
      <div className="p-3 sm:p-4 border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)] mr-1 hidden sm:inline">
            {t.showcase3d.modelSelector}
          </span>
          {(['cube', 'gem', 'torus', 'core'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setModelType(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
                modelType === type
                  ? 'bg-[var(--accent-from)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 border border-[var(--glass-border)]'
              }`}
            >
              {t.showcase3d.models[type]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setWireframe((w) => !w)}
          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer select-none flex items-center gap-1.5 ${
            wireframe
              ? 'border-[var(--accent-from)] text-[var(--accent-from)] bg-[var(--glow)] shadow-sm'
              : 'border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
          }`}
        >
          <span>{t.showcase3d.wireframe}</span>
          <span className={`w-2 h-2 rounded-full ${wireframe ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
        </button>
      </div>
    </div>
  );
};

export default Interactive3DShowcase;
