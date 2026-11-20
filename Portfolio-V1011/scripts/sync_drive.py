#!/usr/bin/env python3
"""Sync images from per-project Google Drive folders into dist/gallery/<slug>/ and
write dist/gallery-manifest.json. Runs in GitHub Actions only; credentials come from
the DRIVE_SA_JSON secret (never in the frontend). Scope: drive.readonly, but the service
account can only see folders you explicitly shared with it."""
import io, json, os, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
MAX_SIDE = 1600
IMG_TYPES = {"image/jpeg", "image/png", "image/webp"}

def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", Path(name).stem.lower()).strip("-") or "image"

def build_manifest(config, list_files, download, save):
    """Pure logic (testable): list_files(folder_id)->[{id,name,mimeType}], download(id)->bytes,
    save(bytes, dest_path) writes optimized webp. Returns manifest dict."""
    manifest = {}
    for p in config["projects"]:
        if not p.get("enabled"):
            continue
        items = []
        for f in sorted(list_files(p["driveFolderId"]), key=lambda f: f["name"].lower()):
            if f["mimeType"] not in IMG_TYPES:
                continue
            if re.search(r"(draft|backup|hidden|copy)", f["name"], re.I):
                continue  # drafts stay in Drive, never public
            rel = f"gallery/{p['slug']}/{slugify(f['name'])}-{f['id'][:6]}.webp"
            dest = DIST / rel
            if not dest.exists():
                dest.parent.mkdir(parents=True, exist_ok=True)
                save(download(f["id"]), dest)
            items.append({"src": rel, "alt": Path(f["name"]).stem.replace("_", " ").replace("-", " ")})
        manifest[p["slug"]] = items
    return manifest

def save_webp(data, dest):
    from PIL import Image
    img = Image.open(io.BytesIO(data)).convert("RGB")
    img.thumbnail((MAX_SIDE, MAX_SIDE))
    img.save(dest, "WEBP", quality=82)

def main():
    config = json.loads((ROOT / "drive-sync.json").read_text())
    info = os.environ.get("DRIVE_SA_JSON")
    if not info:
        sys.exit("DRIVE_SA_JSON secret is not set; nothing synced.")
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaIoBaseDownload
    creds = service_account.Credentials.from_service_account_info(
        json.loads(info), scopes=["https://www.googleapis.com/auth/drive.readonly"])
    svc = build("drive", "v3", credentials=creds, cache_discovery=False)

    def list_files(folder):
        out, token = [], None
        while True:
            r = svc.files().list(q=f"'{folder}' in parents and trashed=false",
                                 fields="nextPageToken, files(id,name,mimeType)",
                                 pageSize=200, pageToken=token).execute()
            out += r["files"]; token = r.get("nextPageToken")
            if not token: return out

    def download(file_id):
        buf = io.BytesIO()
        dl = MediaIoBaseDownload(buf, svc.files().get_media(fileId=file_id))
        done = False
        while not done: _, done = dl.next_chunk()
        return buf.getvalue()

    manifest = build_manifest(config, list_files, download, save_webp)
    (DIST / "gallery-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1))
    print("Synced:", {k: len(v) for k, v in manifest.items()})

if __name__ == "__main__":
    main()
