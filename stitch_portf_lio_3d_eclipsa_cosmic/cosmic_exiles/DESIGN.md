---
name: Cosmic Exiles
colors:
  surface: '#160f26'
  surface-dim: '#160f26'
  surface-bright: '#3d354e'
  surface-container-lowest: '#110a21'
  surface-container-low: '#1f182f'
  surface-container: '#231c33'
  surface-container-high: '#2d263e'
  surface-container-highest: '#38314a'
  on-surface: '#e9ddfe'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#e9ddfe'
  inverse-on-surface: '#342c45'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#ffc640'
  on-secondary: '#402d00'
  secondary-container: '#e3aa00'
  on-secondary-container: '#5a4100'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#6900b3'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#160f26'
  on-background: '#e9ddfe'
  surface-variant: '#38314a'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels an enigmatic fusion of savage Hyborian dark fantasy and celestial void mysticism. It serves as an elite showcase for senior 3D character, environment, weapon, and armor artistry targeted at AAA game directors, art leads, cinematic studios, and fantasy gaming enthusiasts. 

The aesthetic is characterized as **Cosmic Dark Fantasy / Glassmorphic Void**. It merges the tactile grit of Conan's brutal stone-and-steel universe with ethereal nebulae, starlight reflections, and deep astral chambers. Surfaces are treated like abyssal obsidian plates catching light from dying stars, balancing vast negative space with high-impact 3D model presentations. The interface feels weightless yet grounded—whispering ancient cosmic secrets while maintaining the technical precision of Unreal Engine 5 showcase viewports and ArtStation Pro standards.

## Colors

The color architecture balances cosmic void shadows with volatile celestial accents:

- **Surface & Void (Neutrals):** The foundational backdrop is an obsidian abyss (`#0c0717` to `#120b22`), rising through translucent crystalline plateaus (`#1a1030` and `#241142`) that isolate complex render passes without chromatic noise.
- **Astral Arcana (Primary - Violet Range):** Led by luminous violet (`#a855f7`), flanked by deep rift indigo (`#7c3aed`) for interactive depth and stellar highlight lilac (`#c084fc`) for key focus points, energy conduits, and active states.
- **Stellar Gold (Secondary):** A rich astral gold (`#fbbf24`), symbolizing legendary relic status, mastery badges, critical CTA highlights, and divine craftsmanship within barbaric lore.
- **Mystic Cyan (Tertiary):** An arcane starlight cyan (`#38bdf8`), utilized sparingly for technical telemetry, wireframe inspect toggles, real-time lighting cues, and UV map metadata.

## Typography

The typographic hierarchy communicates both the futuristic cutting-edge fidelity of 3D pipelines and the mythic scale of dark fantasy:

- **Display & Headlines (Space Grotesk):** Provides structured geometric confidence with an architectural slant. Tight tracking enhances monumentality in project titling, asset categories, and world-building headers.
- **Body Text (Hanken Grotesk):** Ensures immaculate legibility when presenting breakdowns of high-poly sculpts, lore passages, rigging constraints, and client deliverables.
- **Technical & UI Telemetry (JetBrains Mono):** Emphasizes technical craftsmanship—polycount metrics, texture set declarations (4K/8K UDIMs), engine specifications (UE5 Nanite/Lumen), and modal coordinates.

## Layout & Spacing

The layout is built on a 12-column adaptive fluid grid engineered to host immersive, panoramic viewport previews and multi-angle 3D turntables.

- **Desktop (1200px+):** 12 columns with 1.5rem gutters and 3rem outer margins. Showcases accommodate asymmetric visual anchors—giving 8 columns to hero 3D model viewports and 4 columns to technical breakdowns, wireframe toggles, and lore records.
- **Tablet (768px - 1199px):** 8 columns with 1.25rem gutters and 2rem outer margins. Media containers transition to high-impact stacked viewports with collapsible asset telemetry sheets.
- **Mobile (< 768px):** 4 columns with 1rem gutters and 1.25rem margins. Viewports collapse into edge-to-edge full-bleed carousels with floating quick-action HUDs.

## Elevation & Depth

Visual hierarchy does not rely on opaque stacking or harsh flat borders; rather, it uses astronomical depth, spectral backdrops, and luminous perimeter glows:

- **Base Canvas (Level 0):** Pure abyssal void `#0c0717` layered with low-opacity, radial CSS dust nebulae (`rgba(124, 58, 237, 0.08)`).
- **Surface Panels (Level 1):** Translucent obsidian glass using `rgba(26, 16, 48, 0.65)` backdropped by a `16px` blur filter and bounded by a razor-thin perimeter border (`rgba(168, 85, 247, 0.15)`).
- **Elevated Asset Cards & Viewports (Level 2):** Semi-opaque void chambers (`rgba(36, 17, 66, 0.7)`) with a `24px` backdrop blur, subtle inner glow (`inset 0 1px 1px rgba(251, 191, 36, 0.15)`), and an ambient drop shadow tinted in deep astral purple (`0 20px 40px -15px rgba(18, 11, 34, 0.9)`).
- **Floating Overlays & Modals (Level 3):** Frosted abyssal plates surrounded by reactive starlight aura (`0 0 30px rgba(124, 58, 237, 0.25)` and `0 20px 50px rgba(0, 0, 0, 0.8)`).

## Shapes

The shape system adopts **Soft (Level 1)** geometric contouring. By utilizing tight, deliberate corner radii (`0.25rem` base, `0.5rem` on cards and viewports), components retain the architectural discipline of ancient carved monoliths, forged steel, and high-tech 3D viewports, avoiding overly playful or child-like softness. Interactive elements occasionally employ chamfered or beveled accent cuts inspired by barbarian weaponry and celestial astrolabes.

## Components

### Interactive Buttons
- **Primary (Astral Flare):** Solid cosmic purple gradient (`#7c3aed` to `#a855f7`) with bright white/gold text, framed by an exterior 1px aura glow. On hover, the aura blooms outward, and brightness increases with a subtle translate-y shift.
- **Secondary (Relic Gold):** Outlined button with an astral gold boundary (`#fbbf24`), subtle void fill (`rgba(251, 191, 36, 0.05)`), and gold typography. Hover activates a luminous golden wash (`rgba(251, 191, 36, 0.15)`).
- **Ghost / Viewport Tool Buttons:** Dark glass buttons with mystic cyan text or glyph icons, changing to full cyan backlights when tools (wireframe, UV, lighting) are toggled active.

### Chips & Filter Tags
- Miniature obsidian tags built with `JetBrains Mono` uppercase typography. Non-active chips use `rgba(168, 85, 247, 0.1)` with faint violet borders. Active category filters (e.g., `CHARACTER`, `WEAPONRY`, `ENVIRONMENT`) illuminate with stellar gold outlines and gold-tinted particle dots.

### Cards & 3D Model Display Modules
- Deep obsidian glass base with `0.5rem` corner radius. The preview image/canvas sits flush at the top with a subtle vignette.
- Bottom metadata pane displays asset title in `Space Grotesk`, polycount badges in `JetBrains Mono`, and subtle engine icons (UE5, ZBrush, Substance). Hovering the card ignites a gentle neon nebula blur behind the element and triggers turntable playback or interactive rotation.

### Form Inputs & Search Filters
- Deep void inputs (`rgba(18, 11, 34, 0.85)`) with crisp `rgba(168, 85, 247, 0.2)` borders. Focused state commands immediate attention via a dual mystic cyan glow ring (`box-shadow: 0 0 0 1px #38bdf8, 0 0 12px rgba(56, 189, 248, 0.35)`).

### Specialized Portfolio Components
- **Model Inspector HUD:** Floating glass dock pinned to the bottom of the viewport featuring switches for `Clay`, `Wireframe`, `Albedo`, and `Roughness`.
- **Lore & Spec Accordion:** Obsidian drawer lined with starlight cyan indicators, providing historical Conan universe lore alongside production-ready technical specs.