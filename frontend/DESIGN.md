```markdown
# Cedar Design System

## 1. Visual Direction
Cedar's current visual language is warm, editorial, and premium. The site feels closer to a concierge studio than a generic SaaS dashboard: soft cream backgrounds, deep forest green actions, bronze accents, generous whitespace, rounded cards, and restrained motion. The overall tone is calm and polished, with enough contrast to keep the UI crisp.

The design favors a handcrafted, high-trust feel over futuristic neon styling. It uses structured layouts, quiet shadows, and subtle overlays rather than loud gradients or heavy glass effects.

---

## 2. Color Palette
The production palette is defined in `tailwind-config.js` and used consistently across the site.

| Token | Value | Usage |
| --- | --- | --- |
| `cedar-forest` | `#1B3022` | Primary brand color, CTAs, active nav states, key headings, progress bars |
| `cedar-forest-dark` | `#122117` | Hover and pressed state for primary actions |
| `cedar-alabaster` | `#F9F7F2` | Main page background, subtle panels, soft surface fill |
| `cedar-midnight` | `#121415` | Main text color, dark overlays, strong contrast sections |
| `cedar-slate` | `#4A5568` | Secondary text, metadata, supporting labels |
| `cedar-bronze` | `#AA8C55` | Accent color, badges, AI indicators, emphasis highlights |
| `cedar-bronze-light` | `#C5AC81` | Softer bronze accent for warm panels and gradients |
| `cedar-glass` | `rgba(255, 255, 255, 0.8)` | Translucent navigation and floating surfaces |

### Color Rules
- Use `forest` for primary actions and brand anchors.
- Use `alabaster` as the default canvas instead of pure white or pure black backgrounds.
- Use `bronze` sparingly for emphasis, AI signals, and featured states.
- Keep supporting text in `slate` so the interface stays readable without looking heavy.
- Borders are usually very light, often `black/5` or `black/10`, so surfaces feel separated without looking harsh.

### Overlays and Gradients
- Hero sections rely on dark overlays over photography, usually blending `midnight` with `forest`.
- Glass-style bars use a white surface with high opacity and blur, not neon transparency.
- Bronze gradients appear in promotional or celebratory states, but they are secondary to the solid palette.

---

## 3. Typography
Cedar uses two fonts throughout the site:

- `Playfair Display` for headlines, hero copy, logo treatments, and editorial quotes.
- `Inter` for body copy, labels, forms, navigation, and dashboard UI.

### Type Behavior
- Headings are large, bold, and tight in letter spacing.
- Serif headlines are used to give the site an editorial, premium voice.
- Body text stays clean and highly legible, usually at small-to-medium sizes with relaxed line height.
- Labels often use uppercase tracking for a more structured system feel.

### Typography Rules
- Use `Playfair Display` when a section needs authority or emotional weight.
- Use `Inter` anywhere speed, clarity, or utility matters.
- Keep body text left-aligned.
- Pair large display text with smaller supporting copy to create clear hierarchy.

---

## 4. Layout and Structure
The site is built from simple but carefully arranged page shells rather than dense application chrome.

### Common Layout Patterns
- Landing pages use a large hero, followed by full-width editorial sections.
- Dashboard and gallery views use a fixed left sidebar with a scrollable content canvas.
- Auth pages use split-screen layouts with a white form column and a visual storytelling panel.
- Upload and onboarding screens combine a content explanation panel with a single dominant action area.

### Surface Hierarchy
- The base canvas is usually `cedar-alabaster`.
- Panels and cards are typically white with soft borders.
- Important containers use larger radii, especially `rounded-3xl` and `rounded-[40px]`.
- Rounded pills are used for status, filters, and primary actions.

### Spacing and Density
- The system prefers generous spacing and clear separation between modules.
- Sections are often separated with large vertical padding and thin divider lines.
- Dashboard content uses bento-style grids, asymmetric card sizes, and occasional horizontal scrolling for showcase content.

---

## 5. Elevation and Surfaces
Depth is handled with light borders, gentle shadows, and occasional blur rather than dramatic stacking.

### Surface Treatment
- White cards with `border-black/5` are the default building block.
- Secondary cards often use `cedar-alabaster` to feel slightly recessed.
- Sticky bars and floating controls use translucent white with `backdrop-blur-md` or `backdrop-blur-xl`.

### Shadow Style
- Shadows stay soft and low-opacity.
- Cards typically use `shadow-sm`, `shadow-md`, or a custom shadow with a small blur radius.
- The strongest shadows appear on primary CTAs, hero buttons, and selected template cards.

### Border Style
- Borders are present and intentional, but subtle.
- Most shells use `border-black/5`.
- Inputs and interactive surfaces use `border-black/10` or a bronze-tinted focus state.
- Dashed borders are reserved for drop zones and placeholders.

---

## 6. Motion and Animation
The motion system is restrained but deliberate. It is used to signal hierarchy, affordance, and state changes rather than decoration.

### Global Motion Conventions
- `scroll-behavior: smooth` is enabled globally.
- Most interactive elements use `transition-all` or `transition-colors` with short-to-medium durations.
- Hover states usually combine a small upward lift with a shadow change.
- Images often scale slightly on hover to suggest depth and polish.

### Scripted Interactions
- Elements with the `reveal` class animate into view using IntersectionObserver and gain an `active` state when they enter the viewport.
- The header gains a `scrolled` class on scroll to support sticky-state styling.
- FAQ items toggle an `active` state on click so only one item stays open.
- Anchor links smooth-scroll to section targets.
- The contact form has a mock submit state that changes button text, disables interaction, and restores itself after a short delay.

### Repeating Motions
- `animate-pulse` is used for bronze status dots and AI indicators.
- Hover motion is usually subtle: `-translate-y-0.5`, `-translate-y-1`, or a small scale on media.
- Template previews and gallery imagery use longer hover transitions to feel premium.

---

## 7. Core Components

### Navigation
- Landing pages use a floating glass navbar with a blurred white background.
- Dashboard and gallery views use a left sidebar with a white surface and active forest-highlighted item.
- Active navigation items are filled with `cedar-forest` and white text.

### Buttons
- Primary buttons are forest green, rounded-full or rounded-xl, and usually have a soft shadow.
- Primary hover states darken to `cedar-forest-dark` and lift slightly.
- Secondary buttons are white or alabaster with light borders.
- Text links are muted by default and become forest green on hover.

### Forms
- Inputs use a white or alabaster background, light borders, and generous padding.
- Focus states use bronze borders and a soft bronze ring.
- Labels are uppercase, compact, and heavily tracked.
- Checkboxes and toggles keep the same restrained palette instead of introducing system default blue.

### Cards
- Cards are the main structural unit across the site.
- Most cards are white with rounded corners, thin borders, and a low shadow.
- Feature cards may use forest fills, gradient overlays, or image-backed compositions.
- Showcase cards use hover overlays and image zooms to communicate interactivity.

### Badges and Status Pills
- Badges are small, uppercase, and tightly tracked.
- Bronze is used for premium, AI, or active indicators.
- Forest is used for live, ready, and primary states.
- Muted slate is used for draft, secondary, and informational states.

### Floating Elements
- AI status bars and helper chips float above the canvas with blurred white surfaces.
- These elements usually sit near the bottom of the viewport and use bronze pulse dots to indicate activity.

---

## 8. Page-Level Styling Patterns

### Home Page
- Large forest-and-midnight hero treatment with photography and dark overlays.
- Serif hero headline with one bronze-highlighted word.
- Strong, rounded primary CTA paired with a lighter secondary CTA.
- Sections alternate between alabaster, white, and forest-backed layouts for rhythm.

### Dashboard
- Fixed sidebar, top header, and bento grid content area.
- White summary cards, subtle icons, and compact status elements.
- Forest is the dominant active state, bronze is used for premium markers.

### Template Gallery
- Sticky filter bar with blur and soft background.
- Large feature card plus smaller supporting cards.
- Hover-driven previews with image scaling and overlay buttons.

### Auth Screens
- Split-screen layout with a strong visual panel and a simple white form panel.
- Forms are minimal and focused, with one clear primary action.
- Copy is concise and centered or left-aligned depending on screen width.

### Upload Screen
- Hero copy on the left, file drop zone on the right.
- Dashed upload region, file metadata chip, and a single dominant scan action.
- Bronze is used to reinforce the AI-driven nature of the workflow.

---

## 9. Responsive Behavior
- Desktop views use wider layouts, sidebars, and larger type scales.
- Mobile views collapse navigation into simpler vertical flows.
- Cards stack into single-column layouts at smaller breakpoints.
- Horizontal scrolling is used only when it improves browsing, such as the showcase strip.

---

## 10. Do's and Don'ts

### Do
- Do use `cedar-forest` for primary actions and active states.
- Do keep surfaces soft, rounded, and lightly bordered.
- Do use `cedar-bronze` as a sparse accent, not a dominant theme color.
- Do keep motion subtle and purposeful.
- Do preserve the editorial balance between serif headlines and clean sans-serif UI text.

### Don't
- Don't introduce neon, purple, or teal-heavy palettes that conflict with the current brand.
- Don't use harsh black panels or heavy shadows.
- Don't make borders prominent unless they are part of a form, drop zone, or structural shell.
- Don't replace the current serif/sans pairing with a single generic font stack.
- Don't flatten the layout into a generic SaaS grid; keep the bento rhythm and asymmetry.