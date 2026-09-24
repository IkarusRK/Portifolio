import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cosmicAudio } from '../../utils/audioSynth';
import { Layers, RotateCcw, Play, Pause, Compass, Sparkles } from 'lucide-react';

export type ShaderMode = 'pbr' | 'wireframe' | 'clay' | 'emissive';
export type ModelType = 'crimson_astrolabe' | 'gyroscope_render';

interface ModelViewer3DProps {
  initialModel?: ModelType;
  onModelSelect?: (model: ModelType) => void;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  initialModel = 'crimson_astrolabe',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shaderMode, setShaderMode] = useState<ShaderMode>('pbr');
  const [activeModel, setActiveModel] = useState<ModelType>(initialModel);
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
    switch (activeModel) {
      case 'crimson_astrolabe':
        setPolyStats({ tris: '84.6K', verts: '42.8K', drawCalls: 1 });
        break;
      case 'gyroscope_render':
        setPolyStats({ tris: '62.4K', verts: '31.2K', drawCalls: 1 });
        break;
    }
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

    // =========================================================================
    // MODEL 2: GIROSCÓPIO PLANETÁRIO ORBITAL & MANEQUIM (RENDER DO VÍDEO MP4)
    // =========================================================================
    if (type === 'gyroscope_render') {
      const mannequinMat = getMaterial(0x838290, 0x000000, 0.75, 0.1);
      const markerMat = getMaterial(0xd8d6e2, 0xddb7ff, 0.3, 0.2);
      const goldMat = getMaterial(0xf5c038, 0x5a3e00, 0.22, 0.94);
      const planetCoreMat = getMaterial(0x9d4edd, 0x7928ca, 0.35, 0.3);
      const planetCapMat = getMaterial(0x2563eb, 0x0284c7, 0.25, 0.4);
      const moonMat = getMaterial(0x38bdf8, 0x0284c7, 0.15, 0.2);

      // --- A. MANNEQUIN SILHOUETTE (Estilo Manequim de Rig do Blender) ---
      const mannequinGroup = new THREE.Group();

      // Torso / Ribcage
      const torsoGeo = new THREE.CylinderGeometry(0.42, 0.32, 0.85, 12);
      const torso = new THREE.Mesh(torsoGeo, mannequinMat);
      torso.position.y = 0.55;
      mannequinGroup.add(torso);

      // Chest
      const breastGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const leftBreast = new THREE.Mesh(breastGeo, mannequinMat);
      leftBreast.position.set(-0.2, 0.65, 0.25);
      mannequinGroup.add(leftBreast);

      const rightBreast = new THREE.Mesh(breastGeo, mannequinMat);
      rightBreast.position.set(0.2, 0.65, 0.25);
      mannequinGroup.add(rightBreast);

      // Hips / Pelvis
      const hipsGeo = new THREE.CylinderGeometry(0.32, 0.46, 0.7, 12);
      const hips = new THREE.Mesh(hipsGeo, mannequinMat);
      hips.position.y = -0.15;
      mannequinGroup.add(hips);

      // Upper Legs (Thighs)
      const legGeo = new THREE.CylinderGeometry(0.22, 0.15, 1.2, 10);
      const leftLeg = new THREE.Mesh(legGeo, mannequinMat);
      leftLeg.position.set(-0.25, -1.0, 0);
      mannequinGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, mannequinMat);
      rightLeg.position.set(0.25, -1.0, 0);
      mannequinGroup.add(rightLeg);

      // Arms in slight A-pose
      const armGeo = new THREE.CylinderGeometry(0.11, 0.08, 1.1, 8);
      const leftArm = new THREE.Mesh(armGeo, mannequinMat);
      leftArm.position.set(-0.68, 0.35, 0);
      leftArm.rotation.z = Math.PI / 4.2;
      mannequinGroup.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, mannequinMat);
      rightArm.position.set(0.68, 0.35, 0);
      rightArm.rotation.z = -Math.PI / 4.2;
      mannequinGroup.add(rightArm);

      // Blender Rig Armature Diamond Markers (cones/pyramids as shown in video)
      const markerGeo = new THREE.OctahedronGeometry(0.08, 0);
      const marker1 = new THREE.Mesh(markerGeo, markerMat);
      marker1.position.set(-0.55, 0.85, 0);
      mannequinGroup.add(marker1);

      const marker2 = new THREE.Mesh(markerGeo, markerMat);
      marker2.position.set(0.55, 0.85, 0);
      mannequinGroup.add(marker2);

      const marker3 = new THREE.Mesh(markerGeo, markerMat);
      marker3.position.set(-1.1, 0.0, 0);
      mannequinGroup.add(marker3);

      const marker4 = new THREE.Mesh(markerGeo, markerMat);
      marker4.position.set(1.1, 0.0, 0);
      mannequinGroup.add(marker4);

      group.add(mannequinGroup);

      // --- B. REVOLVING PLANETARY GYROSCOPE (In Front of Waist) ---
      const gyroGroup = new THREE.Group();
      gyroGroup.position.set(0, -0.05, 0.45);

      // Central Violet Sphere
      const coreSphereGeo = new THREE.SphereGeometry(0.42, 32, 32);
      const coreSphere = new THREE.Mesh(coreSphereGeo, planetCoreMat);
      gyroGroup.add(coreSphere);

      // Blue Upper Hemisphere Cap
      const blueCapGeo = new THREE.SphereGeometry(0.43, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.8);
      const blueCap = new THREE.Mesh(blueCapGeo, planetCapMat);
      blueCap.position.y = 0.01;
      gyroGroup.add(blueCap);

      // Inner Golden Segmented Ring
      const innerRingGeo = new THREE.TorusGeometry(0.62, 0.055, 16, 48);
      const innerRing = new THREE.Mesh(innerRingGeo, goldMat);
      gyroGroup.add(innerRing);

      // Orbiting Satellites / Cyan Moons
      const moonsOrbitGroup = new THREE.Group();
      const moonGeo1 = new THREE.SphereGeometry(0.11, 16, 16);
      const moon1 = new THREE.Mesh(moonGeo1, moonMat);
      moon1.position.set(0.95, 0, 0);
      moonsOrbitGroup.add(moon1);

      const moonGeo2 = new THREE.SphereGeometry(0.07, 16, 16);
      const moon2 = new THREE.Mesh(moonGeo2, moonMat);
      moon2.position.set(1.15, 0.1, 0);
      moonsOrbitGroup.add(moon2);

      gyroGroup.add(moonsOrbitGroup);

      // Outer Segmented Tilted Gold Ring (Revolving Orbit)
      const outerOrbitGroup = new THREE.Group();
      outerOrbitGroup.rotation.x = Math.PI / 3.2; // Tilted angle like in the video

      const outerRingGeo = new THREE.TorusGeometry(1.05, 0.08, 16, 48);
      const outerRing = new THREE.Mesh(outerRingGeo, goldMat);
      outerOrbitGroup.add(outerRing);

      // Segment notch cutouts / blocks on outer ring
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const blockGeo = new THREE.BoxGeometry(0.18, 0.06, 0.18);
        const block = new THREE.Mesh(blockGeo, goldMat);
        block.position.set(Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0);
        block.rotation.z = angle;
        outerOrbitGroup.add(block);
      }

      gyroGroup.add(outerOrbitGroup);
      group.add(gyroGroup);

      group.userData = {
        mannequinGroup,
        gyroGroup,
        coreSphere,
        innerRing,
        moonsOrbitGroup,
        outerOrbitGroup,
        type: 'gyroscope_render',
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

        if (data?.type === 'gyroscope_render') {
          // Outer tilted ring revolves
          if (data.outerOrbitGroup) {
            data.outerOrbitGroup.rotation.z += 0.022;
          }
          // Moons orbit around core
          if (data.moonsOrbitGroup) {
            data.moonsOrbitGroup.rotation.z += 0.032;
            data.moonsOrbitGroup.rotation.y = Math.sin(elapsedTime * 1.5) * 0.2;
          }
          // Inner segmented ring counter-rotates
          if (data.innerRing) {
            data.innerRing.rotation.z -= 0.015;
          }
          // Core sphere turns
          if (data.coreSphere) {
            data.coreSphere.rotation.y += 0.01;
          }
          // Subtle breathing levitation
          if (data.gyroGroup) {
            data.gyroGroup.position.y = -0.05 + Math.sin(elapsedTime * 2) * 0.03;
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

  // Handle Model Switch
  const handleModelChange = (model: ModelType) => {
    cosmicAudio.playClick();
    setActiveModel(model);
    if (sceneRef.current && modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
      const nextGroup = createProceduralModel(model, shaderMode);
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
    gyroscope_render: {
      name: 'Giroscópio Orbital & Manequim (Render do Vídeo)',
      tag: 'Giroscópio Orbital',
      icon: <Sparkles size={14} />,
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
        {/* Model Switcher (Only the 2 requested real models!) */}
        <div style={{ display: 'flex', gap: '0.35rem', borderRight: '1px solid rgba(183,109,255,0.25)', paddingRight: '0.6rem' }}>
          {(['crimson_astrolabe', 'gyroscope_render'] as ModelType[]).map((m) => (
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
        <div style={{ display: 'flex', gap: '0.25rem', paddingLeft: '0.35rem' }}>
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
