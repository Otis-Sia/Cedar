# Design System Specification: The Academic Curator

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**
This design system moves away from the rigid, grid-heavy "template" look of traditional portfolios. Instead, it adopts an editorial, museum-like approach. It treats student work not as a list of entries, but as a curated collection. By leveraging high-contrast typography scales and intentional white space, we create an environment that feels both authoritative and approachable. 

The system breaks the "bootstrap" aesthetic through **asymmetrical layouts**, where large display type acts as an anchor for smaller, floating content modules. We prioritize a "soft-modern" feel—blending the precision of academia with the approachability of organic, rounded forms.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in mint and soft blues to evoke a sense of calm intelligence.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. Layout boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section should sit directly on a `surface` background to define its start and end.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine, heavy-weight paper.
- **Base Layer:** `surface` (#f8faf9)
- **Secondary Sectioning:** `surface-container-low` (#f0f4f3)
- **Interactive/Floating Cards:** `surface-container-lowest` (#ffffff)
- **Deep Insets:** `surface-container-highest` (#dde4e3)

### The "Glass & Gradient" Rule
To elevate the "out-of-the-box" feel, use **Glassmorphism** for navigation bars and floating action menus. Use `surface` colors at 80% opacity with a `20px` backdrop-blur. 
**Signature Textures:** For primary CTAs and Hero backgrounds, use a subtle linear gradient from `primary` (#296869) to `primary-container` (#b0eeee) at a 135-degree angle. This adds "soul" and depth that flat hex codes cannot provide.

---

## 3. Typography: Editorial Authority
We utilize a pairing of **Manrope** for expressive headers and **Inter** for functional readability.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | Hero statements; massive, confident, asymmetric. |
| **Headline** | `headline-md` | Manrope | 1.75rem | Case study titles; academic and structured. |
| **Title** | `title-lg` | Inter | 1.375rem | Section headers within a project. |
| **Body** | `body-lg` | Inter | 1rem | Long-form reading; high line-height (1.6). |
| **Label** | `label-md` | Inter | 0.75rem | Meta-data (Date, Category, Tools used). |

**Editorial Note:** Use `on-surface-variant` (#596060) for body text to reduce harsh contrast, reserving `on-surface` (#2d3433) for headlines to create a clear visual hierarchy.

---

## 4. Elevation & Depth: Tonal Layering
We achieve hierarchy through **Tonal Layering** rather than structural lines.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The slight shift in brightness creates a soft, natural lift.
- **Ambient Shadows:** When a floating effect is required (e.g., a modal or hovering card), use a shadow color tinted with the `on-surface` tone: `rgba(45, 52, 51, 0.06)` with a blur of `40px` and a `12px` Y-offset.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#acb3b2) at **15% opacity**. Never use 100% opaque borders.
- **Roundedness:** Use the `xl` (1.5rem) radius for major containers and `md` (0.75rem) for buttons. This high-radius look communicates the "approachable" nature of a student portfolio.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text, `xl` roundedness. No border.
- **Secondary:** `secondary-container` fill with `on-secondary-container` text.
- **Tertiary:** No fill. `primary` text with an underline that appears on hover.

### Cards & Content Modules
**Strict Rule:** No divider lines. Use `2rem` of vertical white space or a shift to `surface-container-low` to separate content blocks. 
- **Project Cards:** Use `surface-container-lowest` with an `xl` corner radius. Imagery should be inset with a `sm` (0.25rem) radius to create a "frame within a frame" look.

### Input Fields
- **Styling:** Use `surface-container-highest` as the background. On focus, transition the background to `surface-container-lowest` and add a `2px` "Ghost Border" using the `primary` color at 40% opacity.

### Chips (Category Tags)
- Use `tertiary-container` (#98ffd9) with `on-tertiary-container` text. Use `full` (9999px) roundedness to contrast against the softer `xl` radius of cards.

### Additional Component: The "Curator's Note"
- A specific callout box for student reflections. Use a `secondary-container` background with a left-aligned thick accent bar (4px) in `secondary`. This breaks the standard layout and highlights personal growth.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetric margins (e.g., 10% left margin, 20% right margin) for display text to create an editorial feel.
- **Do** use `primary-fixed-dim` for subtle hover states on interactive mint-colored elements.
- **Do** rely on the `surface-container` tiers to group related information.

### Don’t:
- **Don't** use pure black (#000000) for text. Always use `on-surface`.
- **Don't** use standard 1px dividers to separate case study sections; use white space and background tonal shifts.
- **Don't** use sharp 90-degree corners. Everything must feel "held" and soft, using the provided `Roundedness Scale`.
- **Don't** overcomplicate the Dark Mode. Keep it "subtle" by simply inverting the surface tiers while maintaining the mint (`primary`) accents.