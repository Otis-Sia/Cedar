```markdown
# Design System Strategy: The Intelligent Muse

## 1. Overview & Creative North Star
This design system is built to transform the often-tedious process of portfolio creation into a high-end, editorial experience. Our Creative North Star is **"The Digital Curator."** 

Unlike standard "site builders" that rely on rigid, boxy grids, this system treats the interface as a living gallery. We move beyond the "template" look by utilizing **intentional asymmetry, overlapping depth, and high-contrast typography scales.** The goal is to make the user feel like they are collaborating with an elite design director, not just a software tool. By leveraging tonal depth and sophisticated layering, we create a workspace that feels premium, quiet, and infinitely professional.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in the deep obsidian and slate of high-end hardware, punctuated by the "electric" energy of AI.

### Core Palette
- **Deep Navy Base:** `background: #0b1326` (The void in which creativity happens).
- **The AI Spark:** `primary: #d2bbff` (A soft, electric lavender for guidance and focus).
- **The Precision Teal:** `tertiary: #3cddc7` (Used for data-driven insights and success states).
- **Muted Slates:** `secondary: #b9c7e0` (For secondary information and architectural stability).

### The "No-Line" Rule
**Designers are prohibited from using 1px solid borders for sectioning.** 
Structural containment must be achieved solely through background color shifts. To separate a sidebar from a main workspace, use `surface-container-low` against the `surface` background. The eye should perceive boundaries through "value changes," not "drawn lines."

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-translucent materials.
- **Base Layer:** `surface` (#0b1326).
- **Sectioning:** Use `surface-container-low` (#131b2e) for broad regions.
- **Interactive Containers:** Use `surface-container-high` (#222a3d) or `highest` (#2d3449) for cards or panels to bring them "closer" to the user.

### The "Glass & Gradient" Rule
To escape a flat, "SaaS-standard" look:
- **Glassmorphism:** Use `surface_variant` with a 60% opacity and `backdrop-blur: 20px` for floating navigation or modals.
- **Signature Gradients:** For primary CTAs or "AI Generating" states, use a linear gradient from `primary` (#d2bbff) to `inverse_primary` (#732ee4) at a 135-degree angle.

---

## 3. Typography: Editorial Authority
We utilize two distinct sans-serifs to create a hierarchy that feels like a premium magazine.

*   **Display & Headlines (Manrope):** Our "Voice." Manrope provides a tech-forward, geometric feel. 
    *   *Usage:* Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) to create a bold, authoritative presence in hero sections.
*   **Body & Labels (Inter):** Our "Engine." Inter provides unparalleled readability at small sizes.
    *   *Usage:* Use `body-md` (0.875rem) for most interface text to keep the UI feeling "streamlined" and professional.

**The Hierarchy Rule:** Always pair a `headline-lg` with a significantly smaller `label-md` or `body-sm`. This high contrast in scale is what separates "standard tools" from "curated experiences."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are largely replaced by **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#060e20) card placed on a `surface-container-low` (#131b2e) background creates a "recessed" look, while a `surface-container-highest` card creates a "lifted" look.
- **Ambient Shadows:** When a true float is required (e.g., a context menu), use a shadow with a 40px blur and 6% opacity, tinted with the `on_surface` color.
- **The Ghost Border Fallback:** If a border is required for accessibility, use the `outline_variant` (#45464d) at **20% opacity**. Never use a 100% opaque border.

---

## 5. Components: Precision & Minimalist Sophistication

### Buttons
- **Primary:** Gradient background (`primary` to `inverse_primary`), `on_primary` text, `xl` (0.75rem) corner radius. No border.
- **Secondary:** `surface-container-highest` background. Subtle "Ghost Border" on hover.
- **Tertiary:** Text-only using `primary` color. High-contrast underlays on hover.

### Input Fields
- **Styling:** Use `surface-container-lowest` for the field background. No bottom line.
- **States:** On focus, the background shifts to `surface-container-high` with a subtle `primary` glow (glow radius: 4px).
- **Labels:** Use `label-md` in `on_surface_variant` (#c6c6cd), positioned 8px above the input.

### Cards & Lists
- **Zero-Divider Policy:** Forbid the use of divider lines between list items. Use 16px or 24px of vertical white space from our spacing scale or subtle background shifts (`surface-container-low` vs `surface-container-high`) to define groups.
- **Asymmetric Layouts:** In portfolio galleries, alternate between `lg` (0.5rem) and `xl` (0.75rem) roundedness for different content types to break the "grid monotony."

### AI Contextual Floating Bar
- **Description:** A persistent floating element for AI prompts.
- **Style:** Glassmorphism (`surface_variant` @ 70% opacity), `backdrop-blur: 12px`, with a `tertiary` (#3cddc7) "pulse" indicator to show the AI is "thinking."

---

## 6. Do's and Don'ts

### Do
- **Do** use generous white space. If you think there's enough space, add 16px more.
- **Do** use `tertiary` (#3cddc7) sparingly as a "surgical" accent for AI-generated suggestions.
- **Do** use asymmetric margins (e.g., a wider left margin than right) to create an editorial, non-templated layout.

### Don't
- **Don't** use 100% black (#000000). Always use `surface` (#0b1326) to maintain the sophisticated navy undertone.
- **Don't** use sharp corners. Everything must use at least the `DEFAULT` (0.25rem) radius to feel "approachable."
- **Don't** use standard "Select" dropdowns. Design custom, layered overlays that respect the Glassmorphism rules.
- **Don't** use center-aligned text for body copy. Keep it left-aligned for a professional, "high-end tool" feel.```