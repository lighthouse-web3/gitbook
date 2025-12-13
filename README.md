# Lighthouse Docs (Docusaurus)

This repository now uses [Docusaurus](https://docusaurus.io/) to render the Lighthouse documentation.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start a local dev server:
   ```bash
   npm run start
   ```
   The site will open at http://localhost:3000/ with hot reloading.
3. Build a production bundle:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run serve
   ```

## Deploying to Vercel

The repository already includes `vercel.json` with the correct defaults for Docusaurus. Use either the dashboard or the CLI:

### Deploy from the Vercel dashboard (recommended)

1. Create a new project and connect this Git repository.
2. In **Project Settings → General** set:
   - **Framework Preset:** `Docusaurus` (or `Other` if unavailable)
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
3. Save the settings and trigger a new deployment. The site will be served from the URL shown in the Vercel dashboard and should match the `url` in `docusaurus.config.ts` (currently `https://lighthouse-docs.vercel.app`).

### Deploy from the Vercel CLI (alternative)

1. Install the Vercel CLI if needed:
   ```bash
   npm install -g vercel
   ```
2. Log in and link the project (requires a Vercel account):
   ```bash
   vercel login
   vercel link
   ```
3. Deploy using the configuration in `vercel.json`:
   ```bash
   vercel --prod
   ```
   The CLI will build the site, upload the `build/` directory, and print the production URL.

## Project structure

- `docs/` contains all documentation content (migrated from GitBook).
- `static/` holds static assets such as images and the site favicon.
- `src/pages/` and `src/css/` contain the homepage and styling overrides.
- `docusaurus.config.ts` and `sidebars.ts` configure the Docusaurus site.

## Adding or updating docs

1. Create or edit Markdown files inside `docs/`.
2. Update `sidebars.ts` to add new pages to the navigation.
3. Run `npm run start` to verify the pages render correctly.
