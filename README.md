# Cedar Portfolio Platform

Cedar is an intelligent portfolio builder focused on polished, editorial-style personal sites.

## Repository Structure

- `code/` — Active Next.js application (TypeScript, React, API routes, AI-assisted CV parsing).
- `Templates/` — Static HTML template references used for design/layout inspiration.

## Running Locally

1. Move into the app directory:
   ```bash
   cd code
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Gemini API key:
   ```bash
   export GEMINI_API_KEY=your_key_here
   ```
   On Windows Command Prompt:
   ```cmd
   set GEMINI_API_KEY=your_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

## Local API Endpoints

- `GET /api/health` — Health check endpoint.
- `POST /api/parse-cv` — Parses uploaded CV text into structured portfolio data.

## Validation Commands

From `code/`:

- `npm run lint`
- `npm run build`
