import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cosmicAudio } from '../../utils/audioSynth';
import { Layers, RotateCcw, Play, Pause, Compass } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export type ShaderMode = 'pbr' | 'wireframe' | 'clay' | 'emissive';
export type ModelType = 'crimson_astrolabe';

interface ModelViewer3DProps {
  initialModel?: ModelType;
  onModelSelect?: (model: ModelType) => void;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  initialModel = 'crimson_astrolabe',
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shaderMode, setShaderMode] = useState<ShaderMode>('pbr');
  const activeModel: ModelType = initialModel;
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [polyStats, setPolyStats] = useState({ tris: '84.6K', verts: '42.8K', drawCalls: 1 });

  // Internal Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update stats based on model
  useEffect(() => {
    setPolyStats({ tris: '84.6K', verts: '42.8K', drawCalls: 1 });
  }, [activeModel]);

  // Procedural marble texture for the crimson astrolabe sphere
  const createRedMarbleTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#66070d');
    grad.addColorStop(0.3, '#991319');
    grad.addColorStop(0.6, '#b91c1c');
    grad.addColorStop(1, '#4c050a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Marble veins
    ctx.strokeStyle = 'rgba(255, 200, 200, 0.28)';
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, Math.random() * 512);
      ctx.bezierCurveTo(
        Math.random() * 512, Math.random() * 512,
        Math.random() * 512, Math.random() * 512,
        Math.random() * 512, Math.random() * 512
      );
      ctx.stroke();
    }

    // Golden / Ivory Cloud Wave Swirl (matching photo 3)
    ctx.fillStyle = '#edd6a6';
    ctx.strokeStyle = '#b38234';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(256, 360, 115, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Spiral swirl motif
    ctx.strokeStyle = '#66070d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(220, 360, 48, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(292, 360, 44, Math.PI, 0);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  };

  // Build Procedural 3D Models in Three.js
  const createProceduralModel = (type: ModelType, mode: ShaderMode): THREE.Group => {
    const group = new THREE.Group();

    // Helper to get material according to shaderMode
    const getMaterial = (
      baseColor: number,
      emissiveColor: number = 0x000000,
      roughness: number = 0.35,
      metalness: number = 0.85,
      map?: THREE.Texture | null
    ) => {
      if (mode === 'wireframe') {
        return new THREE.MeshBasicMaterial({
          color: 0x7bd0ff,
          wireframe: true,
        });
      }
      if (mode === 'clay') {
        return new THREE.MeshStandardMaterial({
          color: 0x9388a2,
          roughness: 0.85,
          metalness: 0.05,
          flatShading: true,
        });
      }
      if (mode === 'emissive') {
        return new THREE.MeshStandardMaterial({
          color: 0x120824,
          emissive: emissiveColor !== 0x000000 ? emissiveColor : 0x7c3aed,
          emissiveIntensity: 1.3,
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
        emissiveIntensity: emissiveColor !== 0x000000 ? 0.75 : 0,
        map: map || null,
      });
    };

    // =========================================================================
    // MODEL 1: ASTROLÁBIO CARMESIM & ESFERA VERMELHA (RECRIAÇÃO DA FOTO 3)
    // =========================================================================
    if (type === 'crimson_astrolabe') {
      const redMarbleTex = mode === 'pbr' ? createRedMarbleTexture() : null;

      const rubyMat = getMaterial(0x991b1b, 0x59080c, 0.2, 0.4);
      const goldMat = getMaterial(0xffc640, 0x402d00, 0.22, 0.92);
      const innerGoldMat = getMaterial(0xf59e0b, 0x331e00, 0.28, 0.88);
      const pendantMat = getMaterial(0xbe123c, 0x9f1239, 0.15, 0.6);
      const sphereMat = getMaterial(0xb91c1c, 0x330005, 0.25, 0.1, redMarbleTex);

      // --- A. OUTER RING (Anel Externo Ornamentado) ---
      const outerRingGroup = new THREE.Group();

      // Main Torus Ring (Ruby Marble)
      const outerRingGeo = new THREE.TorusGeometry(1.65, 0.14, 24, 64);
      const outerRing = new THREE.Mesh(outerRingGeo, rubyMat);
      outerRingGroup.add(outerRing);

      // Outer Gold Filigree Border
      const goldBorderGeo = new THREE.TorusGeometry(1.78, 0.045, 16, 64);
      const outerGoldBorder = new THREE.Mesh(goldBorderGeo, goldMat);
      outerRingGroup.add(outerGoldBorder);

      // Inner Gold Border
      const innerBorderGeo = new THREE.TorusGeometry(1.52, 0.04, 16, 64);
      const innerGoldBorder = new THREE.Mesh(innerBorderGeo, goldMat);
      outerRingGroup.add(innerGoldBorder);

      // --- Cardinal Ornate Diamond Crests ---
      // Top Crest (Diamond with Ruby Inlay)
      const topCrest = new THREE.Group();
      const crestFrameGeo = new THREE.OctahedronGeometry(0.35, 0);
      const crestFrame = new THREE.Mesh(crestFrameGeo, goldMat);
      crestFrame.scale.set(0.8, 1.4, 0.45);
      topCrest.add(crestFrame);

      const crestRubyGeo = new THREE.OctahedronGeometry(0.22, 0);
      const crestRuby = new THREE.Mesh(crestRubyGeo, rubyMat);
      crestRuby.scale.set(0.7, 1.2, 0.55);
      crestRuby.position.z = 0.05;
      topCrest.add(crestRuby);
      topCrest.position.set(0, 1.72, 0);
      outerRingGroup.add(topCrest);

      // Bottom Crest (Diamond Knot structure)
      const bottomCrest = new THREE.Group();
      const bCrestFrame = new THREE.Mesh(crestFrameGeo, goldMat);
      bCrestFrame.scale.set(0.9, 1.2, 0.45);
      bottomCrest.add(bCrestFrame);

      const bCrestRuby = new THREE.Mesh(crestRubyGeo, rubyMat);
      bCrestRuby.scale.set(0.75, 1.0, 0.55);
      bCrestRuby.position.z = 0.05;
      bottomCrest.add(bCrestRuby);
      bottomCrest.position.set(0, -1.72, 0);
      outerRingGroup.add(bottomCrest);

      // Left & Right Flank Crests
      const sideCrestGeo = new THREE.ConeGeometry(0.2, 0.45, 4);
      const leftCrest = new THREE.Mesh(sideCrestGeo, goldMat);
      leftCrest.position.set(-1.75, 0.2, 0);
      leftCrest.rotation.z = Math.PI / 2;
      outerRingGroup.add(leftCrest);

      const rightCrest = new THREE.Mesh(sideCrestGeo, goldMat);
      rightCrest.position.set(1.75, 0.2, 0);
      rightCrest.rotation.z = -Math.PI / 2;
      outerRingGroup.add(rightCrest);

      // --- 3 Hanging Ruby Crystal Pendants ---
      const createPendant = (x: number, y: number) => {
        const pendantGroup = new THREE.Group();

        // Little suspension chain/connector
        const chainGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
        const chain = new THREE.Mesh(chainGeo, goldMat);
        chain.position.y = -0.1;
        pendantGroup.add(chain);

        // Gold Cap
        const capGeo = new THREE.ConeGeometry(0.08, 0.1, 4);
        const cap = new THREE.Mesh(capGeo, goldMat);
        cap.rotation.x = Math.PI;
        cap.position.y = -0.22;
        pendantGroup.add(cap);

        // Faceted Ruby Jewel (Double Cone)
        const jewelUpperGeo = new THREE.ConeGeometry(0.14, 0.22, 6);
        const jewelUpper = new THREE.Mesh(jewelUpperGeo, pendantMat);
        jewelUpper.rotation.x = Math.PI;
        jewelUpper.position.y = -0.33;
        pendantGroup.add(jewelUpper);

        const jewelLowerGeo = new THREE.ConeGeometry(0.14, 0.45, 6);
        const jewelLower = new THREE.Mesh(jewelLowerGeo, pendantMat);
        jewelLower.position.y = -0.66;
        pendantGroup.add(jewelLower);

        pendantGroup.position.set(x, y, 0);
        return pendantGroup;
      };

      const pendantCenter = createPendant(0, -2.1);
      const pendantLeft = createPendant(-1.45, -0.9);
      const pendantRight = createPendant(1.45, -0.9);

      outerRingGroup.add(pendantCenter);
      outerRingGroup.add(pendantLeft);
      outerRingGroup.add(pendantRight);
      group.add(outerRingGroup);

      // --- B. INNER ROTATING GIMBAL RING ---
      const innerRingGroup = new THREE.Group();
      const innerTorusGeo = new THREE.TorusGeometry(1.2, 0.065, 20, 64);
      const innerTorus = new THREE.Mesh(innerTorusGeo, innerGoldMat);
      innerRingGroup.add(innerTorus);

      // Gimbal Top/Bottom Diamond Pivot Joints
      const jointGeo = new THREE.OctahedronGeometry(0.12, 0);
      const topJoint = new THREE.Mesh(jointGeo, goldMat);
      topJoint.position.set(0, 1.2, 0);
      innerRingGroup.add(topJoint);

      const bottomJoint = new THREE.Mesh(jointGeo, goldMat);
      bottomJoint.position.set(0, -1.2, 0);
      innerRingGroup.add(bottomJoint);
      group.add(innerRingGroup);

      // --- C. FLOATING CENTRAL CRIMSON SPHERE ---
      const centerSphereGeo = new THREE.SphereGeometry(0.68, 36, 36);
      const centerSphere = new THREE.Mesh(centerSphereGeo, sphereMat);
      centerSphere.rotation.x = 0.2;
      group.add(centerSphere);

      // Store animated objects for render loop
      group.userData = {
        outerRingGroup,
        innerRingGroup,
        centerSphere,
        pendantCenter,
        pendantLeft,
        pendantRight,
        type: 'crimson_astrolabe',
      };
    }


    return group;
  };

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xfff5e6, 2.2);
    mainSpot.position.set(4, 5, 4);
    scene.add(mainSpot);

    const violetRim = new THREE.DirectionalLight(0xddb7ff, 2.0);
    violetRim.position.set(-4, -2, -3);
    scene.add(violetRim);

    const goldKey = new THREE.PointLight(0xffc640, 1.8, 10);
    goldKey.position.set(0, 2, 3);
    scene.add(goldKey);

    // 5. Initial Model
    const modelGroup = createProceduralModel(activeModel, shaderMode);
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 6. Interaction Handlers (Rotate / Drag)
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

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.0035;
      cameraRef.current.position.z = Math.max(2.8, Math.min(8.5, cameraRef.current.position.z));
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Touch Support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !modelGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (modelGroupRef.current) {
        // Auto-rotation around Y
        if (isAutoRotating && !isDraggingRef.current) {
          modelGroupRef.current.rotation.y += 0.006;
        }

        // Dedicated procedural animations
        const data = modelGroupRef.current.userData;
        if (data?.type === 'crimson_astrolabe') {
          // Inner ring spins on gimbal axis
          if (data.innerRingGroup) {
            data.innerRingGroup.rotation.y += 0.016;
          }
          // Center sphere rotates gently
          if (data.centerSphere) {
            data.centerSphere.rotation.y -= 0.008;
            data.centerSphere.position.y = Math.sin(elapsedTime * 2.2) * 0.04;
          }
          // Pendants oscillate like hanging jewels
          if (data.pendantCenter) {
            data.pendantCenter.rotation.z = Math.sin(elapsedTime * 2.5) * 0.08;
          }
          if (data.pendantLeft) {
            data.pendantLeft.rotation.z = Math.sin(elapsedTime * 2.2 + 0.8) * 0.09;
          }
          if (data.pendantRight) {
            data.pendantRight.rotation.z = Math.sin(elapsedTime * 2.2 - 0.8) * 0.09;
          }
        }

      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAutoRotating]);

  // Handle Shader Switch
  const handleShaderChange = (mode: ShaderMode) => {
    cosmicAudio.playClick();
    setShaderMode(mode);
    if (sceneRef.current && modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
      const nextGroup = createProceduralModel(activeModel, mode);
      sceneRef.current.add(nextGroup);
      modelGroupRef.current = nextGroup;
    }
  };



  const handleResetCamera = () => {
    cosmicAudio.playClick();
    if (cameraRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(0, 0.5, 5.2);
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleToggleAutoRotate = () => {
    cosmicAudio.playClick();
    setIsAutoRotating((prev) => !prev);
  };

  const modelLabels: Record<ModelType, { name: string; tag: string; icon: React.ReactNode }> = {
    crimson_astrolabe: {
      name: 'Astrolábio Carmesim & Esfera Rúnica (Foto 3)',
      tag: 'Astrolábio Carmesim',
      icon: <Compass size={14} />,
    },
  };

  return (
    <div className="viewport-container" id="viewport-3d-section">
      {/* Top HUD Telemetry */}
      <div className="viewport-hud-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
            <Layers size={18} />
          </span>
          <span className="font-display" style={{ fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.04em' }}>
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
            <span style={{ color: 'var(--color-secondary)' }}>UE4 &amp; UE5 COMPATÍVEL</span>
          </div>

          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <button
              onClick={handleToggleAutoRotate}
              className="hud-btn"
              title={isAutoRotating ? 'Pause' : t.inspector.controls.autoRotate}
            >
              {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              onClick={handleResetCamera}
              className="hud-btn"
              title={t.inspector.controls.reset}
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
        {/* Shader Switcher */}
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => handleShaderChange('pbr')}
            className={`hud-btn ${shaderMode === 'pbr' ? 'active' : ''}`}
          >
            {t.inspector.viewModes.pbr}
          </button>
          <button
            onClick={() => handleShaderChange('wireframe')}
            className={`hud-btn ${shaderMode === 'wireframe' ? 'active' : ''}`}
          >
            {t.inspector.viewModes.wireframe}
          </button>
          <button
            onClick={() => handleShaderChange('clay')}
            className={`hud-btn ${shaderMode === 'clay' ? 'active' : ''}`}
          >
            {t.inspector.viewModes.clay}
          </button>
          <button
            onClick={() => handleShaderChange('emissive')}
            className={`hud-btn ${shaderMode === 'emissive' ? 'active' : ''}`}
          >
            {t.inspector.viewModes.emission}
          </button>
        </div>
      </div>
    </div>
  );
};
