# Deploy to GitHub Pages
1. Create a GitHub repo and upload the **contents of this folder** (keep `dist/`, `.github/`, `scripts/`). Branch: `main`.
2. Repo → Settings → Pages → **Source: GitHub Actions**.
3. Push (or Actions → "Deploy to GitHub Pages" → Run workflow). Site: `https://<user>.github.io/<repo>/`.
4. Edit `dist/site-config.js` to add LinkedIn/GitHub URLs; set `showPhone: true` only if you want the phone public.
Note: the phone number is stored in `site-config.js`, so it is readable in a public repo even while hidden on the page. Clear `phone` if you don't want that.
