```markdown
# The Design System: Creative Portfolio Edition

## 1. Overview & Creative North Star: "The Kinetic Scrapbook"
This design system moves away from the rigid, sterile "tech" aesthetic to embrace the spirit of an active illustrator’s workspace. Our Creative North Star is **The Kinetic Scrapbook**: a digital environment that feels tactile, curated, and intentionally organic. 

We break the "template" look by treating the viewport not as a grid, but as a canvas. We utilize **Bento-Box layout logic**—where content is grouped into distinct, rounded containers—but we subvert the grid’s stiffness through **intentional asymmetry, overlapping elements, and exaggerated soft-geometry.** The result is a premium, high-end experience that feels "hand-assembled" rather than "machine-generated."

---

## 2. Colors: Tonal Vibrancy
Our palette is rooted in warmth. We use high-chroma accents (Coral and Teal) against a "Sunny" foundation (Yellow) to create a sense of optimism.

*   **Primary (`#776300`):** Used for high-impact brand moments and heavy-weight typography.
*   **Secondary (`#ac4218`):** The "Coral" energy. Use this for high-priority CTAs and interactive highlights.
*   **Tertiary (`#007261`):** The "Teal" stabilizer. Provides a cooling contrast to the warmer tones, ideal for categorizing work or labeling.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries must be established through color-blocking and tonal transitions. For example, a `surface-container-low` section should sit directly against a `background` section. Let the change in hue define the edge.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of thick, high-quality cardstock. 
*   **The Base:** `background` (#fffbff)
*   **The Content Well:** `surface-container` (#fff6a5)
*   **The Elevated Card:** `surface-container-highest` (#f4eb90)
*   Nesting a `surface-container-lowest` card inside a `surface-container-high` section creates a "recessed" or "inset" feel that adds tactile depth without shadows.

### The "Glass & Gradient" Rule
To add a "signature" polish, use semi-transparent layers. Floating navigation bars or modal overlays should use `surface` colors at 80% opacity with a `24px` backdrop-blur. 
*   **Signature Texture:** Use a subtle radial gradient transitioning from `primary` to `primary_container` on hero buttons to give them a "puffy," 3D character.

---

## 3. Typography: Expressive Geometry
We use **Plus Jakarta Sans** for its friendly, open counters and modern geometric feel, which perfectly mirrors our rounded UI elements.

*   **Display (lg/md/sm):** These are your "vibe-setters." Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero headlines. This conveys confidence and artistic authority.
*   **Headlines & Titles:** Use `headline-md` for bento-box headers. These should always be in the `on_surface` or `primary` color to maintain readability.
*   **Body (lg/md/sm):** Keep body text grounded. `body-lg` is your workhorse for descriptions. Ensure line heights are generous (1.6) to maintain the "friendly" and "breatheable" brand promise.
*   **Labels:** Use `label-md` in `all-caps` with slight letter spacing for meta-data (e.g., "PROJECT DATE") to create a professional, editorial contrast against the playful display type.

---

## 4. Elevation & Depth: Tonal Layering
In this system, "Elevation" is a color theory exercise, not a shadow exercise.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on top of `surface-container-low` backgrounds. The subtle shift from a creamy white to a soft yellow creates a natural "lift."
*   **Ambient Shadows:** For floating elements (like an active "Project Details" card), use a highly diffused shadow: `box-shadow: 0 20px 40px rgba(61, 57, 5, 0.08);`. Note the shadow uses a tint of `on_surface` (the dark yellow-brown) rather than black, keeping the look organic.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` at 20% opacity. It should be felt, not seen.
*   **Bento-Box Curvature:** Strictly follow the Roundedness Scale. Use `xl` (3rem) for main bento containers and `md` (1.5rem) for nested elements. This "nested rounding" (where inner corners are smaller than outer corners) is a hallmark of high-end industrial design.

---

## 5. Components

### Buttons
*   **Primary:** Background: `secondary` (#ac4218); Text: `on_secondary` (#ffffff). Shape: `full` (pill-shaped). 
*   **Interaction:** On hover, scale the button to 105% and shift background to `secondary_dim`.
*   **Secondary:** Background: `surface-container-highest`; Text: `on_surface`. A soft, low-contrast alternative for secondary actions.

### Cards (The Bento Unit)
*   **Design:** No borders. Background: `surface-container`. Padding: `2rem`.
*   **Rule:** Forbid divider lines. Separate content using the Spacing Scale (e.g., a `2rem` gap between a header and a paragraph).
*   **Hover State:** Cards should subtly lift by transitioning to `surface-container-lowest` and applying an Ambient Shadow.

### Chips (Category Tags)
*   **Style:** Background: `tertiary_container` (#6bfde0); Text: `on_tertiary_container` (#005f51). Shape: `md` (1.5rem). Use these for "Illustration," "Branding," or "UI Design" tags.

### Signature Component: The "Sticker" Tooltip
*   Instead of a standard box, tooltips should look like "stickers" with `full` rounding, using `primary_container` (#fdd400) and `on_primary_container` (#594a00). Tilt them 3 degrees randomly left or right for a playful, hand-placed feel.

---

## 6. Do's and Don'ts

### Do:
*   **Do** lean into white space. The "bento" style only works if the containers have room to breathe.
*   **Do** mix your container sizes. A large `2x2` bento box next to two `1x1` boxes creates visual interest.
*   **Do** use the `tertiary` (Teal) color as a "cool-down" when the yellow/coral palette becomes too intense.

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` (#3d3905) for text to keep the "organic" feel.
*   **Don't** use sharp corners. Even 4px corners will break the "soft" visual language of this system.
*   **Don't** use standard dividers or 1px lines. They create visual "noise" that interrupts the flow of the scrapbook.
*   **Don't** align everything perfectly. A slight overlap of an image breaking out of its bento container is encouraged to show "artistic life."```