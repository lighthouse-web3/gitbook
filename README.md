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

This Docusaurus site can be deployed as a static export on Vercel:

- The provided `vercel.json` config uses `npm install` and `npm run build` and outputs to the `build/` directory.
- Set the **Framework Preset** to **Docusaurus** (or leave as "Other" while respecting the same build/output values) in the Vercel dashboard.
- Connect this repository to Vercel, then trigger a deployment. The production URL should match the value configured in `docusaurus.config.ts` (e.g., `https://lighthouse-docs.vercel.app`).

## Project structure

- `docs/` contains all documentation content (migrated from GitBook).
- `static/` holds static assets such as images and the site favicon.
- `src/pages/` and `src/css/` contain the homepage and styling overrides.
- `docusaurus.config.ts` and `sidebars.ts` configure the Docusaurus site.

## Adding or updating docs

1. Create or edit Markdown files inside `docs/`.
2. Update `sidebars.ts` to add new pages to the navigation.
3. Run `npm run start` to verify the pages render correctly.
