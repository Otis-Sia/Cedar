# Design System Document: The High-Contrast Editorial Portfolio

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Monograph"**

This design system is not a template; it is a gallery space. Inspired by high-end architectural monographs and experimental fashion editorials, it treats the screen as a physical canvas. We move beyond the "web-standard" by embracing extreme contrast, aggressive negative space, and a refusal of the "rounded-corner" trend. 

The aesthetic is **Bold, Architectural, and Striking.** We achieve this through "The Power of the Void"—using expansive white space (Negative Space) not as an absence of content, but as a structural element that directs the eye. Our layouts should feel intentional and asymmetric, breaking the predictable 12-column grid to create a rhythm that feels curated rather than generated.

---

## 2. Colors: High-Contrast Tonalism
Our palette is rooted in absolute values: `primary` (#000000) and `surface_container_lowest` (#ffffff). However, to add professional depth, we use a sophisticated range of "Ink and Paper" neutrals.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section content. Boundaries must be defined through background color shifts or extreme whitespace. 
- Use `surface` (#f9f9f9) for the main environment.
- Use `surface_container` (#eeeeee) for secondary sections.
- For maximum impact, use a "Hard Cut": a section transition from `surface` (#f9f9f9) directly to `primary` (#000000).

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of heavy cardstock.
- **Base Layer:** `surface` (#f9f9f9)
- **Primary Content Containers:** `surface_container_lowest` (#ffffff) to provide a "bright" lift.
- **Embedded Utility:** `surface_container_high` (#e8e8e8) for smaller nested elements like code blocks or metadata cards.

### Signature Textures
While the system is minimalist, avoid "flatness" in large CTAs. Use a subtle gradient transition from `primary` (#000000) to `primary_container` (#3b3b3b) to simulate the way light hits black ink on a textured page.

---

## 3. Typography: The Dramatic Serif
Typography is our primary visual asset. We use a "High-Low" pairing: a dramatic, high-contrast Serif for impact and a neutral, functional Sans-Serif for utility.

- **Display & Headlines (`notoSerif`):** These are architectural statements. Use `display-lg` (3.5rem) with tight letter spacing (-0.02em) to create a "block" of text that feels like a physical object.
- **Body & Labels (`inter`):** For all functional text. The contrast between the ornate Serif and the clinical Sans-Serif creates the "Editorial" feel.
- **Hierarchy as Identity:** Use `headline-lg` for project titles, but keep `body-md` for descriptions. The extreme size delta between headers and body text is intentional—it forces the user to acknowledge the hierarchy.

---

## 4. Elevation & Depth: Tonal Layering
We reject traditional drop shadows. We do not use "fuzzy" light sources; we use physical layering.

- **The Layering Principle:** To elevate an object, place a `surface_container_lowest` (#ffffff) element on top of a `surface_dim` (#dadada) background. The sharp `0px` corners will create a natural, hard-edged shadow effect without any CSS `box-shadow` required.
- **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use `outline_variant` (#c6c6c6) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** For floating navigation or overlays, use `surface` at 80% opacity with a `40px` backdrop-blur. This creates a "Frosted Acrylic" look that maintains the architectural feel while allowing the high-contrast content to peak through.

---

## 5. Components: The Brutalist Primitive

### Buttons
- **Primary:** `primary` (#000000) background, `on_primary` (#e2e2e2) text. **Shape:** Sharp `0px` corners. **Interaction:** On hover, shift to `primary_container` (#3b3b3b).
- **Tertiary:** No background, no border. `on_surface` text with a 2px `primary` underline that expands on hover.

### Input Fields
- **Styling:** A single 2px bottom-border using `primary`. No containing box.
- **State:** On focus, the label (using `label-md`) should shift color to `primary`, and the bottom border should animate thickness.

### Cards & Lists
- **Rule:** Forbid the use of divider lines.
- **Implementation:** Use `surface_container_low` (#f3f3f4) backgrounds to group related items. Leave at least `48px` of vertical whitespace between distinct list items to ensure the "Editorial" breathability.

### Signature Component: The "Full-Bleed" Image
Portfolio items should utilize full-bleed imagery that touches the edge of the viewport on at least one side, contrasting with the rigid, high-margin typography on the other.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Place your headers off-center. Use wide left margins and narrow right margins.
- **Use Sharp Corners:** Every element must have `0px` radius. Roundness dilutes the architectural authority of this system.
- **Prioritize Type:** If a layout feels empty, increase the font size of the `display` text rather than adding decorative elements.

### Don't:
- **Don't use Grey Text for Body:** Use `on_background` (#1a1c1c) for maximum legibility and "ink-on-paper" contrast.
- **Don't Use 1px Borders:** It makes the design look like a standard dashboard. Rely on whitespace and tonal shifts.
- **Don't Crowd the Canvas:** If you feel you can fit more content on the screen, you probably have too much. Increase the padding.