import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useParticleSystem } from '../../contexts/ParticleContext';
import { useTheme } from '../../hooks/useTheme';
import { THEME_PALETTES } from '../../data/themes';

const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 1200 : 2000;
const LERP_TO_SHAPE = 0.075;
const MOUSE_SCALE = 14;

// ----------------------------------------------------
// 1. HERO SHAPES (React, Lua, Cube, Code, Java)
// ----------------------------------------------------
const ELLIPSE_A = 5.5;
const ELLIPSE_B = 1.6;
const ORBIT_ANGLES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

function getReactAtomTarget(i: number, ax: number, ay: number) {
  const role = i % 7;
  if (role === 0) return { x: ax, y: ay, z: 0 };
  const t = (i / COUNT) * Math.PI * 2;
  const o = ORBIT_ANGLES[(role - 1) % 3];
  const x = ELLIPSE_A * Math.cos(t);
  const y = ELLIPSE_B * Math.sin(t);
  return {
    x: ax + x * Math.cos(o) - y * Math.sin(o),
    y: ay + x * Math.sin(o) + y * Math.cos(o),
    z: 0,
  };
}

function getLuaFiveMTarget(i: number, ax: number, ay: number) {
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
    return { x: ax + mainR * Math.cos(t), y: ay + mainR * Math.sin(t), z: 0 };
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
  return { x: ax + r * Math.cos(theta), y: ay + r * Math.sin(theta), z: 0 };
}

function getCube3DTarget(i: number, ax: number, ay: number, time: number) {
  const k = i % 27;
  const gx = (k % 3) - 1;
  const gy = (Math.floor(k / 3) % 3) - 1;
  const gz = Math.floor(k / 9) - 1;
  const spacing = 1.1;

  const x = gx * spacing;
  const y = gy * spacing;
  const z = gz * spacing;

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

function getCodeTarget(i: number, ax: number, ay: number) {
  let x = 0;
  let y = 0;
  if (i < COUNT * 0.35) {
    const mid = COUNT * 0.175;
    if (i < mid) {
      const t = i / mid;
      x = -1.2 - 2.2 * t;
      y = 2.2 - 2.2 * t;
    } else {
      const t = (i - mid) / mid;
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

function getJavaTarget(i: number, ax: number, ay: number) {
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

// ----------------------------------------------------
// 2. STATS SHAPE (Métricas, Gráfico de Barras & Pulso de Dados)
// ----------------------------------------------------
function getStatsTarget(i: number, time: number) {
  // 10% base axis
  if (i < COUNT * 0.1) {
    const t = i / (COUNT * 0.1);
    return { x: -4.8 + 9.6 * t, y: -2.6, z: 0 };
  }

  // 40% 4 bar columns of increasing heights
  if (i < COUNT * 0.5) {
    const idx = i - COUNT * 0.1;
    const barIndex = Math.floor(idx / (COUNT * 0.1));
    const inBar = (idx % (COUNT * 0.1)) / (COUNT * 0.1);
    const heights = [1.5, 2.5, 3.7, 4.9];
    const xCenters = [-3.3, -1.3, 0.7, 2.7];
    const w = 0.9;
    const h = heights[barIndex];
    const xc = xCenters[barIndex];

    // Distribute perimeter and interior
    let px = xc;
    let py = -2.6;
    if (inBar < 0.6) {
      // Perimeter
      const p = inBar / 0.6;
      if (p < 0.35) {
        px = xc - w / 2;
        py = -2.6 + (p / 0.35) * h;
      } else if (p < 0.65) {
        px = xc + w / 2;
        py = -2.6 + ((p - 0.35) / 0.3) * h;
      } else {
        px = xc - w / 2 + ((p - 0.65) / 0.35) * w;
        py = -2.6 + h;
      }
    } else {
      // Interior fill
      const f = (inBar - 0.6) / 0.4;
      px = xc - w / 2 + ((idx % 7) / 6) * w;
      py = -2.6 + f * h;
    }
    return { x: px, y: py, z: (Math.sin(time * 3 + barIndex) * 0.2) };
  }

  // 25% Ascending growth trendline
  if (i < COUNT * 0.75) {
    const t = (i - COUNT * 0.5) / (COUNT * 0.25);
    const x = -4.5 + 8.2 * t;
    const y = -2.2 + 4.6 * Math.pow(t, 1.25) + Math.sin(t * 8 + time * 3) * 0.15;
    const z = Math.cos(t * 6 + time * 2) * 0.3;
    return { x, y, z };
  }

  // 25% Live metric pulse circle at peak
  const idx = i - COUNT * 0.75;
  const t = idx / (COUNT * 0.25);
  const angle = t * Math.PI * 2;
  const r = 1.0 + Math.sin(time * 4) * 0.15;
  const cx = 3.6;
  const cy = 2.4;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
    z: Math.sin(angle * 3 + time * 2) * 0.4,
  };
}

// ----------------------------------------------------
// 3. SHOWCASE 3D SHAPE (Icosaedro Tridimensional & Anel Cósmico)
// ----------------------------------------------------
const PHI = (1 + Math.sqrt(5)) / 2;
const ICOSA_VERTS: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const len = Math.hypot(x, y, z);
  return [(x / len) * 2.8, (y / len) * 2.8, (z / len) * 2.8];
});

// Precomputed 30 edges of icosahedron
const ICOSA_EDGES: [number, number][] = [];
for (let a = 0; a < 12; a++) {
  for (let b = a + 1; b < 12; b++) {
    const d = Math.hypot(
      ICOSA_VERTS[a][0] - ICOSA_VERTS[b][0],
      ICOSA_VERTS[a][1] - ICOSA_VERTS[b][1],
      ICOSA_VERTS[a][2] - ICOSA_VERTS[b][2]
    );
    if (d < 3.2) {
      ICOSA_EDGES.push([a, b]);
    }
  }
}

function getShowcase3DTarget(i: number, time: number) {
  const rx = time * 0.35;
  const ry = time * 0.45;
  const rz = time * 0.15;

  let x = 0, y = 0, z = 0;

  if (i < COUNT * 0.65) {
    // 65% Polyhedron edges
    const edgeIdx = i % ICOSA_EDGES.length;
    const [va, vb] = ICOSA_EDGES[edgeIdx];
    const t = ((i / ICOSA_EDGES.length) % 1);
    const p1 = ICOSA_VERTS[va];
    const p2 = ICOSA_VERTS[vb];
    x = p1[0] + (p2[0] - p1[0]) * t;
    y = p1[1] + (p2[1] - p1[1]) * t;
    z = p1[2] + (p2[2] - p1[2]) * t;
  } else {
    // 35% Cosmic orbit ring
    const idx = i - COUNT * 0.65;
    const theta = (idx / (COUNT * 0.35)) * Math.PI * 2;
    const r = 4.2 + Math.cos(theta * 2 + time * 1.5) * 0.25;
    x = r * Math.cos(theta);
    z = r * Math.sin(theta);
    y = r * Math.sin(theta) * 0.35;
  }

  // 3D rotation
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const cz = Math.cos(rz), sz = Math.sin(rz);

  // Rotate X
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  // Rotate Y
  const x2 = x * cy + z1 * sy;
  const z2 = -x * sy + z1 * cy;
  // Rotate Z
  const x3 = x2 * cz - y1 * sz;
  const y3 = x2 * sz + y1 * cz;

  return { x: x3, y: y3, z: z2 };
}

// ----------------------------------------------------
// 4. SITES SHAPE (Janela de Navegador Web & Layout UI)
// ----------------------------------------------------
function getSitesTarget(i: number, time: number) {
  const W = 8.0;
  const H = 5.4;
  const xMin = -W / 2;
  const xMax = W / 2;
  const yMin = -H / 2;
  const yMax = H / 2;

  // 30% Outer Browser border
  if (i < COUNT * 0.3) {
    const t = i / (COUNT * 0.3);
    const perim = 2 * (W + H);
    const d = t * perim;
    if (d < W) return { x: xMin + d, y: yMax, z: 0 };
    if (d < W + H) return { x: xMax, y: yMax - (d - W), z: 0 };
    if (d < 2 * W + H) return { x: xMax - (d - (W + H)), y: yMin, z: 0 };
    return { x: xMin, y: yMin + (d - (2 * W + H)), z: 0 };
  }

  // 10% Header separator line
  if (i < COUNT * 0.4) {
    const t = (i - COUNT * 0.3) / (COUNT * 0.1);
    return { x: xMin + W * t, y: 1.8, z: 0 };
  }

  // 10% 3 Traffic light dots & URL search capsule
  if (i < COUNT * 0.5) {
    const idx = i - COUNT * 0.4;
    const sub = idx / (COUNT * 0.1);
    if (sub < 0.3) {
      // 3 dots
      const dotIdx = Math.floor(sub / 0.1);
      const angle = (sub % 0.1) * 10 * Math.PI * 2;
      const dotX = -3.2 + dotIdx * 0.5;
      const r = 0.15;
      return { x: dotX + r * Math.cos(angle), y: 2.25, z: 0 };
    }
    // URL capsule
    const t = (sub - 0.3) / 0.7;
    return { x: -1.2 + 4.6 * t, y: 2.25, z: 0 };
  }

  // 25% Sidebar and UI content cards
  if (i < COUNT * 0.75) {
    const idx = i - COUNT * 0.5;
    const t = idx / (COUNT * 0.25);
    if (t < 0.25) {
      // Sidebar vertical
      return { x: -1.8, y: -2.3 + 3.8 * (t / 0.25), z: 0 };
    }
    if (t < 0.6) {
      // Top hero card
      const c = (t - 0.25) / 0.35;
      return { x: -1.3 + 4.6 * c, y: 0.8 + Math.sin(c * Math.PI) * 0.5, z: 0 };
    }
    // Bottom cards
    const c = (t - 0.6) / 0.4;
    return { x: -1.3 + 4.6 * c, y: -1.3 + Math.sin(c * Math.PI) * 0.5, z: 0 };
  }

  // 25% Scanning cyber line
  const idx = i - COUNT * 0.75;
  const t = idx / (COUNT * 0.25);
  const scanY = 1.6 - ((time * 1.5) % 3.8);
  return {
    x: -3.6 + 7.2 * t,
    y: scanY + Math.sin(t * 12 + time * 4) * 0.08,
    z: 0.2,
  };
}

// ----------------------------------------------------
// 5. APPLICATIONS SHAPE (Foguete de Deploy & Tag de Código)
// ----------------------------------------------------
function getProjectsTarget(i: number, time: number) {
  // 60% Rocket fuselage, nose and wings
  if (i < COUNT * 0.6) {
    const t = i / (COUNT * 0.6);
    if (t < 0.25) {
      // Nose cone
      const nt = t / 0.25;
      const side = (i % 2 === 0 ? 1 : -1);
      const y = 3.6 - 2.0 * nt;
      const x = side * (nt * 1.3);
      return { x, y, z: 0 };
    }
    if (t < 0.45) {
      // Fuselage cylinder
      const ft = (t - 0.25) / 0.2;
      const side = (i % 2 === 0 ? 1 : -1);
      const y = 1.6 - 2.8 * ft;
      return { x: side * 1.3, y, z: 0 };
    }
    if (t < 0.6) {
      // Center porthole
      const pt = (t - 0.45) / 0.15;
      const angle = pt * Math.PI * 2;
      const r = 0.6;
      return { x: r * Math.cos(angle), y: 0.5 + r * Math.sin(angle), z: 0.2 };
    }
    // Wings / Fins
    const wt = (t - 0.6) / 0.4;
    const side = (i % 2 === 0 ? 1 : -1);
    if (wt < 0.5) {
      const s = wt / 0.5;
      return { x: side * (1.3 + 1.3 * s), y: -0.2 - 1.4 * s, z: 0 };
    }
    const s = (wt - 0.5) / 0.5;
    return { x: side * (2.6 - 1.3 * s), y: -1.6, z: 0 };
  }

  // 40% Thruster fire stream
  const idx = i - COUNT * 0.6;
  const t = idx / (COUNT * 0.4);
  const spread = 0.4 + 1.4 * t;
  const x = ((Math.sin(idx * 7) * 0.5) * spread) + Math.sin(time * 16 + t * 8) * 0.2;
  const y = -1.6 - 2.6 * t;
  const z = Math.cos(idx * 5) * 0.5;
  return { x, y, z };
}

// ----------------------------------------------------
// 6. SKILLS SHAPE (Constelação Hexagonal & Grafo Neural)
// ----------------------------------------------------
function getSkillsTarget(i: number, time: number) {
  const R = 3.2;

  // 25% 6 spoke lines connecting center to vertices
  if (i < COUNT * 0.25) {
    const spokeIdx = Math.floor((i / (COUNT * 0.25)) * 6);
    const t = ((i / (COUNT * 0.25)) * 6) % 1;
    const angle = spokeIdx * (Math.PI / 3);
    const vx = R * Math.cos(angle);
    const vy = R * Math.sin(angle);
    return { x: vx * t, y: vy * t, z: 0 };
  }

  // 35% Outer hexagon perimeter
  if (i < COUNT * 0.6) {
    const hexIdx = Math.floor(((i - COUNT * 0.25) / (COUNT * 0.35)) * 6);
    const t = (((i - COUNT * 0.25) / (COUNT * 0.35)) * 6) % 1;
    const a1 = hexIdx * (Math.PI / 3);
    const a2 = ((hexIdx + 1) % 6) * (Math.PI / 3);
    const x1 = R * Math.cos(a1), y1 = R * Math.sin(a1);
    const x2 = R * Math.cos(a2), y2 = R * Math.sin(a2);
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, z: 0 };
  }

  // 20% Inner sub-hexagon
  if (i < COUNT * 0.8) {
    const idx = i - COUNT * 0.6;
    const hexIdx = Math.floor((idx / (COUNT * 0.2)) * 6);
    const t = ((idx / (COUNT * 0.2)) * 6) % 1;
    const rIn = 1.5;
    const a1 = hexIdx * (Math.PI / 3) + Math.PI / 6;
    const a2 = ((hexIdx + 1) % 6) * (Math.PI / 3) + Math.PI / 6;
    const x1 = rIn * Math.cos(a1), y1 = rIn * Math.sin(a1);
    const x2 = rIn * Math.cos(a2), y2 = rIn * Math.sin(a2);
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, z: Math.sin(time * 3 + hexIdx) * 0.3 };
  }

  // 20% Orbiting satellite nodes
  const idx = i - COUNT * 0.8;
  const nodeIdx = idx % 6;
  const baseAngle = nodeIdx * (Math.PI / 3);
  const cx = R * Math.cos(baseAngle);
  const cy = R * Math.sin(baseAngle);
  const orbitAngle = (idx / (COUNT * 0.2)) * Math.PI * 2 + time * 2;
  const rSub = 0.7;
  return {
    x: cx + rSub * Math.cos(orbitAngle),
    y: cy + rSub * Math.sin(orbitAngle),
    z: Math.sin(orbitAngle * 2) * 0.4,
  };
}

// ----------------------------------------------------
// 7. EXPERIENCE SHAPE (Dupla Hélice 3D & Marcos da Linha do Tempo)
// ----------------------------------------------------
function getExperienceTarget(i: number, time: number) {
  const H = 7.2;

  // 40% Helix strand A
  if (i < COUNT * 0.4) {
    const t = (i / (COUNT * 0.4)) * H - H / 2;
    const y = t;
    const angle = y * 1.3 + time * 0.8;
    const x = 2.4 * Math.cos(angle);
    const z = 2.4 * Math.sin(angle);
    return { x, y, z };
  }

  // 40% Helix strand B (opposite phase)
  if (i < COUNT * 0.8) {
    const idx = i - COUNT * 0.4;
    const t = (idx / (COUNT * 0.4)) * H - H / 2;
    const y = t;
    const angle = y * 1.3 + time * 0.8 + Math.PI;
    const x = 2.4 * Math.cos(angle);
    const z = 2.4 * Math.sin(angle);
    return { x, y, z };
  }

  // 20% Milestone rungs (5 career years: 2026, 2025, 2024, 2023, 2022)
  const idx = i - COUNT * 0.8;
  const rungIdx = idx % 5;
  const rungT = ((idx / 5) % (COUNT * 0.04)) / (COUNT * 0.04);
  const milestoneYs = [2.8, 1.4, 0.0, -1.4, -2.8];
  const y = milestoneYs[rungIdx];
  const angle = y * 1.3 + time * 0.8;

  const x1 = 2.4 * Math.cos(angle), z1 = 2.4 * Math.sin(angle);
  const x2 = -x1, z2 = -z1;
  return {
    x: x1 + (x2 - x1) * rungT,
    y,
    z: z1 + (z2 - z1) * rungT,
  };
}

// ----------------------------------------------------
// 8. CONTACT SHAPE (Avião de Papel Origami & Ondas de Sinal)
// ----------------------------------------------------
function getContactTarget(i: number, time: number) {
  // 50% 3D Origami Paper Airplane
  if (i < COUNT * 0.5) {
    const t = i / (COUNT * 0.5);
    const nose = [1.6, 1.8, 0.4];
    const leftWing = [-2.4, 1.0, 2.2];
    const rightWing = [-2.4, 1.0, -2.2];
    const keel = [-2.2, -0.4, 0.0];

    if (t < 0.25) {
      // Left top crease
      const s = t / 0.25;
      return { x: nose[0] + (leftWing[0] - nose[0]) * s, y: nose[1] + (leftWing[1] - nose[1]) * s, z: nose[2] + (leftWing[2] - nose[2]) * s };
    }
    if (t < 0.5) {
      // Right top crease
      const s = (t - 0.25) / 0.25;
      return { x: nose[0] + (rightWing[0] - nose[0]) * s, y: nose[1] + (rightWing[1] - nose[1]) * s, z: nose[2] + (rightWing[2] - nose[2]) * s };
    }
    if (t < 0.75) {
      // Center spine
      const s = (t - 0.5) / 0.25;
      return { x: nose[0] + (keel[0] - nose[0]) * s, y: nose[1] + (keel[1] - nose[1]) * s, z: nose[2] + (keel[2] - nose[2]) * s };
    }
    // Wing trailing edge
    const s = (t - 0.75) / 0.25;
    return { x: leftWing[0] + (rightWing[0] - leftWing[0]) * s, y: leftWing[1], z: leftWing[2] + (rightWing[2] - leftWing[2]) * s };
  }

  // 25% Radar transmission arcs expanding from nose
  if (i < COUNT * 0.75) {
    const idx = i - COUNT * 0.5;
    const arcIdx = idx % 3;
    const radii = [1.4, 2.6, 3.8];
    const r = radii[arcIdx] + ((time * 1.2 + arcIdx * 0.6) % 1.2);
    const arcT = (idx / (COUNT * 0.25)) * Math.PI * 0.75 - Math.PI * 0.25;
    const nx = 1.6;
    const ny = 1.8;
    return {
      x: nx + r * Math.cos(arcT),
      y: ny + r * Math.sin(arcT),
      z: Math.sin(arcT * 3 + time * 2) * 0.3,
    };
  }

  // 25% Contrail / Jet stream trail
  const idx = i - COUNT * 0.75;
  const t = idx / (COUNT * 0.25);
  return {
    x: -2.2 - 3.2 * t,
    y: 0.3 - 2.8 * t + Math.sin(t * 10 - time * 5) * 0.25,
    z: Math.cos(t * 10 - time * 5) * 0.3,
  };
}

// ----------------------------------------------------
// MAIN PARTICLE SCENE
// ----------------------------------------------------
const GlobalParticleScene = () => {
  const { theme, mode } = useTheme();
  const { activeSection, heroShape, isAttracting, pinHeroShape, mouseNdc, scrollVelocity } =
    useParticleSystem();

  const accentColor = THEME_PALETTES[theme]?.from ?? '#7c3aed';

  const pointsRef = useRef<THREE.Points>(null);
  const glowPointsRef = useRef<THREE.Points>(null);
  const colorRef = useRef(new THREE.Color(accentColor));
  const glowColorRef = useRef(new THREE.Color(accentColor));

  // Current smooth scroll velocity
  const smoothedVelocityRef = useRef(0);

  const [positions, homePositions, opacities] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const home = new Float32Array(COUNT * 3);
    const op = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 15;
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

    // Attractor position in 3D
    const ax = mouseNdc.x * MOUSE_SCALE;
    const ay = mouseNdc.y * (MOUSE_SCALE * 0.65);

    // Smooth scroll velocity and vertical drift
    smoothedVelocityRef.current += (scrollVelocity - smoothedVelocityRef.current) * 0.15;
    const scrollFlowOffset = -Math.min(Math.max(smoothedVelocityRef.current * 0.015, -2.5), 2.5);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // Section-based morphing
      if (activeSection === 'home') {
        const shouldFormHeroShape = isAttracting || pinHeroShape;

        if (shouldFormHeroShape) {
          let target: { x: number; y: number; z: number };
          if (heroShape === 'react') target = getReactAtomTarget(i, ax, ay);
          else if (heroShape === 'lua') target = getLuaFiveMTarget(i, ax, ay);
          else if (heroShape === 'cube') target = getCube3DTarget(i, ax, ay, time);
          else if (heroShape === 'code') target = getCodeTarget(i, ax, ay);
          else target = getJavaTarget(i, ax, ay);

          const speed = isAttracting ? 0.12 : LERP_TO_SHAPE;
          pos[i3] += (target.x - pos[i3]) * speed;
          pos[i3 + 1] += (target.y - pos[i3 + 1]) * speed;
          pos[i3 + 2] += (target.z - pos[i3 + 2]) * speed;
        } else {
          // Ambient cosmic starfield
          const dx = ax - pos[i3];
          const dy = ay - pos[i3 + 1];
          const dist = Math.hypot(dx, dy) || 1;

          if (dist < 3.8) {
            const force = ((3.8 - dist) / 3.8) * 0.055;
            pos[i3] -= (dx / dist) * force;
            pos[i3 + 1] -= (dy / dist) * force;
          }

          const hx = homePositions[i3];
          const hy = homePositions[i3 + 1];
          const hz = homePositions[i3 + 2];

          pos[i3] += (hx - pos[i3]) * 0.035 + Math.sin(time * 0.8 + i) * 0.003;
          pos[i3 + 1] += (hy - pos[i3 + 1]) * 0.035 + Math.cos(time * 0.8 + i) * 0.003;
          pos[i3 + 2] += (hz - pos[i3 + 2]) * 0.035;
        }
      } else {
        // Content sections morph into thematic 3D structures
        let target: { x: number; y: number; z: number };
        if (activeSection === 'stats') {
          target = getStatsTarget(i, time);
        } else if (activeSection === 'showcase3d') {
          target = getShowcase3DTarget(i, time);
        } else if (activeSection === 'sites') {
          target = getSitesTarget(i, time);
        } else if (activeSection === 'applications') {
          target = getProjectsTarget(i, time);
        } else if (activeSection === 'skills') {
          target = getSkillsTarget(i, time);
        } else if (activeSection === 'experience') {
          target = getExperienceTarget(i, time);
        } else {
          // contact (Origami Paper Airplane)
          target = getContactTarget(i, time);
        }

        if (isAttracting) {
          // Direct click attractor to cursor
          pos[i3] += (target.x - pos[i3]) * 0.12;
          pos[i3 + 1] += (target.y - pos[i3 + 1]) * 0.12;
          pos[i3 + 2] += (target.z - pos[i3 + 2]) * 0.12;
        } else {
          // Fluid transition to shape with scroll flow
          const targetY = target.y + scrollFlowOffset;
          pos[i3] += (target.x - pos[i3]) * LERP_TO_SHAPE;
          pos[i3 + 1] += (targetY - pos[i3 + 1]) * LERP_TO_SHAPE;
          pos[i3 + 2] += (target.z - pos[i3 + 2]) * LERP_TO_SHAPE;

          // Subtle organic breathing drift
          pos[i3] += Math.sin(time * 0.8 + i) * 0.002;
          pos[i3 + 1] += Math.cos(time * 0.8 + i) * 0.002;

          // Gentle cursor proximity repulsion
          const dx = ax - pos[i3];
          const dy = ay - pos[i3 + 1];
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 3.2) {
            const force = ((3.2 - dist) / 3.2) * 0.06;
            pos[i3] -= (dx / dist) * force;
            pos[i3 + 1] -= (dy / dist) * force;
          }
        }
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
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-opacity" args={[opacities, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={mode === 'light' ? 0.045 : 0.06}
          color={accentColor}
          transparent
          opacity={mode === 'light' ? 0.4 : 0.85}
          blending={mode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={glowPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(positions), 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={mode === 'light' ? 0.09 : 0.16}
          color={accentColor}
          transparent
          opacity={mode === 'light' ? 0.12 : 0.28}
          blending={mode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

export const GlobalParticleField = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <GlobalParticleScene />
      </Canvas>
    </div>
  );
};

export default GlobalParticleField;
