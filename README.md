# Cedar Portfolio Platform

Cedar is a high-end, intelligent portfolio creation platform designed to transform the process of building a digital presence into an editorial experience. Built with a focus on deep tonal aesthetics and minimalist sophistication, Cedar serves as a "Digital Curator" for its users.

## Project Structure

This project is divided into two primary environments:

- **[/frontend](file:///home/sia/Desktop/Code/Cedar/frontend/)**: Legacy static HTML/CSS/JS frontend environment.
- **[/code](file:///home/sia/Desktop/Code/Cedar/code/)**: Modern Next.js application environment (React/TypeScript).

### Legacy Frontend (./frontend)

The following core files are located in the `frontend/` directory for historical reference and static preview:

- `index.html`: Main landing page and hero section.
- `login.html`, `signup.html`, `forgot_password.html`: Authentication flows.
- `dashboard.html`, `settings.html`, `projects.html`, `insights.html`: Internal application views.
- `select_template.html`, `CV_upload.html`: Portfolio generation and configuration flow.
- `style.css`: Core design system, variables, and unified style rules.
- `script.js`: Global interactive elements and application logic.
- `DESIGN.md`: Comprehensive design guidelines ("The Intelligent Muse").

### Modern Application (./code)

The current application logic is built with Next.js and integrates AI-driven parsing and generation services.

## Running Locally

### Next.js Application (Active Development)

1. Navigate to the `code/` directory:
   ```bash
   cd code
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Legacy Frontend (Static Preview)

 Navigate to the `frontend/` directory and use a static server:

```bash
cd frontend
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Design Philosophy

This project strictly adheres to the visual strategy outlined in `frontend/DESIGN.md`. Key tenets include:

- **The "No-Line" Rule**: Avoid solid 1px borders for structural containment. Rely on background color value shifts.
- **Tonal Layering**: Use `surface`, `surface-container-low`, and `surface-container-high` to create depth.
- **Editorial Typography**: Pair bold `display-lg` (Manrope) headers with optimized `body-md` (Inter) text to create an authoritative, high-contrast hierarchy.
