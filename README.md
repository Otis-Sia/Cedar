# Cedar Portfolio Platform

Cedar is a high-end, intelligent portfolio creation platform designed to transform the process of building a digital presence into an editorial experience. Built with a focus on deep tonal aesthetics and minimalist sophistication, Cedar serves as a "Digital Curator" for its users.

## Project Structure

This project is organized into several key directories:

- **[/code](file:///c:/Users/Administrator/Desktop/Code/Cedar/code/)**: Modern Next.js application environment (React/TypeScript). This is the active development workspace.
- **[/Templates](file:///c:/Users/Administrator/Desktop/Code/Cedar/Templates/)**: Source HTML/CSS for portfolio templates. These serve as the blueprint for user portfolios.

### Modern Application (./code)

The current application logic is built with Next.js and integrates parsing and generation services. It uses:
- **Next.js 15+** for the frontend and API routes.
- **Supabase** for database operations and authentication.

### Templates (./Templates)

Each subdirectory contains the source code for a specific portfolio style:
- `Bold Creative`, `Minimalist Architect`, `Tech 1 page`, etc.
- These templates include individual `DESIGN.md` files that guide their aesthetic implementation.
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
3. Set up environment variables in `.env.local` (see `code/.env.local` for required keys).
4. Run the development server:
   ```bash
   npm run dev
   ```

## Design Philosophy

Cedar strictly adheres to a high-end visual strategy. Key tenets include:

- **The "No-Line" Rule**: Avoid solid 1px borders for structural containment. Rely on background color value shifts and shadows.
- **Tonal Layering**: Use `surface`, `surface-container-low`, and `surface-container-high` tokens to create depth.
- **Editorial Typography**: Pair bold `display-lg` headers with optimized `body-md` text to create an authoritative, high-contrast hierarchy.
- **Minimalist Sophistication**: Focus on whitespace and precise alignment to create a premium feel.
