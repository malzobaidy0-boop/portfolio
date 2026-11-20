// Renders contact links from site-config.js (edit that file, not this one).
const cfg = window.SITE_CONFIG.contact;
const arabic = document.documentElement.lang === 'ar';
const channels = [
  [arabic ? 'البريد الإلكتروني' : 'Email', cfg.email && 'mailto:' + cfg.email, cfg.email],
  [arabic ? 'الجوال' : 'Phone', cfg.showPhone && cfg.phone && 'tel:' + cfg.phone, cfg.phone],
  ['LinkedIn', cfg.linkedin], ['GitHub', cfg.github]
];
for (const [label, url, value] of channels) {
  if (!url) continue;
  const link = document.createElement('a');
  link.href = url;
  link.textContent = label + (value ? ' · ' + value : '');
  link.dir = 'auto';
  if (url.startsWith('http')) { link.target = '_blank'; link.rel = 'noopener'; }
  document.querySelector('#contact .actions').append(link);
}
