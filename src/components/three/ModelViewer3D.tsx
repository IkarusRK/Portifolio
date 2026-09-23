import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cosmicAudio } from '../../utils/audioSynth';
import { Layers, RotateCcw, Play, Pause, Shield, Castle, Compass, Gem } from 'lucide-react';

export type ShaderMode = 'pbr' | 'wireframe' | 'clay' | 'emissive';
export type ModelType = 'character' | 'temple' | 'astrolabe' | 'crystal';

interface ModelViewer3DProps {
  initialModel?: ModelType;
  onModelSelect?: (model: ModelType) => void;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  initialModel = 'character',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shaderMode, setShaderMode] = useState<ShaderMode>('pbr');
  const [activeModel, setActiveModel] = useState<ModelType>(initialModel);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [polyStats, setPolyStats] = useState({ tris: '68.4K', verts: '34.8K', drawCalls: 1 });

  // Internal Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update stats based on model
  useEffect(() => {
    switch (activeModel) {
      case 'character':
        setPolyStats({ tris: '68.4K', verts: '34.8K', drawCalls: 1 });
        break;
      case 'temple':
        setPolyStats({ tris: '124.8K', verts: '62.4K', drawCalls: 2 });
        break;
      case 'astrolabe':
        setPolyStats({ tris: '38.6K', verts: '19.4K', drawCalls: 1 });
        break;
      case 'crystal':
        setPolyStats({ tris: '24.2K', verts: '12.1K', drawCalls: 1 });
        break;
    }
  }, [activeModel]);

  // Build Procedural 3D Models in Three.js
  const createProceduralModel = (type: ModelType, mode: ShaderMode): THREE.Group => {
    const group = new THREE.Group();

    // Helper to get material according to shaderMode
    const getMaterial = (baseColor: number, emissiveColor: number = 0x000000, roughness: number = 0.35, metalness: number = 0.85) => {
      if (mode === 'wireframe') {
        return new THREE.MeshBasicMaterial({
          color: 0x7bd0ff,
          wireframe: true,
        });
      }
      if (mode === 'clay') {
        return new THREE.MeshStandardMaterial({
          color: 0x8e879b,
          roughness: 0.85,
          metalness: 0.05,
          flatShading: true,
        });
      }
      if (mode === 'emissive') {
        return new THREE.MeshStandardMaterial({
          color: 0x110822,
          emissive: emissiveColor !== 0x000000 ? emissiveColor : 0x7c3aed,
          emissiveIntensity: 1.2,
          roughness: 0.9,
          metalness: 0.1,
        });
      }
      // PBR
      return new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: roughness,
        metalness: metalness,
        emissive: emissiveColor,
        emissiveIntensity: emissiveColor !== 0x000000 ? 0.8 : 0,
      });
    };

    if (type === 'character') {
      // Stylized Barbarian Armored Cuirass & Horned Helmet
      const armorMat = getMaterial(0x28203d, 0x000000, 0.3, 0.9);
      const goldMat = getMaterial(0xffc640, 0x402d00, 0.25, 0.95);
      const runeMat = getMaterial(0x1a0f30, 0xb76dff, 0.4, 0.5);
      const hornMat = getMaterial(0x130b20, 0x7bd0ff, 0.2, 0.4);

      // Torso / Cuirass
      const torsoGeo = new THREE.CylinderGeometry(0.7, 0.5, 1.4, 8);
      const torso = new THREE.Mesh(torsoGeo, armorMat);
      torso.position.y = 0;
      group.add(torso);

      // Gold Relic Chest Crest
      const crestGeo = new THREE.OctahedronGeometry(0.32, 1);
      const crest = new THREE.Mesh(crestGeo, goldMat);
      crest.position.set(0, 0.2, 0.6);
      crest.scale.set(1, 1.4, 0.4);
      group.add(crest);

      // Glowing Runic Core
      const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const core = new THREE.Mesh(coreGeo, runeMat);
      core.position.set(0, 0.2, 0.7);
      group.add(core);

      // Pauldrons (Shoulders)
      const shoulderGeo = new THREE.ConeGeometry(0.5, 0.8, 6);
      const leftShoulder = new THREE.Mesh(shoulderGeo, armorMat);
      leftShoulder.position.set(-0.95, 0.65, 0);
      leftShoulder.rotation.z = -Math.PI / 3.5;
      group.add(leftShoulder);

      const rightShoulder = new THREE.Mesh(shoulderGeo, armorMat);
      rightShoulder.position.set(0.95, 0.65, 0);
      rightShoulder.rotation.z = Math.PI / 3.5;
      group.add(rightShoulder);

      // Helmet
      const helmGeo = new THREE.DodecahedronGeometry(0.48, 1);
      const helm = new THREE.Mesh(helmGeo, armorMat);
      helm.position.set(0, 1.25, 0);
      group.add(helm);

      // Cosmic Horns
      const hornCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.35, 0.45, -0.1),
        new THREE.Vector3(0.7, 0.8, -0.3),
        new THREE.Vector3(0.9, 1.2, -0.4),
      ]);
      const hornGeo = new THREE.TubeGeometry(hornCurve, 16, 0.08, 8, false);

      const hornRight = new THREE.Mesh(hornGeo, hornMat);
      hornRight.position.set(0.25, 1.35, 0);
      group.add(hornRight);

      const hornLeft = new THREE.Mesh(hornGeo, hornMat);
      hornLeft.position.set(-0.25, 1.35, 0);
      hornLeft.scale.set(-1, 1, 1);
      group.add(hornLeft);

      // Pedestal
      const pedGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.25, 8);
      const ped = new THREE.Mesh(pedGeo, armorMat);
      ped.position.y = -0.85;
      group.add(ped);

    } else if (type === 'temple') {
      // Megalithic Astral Temple Citadel Portal
      const stoneMat = getMaterial(0x231a38, 0x000000, 0.8, 0.2);
      const runeMat = getMaterial(0x160f26, 0xb76dff, 0.2, 0.3);
      const goldMat = getMaterial(0xffc640, 0x000000, 0.3, 0.9);

      // Steps Base
      const baseGeo = new THREE.BoxGeometry(2.6, 0.2, 2.6);
      const base = new THREE.Mesh(baseGeo, stoneMat);
      base.position.y = -0.9;
      group.add(base);

      const baseStepGeo = new THREE.BoxGeometry(2.2, 0.2, 2.2);
      const baseStep = new THREE.Mesh(baseStepGeo, stoneMat);
      baseStep.position.y = -0.7;
      group.add(baseStep);

      // Twin Megalithic Obelisk Pillars
      const pillarGeo = new THREE.BoxGeometry(0.45, 2.2, 0.45);
      const pillarLeft = new THREE.Mesh(pillarGeo, stoneMat);
      pillarLeft.position.set(-0.75, 0.4, 0);
      group.add(pillarLeft);

      const pillarRight = new THREE.Mesh(pillarGeo, stoneMat);
      pillarRight.position.set(0.75, 0.4, 0);
      group.add(pillarRight);

      // Lintel Arch
      const lintelGeo = new THREE.BoxGeometry(2.1, 0.45, 0.6);
      const lintel = new THREE.Mesh(lintelGeo, stoneMat);
      lintel.position.set(0, 1.6, 0);
      group.add(lintel);

      // Central Floating Twin Moon Gateway Relic
      const moonGateGeo = new THREE.TorusGeometry(0.65, 0.08, 16, 32);
      const moonGate = new THREE.Mesh(moonGateGeo, runeMat);
      moonGate.position.set(0, 0.4, 0);
      group.add(moonGate);

      const innerOrbGeo = new THREE.IcosahedronGeometry(0.32, 2);
      const innerOrb = new THREE.Mesh(innerOrbGeo, goldMat);
      innerOrb.position.set(0, 0.4, 0);
      group.add(innerOrb);

    } else if (type === 'astrolabe') {
      // Cosmic Astrolabe Gyroscope
      const goldMat = getMaterial(0xffc640, 0x402d00, 0.2, 0.95);
      const runeMat = getMaterial(0x7bd0ff, 0x38bdf8, 0.1, 0.8);
      const violetMat = getMaterial(0xddb7ff, 0xb76dff, 0.3, 0.85);

      // Outer Ring
      const ring1Geo = new THREE.TorusGeometry(1.2, 0.05, 16, 64);
      const ring1 = new THREE.Mesh(ring1Geo, goldMat);
      group.add(ring1);

      // Mid Ring
      const ring2Geo = new THREE.TorusGeometry(0.95, 0.045, 16, 64);
      const ring2 = new THREE.Mesh(ring2Geo, violetMat);
      ring2.rotation.x = Math.PI / 4;
      group.add(ring2);

      // Inner Ring
      const ring3Geo = new THREE.TorusGeometry(0.7, 0.04, 16, 64);
      const ring3 = new THREE.Mesh(ring3Geo, runeMat);
      ring3.rotation.y = Math.PI / 3;
      group.add(ring3);

      // Core Celestial Sun Sphere
      const sunGeo = new THREE.SphereGeometry(0.35, 32, 32);
      const sun = new THREE.Mesh(sunGeo, goldMat);
      group.add(sun);

      // Small Orbiting Moon Satellite
      const moonGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const moon = new THREE.Mesh(moonGeo, runeMat);
      moon.position.set(0.95, 0, 0);
      group.add(moon);

      // Stand Support
      const standGeo = new THREE.CylinderGeometry(0.1, 0.3, 1.2, 8);
      const stand = new THREE.Mesh(standGeo, goldMat);
      stand.position.y = -1.1;
      group.add(stand);

    } else if (type === 'crystal') {
      // Floating Ether Crystal Cluster
      const crystalMat = getMaterial(0xb76dff, 0xddb7ff, 0.1, 0.7);
      const goldMat = getMaterial(0xffc640, 0x5a4100, 0.25, 0.9);
      const darkMat = getMaterial(0x19102b, 0x7c3aed, 0.4, 0.3);

      // Main Crystal
      const mainGeo = new THREE.OctahedronGeometry(0.85, 0);
      const mainCrystal = new THREE.Mesh(mainGeo, crystalMat);
      mainCrystal.scale.set(0.7, 1.8, 0.7);
      group.add(mainCrystal);

      // Secondary Side Crystals
      const side1Geo = new THREE.OctahedronGeometry(0.5, 0);
      const side1 = new THREE.Mesh(side1Geo, crystalMat);
      side1.position.set(0.5, -0.2, 0.3);
      side1.rotation.set(0.3, 0.4, 0.2);
      side1.scale.set(0.6, 1.4, 0.6);
      group.add(side1);

      const side2 = new THREE.Mesh(side1Geo, crystalMat);
      side2.position.set(-0.5, -0.3, -0.2);
      side2.rotation.set(-0.2, -0.5, -0.3);
      side2.scale.set(0.5, 1.3, 0.5);
      group.add(side2);

      // Floating Gold Orbit Ring
      const orbitGeo = new THREE.TorusGeometry(1.15, 0.03, 16, 48);
      const orbit = new THREE.Mesh(orbitGeo, goldMat);
      orbit.rotation.x = Math.PI / 2.8;
      group.add(orbit);

      // Floating Shards
      for (let i = 0; i < 6; i++) {
        const shardGeo = new THREE.TetrahedronGeometry(0.12, 0);
        const shard = new THREE.Mesh(shardGeo, darkMat);
        const angle = (i / 6) * Math.PI * 2;
        shard.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.3, Math.sin(angle) * 1.15);
        group.add(shard);
      }
    }

    return group;
  };

  // Setup Three.js Scene, Camera, Lights, Renderer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x2d1f4d, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xddb7ff, 2.4);
    dirLight1.position.set(4, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffc640, 1.6);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0x7bd0ff, 2.8, 12);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Initial Model
    const modelGroup = createProceduralModel(activeModel, shaderMode);
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (modelGroupRef.current) {
        if (isAutoRotating) {
          modelGroupRef.current.rotation.y += delta * 0.45;
        }

        // Float bobbing effect
        modelGroupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse Drag Interaction for Rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Zoom on wheel
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.003;
      cameraRef.current.position.z = Math.max(2.2, Math.min(7.5, cameraRef.current.position.z));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Model or Shader when state changes
  useEffect(() => {
    if (!sceneRef.current) return;
    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }
    const newGroup = createProceduralModel(activeModel, shaderMode);
    sceneRef.current.add(newGroup);
    modelGroupRef.current = newGroup;
  }, [activeModel, shaderMode]);

  const handleShaderChange = (mode: ShaderMode) => {
    cosmicAudio.playModeSwitch();
    setShaderMode(mode);
  };

  const handleModelChange = (model: ModelType) => {
    cosmicAudio.playClick();
    setActiveModel(model);
  };

  const handleResetCamera = () => {
    cosmicAudio.playClick();
    if (cameraRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(0, 0.8, 4.5);
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleToggleAutoRotate = () => {
    cosmicAudio.playClick();
    setIsAutoRotating((prev) => !prev);
  };

  const modelLabels: Record<ModelType, { name: string; tag: string; icon: React.ReactNode }> = {
    character: { name: 'Rainha Bárbara (Armadura)', tag: 'Guerreiros', icon: <Shield size={14} /> },
    temple: { name: 'Templo da Lua Gêmea', tag: 'Cidadela', icon: <Castle size={14} /> },
    astrolabe: { name: 'Astrolábio do Vazio', tag: 'Prop Rúnico', icon: <Compass size={14} /> },
    crystal: { name: 'Cristal Astral do Éter', tag: 'Relíquia', icon: <Gem size={14} /> },
  };

  return (
    <div className="viewport-container" id="viewport-3d-section">
      {/* Top HUD Telemetry */}
      <div className="viewport-hud-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
            <Layers size={18} />
          </span>
          <span className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.04em' }}>
            INSPEÇÃO 3D REAL-TIME • {modelLabels[activeModel].name}
          </span>
          <span className="badge-pill badge-primary" style={{ padding: '0.15rem 0.5rem', fontSize: '0.65rem' }}>
            LOD 0
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-tertiary)', display: 'flex', gap: '0.75rem' }}>
            <span>TRIS: <strong>{polyStats.tris}</strong></span>
            <span>VERTS: <strong>{polyStats.verts}</strong></span>
            <span style={{ color: 'var(--color-secondary)' }}>DEVKIT: VERIFICADO</span>
          </div>

          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <button
              onClick={handleToggleAutoRotate}
              className="hud-btn"
              title={isAutoRotating ? 'Pausar Rotação' : 'Girar 360°'}
            >
              {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              onClick={handleResetCamera}
              className="hud-btn"
              title="Resetar Câmera"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Three.js Canvas Container */}
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
      />

      {/* Floating Bottom HUD Dock */}
      <div className="viewport-dock-bottom">
        {/* Model Switcher */}
        <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid rgba(183,109,255,0.25)', paddingRight: '0.5rem' }}>
          {(['character', 'temple', 'astrolabe', 'crystal'] as ModelType[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModelChange(m)}
              className={`hud-btn ${activeModel === m ? 'active' : ''}`}
            >
              {modelLabels[m].icon}
              <span>{modelLabels[m].tag}</span>
            </button>
          ))}
        </div>

        {/* Shader Switcher */}
        <div style={{ display: 'flex', gap: '0.25rem', paddingLeft: '0.25rem' }}>
          <button
            onClick={() => handleShaderChange('pbr')}
            className={`hud-btn ${shaderMode === 'pbr' ? 'active' : ''}`}
          >
            PBR / Textura
          </button>
          <button
            onClick={() => handleShaderChange('wireframe')}
            className={`hud-btn ${shaderMode === 'wireframe' ? 'active' : ''}`}
          >
            Wireframe
          </button>
          <button
            onClick={() => handleShaderChange('clay')}
            className={`hud-btn ${shaderMode === 'clay' ? 'active' : ''}`}
          >
            Clay / ZBrush
          </button>
          <button
            onClick={() => handleShaderChange('emissive')}
            className={`hud-btn ${shaderMode === 'emissive' ? 'active' : ''}`}
          >
            Emissivo
          </button>
        </div>
      </div>
    </div>
  );
};
