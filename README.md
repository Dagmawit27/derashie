# Derashie — Vite deployment notes

This repository uses Vite for development/build. When deploying to GitHub Pages (repo pages) the built files must be served from a subpath (/<repo>/). To handle that reliably, a `vite.config.js` file has been added to set a `base` path for the built assets.

Key points:

- `vite.config.js` defaults `base` to `/derashie/` (the repo name). That works for GitHub Pages at https://<user>.github.io/derashie/
- You can override the base at build time by setting the `DEPLOY_BASE` environment variable.

Examples

- Build using the default base (the config's default):

  npm run build

- Build with a custom base (PowerShell):

  $env:DEPLOY_BASE = "/your/base/"; npm run build

On Linux/macOS shells you can use a single-line prefix:

DEPLOY_BASE=/your/base/ npm run build

If you're deploying with `gh-pages` (the `deploy` npm script already present), keep `DEPLOY_BASE` set to the correct base (e.g. `/derashie/`) so asset references are correct.

If you prefer to make assets available at the site root (e.g. `/image/logo.jpg`) you can place static assets in `public/` before building. Files in `public/` are copied directly to the build output.

If you want, I can also set up a cross-platform `build:deploy` script (using `cross-env`) so you can set `DEPLOY_BASE` easily on Windows and Linux. Would you like that?
