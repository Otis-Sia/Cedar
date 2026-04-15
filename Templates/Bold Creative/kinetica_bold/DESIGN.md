# Design System: Editorial Brutalism

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Curator"**
This design system rejects the "template" aesthetic of the modern web in favor of a high-impact, editorial approach. It is designed for creators who want their work to feel visceral and urgent. By combining the raw energy of **Bold Sans-Serif Typography** with a sophisticated **Tonal Layering** system, we move away from "standard" UI. The goal is to create a digital space that feels like a premium, oversized coffee-table book: intentional asymmetry, massive type scales, and a rejection of traditional dividers.

The experience is defined by **Dynamic Tension**. We use extreme contrast—both in color and in scale—to guide the eye. Elements should feel like they are floating on a deep, expansive canvas, using "nested depth" rather than rigid borders to define sections.

---

## 2. Colors & Surface Philosophy
The palette is a high-contrast interplay between a deep, "oxblood" dark mode base (`#240305`) and electric, vibrant accents (`#ff8f73`, `#00eefc`).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. Separation must be achieved through:
1.  **Background Shifts:** Use `surface-container-low` for secondary sections sitting on the `surface` background.
2.  **Negative Space:** Use the spacing scale to create clear "islands" of content.
3.  **Tonal Transitions:** Subtle shifts between `surface-container` tiers are the only acceptable way to denote hierarchy.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-translucent materials.
*   **Base Layer:** `surface` (`#240305`) - The infinite canvas.
*   **Secondary Layer:** `surface-container-low` (`#2c0508`) - For large, grouped content areas.
*   **Priority Layer:** `surface-container-highest` (`#491216`) - For interactive cards or high-priority modals.

### The "Glass & Gradient" Rule
To avoid a "flat" feel, use **Glassmorphism** for floating elements (like Navigation Bars or Tooltips). Apply `surface` colors at 70% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** For main CTAs, use a linear gradient: `primary` (`#ff8f73`) to `primary-container` (`#ff7856`) at a 135-degree angle. This provides a "soul" to the vibrant red-orange tones.

---

## 3. Typography
We utilize a dual-typeface system to balance "Editorial Impact" with "Functional Clarity."

*   **Display & Headlines (Epilogue):** This is our "Brutalist" voice. Use `display-lg` (3.5rem) for hero statements. These should often be set with tight letter-spacing (-0.02em) to feel heavy and authoritative.
*   **Secondary & Body (Plus Jakarta Sans):** This is our "Functional" voice. It provides a modern, geometric clarity that balances the weight of Epilogue. Use `body-lg` (1rem) for descriptions to maintain high legibility against the dark background.

**Hierarchy as Identity:** 
Large typography isn't just for reading; it's a structural element. Allow headlines to intentionally "crowd" or overlap image containers to create a sense of dynamic composition.

---

## 4. Elevation & Depth
In this system, depth is **Tonal**, not structural. We avoid the "shadow-heavy" look of 2010-era design.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The minute shift in value creates a natural, soft lift.
*   **Ambient Shadows:** For elements that truly "float" (e.g., a portfolio project preview), use a wide-dispersion shadow: `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow should never be pure black; it should feel like an occlusion of the `on-surface` light.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` (`#6c393a`) at **15% opacity**. This creates a "suggestion" of a boundary without breaking the editorial flow.

---

## 5. Components

### Buttons (The "Statement" Component)
Our buttons are oversized and unapologetic. 
*   **Primary:** `primary` background with `on-primary` text. Use `full` roundedness (9999px) for a "pill" look that contrasts against the sharp grid.
*   **Interaction:** On hover, the button should scale slightly (1.05x) and transition to `primary-fixed-dim`.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Layout:** Project cards should use asymmetrical padding. Image on top, `headline-sm` title, and a `label-md` category. Use `surface-variant` for the card background to make images pop.

### Inputs & Fields
*   **Style:** Underline-only inputs using `outline` (`#a16565`). When focused, the line transitions to `secondary` (`#00eefc`) and thickens from 1px to 2px.
*   **Error State:** Use `error` (`#ff6e84`) for text and `error_container` for the background of the error message box.

### Chips
*   Use `secondary-container` for the background and `on-secondary-container` for text. These are small, sharp accents that guide the user through tags or filters.

---

## 6. Do's and Don'ts

### Do
*   **DO** use white space aggressively. A single project should often take up 80% of the viewport height.
*   **DO** use `secondary` (`#00eefc`) sparingly as a "laser pointer" for the eye—use it for links or active states only.
*   **DO** ensure that the "Dark/Light" toggle maintains the same contrast ratios; in Light Mode, `surface` becomes `inverse-surface`.

### Don't
*   **DON'T** use 1px borders to separate content. It kills the "High-End Editorial" feel.
*   **DON'T** use standard 12-column grids for everything. Experiment with a 5-column or 3-column "offset" grid to create visual interest.
*   **DON'T** use default drop shadows. If it looks like a standard UI card, you've gone too far toward the "generic."

### Accessibility Note
While we prioritize "Bold and Vibrant," never sacrifice legibility. Ensure all `on-surface` text on `surface` backgrounds maintains a minimum 4.5:1 contrast ratio. The `primary` on `surface` achieves this naturally with our oxblood/orange-red pairing.