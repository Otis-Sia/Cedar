# Design System Document

## 1. Overview & Creative North Star: "The Kinetic Terminal"
The Creative North Star for this design system is **"The Kinetic Terminal."** This is not a static, retro CLI mimic; it is a high-performance, futuristic interface that treats data as an art form. It bridges the gap between raw engineering power and high-end editorial sophistication.

To move beyond the "template" look, we abandon the safety of the standard 12-column grid. We embrace **intentional asymmetry**, where content blocks are offset to create a sense of motion. We use **overlapping elements**—such as text spilling over container edges—to break the "boxed-in" feel of traditional web design. The experience should feel like a living piece of software, not just a portfolio.

## 2. Colors & Surface Architecture
The color palette is rooted in deep space blacks and high-energy phosphors. It uses a high-contrast relationship between the background and the neon accents to simulate a backlit hardware interface.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. We define space through **Chroma-Shifting**. Transitions between sections must be handled by shifting from `surface` to `surface-container-low` or `surface-container-high`. This creates a seamless, molded environment rather than a collection of boxes.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#0c0e12) for the primary viewport.
- **Mid Layer:** `surface-container` (#171a1e) for primary content regions.
- **Top Layer:** `surface-container-highest` (#22262b) for interactive elements and modals.

### The "Glass & Gradient" Rule
To avoid a flat "90s terminal" look, use Glassmorphism for floating panels. 
- **Floating HUDs:** Use `surface_variant` at 60% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** Apply a subtle linear gradient to main CTAs (from `primary` to `primary_container`) to give them a "charged" energy.

## 3. Typography: Monospaced Precision
We use **Space Grotesk** for all levels. While the user requested monospaced, we utilize Space Grotesk for its "tech-humanist" qualities—it retains the geometric precision of engineering fonts while offering the readability and weight scales of a premium editorial typeface.

*   **Display (Large/Medium):** 3.5rem / 2.75rem. Use these for hero statements. Set with `-0.05em` letter spacing to feel tight and intentional.
*   **Headline (Large):** 2rem. Used for section headers. Always uppercase to mimic terminal commands.
*   **Body (Large/Medium):** 1rem / 0.875rem. For project descriptions. High line-height (1.6) is required to offset the density of technical content.
*   **Labels:** 0.75rem. Used for metadata and system status indicators.

**The Typographic Hierarchy Rule:** Distinguish data from prose. Technical specs (stack, dates, version numbers) should always use the `label-md` or `label-sm` style in `tertiary` (#8eff71) to look like system output.

## 4. Elevation & Depth
In this design system, depth is a product of light and layering, not structural shadows.

*   **Tonal Layering:** Avoid shadows on cards. Instead, place a `surface-container-highest` card on a `surface` background. The contrast in value provides the necessary lift.
*   **The Ambient Glow:** For "floating" states (like a hovered project card), do not use a black shadow. Use a diffused `primary` (#aaffdc) glow at 5% opacity with a `40px` blur to simulate light emitting from the screen.
*   **The "Ghost Border" Fallback:** If a divider is required for accessibility, use `outline-variant` at 15% opacity. It should be felt, not seen.
*   **Subtle Grid Overlays:** Implement a global background pattern using a 24px square grid. The lines should be `outline-variant` at 5% opacity. This reinforces the "engineered" aesthetic without distracting from the content.

## 5. Components

### Buttons
- **Primary:** No rounded corners (`0px`). Solid `primary` background with `on_primary` text. On hover, trigger a `primary_container` glow.
- **Secondary:** Transparent background, `0px` radius, with a `Ghost Border`. Text in `primary`.
- **States:** All transitions must be `200ms cubic-bezier(0.4, 0, 0.2, 1)`.

### Input Fields
- **Styling:** Underline-only style using `outline`. On focus, the underline transforms into `primary` and a subtle `surface-container-high` background-fill slides up from the bottom.
- **Carat:** The cursor should be a solid block (mimicking a terminal cursor) using the `tertiary` color.

### Cards & Lists
- **The Divider Ban:** Never use horizontal rules (`<hr>`). Separate list items using `1.5rem` of vertical whitespace or by alternating background tones between `surface-container-low` and `surface-container-lowest`.
- **Interactive Project Cards:** Use an asymmetrical layout. Image on the left, typography offset 24px to the right, partially overlapping the image container.

### System HUD (Additional Component)
- A floating "System Status" bar at the bottom of the viewport using `surface_container_highest` with a glassmorphism blur. It displays "Current Latency," "Local Time," and "Active Projects" in `label-sm` typography.

## 6. Do's and Don'ts

### Do
- **Do** use `0px` radius for everything. Sharp corners are non-negotiable.
- **Do** use `tertiary` (#8eff71) sparingly for "Success" states or "System Ready" indicators.
- **Do** lean into white space. High-end design is defined by what you leave out.

### Don't
- **Don't** use a standard "Drop Shadow." It breaks the digital-first terminal metaphor.
- **Don't** use 100% white. Use `on_background` (#f8f9fe) to prevent eye strain in dark mode.
- **Don't** center-align long blocks of text. Everything should be left-aligned to mimic code structures.