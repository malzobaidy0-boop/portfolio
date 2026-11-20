# Google Drive → gallery sync (prepared, NOT yet tested or active)
How it works: a manual GitHub Action runs `scripts/sync_drive.py`, which downloads images from each enabled project folder, resizes them to WebP (max 1600px) into `dist/gallery/<slug>/`, writes `dist/gallery-manifest.json`, and commits. Pages redeploys. The site merges those images after the project's local images. Files with draft/backup/hidden/copy in the name are skipped. No keys in frontend code.

Setup (once):
1. Google Cloud Console → new project → enable **Google Drive API** → create a **service account** → create a JSON key.
2. In Drive, share **only each project folder** (Viewer) with the service-account email. Never share your whole Drive.
3. GitHub repo → Settings → Secrets → Actions → new secret `DRIVE_SA_JSON` = full JSON key contents.
4. In `drive-sync.json`, set `"enabled": true` for a project (folder IDs for four existing folders are pre-filled; add the bakery/other entries yourself with the slug used in `data-project`).
5. Actions → "Sync Google Drive images" → Run workflow. Check the result before relying on it.

Tested here: manifest/resize logic with mocked Drive data, and the gallery merging a manifest. Not tested: real Drive API access (no credentials/network available).
