const viewer = document.querySelector('dialog');
const photos = [...document.querySelectorAll('.album-open')];
let album, current, opener, scrollPosition;
function display(step) {
  current = (current + step + album.length) % album.length;
  const link = album[current];
  const image = viewer.querySelector('img');
  image.src = link[0];
  image.alt = link[1];
  const next = album[(current + 1) % album.length];
  if (next) new Image().src = next[0];
  viewer.querySelector('output').textContent = image.alt + ' · ' + (current + 1) + ' / ' + album.length;
  viewer.querySelectorAll('[data-step]').forEach(button => button.hidden = album.length === 1);
}
// Optional: images synced from Google Drive (gallery-manifest.json, written by GitHub Actions).
// Local images always keep working; a missing or broken manifest is ignored.
let manifest = {};
const manifestUrl = window.SITE_CONFIG && window.SITE_CONFIG.galleryManifest;
const manifestReady = manifestUrl
  ? fetch(manifestUrl + '?v=' + Date.now()).then(r => r.ok ? r.json() : {}).then(m => { manifest = m || {}; }).catch(() => {})
  : Promise.resolve();
function albumFor(link) {
  const local = JSON.parse(link.dataset.images);
  const extra = (manifest[link.dataset.project] || []).filter(i => i && i.src && !local.some(l => l[0] === i.src));
  return local.concat(extra.map(i => [i.src, i.alt || '']));
}
photos.forEach(link => link.addEventListener('click', async event => {
  event.preventDefault();
  opener = link;
  scrollPosition = window.scrollY;
  await manifestReady;
  album = albumFor(link);
  current = 0;
  display(0);
  viewer.showModal();
}));
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.querySelectorAll('[data-step]').forEach(button => button.onclick = () => display(Number(button.dataset.step)));
viewer.querySelector('[data-close]').onclick = () => viewer.close();
viewer.addEventListener('keydown', event => {
  if (['ArrowLeft','ArrowRight'].includes(event.key)) {
    const forward = document.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    display(event.key === forward ? 1 : -1);
  }
});

const enlargedPhoto = viewer.querySelector('img');
let touchStart;
enlargedPhoto.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? event.touches[0] : null;
}, { passive: true });
enlargedPhoto.addEventListener('touchcancel', () => { touchStart = null; });
enlargedPhoto.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.clientX;
  const dy = event.changedTouches[0].clientY - touchStart.clientY;
  touchStart = null;
  if (Math.abs(dx) < 50 || Math.abs(dx) <= 1.5 * Math.abs(dy)) return;
  const forward = document.dir === 'rtl' ? dx > 0 : dx < 0;
  display(forward ? 1 : -1);
}, { passive: true });

viewer.addEventListener('close', () => {
  opener?.focus({ preventScroll: true });
  window.scrollTo({ top: scrollPosition, behavior: 'instant' });
});
