# Graph Report - Portifolio  (2026-11-24)

## Corpus Check
- 109 files · ~299,619 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: .toml 4, .css 2, (none) 1)

## Summary
- 890 nodes · 1295 edges · 61 communities (59 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ffd4986`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- package.json
- Nielsen's 10 Heuristics
- compilerOptions
- Animation Recipes
- Responsive Design
- Hero.tsx
- compilerOptions
- GlobalParticleField.tsx
- dependencies
- Frontend UI Engineering
- critique.md
- onboard.md
- Operate mode depth (and Read notes)
- vercel.json
- tsconfig.json
- The Toolkit
- new-work.md
- animate.md
- live.md
- New visual work
- optimize.md
- Impeccable Asset Producer
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- Simplify the Design
- Hardening Dimensions
- clarify.md
- document.md
- Handle `generate`
- polish.md
- quieter.md
- Init flow
- iOS platform
- Android platform
- Diagnostic Scan
- colorize.md
- doctor.md
- Extract Flow
- live-setup.md
- Shape
- typeset.md
- Frontend Design
- Generate Report
- Generate Report
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- layout.md
- Diagnostic Scan
- bolder.md
- Visualize: Direction Comps & Asset Production
- Adaptation Strategies
- Impeccable Documenter
- generate.md
- 4. Plan three variants: identity first, then mode, then axes
- Region map
- Operate
- Persuade and Experience
- Read
- impeccable/SKILL.md
- delight.md

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 39 edges
2. `react` - 35 edges
3. `framer-motion` - 30 edges
4. `usePerspective()` - 27 edges
5. `App()` - 23 edges
6. `compilerOptions` - 20 edges
7. `compilerOptions` - 18 edges
8. `GlobalParticleScene()` - 16 edges
9. `Animation Recipes` - 15 edges
10. `Frontend UI Engineering` - 13 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `Hero()`  [EXTRACTED]
  src/App.tsx → src/components/sections/Hero.tsx
- `App()` --calls--> `GlobalParticleField()`  [EXTRACTED]
  src/App.tsx → src/components/three/GlobalParticleField.tsx
- `App()` --calls--> `ThemeProvider()`  [EXTRACTED]
  src/App.tsx → src/contexts/ThemeContext.tsx
- `Navbar()` --calls--> `ThemePicker()`  [EXTRACTED]
  src/components/layout/Navbar.tsx → src/components/layout/ThemePicker.tsx
- `Hero()` --calls--> `CVDropdown()`  [EXTRACTED]
  src/components/sections/Hero.tsx → src/components/ui/CVDropdown.tsx

## Import Cycles
- None detected.

## Communities (61 total, 2 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.05
Nodes (76): framer-motion, lucide-react, react, react-dom, react-icons, App(), CodeShowcase, Contact (+68 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (42): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+34 more)

### Community 2 - "Nielsen's 10 Heuristics"
Cohesion: 0.05
Nodes (39): 10. Help and Documentation, 1. Impatient Power User: "Alex", 1. The Wall of Options, 1. Visibility of System Status, 2. Confused First-Timer: "Jordan", 2. Match Between System and Real World, 2. The Memory Bridge, 3. Accessibility-Dependent User: "Sam" (+31 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 4 - "Animation Recipes"
Cohesion: 0.06
Nodes (31): Accordion / collapse, Animation Recipes, Button press, Drag to dismiss, Drawer / sheet, Dropdown, popover, menu, select, Hold to confirm, Masking a crossfade that won't settle (+23 more)

### Community 5 - "Responsive Design"
Cohesion: 0.08
Nodes (25): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+17 more)

### Community 6 - "Hero.tsx"
Cohesion: 0.12
Nodes (25): FloatingHeroCard(), FloatingHeroCardProps, Hero(), getCodeTarget(), getCube3DTarget(), getJavaTarget(), getLuaFiveMTarget(), getReactAtomTarget() (+17 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 8 - "GlobalParticleField.tsx"
Cohesion: 0.06
Nodes (47): @react-three/drei, @react-three/fiber, three, ThemePicker(), ThemePickerProps, getCodeTarget(), getContactTarget(), getCube3DTarget() (+39 more)

### Community 9 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, autoprefixer, canvas-confetti, framer-motion, lucide-react, postcss, react, react-dom (+8 more)

### Community 10 - "Frontend UI Engineering"
Cohesion: 0.08
Nodes (24): Accessibility (WCAG 2.1 AA), ARIA Labels, Avoid the AI Aesthetic, Color, Common Rationalizations, Component Architecture, Component Patterns, Design System Adherence (+16 more)

### Community 11 - "critique.md"
Cohesion: 0.09
Nodes (22): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Design Health Score, Design Specificity Verdict (+14 more)

### Community 12 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 13 - "Operate mode depth (and Read notes)"
Cohesion: 0.10
Nodes (18): Craft floor, Refuse, Verify, Constraints, Failure modes, Flow, $impeccable hooks, Routing (+10 more)

### Community 14 - "vercel.json"
Cohesion: 0.50
Nodes (3): buildCommand, framework, outputDirectory

### Community 17 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 18 - "new-work.md"
Cohesion: 0.27
Nodes (4): Assess Adaptation Challenge, Implement & Verify, Recommended Actions, Craft (deprecated alias)

### Community 19 - "animate.md"
Cohesion: 0.22
Nodes (8): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode

### Community 20 - "live.md"
Cohesion: 0.12
Nodes (15): Cleanup, Exit, First-time setup, Handle `accept`, Handle `discard`, Handle fallback, Handle `manual_edit_apply`, Handle `prefetch` (+7 more)

### Community 21 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 22 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 23 - "Impeccable Asset Producer"
Cohesion: 0.15
Nodes (11): Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve, Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract (+3 more)

### Community 24 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 25 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 26 - "Hardening Dimensions"
Cohesion: 0.17
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 27 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 28 - "document.md"
Cohesion: 0.18
Nodes (10): Pitfalls, Seed mode, Step 1: Route through new-work's workshop, Step 2: Write seed DESIGN.md, Step 3: Confirm, Style guidelines, The frontmatter: token schema, The markdown body: eight sections (canonical order) (+2 more)

### Community 29 - "Handle `generate`"
Cohesion: 0.18
Nodes (11): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done, Aborting an in-flight session (+3 more)

### Community 30 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 31 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 32 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 33 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 34 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 35 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Diagnostic Scan

### Community 36 - "colorize.md"
Cohesion: 0.25
Nodes (7): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode

### Community 37 - "doctor.md"
Cohesion: 0.25
Nodes (7): Monorepo notes, Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 38 - "Extract Flow"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 39 - "live-setup.md"
Cohesion: 0.25
Nodes (7): append-arrays, append-string, Config drift, Consent prompt (use this phrasing), CSP detection (first-time only), Troubleshooting, Write the config

### Community 40 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 41 - "typeset.md"
Cohesion: 0.25
Nodes (7): Apply, Line breaks, Live-mode signature params, Set the system, Two isolated assessments, Verify, Visitor mode

### Community 42 - "Frontend Design"
Cohesion: 0.29
Nodes (6): Design principles, Frontend Design, Ground your designs in the subject matter, More on writing in design, Process: plan, review against the brief, build, critique, Restraint and self-critique

### Community 43 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Implementation Integrity Verdict, Patterns & Systemic Issues, Positive Findings

### Community 44 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 45 - "Impeccable Finish Reviewer"
Cohesion: 0.29
Nodes (6): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass

### Community 46 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 47 - "layout.md"
Cohesion: 0.29
Nodes (6): Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments, Verify, Visitor mode

### Community 48 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 49 - "bolder.md"
Cohesion: 0.33
Nodes (5): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat

### Community 50 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.33
Nodes (5): After approval: the comp becomes a spec, Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

### Community 51 - "Adaptation Strategies"
Cohesion: 0.40
Nodes (5): Adaptation Strategies, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app)

### Community 52 - "Impeccable Documenter"
Cohesion: 0.40
Nodes (4): Impeccable Documenter, Input Contract, Output Contract, Workflow

### Community 53 - "generate.md"
Cohesion: 0.40
Nodes (4): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close

### Community 54 - "4. Plan three variants: identity first, then mode, then axes"
Cohesion: 0.40
Nodes (5): 4. Plan three variants: identity first, then mode, then axes, Phase A: Extract the identity (non-skippable), Phase B: Pick mode (default vs departure), Phase C: Plan three variants, Phase D: Squint test

### Community 55 - "Region map"
Cohesion: 0.40
Nodes (4): Containment, Painted material, Region map, What varies independently

### Community 56 - "Operate"
Cohesion: 0.50
Nodes (3): Comps, Directions, Operate

### Community 57 - "Persuade and Experience"
Cohesion: 0.50
Nodes (3): Comps, Directions, Persuade and Experience

### Community 58 - "Read"
Cohesion: 0.50
Nodes (3): Comps, Directions, Read

### Community 59 - "impeccable/SKILL.md"
Cohesion: 0.18
Nodes (8): Recommended Actions, Command guidance, No-argument routing: the context-aware menu, Workflow questions, Commands, How to design, Modes, Setup

### Community 60 - "delight.md"
Cohesion: 0.29
Nodes (6): Build for the emotional moment, Define one delight thesis, Find the opportunity, Protect the experience, Verify, Visitor mode

## Knowledge Gaps
- **10 isolated node(s):** `@tailwindcss/postcss`, `@types/canvas-confetti`, `@types/three`, `autoprefixer`, `canvas-confetti` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 584 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Reference Material` connect `Nielsen's 10 Heuristics` to `critique.md`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `@tailwindcss/postcss`, `@types/canvas-confetti`, `@types/three` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05151706700379267 - nodes in this community are weakly interconnected._
- **Why does `react` connect `App.tsx` to `GlobalParticleField.tsx`, `package.json`, `Hero.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04927536231884058 - nodes in this community are weakly interconnected._
- **Why does `Handle `generate`` connect `Handle `generate`` to `live.md`, `4. Plan three variants: identity first, then mode, then axes`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Nielsen's 10 Heuristics` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._