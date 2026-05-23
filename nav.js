/* nav.js — injects sticky nav + makes marquee truly infinite */
(function () {
  'use strict';

  const path = location.pathname.split('/').pop() || 'index.html';

  const PAGES = [
    { file: 'colordrop.html', label: 'ColorDrop' },
    { file: 'hue.html',       label: 'HUE'       },
    { file: 'chroma.html',    label: 'Chroma'    },
    { file: 'upscale.html',   label: 'UpScale'   },
    { file: 'urlclean.html',  label: 'URLClean'  },
  ];

  const navEl = document.createElement('nav');
  navEl.className = 'site-nav';
  navEl.innerHTML = PAGES.map(p =>
    `<a class="nav-link${p.file === path ? ' active' : ''}" href="${p.file}">${p.label}</a>`
  ).join('');
  document.body.insertBefore(navEl, document.body.firstChild);

  /* Marquee: duplicate content ONCE so CSS -50% animation loops seamlessly */
  document.querySelectorAll('.marquee-track').forEach(function(track) {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

})();
