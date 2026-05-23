/* nav.js — injects sticky nav + fixes marquee to be truly infinite */
(function () {
  'use strict';

  /* ── 1. Determine current page ── */
  const path = location.pathname.split('/').pop() || 'index.html';

  const PAGES = [
    { file: 'colordrop.html', label: 'ColorDrop' },
    { file: 'hue.html',       label: 'HUE'       },
    { file: 'chroma.html',    label: 'Chroma'    },
    { file: 'upscale.html',   label: 'UpScale'   },
    { file: 'urlclean.html',  label: 'URLClean'  },
  ];

  /* ── 2. Build nav HTML ── */
  const navEl = document.createElement('nav');
  navEl.className = 'site-nav';
  navEl.innerHTML = PAGES.map(p =>
    `<a class="nav-link${p.file === path ? ' active' : ''}" href="${p.file}">${p.label}</a>`
  ).join('');

  /* Insert nav as first child of body */
  document.body.insertBefore(navEl, document.body.firstChild);

  /* ── 3. Fix marquee — make it truly infinite ── */
  document.querySelectorAll('.marquee-track').forEach(track => {
    /* Clone the full original content, then append enough copies so
       the animation always has content scrolling even at any viewport width.
       The CSS animates translateX(-50%) so we need exactly 2 copies total. */
    const original = track.innerHTML;
    // Ensure we have at least 4 repetitions of the content for seamless loop
    track.innerHTML = original + original + original + original;
  });

})();
