# Design System Document: The Architectural Developer

## 1. Overview & Creative North Star
**Creative North Star: "The Precise Monolith"**

This design system rejects the "cookie-cutter" developer portfolio. Instead of standard grids and heavy borders, it draws inspiration from high-end IDEs and architectural blueprints. It aims for a "Precise Monolith" aesthetic—an experience that feels structurally indestructible yet digitally fluid. 

The system moves beyond a basic tech look by utilizing **intentional asymmetry** and **tonal depth**. We break the template feel by using large, editorial type scales (Space Grotesk) contrasted against technical, utilitarian monospaced details. The goal is to present the developer not just as a coder, but as a digital architect.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep slates and electric cyans, creating a high-contrast, premium tech environment.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved through background shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. This creates a "molded" look rather than a "boxed" look.

### Surface Hierarchy & Nesting
Depth is created through a physical "stacking" of tonal values.
- **Base Level:** `surface` (#0b1326)
- **Deep Recess:** `surface-container-lowest` (#060e20) — Used for footer areas or code blocks.
- **Raised Elevation:** `surface-container-high` (#222a3d) — Used for interactive cards.
- **Top Layer:** `surface-container-highest` (#2d3449) — Used for modals or floating navigation.

### The "Glass & Gradient" Rule
To avoid a flat, "Bootstrap" feel, floating elements (like navigation bars) must utilize **Glassmorphism**.
- **Specs:** Background color at 60% opacity with a `24px` backdrop-blur. 
- **Signature Gradients:** Use a subtle linear gradient from `primary` (#7bd0ff) to `primary-container` (#00a7e0) at a 135-degree angle for hero CTAs to add "soul" to the technical precision.

---

## 3. Typography
The typography system relies on the tension between the expressive **Space Grotesk** (Display/Headlines) and the functional **Inter** (Body).

*   **Display (Space Grotesk):** Large, aggressive sizing (up to 3.5rem) with tighter letter-spacing (-0.02em). Use this for hero statements and project titles to establish an editorial authority.
*   **Headline/Title (Space Grotesk):** Provides structural landmarks. Use `headline-lg` for section headers to maintain the architectural feel.
*   **Body (Inter):** High-readability sans-serif. Used for long-form case studies and descriptions.
*   **Labels (Space Grotesk):** Small, all-caps snippets used for metadata (e.g., "TECH STACK," "YEAR").
*   **Code Snippets (Fira Code):** (Supplemental) Use for technical implementation details, paired with `surface-container-lowest` backgrounds.

---

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Instead of shadows, "lift" a card by placing a `surface-container-lowest` element on top of a `surface-container-low` section. The subtle shift in slate tones creates a sophisticated, natural separation.
*   **Ambient Shadows:** If a floating effect is required (e.g., a popover), use a custom shadow: `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow must be tinted with the `on-surface` color to feel integrated into the environment.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` (#3e4850) at **15% opacity**. Never use 100% opaque lines.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill (Primary to Primary-Container). `Border-radius: 0.25rem`. No border. Text is `on-primary-fixed` (#001e2c).
*   **Secondary:** Ghost style. No fill. A `Ghost Border` (outline-variant at 20%). On hover, the background shifts to `surface-bright`.
*   **Tertiary:** Text-only with a monospaced "01/" prefix to denote order.

### Cards & Projects
*   **Rule:** Forbid divider lines. Use `surface-container` tiers and `0.75rem` (xl) roundedness to define project blocks.
*   **Interaction:** On hover, a card should shift from `surface-container-low` to `surface-container-high` with a subtle `2px` upward translation.

### Input Fields
*   **Style:** Minimalist. No background fill. Only a bottom "Ghost Border." Upon focus, the bottom border transitions to 100% `primary` (#7bd0ff) with a `4px` glow.

### Code Blocks (Portfolio Specific)
*   **Container:** `surface-container-lowest`. 
*   **Detail:** Include a "Mac-style" window control (three dots) in the top-left, using `tertiary` (#ffb86e) for the accents to provide a splash of warmth against the blue palette.

---

## 6. Do's and Don'ts

### Do
*   **DO** use white space aggressively. Let the `display-lg` typography breathe.
*   **DO** use monospaced fonts for numerical data (dates, metrics, line numbers).
*   **DO** use "Primary Fixed" colors for elements that must remain consistent between light and dark modes (like brand accents).

### Don't
*   **DON'T** use `primary` (#7bd0ff) for large background areas; it is an accent "light source," not a surface.
*   **DON'T** use standard 1px borders to separate your header from your content. Use a background color shift or a glassmorphism blur.
*   **DON'T** use pure black (#000000). The deepest dark should be `surface-container-lowest` (#060e20) to maintain tonal richness.