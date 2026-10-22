# Graph Report - Portifolio  (2026-10-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 299 nodes · 664 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ca4069ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 37 edges
2. `react` - 34 edges
3. `framer-motion` - 28 edges
4. `usePerspective()` - 25 edges
5. `App()` - 22 edges
6. `compilerOptions` - 20 edges
7. `compilerOptions` - 18 edges
8. `GlobalParticleScene()` - 16 edges
9. `react-icons` - 12 edges
10. `Hero()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ParticleSceneProps` --references--> `ParticleShape`  [EXTRACTED]
  src/components/three/ParticleField.tsx → src/data/floatingCards.ts
- `ParticleContextValue` --references--> `ParticleShape`  [EXTRACTED]
  src/contexts/ParticleContext.tsx → src/data/floatingCards.ts
- `App()` --calls--> `Navbar()`  [EXTRACTED]
  src/App.tsx → src/components/layout/Navbar.tsx
- `Navbar()` --calls--> `ThemePicker()`  [EXTRACTED]
  src/components/layout/Navbar.tsx → src/components/layout/ThemePicker.tsx
- `App()` --calls--> `Hero()`  [EXTRACTED]
  src/App.tsx → src/components/sections/Hero.tsx

## Import Cycles
- None detected.

## Communities (17 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (33): framer-motion, lucide-react, react, react-icons, Navbar(), Hero(), AnimatedCounter(), StatCardProps (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (29): name, private, scripts, build, dev, lint, preview, type (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (17): react-dom, App(), BOOT_LINES, BootScreen(), BootScreenProps, CursorFollower(), Footer(), Contact() (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.19
Nodes (15): ThemePicker(), ThemePickerProps, ConsoleLog, FiveMConsole(), getStoredMode(), getStoredTheme(), ThemeContext, ThemeContextValue (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.21
Nodes (14): Projects(), Sites(), PreviewModal(), PreviewModalProps, getProjectIcon(), ProjectCard(), ProjectCardProps, PerspectiveContext (+6 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (17): getCodeTarget(), getCube3DTarget(), getJavaTarget(), getLuaFiveMTarget(), getReactAtomTarget(), ORBIT_ANGLES, ParticleField(), ParticleScene() (+9 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.19
Nodes (18): getCodeTarget(), getContactTarget(), getCube3DTarget(), getExperienceTarget(), getJavaTarget(), getLuaFiveMTarget(), getProjectsTarget(), getReactAtomTarget() (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (16): dependencies, autoprefixer, canvas-confetti, framer-motion, lucide-react, postcss, react, react-dom (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (9): @react-three/drei, @react-three/fiber, three, RESMON_RESOURCES, Showcase3D(), HologramModel(), Interactive3DShowcase(), RubiksCube3D() (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (7): Experience(), TimelineItem(), TimelineItemProps, EDUCATION, EXPERIENCE, EducationItem, ExperienceItem

### Community 13 - "Community 13"
Cohesion: 0.32
Nodes (5): ICON_MAP, TechBadge(), TechBadgeProps, SKILLS, Skill

### Community 14 - "Community 14"
Cohesion: 0.50
Nodes (3): buildCommand, framework, outputDirectory

## Knowledge Gaps
- **10 isolated node(s):** `autoprefixer`, `canvas-confetti`, `postcss`, `@tailwindcss/postcss`, `@types/canvas-confetti` (+5 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 126 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 0` to `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 6`, `Community 8`, `Community 11`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `autoprefixer`, `canvas-confetti`, `postcss` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1003921568627451 - nodes in this community are weakly interconnected._
- **Why does `framer-motion` connect `Community 0` to `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 11`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07196969696969698 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Community 9` to `Community 1`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1282051282051282 - nodes in this community are weakly interconnected._