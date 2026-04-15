# Design System Document: Architectural Monolith

## 1. Overview & Creative North Star: "The Silent Monolith"
The Creative North Star for this design system is **The Silent Monolith**. In architecture, the most profound impact often comes from what is *not* there—the void, the shadow, and the raw material. This system moves away from the "web-template" aesthetic by treating the screen as a physical site. We reject decorative clutter in favor of intentional asymmetry, massive typographic scales, and tonal depth.

This is not a "minimalist" skin; it is a structural philosophy. We break the rigid grid through "bleeding" imagery and overlapping typography, ensuring the portfolio feels like a high-end editorial monograph rather than a digital gallery.

## 2. Colors: Tonal Architecture
The palette is strictly monochrome, utilizing the Material Design convention to create a sophisticated range of light and shadow.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background shifts. For instance, a project description in `surface-container-low` (#f2f4f4) should sit directly against a `surface` (#f9f9f9) hero area. The transition is the boundary.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine vellum. Use `surface-container-lowest` (#ffffff) for the most prominent foreground elements (like active project cards) and `surface-dim` (#d4dbdd) for recessed background elements.
*   **The "Glass & Gradient" Rule:** To introduce "soul" into the monochrome, floating navigation bars must utilize Glassmorphism. Use `surface` (#f9f9f9) at 70% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** For main Call-to-Actions, use a subtle linear gradient from `primary` (#5e5e5e) to `primary-dim` (#525252). This creates a "brushed metal" or "honed stone" depth that flat hex codes cannot replicate.

## 3. Typography: Editorial Authority
The interplay between the serif and sans-serif reflects the architect's duality: the artist (Serif) and the engineer (Sans-Serif).

*   **Display & Headlines (Noto Serif):** These are your structural beams. Use `display-lg` (3.5rem) with tight letter-spacing for project titles. The serif choice conveys heritage and prestige.
*   **Body & Labels (Inter):** The "engineer's" font. Highly legible and neutral. Use `body-md` (0.875rem) for descriptions to ensure the imagery remains the protagonist.
*   **Asymmetric Hierarchy:** Don't center-align everything. Use `headline-lg` aligned to the far left, while the corresponding `body-lg` text is tucked into a narrow column on the right, creating a sense of architectural tension and "white space as a material."

## 4. Elevation & Depth: Tonal Layering
We do not use "shadows" in the traditional sense; we use light physics.

*   **The Layering Principle:** Stacking determines importance. A modal should not just "pop up"; it should be a `surface-container-highest` (#dde4e5) layer sliding over a `surface` layer.
*   **Ambient Shadows:** If a floating element (like a floating action button for a floor plan) requires a lift, use an "Ambient Shadow": `color: on-surface` (#2d3435), `opacity: 4%`, `blur: 40px`, `y-offset: 10px`. It should feel like a cloud’s shadow, not a drop shadow.
*   **The "Ghost Border" Fallback:** For input fields where a boundary is required for accessibility, use the `outline-variant` (#adb3b4) at 15% opacity. It should be barely perceptible—a "ghost" of a line.

## 5. Components: The Structural Elements

*   **Buttons:**
    *   **Primary:** Solid `primary` (#5e5e5e) with `on-primary` (#f8f8f8) text. Shape: Absolute `0px` radius (Sharp edges only).
    *   **Secondary:** `primary-container` (#e2e2e2) background. No border.
    *   **Tertiary:** Underlined `label-md` text. The underline should be 1px and offset by 4px.
*   **Cards & Lists:** 
    *   **Strict Rule:** No dividers. Separate list items using `24px` of vertical whitespace or a subtle shift from `surface` to `surface-container-low`.
    *   **Imagery:** Images in cards must be full-bleed to the container edge.
*   **Input Fields:**
    *   Bottom-border only. Use `outline` (#757c7d) at 20% opacity. Upon focus, the border transitions to `primary` (#5e5e5e) and expands to 2px.
*   **Interactive Floorplans (Custom Component):**
    *   Use `tertiary-container` (#d0ecff) for interactive "hotspots" within architectural drawings to provide a singular, sophisticated point of color in an otherwise monochrome world.

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Edge:** Use `0px` border-radius globally. The architecture is precise; the UI must be too.
*   **Maximize Margin:** Give project titles 120px of breathing room from the top navigation.
*   **Toggle Gracefully:** Ensure the transition between Light and Dark mode is a slow (500ms) fade, mimicking the setting of the sun on a building facade.

### Don’t:
*   **No Rounded Corners:** Never use `border-radius`. It softens the "High-End" architectural intent.
*   **No High-Contrast Dividers:** Never use a #000000 1px line to separate sections. It breaks the "Monolith" flow.
*   **No Generic Grids:** Avoid the "3-column card grid" for portfolios. Try a 2-column staggered layout where the left image is larger than the right.

## 7. Token Reference Summary
*   **Corner Radius:** `none / 0px` (Across all components)
*   **Primary Accent:** `#5e5e5e` (Muted Slate)
*   **Background:** `#f9f9f9` (Cool Paper)
*   **Headings:** Noto Serif (Weight: 400 or 700)
*   **Body:** Inter (Weight: 400)