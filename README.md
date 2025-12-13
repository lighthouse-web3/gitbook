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

## Project structure

- `docs/` contains all documentation content (migrated from GitBook).
- `static/` holds static assets such as images and the site favicon.
- `src/pages/` and `src/css/` contain the homepage and styling overrides.
- `docusaurus.config.ts` and `sidebars.ts` configure the Docusaurus site.

## Adding or updating docs

1. Create or edit Markdown files inside `docs/`.
2. Update `sidebars.ts` to add new pages to the navigation.
3. Run `npm run start` to verify the pages render correctly.
