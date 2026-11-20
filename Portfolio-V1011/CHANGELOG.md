# CHANGELOG — Portfolio V10

## Fixed
- **Phone number was publicly visible** (`showPhone: true`). Now hidden (`false`).
- Graduation project badges ("Team Project — 5 Members") were hidden inside the collapsed card; now visible on the card (EN + AR).
- Lightbox: tap outside the image to close; next image is preloaded.
- Cache-busting version bumped to `v10` on all pages (index/resume pages had none).

## Added
- `dist/site-config.js` — single editable config (email, phone, showPhone, LinkedIn, GitHub). LinkedIn/GitHub stay empty (not invented) and are skipped until you fill them.
- Local link to the bundled bakery menu next to the external one (external link kept, now opens in a new tab).
- Per-project `data-project` slugs on cards, favicon, meta descriptions, `404.html`, `.nojekyll`.
- `.github/workflows/pages.yml` — deploys `dist/` to GitHub Pages.
- Google Drive sync (NOT active): `scripts/sync_drive.py`, `drive-sync.json` (all projects `enabled:false`), `.github/workflows/drive-sync.yml` (manual trigger), `dist/gallery-manifest.json` (empty `{}`). See `DRIVE-SYNC.md`.

## Unchanged
- Design, content, all images (including unused `poster-*.webp` drafts, still not listed in any gallery), both CVs (`cv.pdf`, `cv-en.pdf`, `resume*.png`), bakery files, `.openai/hosting.json`, original README.
